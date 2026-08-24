import type { APIRoute } from 'astro';
import { notifyIndexNow } from '../../lib/indexnow';
import { isNonIndexableContentSlug, normalizeBlogSlug } from '../../lib/blog-utils';
import { clearSanityFetchCache } from '../../lib/sanity/client';

export const prerender = false;

type RuntimeLocals = {
    runtime?: {
        env?: Record<string, string | undefined>;
    };
};

type RevalidateBody = {
    _type?: string;
    slug?: { current?: string } | string;
    paths?: string[];
};

function getSecret(locals: RuntimeLocals): string | undefined {
    const runtimeEnv = locals.runtime?.env;
    return (
        runtimeEnv?.REVALIDATE_SECRET ||
        import.meta.env.REVALIDATE_SECRET ||
        (typeof process !== 'undefined' ? process.env.REVALIDATE_SECRET : undefined)
    );
}

function timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let mismatch = 0;
    for (let i = 0; i < a.length; i += 1) {
        mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return mismatch === 0;
}

function extractBearer(header: string | null): string | null {
    if (!header) return null;
    const match = header.match(/^Bearer\s+(.+)$/i);
    return match?.[1]?.trim() || null;
}

function pathsFromSanityPayload(body: RevalidateBody): string[] {
    const paths = new Set<string>(['/blog', '/case-studies', '/sitemap.xml']);

    if (Array.isArray(body.paths)) {
        for (const path of body.paths) {
            if (typeof path === 'string' && path.startsWith('/')) paths.add(path);
        }
    }

    const slugValue = typeof body.slug === 'string' ? body.slug : body.slug?.current;
    if (slugValue && body._type === 'post') {
        const cleanSlug = normalizeBlogSlug(slugValue);
        if (cleanSlug && !isNonIndexableContentSlug(cleanSlug)) {
            paths.add(`/blog/${cleanSlug}`);
        }
    }
    if (slugValue && body._type === 'caseStudy') {
        paths.add(`/case-studies/${slugValue}`);
    }

    return Array.from(paths);
}

function tagsFromSanityPayload(body: RevalidateBody): string[] {
    const tags = new Set<string>();
    const slugValue = typeof body.slug === 'string' ? body.slug : body.slug?.current;
    if (slugValue && body._type === 'post') {
        const cleanSlug = normalizeBlogSlug(slugValue);
        if (cleanSlug) tags.add(`blog:${cleanSlug}`);
    }
    if (slugValue && body._type === 'caseStudy') tags.add(`case-study:${slugValue}`);
    // List/index pages refresh via short browser TTL + SWR — avoid purging all CMS HTML.
    tags.add('sitemap');
    return Array.from(tags);
}

/** Purge Workers Cache (the layer that actually skips Worker execution). */
async function purgeWorkersCache(tags: string[]): Promise<{ purged: boolean; detail?: string }> {
    try {
        // Cloudflare Workers Cache API — available at runtime on Workers.
        const { cache } = await import('cloudflare:workers');
        await cache.purge({ tags });
        return { purged: true, detail: `Workers Cache purged tags=[${tags.join(',')}]` };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { purged: false, detail: `Workers Cache purge unavailable: ${message}` };
    }
}

export const POST: APIRoute = async ({ request, locals }) => {
    const secret = getSecret(locals);
    if (!secret) {
        return new Response(JSON.stringify({ ok: false, error: 'REVALIDATE_SECRET is not configured' }), {
            status: 503,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
        });
    }

    const provided =
        extractBearer(request.headers.get('authorization')) ||
        request.headers.get('x-revalidate-secret') ||
        new URL(request.url).searchParams.get('secret');

    if (!provided || !timingSafeEqual(provided, secret)) {
        return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
        });
    }

    let body: RevalidateBody = {};
    try {
        const contentType = request.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            body = (await request.json()) as RevalidateBody;
        }
    } catch {
        body = {};
    }

    const paths = pathsFromSanityPayload(body);
    const tags = tagsFromSanityPayload(body);
    clearSanityFetchCache();
    const workers = tags.length ? await purgeWorkersCache(tags) : { purged: false, detail: 'No cache tags to purge' };
    const zone = { purged: false, detail: 'Zone purge skipped (prefer edge TTL + SWR for static HTML).' };
    const indexNow = await notifyIndexNow(paths, locals.runtime?.env);

    return new Response(
        JSON.stringify({
            ok: true,
            revalidatedAt: new Date().toISOString(),
            paths,
            tags,
            workersCache: workers,
            zoneCache: zone,
            indexNow,
            note: 'Cleared isolate Sanity map; targeted Workers Cache purge only. Lists rely on SWR.',
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
        },
    );
};

export const GET: APIRoute = async () =>
    new Response(JSON.stringify({ ok: true, message: 'Use POST with Authorization: Bearer <REVALIDATE_SECRET>' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
    });
