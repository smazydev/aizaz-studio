import type { APIRoute } from 'astro';
import { publishDueScheduledPosts } from '../../../lib/blog-db';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
    const env = locals.runtime.env;
    const secret = request.headers.get('x-cron-secret');
    if (!env.CRON_SECRET || secret !== env.CRON_SECRET) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const publishedCount = await publishDueScheduledPosts(env.DB);
    return new Response(JSON.stringify({ ok: true, publishedCount }), {
        headers: { 'Content-Type': 'application/json' },
    });
};
