import {
  CONTACT_API_PATH,
  CONTACT_ATTRIBUTION_STORAGE_KEY,
  CONTACT_SUCCESS_STORAGE_KEY,
  CONTACT_THANK_YOU_PATH,
  TURNSTILE_ACTION,
} from '../data/contact';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action?: string;
      theme?: 'light' | 'dark' | 'auto';
      appearance?: 'always' | 'execute' | 'interaction-only';
      callback?: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    gtag?: (...args: unknown[]) => void;
  }
}

const ATTR_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
] as const;

type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  landing_url: string;
  referring_page: string;
};

export function bindContactForms(): void {
  const forms = document.querySelectorAll<HTMLFormElement>('[data-contact-form]');
  forms.forEach((form) => {
    void bindOne(form);
  });
}

async function bindOne(form: HTMLFormElement): Promise<void> {
  if (form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';

  const submit = form.querySelector<HTMLButtonElement>('[data-contact-submit]');
  const status = form.querySelector<HTMLElement>('[data-contact-status]');
  const widgetHost = form.querySelector<HTMLElement>('[data-turnstile]');
  const siteKey = form.dataset.turnstileSitekey || '';
  const idleLabel = submit?.textContent?.trim() || 'Submit message';

  fillAttribution(form);
  let widgetId: string | null = null;
  let inFlight = false;

  if (widgetHost && siteKey) {
    try {
      await loadTurnstile();
      if (window.turnstile) {
        widgetId = window.turnstile.render(widgetHost, {
          sitekey: siteKey,
          action: TURNSTILE_ACTION,
          theme: 'dark',
          appearance: 'always',
          callback: (token) => {
            const input = form.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]');
            if (input) input.value = token;
          },
          'expired-callback': () => {
            const input = form.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]');
            if (input) input.value = '';
            setStatus(status, 'Verification expired. Please complete the check again.', 'error');
          },
          'error-callback': () => {
            setStatus(status, 'Verification failed to load. Please refresh and try again.', 'error');
          },
        });
      }
    } catch {
      setStatus(status, 'Verification failed to load. Please refresh and try again.', 'error');
    }
  } else if (!siteKey) {
    setStatus(status, 'This form is temporarily unavailable.', 'error');
    if (submit) submit.disabled = true;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (inFlight) return;

    fillAttribution(form);
    const token = readTurnstileToken(form, widgetId);
    if (!token) {
      setStatus(status, 'Please complete the verification check.', 'error');
      resetTurnstile(widgetId);
      return;
    }

    inFlight = true;
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Sending…';
    }
    setStatus(status, '', 'idle');

    try {
      const payload = formToPayload(form, token);
      const response = await fetch(CONTACT_API_PATH, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await readJson(response);
      if (response.ok && data && data.ok === true) {
        sessionStorage.setItem(CONTACT_SUCCESS_STORAGE_KEY, '1');
        window.location.assign(CONTACT_THANK_YOU_PATH);
        return;
      }

      const message =
        data && data.ok === false && data.message
          ? data.message
          : 'We could not send your message. Please try again.';
      setStatus(status, message, 'error');
      if (needsTurnstileReset(response.status, data)) resetTurnstile(widgetId);
    } catch {
      setStatus(status, 'We could not send your message. Please try again.', 'error');
      resetTurnstile(widgetId);
    } finally {
      inFlight = false;
      if (submit) {
        submit.disabled = false;
        submit.textContent = idleLabel;
      }
    }
  });
}

function formToPayload(form: HTMLFormElement, token: string): Record<string, string> {
  const data = new FormData(form);
  const payload: Record<string, string> = {};
  data.forEach((value, key) => {
    if (typeof value === 'string' && payload[key] === undefined) payload[key] = value;
  });
  payload['cf-turnstile-response'] = token;
  return payload;
}

function readTurnstileToken(form: HTMLFormElement, widgetId: string | null): string {
  const input = form.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]');
  const fromInput = input?.value?.trim() || '';
  if (fromInput) return fromInput;
  if (widgetId && window.turnstile) {
    try {
      return window.turnstile.getResponse(widgetId) || '';
    } catch {
      return '';
    }
  }
  return '';
}

function resetTurnstile(widgetId: string | null): void {
  if (!widgetId || !window.turnstile) return;
  try {
    window.turnstile.reset(widgetId);
  } catch {
    /* widget may already be gone */
  }
}

function needsTurnstileReset(
  status: number,
  data: { ok?: boolean; code?: string } | null,
): boolean {
  if (!data || data.ok !== false) return status >= 400;
  return (
    data.code === 'TURNSTILE_FAILED' ||
    data.code === 'TURNSTILE_EXPIRED' ||
    data.code === 'RATE_LIMITED' ||
    data.code === 'SPAM' ||
    status >= 400
  );
}

function fillAttribution(form: HTMLFormElement): void {
  const attr = captureAttribution();
  for (const key of [...ATTR_KEYS, 'landing_url', 'referring_page'] as const) {
    const input = form.querySelector<HTMLInputElement>(`[name="${key}"]`);
    if (input) input.value = attr[key];
  }
}

function captureAttribution(): Attribution {
  const empty: Attribution = {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    gclid: '',
    landing_url: '',
    referring_page: '',
  };

  try {
    const stored = sessionStorage.getItem(CONTACT_ATTRIBUTION_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Attribution;
      return {
        ...empty,
        ...parsed,
        referring_page: parsed.referring_page || document.referrer.slice(0, 512),
      };
    }

    const params = new URLSearchParams(window.location.search);
    const next: Attribution = {
      utm_source: params.get('utm_source')?.slice(0, 512) || '',
      utm_medium: params.get('utm_medium')?.slice(0, 512) || '',
      utm_campaign: params.get('utm_campaign')?.slice(0, 512) || '',
      utm_term: params.get('utm_term')?.slice(0, 512) || '',
      utm_content: params.get('utm_content')?.slice(0, 512) || '',
      gclid: params.get('gclid')?.slice(0, 512) || '',
      landing_url: window.location.href.slice(0, 512),
      referring_page: document.referrer.slice(0, 512),
    };
    sessionStorage.setItem(CONTACT_ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return {
      ...empty,
      landing_url: window.location.href.slice(0, 512),
      referring_page: document.referrer.slice(0, 512),
    };
  }
}

function setStatus(el: HTMLElement | null, message: string, tone: 'idle' | 'error'): void {
  if (!el) return;
  el.textContent = message;
  el.dataset.tone = tone;
  el.hidden = !message;
}

async function readJson(response: Response): Promise<{ ok?: boolean; code?: string; message?: string } | null> {
  try {
    return (await response.json()) as { ok?: boolean; code?: string; message?: string };
  } catch {
    return null;
  }
}

let turnstileLoader: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (turnstileLoader) return turnstileLoader;
  turnstileLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-aizaz-turnstile]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('turnstile')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.dataset.aizazTurnstile = 'true';
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('turnstile')), { once: true });
    document.head.appendChild(script);
  });
  return turnstileLoader;
}
