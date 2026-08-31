import type { CaseStudy } from '../../data/caseStudies';
import { caseStudies as staticCaseStudies } from '../../data/caseStudies';
import { filterPublicCaseStudies, isPublicCaseStudy } from '../case-study-visibility';
import { mapSanityAuthor } from './author';
import { cachedSanityFetch, getSanityClient, type SanityImageSource } from './client';
import { mapManagedImage } from './image';
import { caseStudiesQuery } from './queries';
import { mapSanitySeo } from './seo';

type SanityImage = SanityImageSource;

type SanityCaseStudy = {
    _id: string;
    title: string;
    slug: string;
    category?: string;
    subtitle: string;
    description: string;
    client?: string;
    location?: string;
    industry?: string;
    challenge?: string;
    solution?: string;
    outcome?: string;
    projectValue?: string;
    projectPeriod?: string;
    deliveryDuration?: string;
    deliveredBy?: string;
    engagementNote?: string;
    portfolioNote?: string;
    atAGlance?: { value: string; label: string; sublabel?: string }[];
    engagement?: { label: string; value: string }[];
    stats?: { label: string; value: string }[];
    testimonial?: {
        quote: string;
        author: string;
        role?: string;
        company?: string;
        rating?: string;
        source?: string;
        engagementMeta?: string;
    };
    detailedContent?: {
        title: string;
        content?: string;
        items?: {
            title: string;
            description?: string;
            points?: string[];
            image?: SanityImage;
            table?: { label: string; value: string }[];
            tableCaption?: string;
            tableHeaderLeft?: string;
            tableHeaderRight?: string;
        }[];
    }[];
    featuredOnHomepage?: boolean;
    logo?: SanityImage;
    gallery?: SanityImage[];
    backgroundImages?: SanityImage[];
    cta?: {
        headline?: string;
        body?: string;
        buttonText: string;
        buttonHref?: string;
        secondaryButtonText?: string;
        secondaryButtonHref?: string;
    };
    author?: string | { _ref?: string };
    authorDoc?: Parameters<typeof mapSanityAuthor>[0];
    seo?: Parameters<typeof mapSanitySeo>[0];
    seoTitle?: string;
    seoDescription?: string;
    focusKeyword?: string;
    coverImage?: SanityImage;
};

