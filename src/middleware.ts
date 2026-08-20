import { defineMiddleware } from 'astro:middleware';

const CANONICAL_ORIGIN = 'https://aizaz.studio';
const CANONICAL_HOST = 'aizaz.studio';

/**
 * Canonical host/protocol redirects for requests that reach the Worker (SSR/API).
 * Prerendered Assets are served asset-first and bypass this middleware — configure
 * zone Always Use HTTPS + www→apex Redirect Rules for those paths.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  // Prerender has no real client Host/proto — skip redirects and avoid request.headers.
  if (context.isPrerendered) {
    return next();
  }

  const request = context.request;
  const url = new URL(request.url);
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

  const isWww = host === `www.${CANONICAL_HOST}`;
  const isApex = host === CANONICAL_HOST;
  const shouldFixHost = isWww;
  const shouldFixProto = proto === 'http' && (isApex || isWww);

  if (shouldFixHost || shouldFixProto) {
    const target = new URL(`${url.pathname}${url.search}`, CANONICAL_ORIGIN);
    return context.redirect(target.toString(), 301);
  }

  return next();
});
