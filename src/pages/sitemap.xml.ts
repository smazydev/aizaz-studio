import type { APIRoute } from 'astro';
import { getAllSeoPaths, SITE_URL } from '../data/seoPages';
import { listPublishedPosts } from '../lib/blog-db';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const staticPaths = getAllSeoPaths().filter((path) => !path.startsWith('/blog/') || path === '/blog');
  const db = locals.runtime?.env?.DB;
  const cmsPaths = db ? (await listPublishedPosts(db)).map((post) => `/blog/${post.slug}`) : [];
  const paths = Array.from(new Set([...staticPaths, '/blog', ...cmsPaths]));

  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path.startsWith('/services') || path === '/ai-systems-sprint' ? '0.9' : path.startsWith('/blog/') ? '0.8' : '0.7'}</priority>
  </url>`,
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
