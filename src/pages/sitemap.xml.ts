import type { APIRoute } from 'astro';
import { getAllSeoPaths } from '../data/seoPages';
import { getPublishedPosts, isNonIndexableContentSlug } from '../lib/blog';
import { getAllCaseStudies } from '../lib/sanity/caseStudies';
import { isPublicCaseStudy } from '../lib/case-study-visibility';
import { applyCmsCacheHeaders } from '../lib/cms-cache';
import { isIndexablePath, toCanonicalPath, toCanonicalUrl } from '../lib/seo-url';

export const prerender = false;

function toLastmod(iso?: string): string {
  if (!iso) return '';
  const day = iso.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? `\n    <lastmod>${day}</lastmod>` : '';
}

export const GET: APIRoute = async () => {
  const staticPaths = getAllSeoPaths().filter((path) => !path.startsWith('/blog/') || path === '/blog');
  const published = await getPublishedPosts();
  const cmsPaths = published
    .filter((post) => !post.noindex && !isNonIndexableContentSlug(post.slug))
    .map((post) => `/blog/${post.slug}`);
  const lastmodByPath = new Map<string, string>();
  for (const post of published) {
    if (post.noindex || isNonIndexableContentSlug(post.slug)) continue;
    const path = toCanonicalPath(`/blog/${post.slug}`);
    lastmodByPath.set(path, post.updatedAt || post.dateIso);
  }
  const caseStudyPaths = (await getAllCaseStudies())
    .filter((study) => isPublicCaseStudy(study))
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
    <loc>${toCanonicalUrl(path)}</loc>${toLastmod(lastmodByPath.get(path))}
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
