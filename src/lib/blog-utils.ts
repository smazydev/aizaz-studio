/** Retired legacy blog slugs → canonical replacement (301). */
export const LEGACY_BLOG_REDIRECTS: Record<string, string> = {
    'netsuite-integration-mistakes-growing-operations': 'netsuite-shopify-integration-pitfalls',
};

/** Known malformed Sanity slugs → clean slug (301 targets). User fixes source in Studio separately. */
export const KNOWN_MALFORMED_BLOG_SLUG_REDIRECTS: Record<string, string> = {
    'Slug:%20automate-manual-business-workflow-with-ai': 'automate-manual-business-workflow-with-ai',
    'Slug: automate-manual-business-workflow-with-ai': 'automate-manual-business-workflow-with-ai',
    'Slug:automate-manual-business-workflow-with-ai': 'automate-manual-business-workflow-with-ai',
};

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

/** Strip accidental label prefixes and path noise from slug values. */
export function normalizeBlogSlug(raw: string): string {
    let slug = decodeURIComponent(raw).trim();
    slug = slug.replace(/^Slug:\s*/i, '');
    slug = slug.replace(/^\/blog\//i, '').replace(/^\/+/, '');
    return slug.trim();
}

/** Slugs that must never be indexed, listed, or internally linked. */
export function isMalformedBlogSlug(slug: string): boolean {
    const decoded = decodeURIComponent(slug).trim();
    if (!decoded) return true;
    if (/^Slug:/i.test(decoded)) return true;
    if (/\s/.test(decoded)) return true;
    if (decoded.includes('/blog/') || decoded.startsWith('/')) return true;
    if (/[A-Z%]/.test(decoded) && /Slug/i.test(decoded)) return true;
    return false;
}

/** Debug / CMS smoke-test slugs — keep reachable, never index or internally link. */
export function isNonIndexableContentSlug(slug: string): boolean {
    return (
        isMalformedBlogSlug(slug) ||
        /sanity-test/i.test(slug) ||
        /^test-/i.test(slug) ||
        /-test$/i.test(slug) ||
        /^demo-/i.test(slug)
    );
}

/** Resolve a malformed blog path segment to a canonical slug when safe. */
export function resolveMalformedBlogSlug(rawSlug: string): string | null {
    const trimmed = rawSlug.trim();
    if (KNOWN_MALFORMED_BLOG_SLUG_REDIRECTS[trimmed]) {
        return KNOWN_MALFORMED_BLOG_SLUG_REDIRECTS[trimmed];
    }
    const decoded = decodeURIComponent(trimmed);
    if (KNOWN_MALFORMED_BLOG_SLUG_REDIRECTS[decoded]) {
        return KNOWN_MALFORMED_BLOG_SLUG_REDIRECTS[decoded];
    }
    const normalized = normalizeBlogSlug(trimmed);
    if (normalized && normalized !== trimmed && !isMalformedBlogSlug(normalized)) {
        return normalized;
    }
    return null;
}

export function resolveLegacyBlogRedirect(slug: string): string | null {
    return LEGACY_BLOG_REDIRECTS[slug] ?? null;
}
