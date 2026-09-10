import { blogs } from './blogs';
import { comparePages } from './comparePages';
import { technologyPages } from './technologyPages';
import { caseStudies } from './caseStudies';
import { integrationPages } from './integrationPages';
import { industryPages, servicePages } from './seoPages';
import { isNonIndexableContentSlug } from '../lib/blog-utils';
import { filterPublicCaseStudies } from '../lib/case-study-visibility';

export function getAllSeoPaths(): string[] {
    return [
        '/',
        '/services',
        '/ai-systems-sprint',
        '/about',
        '/case-studies',
        '/engineering-transformation',
        '/process',
        '/blog',
        '/careers',
        '/engagement-models',
        '/portfolio',
        '/reviews',
        '/security',
        '/technologies',
        '/compare',
        '/resources/bigcommerce-netsuite-production-readiness',
        ...servicePages.map((page) => `/services/${page.slug}`),
        ...industryPages.map((page) => `/for/${page.slug}`),
        ...comparePages.map((page) => `/compare/${page.slug}`),
        ...technologyPages.map((page) => `/technologies/${page.slug}`),
        ...integrationPages.map((page) => `/integrations/${page.slug}`),
        ...blogs.filter((post) => !isNonIndexableContentSlug(post.slug)).map((post) => `/blog/${post.slug}`),
        ...filterPublicCaseStudies(caseStudies).map((study) => `/case-studies/${study.slug}`),
    ];
}
