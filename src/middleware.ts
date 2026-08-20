import { defineMiddleware } from 'astro:middleware';

const CANONICAL_ORIGIN = 'https://aizaz.studio';
const CANONICAL_HOST = 'aizaz.studio';

/**
 * Single indexable origin: https://aizaz.studio
 * Permanent 301 from www + http. Requires assets.run_worker_first for prerendered HTML.
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
