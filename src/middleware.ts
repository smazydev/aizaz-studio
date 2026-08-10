import { defineMiddleware } from 'astro:middleware';
import { isAuthenticated } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;
    const isAdminRoute = pathname.startsWith('/admin');
    const isAdminLogin = pathname === '/admin/login';
    const isAdminApi = pathname.startsWith('/api/admin');
    const isLoginApi = pathname === '/api/admin/login';
    const isPublicApi =
        pathname.startsWith('/api/blog-images') || pathname.startsWith('/api/cron/publish-scheduled');

    if (((isAdminRoute && !isAdminLogin) || (isAdminApi && !isLoginApi)) && !isPublicApi) {
        const secret = context.locals.runtime?.env?.SESSION_SECRET;
        if (!secret) {
            if (isAdminApi) {
                return new Response(JSON.stringify({ error: 'Admin auth is not configured' }), { status: 503 });
            }
            return context.redirect('/admin/login?error=config');
        }

        const authed = await isAuthenticated(context.request, secret);
        if (!authed) {
            if (isAdminApi) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            return context.redirect(`/admin/login?next=${encodeURIComponent(pathname)}`);
        }
    }

    return next();
});
