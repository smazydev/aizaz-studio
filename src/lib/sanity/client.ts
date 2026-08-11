import { createClient, type SanityClient } from '@sanity/client';

export function getSanityProjectId(): string | undefined {
    return import.meta.env.SANITY_PROJECT_ID || (typeof process !== 'undefined' ? process.env.SANITY_PROJECT_ID : undefined);
}

export function getSanityDataset(): string {
    return import.meta.env.SANITY_DATASET || (typeof process !== 'undefined' ? process.env.SANITY_DATASET : undefined) || 'production';
}

export function isSanityConfigured(): boolean {
    const projectId = getSanityProjectId();
    return Boolean(projectId && projectId !== 'your-project-id');
}

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
    if (!isSanityConfigured()) return null;

    if (!client) {
        client = createClient({
            projectId: getSanityProjectId()!,
            dataset: getSanityDataset(),
            apiVersion: '2024-01-01',
            useCdn: true,
        });
    }

    return client;
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
