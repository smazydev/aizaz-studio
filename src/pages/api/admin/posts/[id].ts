import type { APIRoute } from 'astro';
import { deletePost, getPostById, slugExists, updatePost } from '../../../../lib/blog-db';
import { parseBlogPayload } from '../../../../lib/blog-validation';

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
    const db = locals.runtime.env.DB;
    const post = await getPostById(db, params.id!);
    if (!post) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    return new Response(JSON.stringify({ post }), {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const PUT: APIRoute = async ({ params, request, locals }) => {
    const db = locals.runtime.env.DB;
    const existing = await getPostById(db, params.id!);
    if (!existing) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });

    const payload = (await request.json()) as Record<string, unknown>;
    const input = parseBlogPayload(payload as never);

    if (await slugExists(db, input.slug, params.id)) {
        return new Response(JSON.stringify({ error: 'Slug already exists' }), { status: 409 });
    }

    if (payload.publish_mode === 'unpublish') {
        input.status = 'draft';
        input.published_at = null;
        input.scheduled_at = null;
    } else if (payload.publish_mode === 'publish' && existing.status !== 'published') {
        input.published_at = new Date().toISOString();
        input.scheduled_at = null;
        input.status = 'published';
    } else if (payload.publish_mode === 'schedule') {
        input.status = 'scheduled';
        input.published_at = null;
    } else if (existing.status === 'published' && payload.publish_mode === 'draft') {
        input.status = 'published';
        input.published_at = existing.published_at;
    }

    const post = await updatePost(db, params.id!, input);
    return new Response(JSON.stringify({ post }), {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
    const db = locals.runtime.env.DB;
    const existing = await getPostById(db, params.id!);
    if (!existing) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    await deletePost(db, params.id!);
    return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' },
    });
};
