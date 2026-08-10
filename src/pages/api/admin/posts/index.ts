import type { APIRoute } from 'astro';
import { createPost, listPosts, slugExists } from '../../../../lib/blog-db';
import { parseBlogPayload } from '../../../../lib/blog-validation';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
    const db = locals.runtime.env.DB;
    const posts = await listPosts(db);
    return new Response(JSON.stringify({ posts }), {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const POST: APIRoute = async ({ request, locals }) => {
    const db = locals.runtime.env.DB;
    const payload = (await request.json()) as Record<string, unknown>;
    const input = parseBlogPayload(payload as never);

    if (await slugExists(db, input.slug)) {
        return new Response(JSON.stringify({ error: 'Slug already exists' }), { status: 409 });
    }

    const post = await createPost(db, input);
    return new Response(JSON.stringify({ post }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
};
