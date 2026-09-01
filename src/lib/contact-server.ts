import {
  CONTACT_INTERESTS,
  CONTACT_LIMITS,
  TURNSTILE_ACTION,
  TURNSTILE_DUMMY_SECRET_PASS,
  TURNSTILE_DUMMY_SECRETS,
  type ContactInterest,
} from '../data/contact';

export const CONTACT_TO = 'hello@aizaz.studio';
export const CONTACT_FROM = 'forms@aizaz.studio';

export type ContactFailureCode =
  | 'INVALID_NAME'
  | 'INVALID_EMAIL'
  | 'INVALID_INTEREST'
  | 'INVALID_MESSAGE'
  | 'INVALID_INPUT'
  | 'TURNSTILE_FAILED'
  | 'TURNSTILE_EXPIRED'
  | 'ORIGIN_DENIED'
  | 'SPAM'
  | 'RATE_LIMITED'
  | 'PAYLOAD_TOO_LARGE'
  | 'METHOD_NOT_ALLOWED'
  | 'EMAIL_FAILED'
  | 'EMAIL_UNAVAILABLE'
  | 'CONFIG_ERROR';

export type ContactJson =
  | { ok: true }
  | { ok: false; code: ContactFailureCode; message: string };

export type ContactFields = {
  name: string;
  email: string;
  interest: ContactInterest;
  message: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  landing_url: string;
  referring_page: string;
  turnstileToken: string;
};

export type SendEmailBinding = {
  send: (message: {
    to: string;
    from: string;
    subject: string;
    html?: string;
    text?: string;
    replyTo?: string;
  }) => Promise<{ messageId?: string } | void>;
};

export type RateLimiterBinding = {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
};

export type ContactRuntimeEnv = {
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_PREVIEW_HOST?: string;
  PUBLIC_TURNSTILE_PREVIEW_HOST?: string;
  EMAIL?: SendEmailBinding;
  CONTACT_RATE_LIMITER?: RateLimiterBinding;
};

type RuntimeLocals = {
  runtime?: {
    env?: ContactRuntimeEnv & Record<string, unknown>;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HEADER_UNSAFE = /[\r\n\0]/g;

const USER_MESSAGES: Record<ContactFailureCode, string> = {
  INVALID_NAME: 'Please enter your name.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_INTEREST: 'Please choose a valid interest.',
  INVALID_MESSAGE: 'Please add a bit more detail about the project.',
  INVALID_INPUT: 'Please check the form and try again.',
  TURNSTILE_FAILED: 'Verification failed. Please try again.',
  TURNSTILE_EXPIRED: 'Verification expired. Please try again.',
  ORIGIN_DENIED: 'This request could not be verified.',
  SPAM: 'Unable to send. Please try again.',
  RATE_LIMITED: 'Too many attempts. Please wait a minute and try again.',
  PAYLOAD_TOO_LARGE: 'That message is too large. Please shorten it and try again.',
  METHOD_NOT_ALLOWED: 'Method not allowed.',
  EMAIL_FAILED: 'We could not send your message. Please try again.',
  EMAIL_UNAVAILABLE: 'Messaging is temporarily unavailable. Please try again later.',
  CONFIG_ERROR: 'Messaging is temporarily unavailable. Please try again later.',
};

export function failureMessage(code: ContactFailureCode): string {
  return USER_MESSAGES[code];
}

export function getContactEnv(locals: RuntimeLocals): ContactRuntimeEnv {
  const runtimeEnv = locals.runtime?.env;
  return {
    TURNSTILE_SECRET_KEY: firstString(
      runtimeEnv?.TURNSTILE_SECRET_KEY,
      import.meta.env.TURNSTILE_SECRET_KEY,
      typeof process !== 'undefined' ? process.env.TURNSTILE_SECRET_KEY : undefined,
    ),
    TURNSTILE_PREVIEW_HOST: firstString(
      runtimeEnv?.TURNSTILE_PREVIEW_HOST,
      runtimeEnv?.PUBLIC_TURNSTILE_PREVIEW_HOST,
      import.meta.env.TURNSTILE_PREVIEW_HOST,
      import.meta.env.PUBLIC_TURNSTILE_PREVIEW_HOST,
    ),
    EMAIL: isSendEmailBinding(runtimeEnv?.EMAIL) ? runtimeEnv.EMAIL : undefined,
    CONTACT_RATE_LIMITER: isRateLimiterBinding(runtimeEnv?.CONTACT_RATE_LIMITER)
      ? runtimeEnv.CONTACT_RATE_LIMITER
      : undefined,
  };
}

export function getTurnstileSecret(env: ContactRuntimeEnv): string | undefined {
  if (env.TURNSTILE_SECRET_KEY) return env.TURNSTILE_SECRET_KEY;
  if (import.meta.env.DEV) return TURNSTILE_DUMMY_SECRET_PASS;
  return undefined;
}

export function jsonHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  };
}

