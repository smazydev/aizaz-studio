/** Social profile URLs — update instagram and twitter when ready */
export const SOCIAL_LINKS = {
    linkedin: 'https://www.linkedin.com/company/aizaz-studio/',
    instagram: '#',
    twitter: '#',
} as const;

/** Ali-owned Google Calendar discovery booking page. */
export const BOOKING_URL = 'https://calendar.app.google/uZsVAwsXCfaSjvDQ6';

/** Embeddable appointments view of the same Ali calendar. */
export const BOOKING_EMBED_URL =
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0aD-z4dTW_9l9zH8tqWBnw4Nonuvi726GG8Gv5__CpWjiVOI4TS01ooqDBshB6885vxrIzrHXA?gv=true';

export function isExternalHref(href: string): boolean {
    return href.startsWith('http://') || href.startsWith('https://');
}
