import type { APIRoute } from 'astro';

export const prerender = false;

type RuntimeLocals = {
    runtime?: {
        env?: Record<string, string | undefined>;
    };
};

function getIndexNowKey(locals: RuntimeLocals): string | undefined {
    const runtimeEnv = locals.runtime?.env;
    return (
        runtimeEnv?.INDEXNOW_KEY ||
        import.meta.env.INDEXNOW_KEY ||
        (typeof process !== 'undefined' ? process.env.INDEXNOW_KEY : undefined)
    );
}

/** Serves `https://aizaz.studio/{INDEXNOW_KEY}.txt` for Bing IndexNow verification. */
export const GET: APIRoute = ({ params, locals }) => {
    const key = getIndexNowKey(locals);
    if (!key || params.indexNowKey !== key) {
        return new Response('Not Found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
    }

    return new Response(`${key}\n`, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
        },
    });
};