export function jsonResponse(status: number, body: ContactJson, extra?: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...jsonHeaders(), ...extra },
  });
}

export function fail(status: number, code: ContactFailureCode, extra?: HeadersInit): Response {
  return jsonResponse(status, { ok: false, code, message: failureMessage(code) }, extra);
}

export function isAllowedOrigin(originHeader: string | null, requestUrl: URL): boolean {
  if (!originHeader) return false;
  let originUrl: URL;
  try {
    originUrl = new URL(originHeader);
  } catch {
    return false;
  }
  return originUrl.origin === requestUrl.origin;
}

export function stripHeaderUnsafe(value: string): string {
  return value.replace(HEADER_UNSAFE, '').trim();
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function clampAttr(value: unknown): string {
  if (typeof value !== 'string') return '';
  const cleaned = stripHeaderUnsafe(value);
  return cleaned.slice(0, CONTACT_LIMITS.attributionMax);
}

export function parseContactPayload(raw: Record<string, unknown>):
  | { ok: true; fields: ContactFields }
  | { ok: false; code: ContactFailureCode } {
  const honeypot = readString(raw.company_website ?? raw.website ?? raw.hp);
  if (honeypot.length > 0) return { ok: false, code: 'SPAM' };

  const name = stripHeaderUnsafe(readString(raw.name));
  if (name.length < CONTACT_LIMITS.nameMin || name.length > CONTACT_LIMITS.nameMax) {
    return { ok: false, code: 'INVALID_NAME' };
  }

  const email = stripHeaderUnsafe(readString(raw.email)).toLowerCase();
  if (email.length > CONTACT_LIMITS.emailMax || !EMAIL_PATTERN.test(email) || email.includes(' ')) {
    return { ok: false, code: 'INVALID_EMAIL' };
  }

  const interest = stripHeaderUnsafe(readString(raw.interest));
  if (!isContactInterest(interest)) return { ok: false, code: 'INVALID_INTEREST' };

  const message = readString(raw.message).trim();
  if (message.length < CONTACT_LIMITS.messageMin) return { ok: false, code: 'INVALID_MESSAGE' };
  if (message.length > CONTACT_LIMITS.messageMax) return { ok: false, code: 'INVALID_MESSAGE' };
  if (HEADER_UNSAFE.test(message) && /[\r\n]{8,}/.test(message)) {
    return { ok: false, code: 'INVALID_MESSAGE' };
  }

  const token = readString(raw['cf-turnstile-response'] ?? raw.turnstileToken ?? raw.turnstile);
  if (!token || token.length > CONTACT_LIMITS.tokenMax) {
    return { ok: false, code: 'TURNSTILE_FAILED' };
  }

  return {
    ok: true,
    fields: {
      name,
      email,
      interest,
      message,
      utm_source: clampAttr(raw.utm_source),
      utm_medium: clampAttr(raw.utm_medium),
      utm_campaign: clampAttr(raw.utm_campaign),
      utm_term: clampAttr(raw.utm_term),
      utm_content: clampAttr(raw.utm_content),
      gclid: clampAttr(raw.gclid),
      landing_url: clampAttr(raw.landing_url),
      referring_page: clampAttr(raw.referring_page),
      turnstileToken: token,
    },
  };
}

export async function recordToObject(data: FormData | URLSearchParams): Promise<Record<string, unknown>> {
  const raw: Record<string, unknown> = {};
  data.forEach((value, key) => {
    if (typeof value === 'string' && raw[key] === undefined) raw[key] = value;
  });
  return raw;
}

type SiteverifyResult = {
  success: boolean;
  hostname?: string;
  action?: string;
  challenge_ts?: string;
  'error-codes'?: string[];
  metadata?: { result_with_testing_key?: boolean };
};

export async function verifyTurnstile(options: {
  token: string;
  secret: string;
  requestUrl: URL;
  remoteip?: string;
  previewHost?: string;
}): Promise<{ ok: true } | { ok: false; code: 'TURNSTILE_FAILED' | 'TURNSTILE_EXPIRED' }> {
  const { token, secret, requestUrl, remoteip, previewHost } = options;
  if (!token || token.length > CONTACT_LIMITS.tokenMax) {
    return { ok: false, code: 'TURNSTILE_FAILED' };
  }

  const payload: Record<string, string> = { secret, response: token };
  if (remoteip) payload.remoteip = remoteip;

  let result: SiteverifyResult;
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    result = (await response.json()) as SiteverifyResult;
  } catch {
    return { ok: false, code: 'TURNSTILE_FAILED' };
  }

  const errorCodes = result['error-codes'] ?? [];
  if (!result.success) {
    if (errorCodes.includes('timeout-or-duplicate')) return { ok: false, code: 'TURNSTILE_EXPIRED' };
    return { ok: false, code: 'TURNSTILE_FAILED' };
  }

  const dummy = TURNSTILE_DUMMY_SECRETS.has(secret);
  const hostname = (result.hostname || '').toLowerCase();
  const action = result.action || '';
  // Official dummy Siteverify currently returns hostname "example.com", omits action,
  // and sets metadata.result_with_testing_key. Do not treat that as production success.
  if (dummy) {
    const testingKey = result.metadata?.result_with_testing_key === true;
    const dummyHost = hostname === 'example.com' || hostname === 'localhost' || hostname === '127.0.0.1';
    const dummyAction = !action || action === TURNSTILE_ACTION || action === 'test';
    if (testingKey || (dummyHost && dummyAction)) return { ok: true };
    return { ok: false, code: 'TURNSTILE_FAILED' };
  }

  if (action !== TURNSTILE_ACTION) return { ok: false, code: 'TURNSTILE_FAILED' };
  if (!isTurnstileHostnameAllowed(hostname, requestUrl, previewHost, false)) {
    return { ok: false, code: 'TURNSTILE_FAILED' };
  }

  return { ok: true };
}

