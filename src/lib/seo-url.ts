import { SITE_URL } from '../data/seoPages';
import { isNonIndexableContentSlug } from './blog-utils';

/** Zero-width and soft-hyphen characters that break canonical URLs and titles. */
export function stripInvisibleSeoChars(value: string): string {
    return value.replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '');
}

/**
 * Final public pathname: no trailing slash except `/`, no `.html`,
 * no invisible characters. Absolute URLs are reduced to their path.
 */
export function toCanonicalPath(path: string): string {
    const withoutInvisible = stripInvisibleSeoChars(path).trim();
    const withoutHost = withoutInvisible.replace(/^https?:\/\/[^/]+/i, '');
    const trimmed = withoutHost.trim();
    if (!trimmed || trimmed === '/') return '/';
    const normalized = trimmed.replace(/\.html$/i, '').replace(/\/+$/, '');
    const withSlash = normalized.startsWith('/') ? normalized : `/${normalized}`;
    return withSlash || '/';
}

export function toCanonicalUrl(path: string, siteUrl = SITE_URL): string {
    const canonicalPath = toCanonicalPath(path);
    return canonicalPath === '/' ? `${siteUrl}/` : `${siteUrl}${canonicalPath}`;
}

export function isIndexablePath(path: string): boolean {
    const canonicalPath = toCanonicalPath(path);
    if (canonicalPath.includes('?') || canonicalPath.includes('/_image') || canonicalPath.includes('/optimized/')) {
        return false;
    }
    if (canonicalPath.startsWith('/api/')) return false;
    if (canonicalPath === '/thank-you' || canonicalPath === '/book-a-call' || canonicalPath === '/start-a-project') {
        return false;
    }
    if (canonicalPath === '/') return true;
    const slug = canonicalPath.split('/').filter(Boolean).pop() ?? '';
    if (isNonIndexableContentSlug(slug)) return false;
    return true;
}
