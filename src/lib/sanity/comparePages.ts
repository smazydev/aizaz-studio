import { comparePages, type ComparePage } from '../../data/comparePages';
import { cachedSanityFetch, getSanityClient } from './client';
import { pickFaqs, pickLinks, pickString } from './overlay';
import { comparePagesQuery } from './queries';
import { mapSanitySeo } from './seo';

type SanityCompareDoc = {
    title?: string | null;
    slug?: string | null;
    heroSubtitle?: string | null;
    intro?: string | null;
    comparisonRows?: Array<{
        label?: string | null;
        optionA?: string | null;
        optionB?: string | null;
    }> | null;
    sections?: Array<{ heading?: string | null; paragraphs?: Array<string | null> | null }> | null;
    faqs?: Array<{ question?: string | null; answer?: string | null; enabled?: boolean | null }> | null;
    ctaText?: string | null;
    relatedLinks?: Array<{ label?: string | null; href?: string | null }> | null;
    seo?: Parameters<typeof mapSanitySeo>[0];
};

function mapComparePage(doc: SanityCompareDoc, existing?: ComparePage): ComparePage | undefined {
    const slug = doc.slug?.trim();
    const title = doc.title?.trim() || existing?.title;
    if (!slug || !title) return undefined;

    const seo = mapSanitySeo(doc.seo, undefined, {
        title: existing?.metaTitle || `${title} | Aizaz Studio`,
        description: existing?.metaDescription || doc.heroSubtitle?.trim() || '',
    });

    const comparisonRows = (doc.comparisonRows ?? [])
        .filter((row) => row?.label?.trim())
        .map((row) => ({
            label: row.label!.trim(),
            optionA: row.optionA?.trim() || '',
            optionB: row.optionB?.trim() || '',
        }));
    const sections = (doc.sections ?? [])
        .filter((section) => section?.heading?.trim())
        .map((section) => ({
            heading: section.heading!.trim(),
            paragraphs: (section.paragraphs ?? [])
                .map((p) => p?.trim())
                .filter((p): p is string => Boolean(p)),
        }))
        .filter((section) => section.paragraphs.length > 0);

    const page: ComparePage = {
        slug,
        title,
        metaTitle: seo.metaTitle || existing?.metaTitle || `${title} | Aizaz Studio`,
        metaDescription: seo.metaDescription || existing?.metaDescription || doc.heroSubtitle?.trim() || '',
        heroSubtitle: pickString(doc.heroSubtitle, existing?.heroSubtitle ?? ''),
        intro: pickString(doc.intro, existing?.intro ?? ''),
        comparisonRows: comparisonRows.length > 0 ? comparisonRows : existing?.comparisonRows ?? [],
        sections: sections.length > 0 ? sections : existing?.sections ?? [],
        faqs: pickFaqs(doc.faqs, existing?.faqs ?? []),
        ctaText: pickString(doc.ctaText, existing?.ctaText ?? ''),
        relatedLinks: pickLinks(doc.relatedLinks, existing?.relatedLinks ?? []),
    };

    if (!existing && (!page.intro || page.comparisonRows.length === 0)) return undefined;
    return page;
}

async function fetchDocs(): Promise<SanityCompareDoc[]> {
    const client = getSanityClient();
    if (!client) return [];
    try {
        return await cachedSanityFetch('comparePages:all', () =>
            client.fetch<SanityCompareDoc[]>(comparePagesQuery),
        );
    } catch (error) {
        console.warn('[sanity] Failed to fetch compare pages; using static fallback.', error);
        return [];
    }
}

export async function getComparePages(): Promise<ComparePage[]> {
    const docs = await fetchDocs();
    const bySlug = new Map(comparePages.map((page) => [page.slug, page]));
    const staticOrder = new Map(comparePages.map((page, index) => [page.slug, index]));

    for (const doc of docs) {
        const slug = doc.slug?.trim();
        if (!slug) continue;
        const mapped = mapComparePage(doc, bySlug.get(slug));
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

export async function getCompareBySlug(slug: string): Promise<ComparePage | undefined> {
    const pages = await getComparePages();
    return pages.find((page) => page.slug === slug);
}
