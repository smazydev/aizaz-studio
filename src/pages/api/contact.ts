import type { APIRoute } from 'astro';
import { CONTACT_LIMITS } from '../../data/contact';
import {
  consumeRateLimit,
  fail,
  getContactEnv,
  getTurnstileSecret,
  hashedRateLimitKey,
  isAllowedOrigin,
  jsonResponse,
  logContactEvent,
  parseContactPayload,
  recordToObject,
  sendContactEmail,
  verifyTurnstile,
  type ContactFailureCode,
} from '../../lib/contact-server';

export const prerender = false;

const JSON_TYPE = 'application/json';
const FORM_TYPE = 'application/x-www-form-urlencoded';
const MULTIPART_TYPE = 'multipart/form-data';

export const POST: APIRoute = async ({ request, locals }) => {
  const requestId = crypto.randomUUID();
  const requestUrl = new URL(request.url);

  const contentType = (request.headers.get('content-type') || '').toLowerCase();
  if (
    !contentType.startsWith(JSON_TYPE) &&
    !contentType.startsWith(FORM_TYPE) &&
    !contentType.startsWith(MULTIPART_TYPE)
  ) {
    logContactEvent({ requestId, outcome: 'rejected', category: 'INVALID_INPUT' });
    return fail(400, 'INVALID_INPUT');
  }

  if (!isAllowedOrigin(request.headers.get('origin'), requestUrl)) {
    logContactEvent({ requestId, outcome: 'rejected', category: 'ORIGIN_DENIED' });
    return fail(403, 'ORIGIN_DENIED');
  }

  const env = getContactEnv(locals);
  const identity = request.headers.get('CF-Connecting-IP')?.trim() || 'local';
  const rateKey = await hashedRateLimitKey(identity);
  const allowed = await consumeRateLimit(env.CONTACT_RATE_LIMITER, rateKey);
  if (!allowed) {
    logContactEvent({ requestId, outcome: 'rate_limited', category: 'RATE_LIMITED' });
    return fail(429, 'RATE_LIMITED', { 'Retry-After': '60' });
  }

  const lengthHeader = request.headers.get('content-length');
  if (lengthHeader) {
    const length = Number(lengthHeader);
    if (Number.isFinite(length) && length > CONTACT_LIMITS.bodyMax) {
      logContactEvent({ requestId, outcome: 'rejected', category: 'PAYLOAD_TOO_LARGE' });
      return fail(413, 'PAYLOAD_TOO_LARGE');
    }
  }

  let raw: Record<string, unknown>;
  try {
    raw = await readBody(request, contentType);
  } catch (error) {
    const code = error instanceof BodyTooLargeError ? 'PAYLOAD_TOO_LARGE' : 'INVALID_INPUT';
    logContactEvent({ requestId, outcome: 'rejected', category: code });
    return fail(code === 'PAYLOAD_TOO_LARGE' ? 413 : 400, code);
  }

  const parsed = parseContactPayload(raw);
  if (!parsed.ok) {
    const status = statusForCode(parsed.code);
    logContactEvent({ requestId, outcome: 'rejected', category: parsed.code });
    return fail(status, parsed.code);
  }

  const secret = getTurnstileSecret(env);
  if (!secret) {
    logContactEvent({ requestId, outcome: 'rejected', category: 'CONFIG_ERROR' });
    return fail(500, 'CONFIG_ERROR');
  }

  const remoteip = request.headers.get('CF-Connecting-IP')?.trim() || undefined;
  const turnstile = await verifyTurnstile({
    token: parsed.fields.turnstileToken,
    secret,
    requestUrl,
    remoteip,
    previewHost: env.TURNSTILE_PREVIEW_HOST,
  });
  if (!turnstile.ok) {
    logContactEvent({ requestId, outcome: 'rejected', category: turnstile.code });
    return fail(403, turnstile.code);
  }

  if (!env.EMAIL) {
    logContactEvent({ requestId, outcome: 'email_failed', category: 'EMAIL_UNAVAILABLE' });
    return fail(500, 'EMAIL_UNAVAILABLE');
  }

  try {
    await sendContactEmail(env.EMAIL, parsed.fields, requestId, new Date().toISOString());
  } catch {
    logContactEvent({ requestId, outcome: 'email_failed', category: 'EMAIL_FAILED' });
    return fail(500, 'EMAIL_FAILED');
  }

  logContactEvent({ requestId, outcome: 'accepted', category: 'SENT' });
  return jsonResponse(200, { ok: true });
};

export const GET: APIRoute = () => methodNotAllowed();
export const PUT: APIRoute = () => methodNotAllowed();
export const PATCH: APIRoute = () => methodNotAllowed();
export const DELETE: APIRoute = () => methodNotAllowed();
export const OPTIONS: APIRoute = () => methodNotAllowed();
export const HEAD: APIRoute = () => methodNotAllowed();

function methodNotAllowed(): Response {
  return fail(405, 'METHOD_NOT_ALLOWED');
}

function statusForCode(code: ContactFailureCode): number {
  if (code === 'SPAM') return 403;
  if (code === 'TURNSTILE_FAILED' || code === 'TURNSTILE_EXPIRED') return 403;
  if (code === 'PAYLOAD_TOO_LARGE') return 413;
  return 400;
}

class BodyTooLargeError extends Error {}

async function readBody(request: Request, contentType: string): Promise<Record<string, unknown>> {
  if (contentType.startsWith(JSON_TYPE)) {
    const text = await request.text();
    if (text.length > CONTACT_LIMITS.bodyMax) throw new BodyTooLargeError();
    const parsed = JSON.parse(text) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('invalid json');
    }
    return parsed as Record<string, unknown>;
  }

  if (contentType.startsWith(FORM_TYPE)) {
    const text = await request.text();
    if (text.length > CONTACT_LIMITS.bodyMax) throw new BodyTooLargeError();
    return recordToObject(new URLSearchParams(text));
  }

  const form = await request.formData();
  return recordToObject(form);
}
