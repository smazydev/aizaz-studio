import type { CaseStudy } from '../../data/caseStudies';
import { caseStudies as staticCaseStudies } from '../../data/caseStudies';
import { getSanityClient, urlForImage } from './client';
import { caseStudiesQuery } from './queries';

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
    seoTitle?: string;
    seoDescription?: string;
    focusKeyword?: string;
    coverImage?: { asset?: { _ref?: string } };
};

function mapSanityCaseStudy(study: SanityCaseStudy): CaseStudy {
    const imageUrl = urlForImage(study.coverImage);

    return {
        id: study._id,
        slug: study.slug,
        category: study.category ?? 'Case Study',
        title: study.title,
        subtitle: study.subtitle,
        description: study.description,
        image: staticCaseStudies[0].image,
        imageUrl,
        client: study.client,
        location: study.location,
        industry: study.industry,
        seoTitle: study.seoTitle,
        seoDescription: study.seoDescription,
        content: {
            challenge: study.challenge ?? '',
            solution: study.solution ?? '',
            outcome: study.outcome ?? '',
        },
    };
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
    const client = getSanityClient();
    const staticBySlug = new Map(staticCaseStudies.map((study) => [study.slug, study]));

    if (!client) {
        return staticCaseStudies;
    }

    const sanityStudies = await client.fetch<SanityCaseStudy[]>(caseStudiesQuery);
    for (const study of sanityStudies) {
        staticBySlug.set(study.slug, mapSanityCaseStudy(study));
    }

    const merged = Array.from(staticBySlug.values());
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
    return studies.find((study) => study.slug === slug);
}
