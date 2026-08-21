export function calculateReadTime(content: string): string {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 220));
    return `${minutes} min read`;
}

export function formatDisplayDate(isoDate: string | null | undefined): string {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** Debug / CMS smoke-test slugs — keep reachable, never index or internally link. */
export function isNonIndexableContentSlug(slug: string): boolean {
    return /sanity-test/i.test(slug) || /^test-/i.test(slug) || /-test$/i.test(slug) || /^demo-/i.test(slug);
}
