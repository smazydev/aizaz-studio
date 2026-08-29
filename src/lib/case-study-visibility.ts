/** Case studies kept in source but excluded from public site, sitemap, and internal links. */
export const HIDDEN_CASE_STUDY_SLUGS = new Set(['investorsgonewild-investment-platform']);

export function isHiddenCaseStudySlug(slug: string): boolean {
    return HIDDEN_CASE_STUDY_SLUGS.has(slug);
}

export function isPublicCaseStudy(study: {
    slug: string;
    hiddenFromPublic?: boolean;
    noindex?: boolean;
}): boolean {
    if (study.hiddenFromPublic || isHiddenCaseStudySlug(study.slug)) return false;
    if (study.noindex) return false;
    return true;
}

export function filterPublicCaseStudies<T extends { slug: string; hiddenFromPublic?: boolean; noindex?: boolean }>(
    studies: T[],
): T[] {
    return studies.filter(isPublicCaseStudy);
}
