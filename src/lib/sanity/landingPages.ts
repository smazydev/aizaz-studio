import type { IndustryPage, SeoPage } from '../../data/seoPages';
import { aiSystemsSprintPage, industryPages, servicePages } from '../../data/seoPages';
import { integrationPages } from '../../data/integrationPages';
import { getSeoExtras, type SeoExtra } from '../../data/seoExtras';
import { cachedSanityFetch, getSanityClient } from './client';
import { landingPagesQuery } from './queries';
import { mapSanitySeo } from './seo';
import { pickFaqs, pickLink, pickOptionalString, pickString, pickStringArray } from './overlay';

export type LandingCategory = 'service' | 'industry' | 'integration' | 'sprint';

export type CmsSeoPage = SeoPage & {
    extras?: SeoExtra;
};

export type CmsIndustryPage = IndustryPage & {
    extras?: SeoExtra;
};

export type SprintPage = typeof aiSystemsSprintPage & {
    extras?: SeoExtra;
};

type SanityLandingDoc = {
    _id: string;
    category?: LandingCategory | null;
    title?: string | null;
    slug?: string | null;
    audienceLabel?: string | null;
    heroSubtitle?: string | null;
    keywords?: Array<string | null> | null;
    problem?: string | null;
    solution?: string | null;
    capabilities?: Array<string | null> | null;
    useCases?: Array<string | null> | null;
    faqs?: Array<{ question?: string | null; answer?: string | null; enabled?: boolean | null }> | null;
    relatedSlugs?: Array<string | null> | null;
    primaryCta?: { label?: string | null; href?: string | null } | null;
    secondaryCta?: { label?: string | null; href?: string | null } | null;
    ctaTitle?: string | null;
    ctaLede?: string | null;
    benefits?: Array<{ title?: string | null; description?: string | null }> | null;
    seoSections?: Array<{ heading?: string | null; paragraphs?: Array<string | null> | null }> | null;
    processSteps?: Array<{
        step?: string | null;
        title?: string | null;
        description?: string | null;
    }> | null;
    proof?: {
        eyebrow?: string | null;
        heading?: string | null;
        body?: string | null;
        links?: Array<{ label?: string | null; href?: string | null }> | null;
    } | null;
    seo?: Parameters<typeof mapSanitySeo>[0];
};

function mapExtras(doc: SanityLandingDoc, fallback: SeoExtra): SeoExtra {
    const benefits = (doc.benefits ?? [])
        .filter((item) => item?.title?.trim() && item?.description?.trim())
        .map((item) => ({ title: item.title!.trim(), description: item.description!.trim() }));
    const seoSections = (doc.seoSections ?? [])
        .filter((item) => item?.heading?.trim())
        .map((item) => ({
            heading: item.heading!.trim(),
            paragraphs: (item.paragraphs ?? []).map((p) => p?.trim()).filter((p): p is string => Boolean(p)),
        }))
        .filter((item) => item.paragraphs.length > 0);
    const processSteps = (doc.processSteps ?? [])
        .filter((item) => item?.title?.trim() && item?.description?.trim())
        .map((item) => ({
            step: item.step?.trim() || '',
            title: item.title!.trim(),
            description: item.description!.trim(),
        }));
    const proofLinks = (doc.proof?.links ?? [])
        .filter((item) => item?.label?.trim() && item?.href?.trim())
        .map((item) => ({ label: item.label!.trim(), href: item.href!.trim() }));
    const proof =
        doc.proof?.heading?.trim() && doc.proof.body?.trim()
            ? {
                  eyebrow: pickOptionalString(doc.proof.eyebrow),
                  heading: doc.proof.heading.trim(),
                  body: doc.proof.body.trim(),
                  links: proofLinks.length > 0 ? proofLinks : fallback.proof?.links ?? [],
              }
            : fallback.proof;

    return {
        benefits: benefits.length > 0 ? benefits : fallback.benefits,
        seoSections: seoSections.length > 0 ? seoSections : fallback.seoSections,
        processSteps: processSteps.length > 0 ? processSteps : fallback.processSteps,
        proof,
    };
}

