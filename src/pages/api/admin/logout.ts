import type { APIRoute } from 'astro';
import { clearSessionCookie, isSecureRequest } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const cookie = clearSessionCookie(isSecureRequest(request));
    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookie,
        },
    });
};
