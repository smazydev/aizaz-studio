import { defineMiddleware } from 'astro:middleware';
import { resolveMalformedBlogSlug } from './lib/blog-utils';

const CANONICAL_ORIGIN = 'https://aizaz.studio';
const CANONICAL_HOST = 'aizaz.studio';

/**
 * Canonical host/protocol redirects for SSR/API requests that reach the Worker.
 * Apex/www normalization should also be configured at Cloudflare zone level for static Assets.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  // Prerender has no real client Host/proto — skip redirects and avoid request.headers.
  if (context.isPrerendered) {
    return next();
  }

  const request = context.request;
  const url = new URL(request.url);

  const blogMatch = url.pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    const resolved = resolveMalformedBlogSlug(blogMatch[1]);
    if (resolved && resolved !== blogMatch[1]) {
      const target = new URL(`/blog/${resolved}${url.search}`, CANONICAL_ORIGIN);
      return new Response(null, {
        status: 301,
        headers: {
          Location: target.toString(),
          'Cache-Control': 'no-store',
        },
      });
    }
  }
  const hostHeader = request.headers.get('host')?.split(':')[0]?.toLowerCase();
  const host = (hostHeader || url.hostname).toLowerCase();
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim().toLowerCase();
  const proto = forwardedProto || url.protocol.replace(':', '');

  // Leave local/dev and workers.dev alone.
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
  const isWorkersDev = host.endsWith('.workers.dev');
  if (isLocal || isWorkersDev) {
    return next();
  }

  const isCanonicalHost = host === CANONICAL_HOST;
  const isHttps = proto === 'https';

  // Never 301 when already on apex HTTPS (avoids self-redirect cache loops).
  if (!isCanonicalHost || !isHttps) {
    const target = new URL(`${url.pathname}${url.search}`, CANONICAL_ORIGIN);
    return new Response(null, {
      status: 301,
      headers: {
        Location: target.toString(),
        // Host redirects must not be cached under a host-agnostic key.
        'Cache-Control': 'no-store',
      },
    });
  }

  return next();
});