export async function hashedRateLimitKey(identity: string): Promise<string> {
  const data = new TextEncoder().encode(`contact-form:${identity}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

const localHits = new Map<string, { count: number; resetAt: number }>();

export async function consumeRateLimit(
  limiter: RateLimiterBinding | undefined,
  key: string,
): Promise<boolean> {
  if (limiter) {
    const { success } = await limiter.limit({ key });
    return success;
  }
  if (import.meta.env.DEV) {
    const now = Date.now();
    const row = localHits.get(key);
    if (!row || now >= row.resetAt) {
      localHits.set(key, { count: 1, resetAt: now + 60_000 });
      return true;
    }
    if (row.count >= 5) return false;
    row.count += 1;
    return true;
  }
  return true;
}

export async function sendContactEmail(
  email: SendEmailBinding,
  fields: ContactFields,
  requestId: string,
  submittedAt: string,
): Promise<void> {
  const subject = stripHeaderUnsafe(`New project inquiry — ${fields.interest}`);
  const text = buildTextEmail(fields, requestId, submittedAt);
  const html = buildHtmlEmail(fields, requestId, submittedAt);
  await email.send({
    to: CONTACT_TO,
    from: CONTACT_FROM,
    replyTo: fields.email,
    subject,
    text,
    html,
  });
}

export function logContactEvent(entry: {
  requestId: string;
  outcome: 'accepted' | 'rejected' | 'rate_limited' | 'email_failed';
  category: string;
}): void {
  console.info(
    JSON.stringify({
      requestId: entry.requestId,
      outcome: entry.outcome,
      category: entry.category,
    }),
  );
}

function isTurnstileHostnameAllowed(
  hostname: string,
  requestUrl: URL,
  previewHost: string | undefined,
  dummySecret: boolean,
): boolean {
  if (!hostname) return false;
  const localHost = hostname === 'localhost' || hostname === '127.0.0.1';
  const requestIsLocal = requestUrl.hostname === 'localhost' || requestUrl.hostname === '127.0.0.1';
  if (localHost) return dummySecret || requestIsLocal;

  const allowed = new Set(['aizaz.studio', 'www.aizaz.studio', requestUrl.hostname.toLowerCase()]);
  if (previewHost) allowed.add(previewHost.toLowerCase().split(':')[0] || previewHost.toLowerCase());
  return allowed.has(hostname);
}

function isContactInterest(value: string): value is ContactInterest {
  return (CONTACT_INTERESTS as readonly string[]).includes(value);
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return undefined;
}

function isSendEmailBinding(value: unknown): value is SendEmailBinding {
  return Boolean(value) && typeof value === 'object' && typeof (value as SendEmailBinding).send === 'function';
}

function isRateLimiterBinding(value: unknown): value is RateLimiterBinding {
  return Boolean(value) && typeof value === 'object' && typeof (value as RateLimiterBinding).limit === 'function';
}

function attrLine(label: string, value: string): string {
  return value ? `${label}: ${value}` : '';
}

function buildTextEmail(fields: ContactFields, requestId: string, submittedAt: string): string {
  return [
    'New project inquiry from the Aizaz Studio contact form.',
    '',
    `Submission ID: ${requestId}`,
    `Submitted: ${submittedAt}`,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Interest: ${fields.interest}`,
    '',
    'Project details:',
    fields.message,
    '',
    attrLine('Landing page', fields.landing_url),
    attrLine('Referrer', fields.referring_page),
    attrLine('utm_source', fields.utm_source),
    attrLine('utm_medium', fields.utm_medium),
    attrLine('utm_campaign', fields.utm_campaign),
    attrLine('utm_term', fields.utm_term),
    attrLine('utm_content', fields.utm_content),
    attrLine('gclid', fields.gclid),
  ]
    .filter((line, index, lines) => line !== '' || lines[index - 1] !== '')
    .join('\n');
}

