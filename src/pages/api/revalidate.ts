import type { APIRoute } from 'astro';
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
        paths.add(`/blog/${slugValue}`);
    }
    if (slugValue && body._type === 'caseStudy') {
        paths.add(`/case-studies/${slugValue}`);
    }

    return Array.from(paths);
}

function tagsFromSanityPayload(body: RevalidateBody): string[] {
    const tags = new Set<string>(['cms', 'blog', 'case-studies', 'sitemap']);
    const slugValue = typeof body.slug === 'string' ? body.slug : body.slug?.current;
    if (slugValue && body._type === 'post') tags.add(`blog:${slugValue}`);
    if (slugValue && body._type === 'caseStudy') tags.add(`case-study:${slugValue}`);
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

/**
 * Optional zone CDN purge for Assets (static HTML/_astro). Not a substitute for Workers Cache.
 * Kept for environments that already configure ZONE_ID + API_TOKEN.
 */
async function purgeZoneCache(paths: string[], locals: RuntimeLocals): Promise<{ purged: boolean; detail?: string }> {
    const runtimeEnv = locals.runtime?.env;
    const zoneId =
        runtimeEnv?.CLOUDFLARE_ZONE_ID ||
        import.meta.env.CLOUDFLARE_ZONE_ID ||
        (typeof process !== 'undefined' ? process.env.CLOUDFLARE_ZONE_ID : undefined);
    const apiToken =
        runtimeEnv?.CLOUDFLARE_API_TOKEN ||
        import.meta.env.CLOUDFLARE_API_TOKEN ||
        (typeof process !== 'undefined' ? process.env.CLOUDFLARE_API_TOKEN : undefined);

    if (!zoneId || !apiToken) {
        return { purged: false, detail: 'Zone purge skipped (ZONE_ID/API_TOKEN not set).' };
    }

    const files = paths.map((path) => `https://aizaz.studio${path === '/' ? '' : path}`);

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files }),
    });

    if (!response.ok) {
        const text = await response.text();
        return { purged: false, detail: `Zone purge failed: ${response.status} ${text}` };
    }

    return { purged: true, detail: `Zone purged ${files.length} URL(s).` };
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
    const workers = await purgeWorkersCache(tags);
    const zone = await purgeZoneCache(paths, locals);

    return new Response(
        JSON.stringify({
            ok: true,
            revalidatedAt: new Date().toISOString(),
            paths,
            tags,
            workersCache: workers,
            zoneCache: zone,
            note: 'Cleared isolate Sanity map; purged Workers Cache (primary). TTL/SWR still applies if purge fails.',
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
