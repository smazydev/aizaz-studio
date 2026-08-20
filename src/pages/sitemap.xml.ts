import type { APIRoute } from 'astro';
import { getAllSeoPaths, SITE_URL } from '../data/seoPages';
import { getPublishedPosts, isNonIndexableContentSlug } from '../lib/blog';
import { getAllCaseStudies } from '../lib/sanity/caseStudies';
import { applyCmsCacheHeaders } from '../lib/cms-cache';

export const prerender = false;

/** Match sitewide trailingSlash: never — sitemap locs must be final 200 URLs. */
function toCanonicalPath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === '/') return '/';
  const normalized = trimmed.replace(/\.html$/i, '').replace(/\/+$/, '');
  return normalized.startsWith('/') ? normalized || '/' : `/${normalized}`;
}

function isIndexablePath(path: string): boolean {
  if (path.includes('?') || path.includes('/_image') || path.includes('/optimized/')) return false;
  if (path.startsWith('/api/')) return false;
  const slug = path.split('/').pop() ?? '';
  if (isNonIndexableContentSlug(slug)) return false;
  return true;
}

export const GET: APIRoute = async () => {
  const staticPaths = getAllSeoPaths().filter((path) => !path.startsWith('/blog/') || path === '/blog');
  const published = await getPublishedPosts();
  const cmsPaths = published
    .filter((post) => !post.noindex)
    .map((post) => `/blog/${post.slug}`);
  const caseStudyPaths = (await getAllCaseStudies())
    .filter((study) => !study.noindex)
    .map((study) => `/case-studies/${study.slug}`);

  const paths = Array.from(
    new Set(
      [...staticPaths, '/blog', ...cmsPaths, ...caseStudyPaths]
        .map(toCanonicalPath)
        .filter((path) => Boolean(path) && isIndexablePath(path)),
    ),
  );

  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>
    <changefreq>${path === '/' ? 'weekly' : path.startsWith('/blog') || path.startsWith('/case-studies') ? 'daily' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path.startsWith('/services') || path === '/ai-systems-sprint' ? '0.9' : path.startsWith('/blog/') ? '0.8' : '0.7'}</priority>
  </url>`,
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const headers = new Headers({
    'Content-Type': 'application/xml; charset=utf-8',
  });
  applyCmsCacheHeaders(headers, ['cms', 'sitemap']);

  return new Response(sitemap, { headers });
};
