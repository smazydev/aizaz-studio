import { CONTACT_SUCCESS_STORAGE_KEY } from '../data/contact';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire Google Ads conversion once after a verified contact submission. Safe if gtag or send_to is missing. */
export function maybeFireContactConversion(sendTo: string | undefined): void {
  const target = typeof sendTo === 'string' ? sendTo.trim() : '';
  let shouldConvert = false;
  try {
    shouldConvert = sessionStorage.getItem(CONTACT_SUCCESS_STORAGE_KEY) === '1';
    if (shouldConvert) sessionStorage.removeItem(CONTACT_SUCCESS_STORAGE_KEY);
  } catch {
    shouldConvert = false;
  }

  if (!shouldConvert || !target) return;
  if (typeof window.gtag !== 'function') return;

  try {
    window.gtag('event', 'conversion', { send_to: target });
  } catch {
    /* analytics must never block thank-you */
  }
}