function mapLandingPage(doc: SanityLandingDoc, existing?: SeoPage): CmsSeoPage | undefined {
    const slug = doc.slug?.trim();
    const title = doc.title?.trim() || existing?.title;
    if (!slug || !title) return undefined;

    const fallbackExtras = existing ? getSeoExtras(existing) : getSeoExtras({
        slug,
        title,
        metaTitle: title,
        metaDescription: doc.heroSubtitle?.trim() || '',
        heroSubtitle: doc.heroSubtitle?.trim() || '',
        keywords: [],
        problem: doc.problem?.trim() || '',
        solution: doc.solution?.trim() || '',
        capabilities: [],
        useCases: [],
        faqs: [],
    });

    const seo = mapSanitySeo(doc.seo, undefined, {
        title: existing?.metaTitle || `${title} | Aizaz.studio`,
        description: existing?.metaDescription || doc.heroSubtitle?.trim() || '',
    });

    const page: CmsSeoPage = {
        slug,
        title,
        metaTitle: seo.metaTitle || existing?.metaTitle || `${title} | Aizaz.studio`,
        metaDescription: seo.metaDescription || existing?.metaDescription || doc.heroSubtitle?.trim() || '',
        heroSubtitle: pickString(doc.heroSubtitle, existing?.heroSubtitle ?? ''),
        keywords: pickStringArray(doc.keywords, existing?.keywords ?? []),
        problem: pickString(doc.problem, existing?.problem ?? ''),
        solution: pickString(doc.solution, existing?.solution ?? ''),
        capabilities: pickStringArray(doc.capabilities, existing?.capabilities ?? []),
        useCases: pickStringArray(doc.useCases, existing?.useCases ?? []),
        faqs: pickFaqs(doc.faqs, existing?.faqs ?? []),
        relatedSlugs: pickStringArray(doc.relatedSlugs, existing?.relatedSlugs ?? []),
        primaryCta: pickLink(doc.primaryCta, existing?.primaryCta),
        secondaryCta: pickLink(doc.secondaryCta, existing?.secondaryCta),
        ctaTitle: pickOptionalString(doc.ctaTitle) ?? existing?.ctaTitle,
        ctaLede: pickOptionalString(doc.ctaLede) ?? existing?.ctaLede,
        extras: mapExtras(doc, fallbackExtras),
    };

    if (!existing && (!page.problem || !page.solution || !page.heroSubtitle)) {
        return undefined;
    }

    return page;
}

function mapIndustryPage(doc: SanityLandingDoc, existing?: IndustryPage): CmsIndustryPage | undefined {
    const mapped = mapLandingPage(doc, existing);
    if (!mapped) return undefined;
    return {
        ...mapped,
        audienceLabel: pickString(doc.audienceLabel, existing?.audienceLabel ?? mapped.title),
    };
}

async function fetchLandingDocs(): Promise<SanityLandingDoc[]> {
    const client = getSanityClient();
    if (!client) return [];
    try {
        return await cachedSanityFetch('landingPages:all', () =>
            client.fetch<SanityLandingDoc[]>(landingPagesQuery),
        );
    } catch (error) {
        console.warn('[sanity] Failed to fetch landing pages; using static fallback.', error);
        return [];
    }
}

function mergeBySlug<T extends SeoPage>(
    staticPages: T[],
    docs: SanityLandingDoc[],
    mapDoc: (doc: SanityLandingDoc, existing?: T) => T | undefined,
): T[] {
    const bySlug = new Map(staticPages.map((page) => [page.slug, page]));
    const staticOrder = new Map(staticPages.map((page, index) => [page.slug, index]));

    for (const doc of docs) {
        const slug = doc.slug?.trim();
        if (!slug) continue;
        const existing = bySlug.get(slug);
        const mapped = mapDoc(doc, existing);
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

export async function getServicePages(): Promise<CmsSeoPage[]> {
    const docs = (await fetchLandingDocs()).filter((doc) => doc.category === 'service');
    return mergeBySlug(servicePages, docs, mapLandingPage);
}

export async function getServiceBySlug(slug: string): Promise<CmsSeoPage | undefined> {
    const pages = await getServicePages();
    return pages.find((page) => page.slug === slug);
}

export async function getIndustryPages(): Promise<CmsIndustryPage[]> {
    const docs = (await fetchLandingDocs()).filter((doc) => doc.category === 'industry');
    return mergeBySlug(industryPages, docs, mapIndustryPage);
}

export async function getIndustryBySlug(slug: string): Promise<CmsIndustryPage | undefined> {
    const pages = await getIndustryPages();
    return pages.find((page) => page.slug === slug);
}

export async function getIntegrationPages(): Promise<CmsSeoPage[]> {
    const docs = (await fetchLandingDocs()).filter((doc) => doc.category === 'integration');
    return mergeBySlug(integrationPages, docs, mapLandingPage);
}

export async function getIntegrationBySlug(slug: string): Promise<CmsSeoPage | undefined> {
    const pages = await getIntegrationPages();
    return pages.find((page) => page.slug === slug);
}

export async function getSprintPage(): Promise<SprintPage> {
    const docs = (await fetchLandingDocs()).filter((doc) => doc.category === 'sprint');
    const doc =
        docs.find((item) => item.slug === 'ai-systems-sprint') ??
        docs[0];
    const fallback: SprintPage = { ...aiSystemsSprintPage, extras: undefined };
    if (!doc) return fallback;

    const mapped = mapLandingPage(doc, {
        slug: aiSystemsSprintPage.slug,
        title: aiSystemsSprintPage.title,
        metaTitle: aiSystemsSprintPage.metaTitle,
        metaDescription: aiSystemsSprintPage.metaDescription,
        heroSubtitle: aiSystemsSprintPage.heroSubtitle,
        keywords: aiSystemsSprintPage.keywords,
        problem: aiSystemsSprintPage.problem,
        solution: aiSystemsSprintPage.solution,
        capabilities: aiSystemsSprintPage.capabilities,
        useCases: aiSystemsSprintPage.examples,
        faqs: aiSystemsSprintPage.faqs,
    });
    if (!mapped) return fallback;

    return {
        ...aiSystemsSprintPage,
        ...mapped,
        examples: mapped.useCases.length > 0 ? mapped.useCases : aiSystemsSprintPage.examples,
        extras: mapped.extras,
    };
}

export function extrasForPage(page: CmsSeoPage): SeoExtra {
    return page.extras ?? getSeoExtras(page);
}
