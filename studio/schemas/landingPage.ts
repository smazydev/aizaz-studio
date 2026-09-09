import { defineField, defineType } from 'sanity';
import { validateContentSlug } from './slugValidation';

const CATEGORIES = [
    { title: 'Service', value: 'service' },
    { title: 'Industry', value: 'industry' },
    { title: 'Integration', value: 'integration' },
    { title: 'Sprint offer', value: 'sprint' },
] as const;

export const landingPage = defineType({
    name: 'landingPage',
    title: 'Landing page',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'extras', title: 'Longform / extras' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            group: 'content',
            options: { list: [...CATEGORIES], layout: 'radio' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: { source: 'title', maxLength: 96 },
            description: 'URL segment only. Services use /services/{slug}, industries /for/{slug}.',
            validation: (rule) =>
                rule.required().custom((value) => validateContentSlug(value?.current, 'page')),
        }),
        defineField({
            name: 'audienceLabel',
            title: 'Audience label',
            type: 'string',
            group: 'content',
            hidden: ({ parent }) => parent?.category !== 'industry',
            description: 'Shown as the industry badge, e.g. Startups.',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero subtitle',
            type: 'text',
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'content',
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'problem',
            title: 'Problem',
            type: 'text',
            rows: 4,
            group: 'content',
        }),
        defineField({
            name: 'solution',
            title: 'Solution',
            type: 'text',
            rows: 4,
            group: 'content',
        }),
        defineField({
            name: 'capabilities',
            title: 'Capabilities',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'content',
        }),
        defineField({
            name: 'useCases',
            title: 'Use cases / examples',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'content',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [{ type: 'faqItem' }],
            group: 'content',
        }),
        defineField({
            name: 'relatedSlugs',
            title: 'Related service slugs',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'content',
        }),
        defineField({
            name: 'primaryCta',
            title: 'Primary CTA',
            type: 'link',
            group: 'content',
        }),
        defineField({
            name: 'secondaryCta',
            title: 'Secondary CTA',
            type: 'link',
            group: 'content',
        }),
        defineField({
            name: 'ctaTitle',
            title: 'Bottom CTA title',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'ctaLede',
            title: 'Bottom CTA lede',
            type: 'text',
            rows: 2,
            group: 'content',
        }),
        defineField({
            name: 'benefits',
            title: 'Benefits',
            type: 'array',
            of: [{ type: 'benefitItem' }],
            group: 'extras',
        }),
        defineField({
            name: 'seoSections',
            title: 'Longform sections',
            type: 'array',
            of: [{ type: 'richSection' }],
            group: 'extras',
        }),
        defineField({
            name: 'processSteps',
            title: 'Process steps',
            type: 'array',
            of: [{ type: 'processStepItem' }],
            group: 'extras',
        }),
        defineField({
            name: 'proof',
            title: 'Proof block',
            type: 'proofBlock',
            group: 'extras',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seoFields',
            group: 'seo',
        }),
    ],
    preview: {
        select: { title: 'title', category: 'category', slug: 'slug.current' },
        prepare({ title, category, slug }) {
            return {
                title: title || 'Landing page',
                subtitle: `${category || 'uncategorized'} · ${slug || 'no-slug'}`,
            };
        },
    },
});
