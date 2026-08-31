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
 * Server SSR reads use the live Sanity API (useCdn: false).
 * Cloudflare Workers Cache already caches public HTML; the API CDN's ~60s lag
 * can re-poison that edge cache after a publish purge.
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
            useCdn: false,
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

export type SanityImageCrop = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};

export type SanityImageHotspot = {
    x: number;
    y: number;
    height?: number;
    width?: number;
};

export type SanityImageSource = {
    asset?: {
        _ref?: string;
    };
    crop?: SanityImageCrop | null;
    hotspot?: SanityImageHotspot | null;
    alt?: string | null;
    caption?: string | null;
};

export type UrlForImageOptions = {
    /** When set, the CDN crops to this height using the image hotspot as the focal point. */
    height?: number;
};

function parseImageAssetRef(
    ref: string,
): { id: string; dimensions: string; format: string; width: number; height: number } | null {
    const match = ref.match(/^image-(.+)-(\d+)x(\d+)-([a-z0-9]+)$/i);
    if (match) {
        return {
            id: match[1],
            dimensions: `${match[2]}x${match[3]}`,
            format: match[4],
            width: Number(match[2]),
            height: Number(match[3]),
        };
    }

    const parts = ref.split('-');
    if (parts.length < 4) return null;
    const format = parts[parts.length - 1];
    const dimensions = parts[parts.length - 2];
    const id = parts.slice(1, -2).join('-');
    const [origW, origH] = dimensions.split('x').map(Number);
    if (!id || !format || !origW || !origH) return null;
    return { id, dimensions, format, width: origW, height: origH };
}

function cropToRect(
    crop: SanityImageCrop,
    origW: number,
    origH: number,
): { left: number; top: number; width: number; height: number } | null {
    const left = Math.round(Math.max(0, crop.left) * origW);
    const top = Math.round(Math.max(0, crop.top) * origH);
    const width = Math.round(origW * Math.max(0, 1 - crop.left - crop.right));
    const height = Math.round(origH * Math.max(0, 1 - crop.top - crop.bottom));
    if (width <= 0 || height <= 0) return null;
    return { left, top, width, height };
}

/** CSS object-position from a Sanity hotspot, e.g. `"50% 28%"`. */
export function objectPositionFromHotspot(
    hotspot: SanityImageHotspot | null | undefined,
    fallback = '50% 50%',
): string {
    if (!hotspot || typeof hotspot.x !== 'number' || typeof hotspot.y !== 'number') {
        return fallback;
    }
    const clamp = (n: number) => Math.min(100, Math.max(0, n * 100));
    const round = (n: number) => Math.round(n * 10) / 10;
    return `${round(clamp(hotspot.x))}% ${round(clamp(hotspot.y))}%`;
}

export function urlForImage(
    source: SanityImageSource | null | undefined,
    width = 1600,
    options?: UrlForImageOptions,
): string | undefined {
    const ref = source?.asset?._ref;
    if (!ref) return undefined;

    const projectId = getSanityProjectId();
    const dataset = getSanityDataset();
    if (!projectId) return undefined;

    const parsed = parseImageAssetRef(ref);
    if (!parsed) return undefined;

    const params = [`w=${width}`, 'auto=format'];

    if (source?.crop) {
        const rect = cropToRect(source.crop, parsed.width, parsed.height);
        if (rect) {
            params.push(`rect=${rect.left},${rect.top},${rect.width},${rect.height}`);
        }
    }

    if (options?.height) {
        params.push(`h=${options.height}`, 'fit=crop');
        const hotspot = source?.hotspot;
        if (hotspot && typeof hotspot.x === 'number' && typeof hotspot.y === 'number') {
            params.push('crop=focalpoint', `fp-x=${hotspot.x}`, `fp-y=${hotspot.y}`);
        }
    }

    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${parsed.id}-${parsed.dimensions}.${parsed.format}?${params.join('&')}`;
}
