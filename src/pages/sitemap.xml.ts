import type { APIRoute } from 'astro';
import { getAllSeoPaths, SITE_URL } from '../data/seoPages';

export const GET: APIRoute = () => {
  const paths = getAllSeoPaths();
  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path.startsWith('/services') || path === '/ai-systems-sprint' ? '0.9' : '0.7'}</priority>
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
