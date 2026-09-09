import { technologyPages, type TechnologyPage } from '../../data/technologyPages';
import { cachedSanityFetch, getSanityClient } from './client';
import { pickFaqs, pickLinks, pickString, pickStringArray } from './overlay';
import { technologyPagesQuery } from './queries';
import { mapSanitySeo } from './seo';

type SanityTechnologyDoc = {
    title?: string | null;
    slug?: string | null;
    heroSubtitle?: string | null;
    outcomes?: Array<string | null> | null;
    useCases?: Array<string | null> | null;
    stackNotes?: Array<string | null> | null;
    relatedServices?: Array<{ label?: string | null; href?: string | null }> | null;
    faqs?: Array<{ question?: string | null; answer?: string | null; enabled?: boolean | null }> | null;
    seo?: Parameters<typeof mapSanitySeo>[0];
};

function mapTechnologyPage(doc: SanityTechnologyDoc, existing?: TechnologyPage): TechnologyPage | undefined {
    const slug = doc.slug?.trim();
    const title = doc.title?.trim() || existing?.title;
    if (!slug || !title) return undefined;

    const seo = mapSanitySeo(doc.seo, undefined, {
        title: existing?.metaTitle || `${title} | Aizaz.studio`,
        description: existing?.metaDescription || doc.heroSubtitle?.trim() || '',
    });

    const page: TechnologyPage = {
        slug,
        title,
        metaTitle: seo.metaTitle || existing?.metaTitle || `${title} | Aizaz.studio`,
        metaDescription: seo.metaDescription || existing?.metaDescription || doc.heroSubtitle?.trim() || '',
        heroSubtitle: pickString(doc.heroSubtitle, existing?.heroSubtitle ?? ''),
        outcomes: pickStringArray(doc.outcomes, existing?.outcomes ?? []),
        useCases: pickStringArray(doc.useCases, existing?.useCases ?? []),
        stackNotes: pickStringArray(doc.stackNotes, existing?.stackNotes ?? []),
        relatedServices: pickLinks(doc.relatedServices, existing?.relatedServices ?? []),
        faqs: pickFaqs(doc.faqs, existing?.faqs ?? []),
    };

    if (!existing && (!page.heroSubtitle || page.outcomes.length === 0)) return undefined;
    return page;
}

async function fetchDocs(): Promise<SanityTechnologyDoc[]> {
    const client = getSanityClient();
    if (!client) return [];
    try {
        return await cachedSanityFetch('technologyPages:all', () =>
            client.fetch<SanityTechnologyDoc[]>(technologyPagesQuery),
        );
    } catch (error) {
        console.warn('[sanity] Failed to fetch technology pages; using static fallback.', error);
        return [];
    }
}

export async function getTechnologyPages(): Promise<TechnologyPage[]> {
    const docs = await fetchDocs();
    const bySlug = new Map(technologyPages.map((page) => [page.slug, page]));
    const staticOrder = new Map(technologyPages.map((page, index) => [page.slug, index]));

    for (const doc of docs) {
        const slug = doc.slug?.trim();
        if (!slug) continue;
        const mapped = mapTechnologyPage(doc, bySlug.get(slug));
        if (mapped) bySlug.set(slug, mapped);
    }

    return Array.from(bySlug.values()).sort((a, b) => {
        const aIndex = staticOrder.get(a.slug);
        const bIndex = staticOrder.get(b.slug);
        if (aIndex !== undefined && bIndex !== undefined) return aIndex - bIndex;
        if (aIndex !== undefined) return -1;
        if (bIndex !== undefined) return 1;
        return a.title.localeCompare(b.title);
    });
}

export async function getTechnologyBySlug(slug: string): Promise<TechnologyPage | undefined> {
    const pages = await getTechnologyPages();
    return pages.find((page) => page.slug === slug);
}