function mapSanityCaseStudy(study: SanityCaseStudy, existing?: CaseStudy): CaseStudy {
    const cover = mapManagedImage(study.coverImage);
    const logo = mapManagedImage(study.logo, 400);
    const galleryItems =
        study.gallery
            ?.map((img) => mapManagedImage(img))
            .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? existing?.galleryItems;
    const imageUrl = cover?.url ?? existing?.imageUrl;
    const legacyAuthorName = typeof study.author === 'string' ? study.author : null;
    const author = mapSanityAuthor(study.authorDoc, legacyAuthorName) ?? existing?.author;
    const seo = mapSanitySeo(
        study.seo,
        {
            seoTitle: study.seoTitle,
            seoDescription: study.seoDescription,
            focusKeyword: study.focusKeyword,
        },
        {
            title: `${study.title} | Aizaz Studio`,
            description: study.description,
            canonicalPath: `/case-studies/${study.slug}`,
            ogImageUrl: imageUrl,
        },
    );

    const mappedDetailedContent =
        study.detailedContent?.map((section) => ({
            title: section.title,
            content: section.content ?? '',
            items: section.items?.map((item) => ({
                title: item.title,
                description: item.description ?? '',
                points: item.points,
                // Keep static ImageMetadata when CMS item has no image URL
                image: existing?.detailedContent
                    ?.flatMap((s) => s.items ?? [])
                    .find((i) => i.title === item.title)?.image,
                imageUrl: mapManagedImage(item.image)?.url,
                imageAlt: item.image?.alt?.trim() || item.title,
                table: item.table,
                tableCaption: item.tableCaption,
                tableHeaders:
                    item.tableHeaderLeft || item.tableHeaderRight
                        ? { left: item.tableHeaderLeft ?? '', right: item.tableHeaderRight ?? '' }
                        : undefined,
            })),
        })) ?? existing?.detailedContent;

    return {
        // Preserve rich static fields when Sanity omits them
        ...existing,
        id: study._id,
        slug: study.slug,
        category: study.category ?? existing?.category ?? 'Case Study',
        title: study.title,
        subtitle: study.subtitle,
        description: study.description,
        image: existing?.image ?? staticCaseStudies[0].image,
        imageUrl,
        imageAlt: cover?.alt || existing?.imageAlt || study.title,
        imageObjectPosition: cover?.objectPosition || existing?.imageObjectPosition,
        logo: logo?.url ?? existing?.logo,
        logoAlt: logo?.alt || existing?.logoAlt,
        featuredOnHomepage: study.featuredOnHomepage ?? existing?.featuredOnHomepage,
        client: study.client ?? existing?.client,
        location: study.location ?? existing?.location,
        industry: study.industry ?? existing?.industry,
        projectValue: study.projectValue ?? existing?.projectValue,
        projectPeriod: study.projectPeriod ?? existing?.projectPeriod,
        deliveryDuration: study.deliveryDuration ?? existing?.deliveryDuration,
        deliveredBy: study.deliveredBy ?? existing?.deliveredBy,
        engagementNote: study.engagementNote ?? existing?.engagementNote,
        portfolioNote: study.portfolioNote ?? existing?.portfolioNote,
        atAGlance: study.atAGlance ?? existing?.atAGlance,
        engagement: study.engagement ?? existing?.engagement,
        stats: study.stats ?? existing?.stats,
        testimonial: study.testimonial
            ? {
                  quote: study.testimonial.quote,
                  author: study.testimonial.author,
                  role: study.testimonial.role ?? '',
                  rating: study.testimonial.rating ?? '',
                  source: study.testimonial.source ?? '',
                  engagementMeta: study.testimonial.engagementMeta,
              }
            : existing?.testimonial,
        content: {
            challenge: study.challenge || existing?.content.challenge || '',
            solution: study.solution || existing?.content.solution || '',
            outcome: study.outcome || existing?.content.outcome || '',
            testimonial: existing?.content.testimonial,
        },
        detailedContent: mappedDetailedContent,
        gallery: galleryItems?.map((item) => item.url) ?? existing?.gallery,
        galleryItems,
        backgroundImages: existing?.backgroundImages,
        backgroundImageUrls:
            study.backgroundImages
                ?.map((img) => mapManagedImage(img)?.url)
                .filter((url): url is string => Boolean(url)) ?? existing?.backgroundImageUrls,
        author,
        seoTitle: seo.metaTitle,
        seoDescription: seo.metaDescription,
        canonicalPath: seo.canonicalPath,
        ogTitle: seo.ogTitle,
        ogDescription: seo.ogDescription,
        ogImageUrl: seo.ogImageUrl,
        noindex: seo.noIndex,
        focusKeyword: seo.focusKeyword,
        cta: study.cta
            ? {
                  headline: study.cta.headline ?? '',
                  buttonText: study.cta.buttonText,
                  buttonHref: study.cta.buttonHref,
              }
            : existing?.cta,
    };
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
    const client = getSanityClient();
    const staticBySlug = new Map(staticCaseStudies.map((study) => [study.slug, study]));

    if (!client) {
        return filterPublicCaseStudies(staticCaseStudies);
    }

    try {
        const sanityStudies = await cachedSanityFetch('caseStudies:all', () =>
            client.fetch<SanityCaseStudy[]>(caseStudiesQuery),
        );
        for (const study of sanityStudies) {
            const existing = staticBySlug.get(study.slug);
            staticBySlug.set(study.slug, mapSanityCaseStudy(study, existing));
        }
    } catch (error) {
        console.warn('[sanity] Failed to fetch case studies; using static fallback.', error);
        return filterPublicCaseStudies(staticCaseStudies);
    }

    const merged = filterPublicCaseStudies(Array.from(staticBySlug.values()));
    const staticOrder = new Map(staticCaseStudies.map((study, index) => [study.slug, index]));

    return merged.sort((a, b) => {
        const aIndex = staticOrder.get(a.slug);
        const bIndex = staticOrder.get(b.slug);
        if (aIndex !== undefined && bIndex !== undefined) return aIndex - bIndex;
        if (aIndex !== undefined) return -1;
        if (bIndex !== undefined) return 1;
        return a.title.localeCompare(b.title);
    });
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
    const studies = await getAllCaseStudies();
    const study = studies.find((item) => item.slug === slug);
    return study && isPublicCaseStudy(study) ? study : undefined;
}
