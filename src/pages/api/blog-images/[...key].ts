import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
    const bucket = locals.runtime.env.BLOG_IMAGES;
    if (!bucket) {
        return new Response('Image storage is not configured', { status: 503 });
    }

    const key = params.key;
    if (!key) return new Response('Not found', { status: 404 });

    const object = await bucket.get(key);
    if (!object) return new Response('Not found', { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new Response(object.body, { headers });
};
