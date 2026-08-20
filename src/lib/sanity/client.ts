import { createClient, type SanityClient } from '@sanity/client';

export function getSanityProjectId(): string | undefined {
    return import.meta.env.SANITY_PROJECT_ID || (typeof process !== 'undefined' ? process.env.SANITY_PROJECT_ID : undefined) || 'bmcdpga9';
}

export function getSanityDataset(): string {
    return import.meta.env.SANITY_DATASET || (typeof process !== 'undefined' ? process.env.SANITY_DATASET : undefined) || 'production';
}

export function isSanityConfigured(): boolean {
    const projectId = getSanityProjectId();
    return Boolean(projectId && projectId !== 'your-project-id');
}

/**
 * Public reads use the Sanity API CDN for lower upstream latency.
 * Primary HTML caching is Cloudflare Workers Cache (wrangler cache.enabled + CDN-Cache-Control).
 * This Map is only a short in-isolate dedupe — not a global CDN.
 */
let publishedClient: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
    if (!isSanityConfigured()) return null;

    if (!publishedClient) {
        publishedClient = createClient({
            projectId: getSanityProjectId()!,
            dataset: getSanityDataset(),
            apiVersion: '2024-01-01',
            useCdn: true,
            perspective: 'published',
        });
    }

    return publishedClient;
}

/** Short in-isolate cache to dedupe multiple Sanity reads in one Worker invocation / warm isolate. */
const resultCache = new Map<string, { expires: number; value: unknown }>();
const DEFAULT_TTL_MS = 60_000;

export async function cachedSanityFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs = DEFAULT_TTL_MS,
): Promise<T> {
    const hit = resultCache.get(key);
    if (hit && hit.expires > Date.now()) {
        return hit.value as T;
    }
    const value = await fetcher();
    resultCache.set(key, { expires: Date.now() + ttlMs, value });
    return value;
}

export function clearSanityFetchCache(): void {
    resultCache.clear();
}

type SanityImageSource = {
    asset?: {
        _ref?: string;
    };
};

export function urlForImage(source: SanityImageSource | undefined, width = 1600): string | undefined {
    if (!source?.asset?._ref) return undefined;

    const projectId = getSanityProjectId();
    const dataset = getSanityDataset();
    if (!projectId) return undefined;

    const [, id, dimensions, format] = source.asset._ref.split('-');
    if (!id || !dimensions || !format) return undefined;

    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?w=${width}&auto=format`;
}
