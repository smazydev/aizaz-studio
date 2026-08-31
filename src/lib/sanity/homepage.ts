import type { CaseStudy } from '../../data/caseStudies';
import type { LeadershipProfile } from '../../data/leadership';
import { clientLogos, siteStats } from '../../data/siteContent';
import { isHiddenCaseStudySlug, isPublicCaseStudy } from '../case-study-visibility';
import { personSelection, type SanityPersonDoc } from './author';
import { getAllCaseStudies } from './caseStudies';
import { cachedSanityFetch, getSanityClient } from './client';
import { getHomepageTeam, mapSanityTeamMember } from './team';

export type HomepageStat = {
    value: string;
    suffix: string;
    label: string;
    supportingText?: string;
};

export type HomepageMarqueeItem = {
    name: string;
    href?: string;
};

export type HomepageFeaturedCaseStudy = {
    study: CaseStudy;
    tabLabel: string;
};

export type HomepageContent = {
    stats: HomepageStat[];
    marqueeLabel: string;
    marqueeItems: HomepageMarqueeItem[];
    showcaseEyebrow: string;
    showcaseTitle: string;
    showcaseDescription: string;
    featuredCaseStudies: HomepageFeaturedCaseStudy[];
    featuredTeam: LeadershipProfile[];
};

type SanityHomepageDoc = {
    stats?: Array<{
        value?: string | null;
        suffix?: string | null;
        label?: string | null;
        supportingText?: string | null;
        enabled?: boolean | null;
    }> | null;
    marqueeLabel?: string | null;
    marqueeItems?: Array<{
        name?: string | null;
        href?: string | null;
        enabled?: boolean | null;
    }> | null;
    showcaseEyebrow?: string | null;
    showcaseTitle?: string | null;
    showcaseDescription?: string | null;
    featuredCaseStudies?: Array<{
        caseStudySlug?: string | null;
        labelOverride?: string | null;
        enabled?: boolean | null;
    }> | null;
    featuredTeam?: SanityPersonDoc[] | null;
};

/** Default featured order matches current public homepage emphasis. */
const DEFAULT_FEATURED_SLUGS = [
    'propertymatchmaker-real-estate-saas',
    'designing-multi-tenant-crm-architecture',
    '1archiver-compliance-platform',
    'modernizing-multi-language-code-checking-tool',
] as const;

export const defaultHomepageContent: Omit<HomepageContent, 'featuredCaseStudies'> & {
    featuredSlugs: string[];
} = {
    stats: siteStats.map((stat) => ({
        value: stat.value,
        suffix: stat.suffix,
        label: stat.label,
    })),
    marqueeLabel: 'Trusted by product teams & operators',
    marqueeItems: clientLogos.map((name) => ({ name })),
    showcaseEyebrow: 'Case Studies',
    showcaseTitle: 'Production systems, not portfolio filler',
    showcaseDescription:
        'Compliance, fintech, and infrastructure work built for teams that need software to hold up under real load.',
    featuredSlugs: [...DEFAULT_FEATURED_SLUGS],
};

export const homepageQuery = `*[_type == "homepage" && _id == "homepage"][0]{
  stats[]{ value, suffix, label, supportingText, enabled },
  marqueeLabel,
  marqueeItems[]{ name, href, enabled },
  showcaseEyebrow,
  showcaseTitle,
  showcaseDescription,
  featuredCaseStudies[]{ caseStudySlug, labelOverride, enabled },
  featuredTeam[]->{
    ${personSelection}
  }
}`;

function pickString(value: string | null | undefined, fallback: string): string {
    const trimmed = value?.trim();
    return trimmed ? trimmed : fallback;
}

function mapStats(doc: SanityHomepageDoc | null): HomepageStat[] {
    const fromCms = (doc?.stats ?? [])
        .filter((item) => item?.enabled !== false && item?.value?.trim() && item?.label?.trim())
        .map((item) => ({
            value: item.value!.trim(),
            suffix: item.suffix?.trim() ?? '',
            label: item.label!.trim(),
            supportingText: item.supportingText?.trim() || undefined,
        }));
    return fromCms.length > 0 ? fromCms : defaultHomepageContent.stats;
}

function mapMarquee(doc: SanityHomepageDoc | null): HomepageMarqueeItem[] {
    const fromCms = (doc?.marqueeItems ?? [])
        .filter((item) => item?.enabled !== false && item?.name?.trim())
        .map((item) => ({
            name: item.name!.trim(),
            href: item.href?.trim() || undefined,
        }));
    return fromCms.length > 0 ? fromCms : defaultHomepageContent.marqueeItems;
}

