export const CONTACT_INTERESTS = [
  'AI Systems Sprint',
  'Product / SaaS build',
  'ERP / NetSuite integration',
  'Cloud / AWS',
  'Technical audit',
] as const;

export type ContactInterest = (typeof CONTACT_INTERESTS)[number];

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 4000,
  attributionMax: 512,
  tokenMax: 2048,
  bodyMax: 32_768,
} as const;

export const TURNSTILE_ACTION = 'contact_form';

/** Public site key for the existing production widget. Safe to expose in HTML. */
export const TURNSTILE_SITE_KEY = '0x4AAAAAAEl7iKzr2THxrAxj';

export const CONTACT_SUCCESS_STORAGE_KEY = 'aizaz.contact.success';
export const CONTACT_ATTRIBUTION_STORAGE_KEY = 'aizaz.contact.attribution';

export const CONTACT_API_PATH = '/api/contact';
export const CONTACT_THANK_YOU_PATH = '/thank-you';

/** Official Cloudflare dummy keys — local/dev only. https://developers.cloudflare.com/turnstile/troubleshooting/testing/ */
export const TURNSTILE_DUMMY_SITE_KEY_PASS = '1x00000000000000000000AA';
export const TURNSTILE_DUMMY_SECRET_PASS = '1x0000000000000000000000000000000AA';
export const TURNSTILE_DUMMY_SECRETS = new Set([
  '1x0000000000000000000000000000000AA',
  '2x0000000000000000000000000000000AA',
  '3x0000000000000000000000000000000AA',
]);
