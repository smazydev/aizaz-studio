/**
 * Cloudflare Workers Cache headers for anonymous CMS HTML.
 *
 * Requires wrangler `cache.enabled: true`. Without that flag, Cache-Control alone
 * does NOT skip Worker execution on Cloudflare Workers.
 *
 * Prefer max-age (not s-maxage) so stale-while-revalidate works at the edge.
 * CDN-Cache-Control sets a longer edge TTL than browsers see.
 */

export const CMS_BROWSER_CACHE_CONTROL = 'public, max-age=60, stale-while-revalidate=86400';
export const CMS_EDGE_CACHE_CONTROL = 'public, max-age=3600, stale-while-revalidate=86400';

export function applyCmsCacheHeaders(headers: Headers, tags: string[]): void {
  headers.set('Cache-Control', CMS_BROWSER_CACHE_CONTROL);
  headers.set('CDN-Cache-Control', CMS_EDGE_CACHE_CONTROL);
  headers.set('Cache-Tag', tags.join(','));
}
