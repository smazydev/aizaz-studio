import { defineField, defineType } from 'sanity';
import { validateContentSlug } from './slugValidation';

export const comparePage = defineType({
    name: 'comparePage',
    title: 'Compare page',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
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
            validation: (rule) =>
                rule.required().custom((value) => validateContentSlug(value?.current, 'page')),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero subtitle',
            type: 'text',
            rows: 2,
            group: 'content',
        }),
        defineField({
            name: 'intro',
            title: 'Intro',
            type: 'text',
            rows: 4,
            group: 'content',
        }),
        defineField({
            name: 'comparisonRows',
            title: 'Comparison rows',
            type: 'array',
            of: [{ type: 'comparisonRow' }],
            group: 'content',
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [{ type: 'richSection' }],
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
            name: 'ctaText',
            title: 'CTA text',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'relatedLinks',
            title: 'Related links',
            type: 'array',
            of: [{ type: 'link' }],
            group: 'content',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seoFields',
            group: 'seo',
        }),
    ],
    preview: {
        select: { title: 'title', slug: 'slug.current' },
        prepare({ title, slug }) {
            return { title: title || 'Compare page', subtitle: slug };
        },
    },
});