function resolveFeatured(
    doc: SanityHomepageDoc | null,
    allStudies: CaseStudy[],
): HomepageFeaturedCaseStudy[] {
    // allStudies is already public-filtered from getAllCaseStudies(); re-check for safety.
    const publicStudies = allStudies.filter(isPublicCaseStudy);
    const bySlug = new Map(publicStudies.map((study) => [study.slug, study]));
    const configured = (doc?.featuredCaseStudies ?? [])
        .filter((item) => item?.enabled !== false && item?.caseStudySlug?.trim())
        .map((item) => ({
            slug: item.caseStudySlug!.trim(),
            labelOverride: item.labelOverride?.trim() || undefined,
        }));

    const flagged = publicStudies
        .filter((study) => study.featuredOnHomepage)
        .map((study) => ({ slug: study.slug, labelOverride: undefined as string | undefined }));

    const selected = configured.length
        ? configured
        : flagged.length
          ? flagged
          : DEFAULT_FEATURED_SLUGS.map((slug) => ({ slug, labelOverride: undefined as string | undefined }));

    const featured: HomepageFeaturedCaseStudy[] = [];
    for (const item of selected) {
        if (isHiddenCaseStudySlug(item.slug)) continue;
        const study = bySlug.get(item.slug);
        if (!study) continue; // unknown / missing / unpublished slug — skip safely
        featured.push({
            study,
            tabLabel: item.labelOverride || study.category || study.title,
        });
    }

    if (featured.length > 0) return featured;

    // Last-resort fallback: public studies in default order, then remaining.
    // Avoids empty homepage showcase when CMS config is empty or all slugs invalid.
    const fallbackSlugs = [
        ...DEFAULT_FEATURED_SLUGS,
        ...publicStudies
            .map((study) => study.slug)
            .filter((slug) => !DEFAULT_FEATURED_SLUGS.includes(slug as (typeof DEFAULT_FEATURED_SLUGS)[number])),
    ];
    for (const slug of fallbackSlugs) {
        if (isHiddenCaseStudySlug(slug)) continue;
        const study = bySlug.get(slug);
        if (!study) continue;
        if (featured.some((item) => item.study.slug === study.slug)) continue;
        featured.push({ study, tabLabel: study.category || study.title });
    }
    return featured;
}

async function resolveFeaturedTeam(doc: SanityHomepageDoc | null): Promise<LeadershipProfile[]> {
    const fromHomepage = (doc?.featuredTeam ?? [])
        .map((person) => mapSanityTeamMember(person))
        .filter((person): person is LeadershipProfile => Boolean(person));
    if (fromHomepage.length > 0) return fromHomepage;
    return getHomepageTeam();
}

/**
 * Single homepage document fetch + case-study resolution.
 * Safe when Sanity is down or the Homepage document does not exist yet.
 * Empty/disabled CMS arrays fall back to approved code defaults (do not blank the homepage).
 */
export async function getHomepageContent(): Promise<HomepageContent> {
    let allStudies: CaseStudy[] = [];
    try {
        allStudies = await getAllCaseStudies();
    } catch (error) {
        console.warn('[sanity] Failed to load case studies for homepage; continuing with empty set.', error);
        allStudies = [];
    }

    const fallback = async (): Promise<HomepageContent> => ({
        stats: defaultHomepageContent.stats,
        marqueeLabel: defaultHomepageContent.marqueeLabel,
        marqueeItems: defaultHomepageContent.marqueeItems,
        showcaseEyebrow: defaultHomepageContent.showcaseEyebrow,
        showcaseTitle: defaultHomepageContent.showcaseTitle,
        showcaseDescription: defaultHomepageContent.showcaseDescription,
        featuredCaseStudies: resolveFeatured(null, allStudies),
        featuredTeam: await resolveFeaturedTeam(null),
    });

    const client = getSanityClient();
    if (!client) return fallback();

    try {
        const doc = await cachedSanityFetch('homepage', () =>
            client.fetch<SanityHomepageDoc | null>(homepageQuery),
        );

        return {
            stats: mapStats(doc),
            marqueeLabel: pickString(doc?.marqueeLabel, defaultHomepageContent.marqueeLabel),
            marqueeItems: mapMarquee(doc),
            showcaseEyebrow: pickString(doc?.showcaseEyebrow, defaultHomepageContent.showcaseEyebrow),
            showcaseTitle: pickString(doc?.showcaseTitle, defaultHomepageContent.showcaseTitle),
            showcaseDescription: pickString(
                doc?.showcaseDescription,
                defaultHomepageContent.showcaseDescription,
            ),
            featuredCaseStudies: resolveFeatured(doc, allStudies),
            featuredTeam: await resolveFeaturedTeam(doc),
        };
    } catch (error) {
        console.warn('[sanity] Failed to fetch homepage; using code fallbacks.', error);
        return fallback();
    }
}
