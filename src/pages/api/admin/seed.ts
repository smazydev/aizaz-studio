import type { APIRoute } from 'astro';
import { seedLegacyBlogsIfEmpty } from '../../../lib/seed-legacy-blogs';

export const prerender = false;

export const POST: APIRoute = async ({ locals }) => {
    const db = locals.runtime.env.DB;
    const seeded = await seedLegacyBlogsIfEmpty(db);
    return new Response(JSON.stringify({ ok: true, seeded }), {
        headers: { 'Content-Type': 'application/json' },
    });
};
