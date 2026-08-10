import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    const env = locals.runtime.env;
    const bucket = env.BLOG_IMAGES;
    if (!bucket) {
        return new Response(JSON.stringify({ error: 'Image storage is not configured' }), { status: 503 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
        return new Response(JSON.stringify({ error: 'File is required' }), { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
        return new Response(JSON.stringify({ error: 'Only image uploads are allowed' }), { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
        return new Response(JSON.stringify({ error: 'Image must be 5MB or smaller' }), { status: 400 });
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const key = `blog/${crypto.randomUUID()}.${extension}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    await bucket.put(key, bytes, {
        httpMetadata: {
            contentType: file.type,
        },
    });

    return new Response(JSON.stringify({ url: `/api/blog-images/${key}` }), {
        headers: { 'Content-Type': 'application/json' },
    });
};
