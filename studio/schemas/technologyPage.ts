import { defineField, defineType } from 'sanity';
import { validateContentSlug } from './slugValidation';

export const technologyPage = defineType({
    name: 'technologyPage',
    title: 'Technology page',
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
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'outcomes',
            title: 'Outcomes',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'content',
        }),
        defineField({
            name: 'useCases',
            title: 'Use cases',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'content',
        }),
        defineField({
            name: 'stackNotes',
            title: 'Stack notes',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'content',
        }),
        defineField({
            name: 'relatedServices',
            title: 'Related services',
            type: 'array',
            of: [{ type: 'link' }],
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
            name: 'seo',
            title: 'SEO',
            type: 'seoFields',
            group: 'seo',
        }),
    ],
    preview: {
        select: { title: 'title', slug: 'slug.current' },
        prepare({ title, slug }) {
            return { title: title || 'Technology page', subtitle: slug };
        },
    },
});
