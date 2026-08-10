import type { APIRoute } from 'astro';
import {
    clearSessionCookie,
    createSessionCookie,
    isSecureRequest,
    verifyPassword,
} from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    const env = locals.runtime.env;
    if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
        return new Response(JSON.stringify({ error: 'Admin auth is not configured' }), { status: 503 });
    }

    const body = (await request.json()) as { password?: string };
    if (!verifyPassword(body.password ?? '', env.ADMIN_PASSWORD)) {
        return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
    }

    const cookie = await createSessionCookie(env.SESSION_SECRET, isSecureRequest(request));
    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookie,
        },
    });
};

export const DELETE: APIRoute = async ({ request }) => {
    const cookie = clearSessionCookie(isSecureRequest(request));
    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookie,
        },
    });
};