function row(label: string, value: string): string {
  if (!value) return '';
  return `<tr><th align="left" style="padding:6px 12px 6px 0;color:#555;font-weight:600;vertical-align:top">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`;
}

function buildHtmlEmail(fields: ContactFields, requestId: string, submittedAt: string): string {
  return `<!DOCTYPE html><html><body style="font-family:Figtree,Inter,sans-serif;color:#111;line-height:1.5">
<p>New project inquiry from the Aizaz Studio contact form.</p>
<table cellpadding="0" cellspacing="0">
${row('Submission ID', requestId)}
${row('Submitted', submittedAt)}
${row('Name', fields.name)}
${row('Email', fields.email)}
${row('Interest', fields.interest)}
</table>
<p style="margin:20px 0 8px;font-weight:600">Project details</p>
<p style="white-space:pre-wrap">${escapeHtml(fields.message)}</p>
<table cellpadding="0" cellspacing="0">
${row('Landing page', fields.landing_url)}
${row('Referrer', fields.referring_page)}
${row('utm_source', fields.utm_source)}
${row('utm_medium', fields.utm_medium)}
${row('utm_campaign', fields.utm_campaign)}
${row('utm_term', fields.utm_term)}
${row('utm_content', fields.utm_content)}
${row('gclid', fields.gclid)}
</table>
</body></html>`;
}
