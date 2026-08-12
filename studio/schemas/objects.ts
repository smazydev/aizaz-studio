import { defineField, defineType } from 'sanity';

/** Reusable SEO fields for every page/document type */
export const seoFields = defineType({
    name: 'seoFields',
    title: 'SEO',
    type: 'object',
    fields: [
        defineField({
            name: 'metaTitle',
            title: 'Meta title',
            type: 'string',
            description: 'Defaults to the page title when blank.',
            validation: (rule) => rule.max(70),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta description',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.max(160),
        }),
        defineField({
            name: 'canonicalPath',
            title: 'Canonical URL path',
            type: 'string',
            description: 'Example: /blog/my-post-slug — leave blank to use the page URL.',
        }),
        defineField({
            name: 'ogTitle',
            title: 'OG title',
            type: 'string',
            description: 'Defaults to meta title when blank.',
        }),
        defineField({
            name: 'ogDescription',
            title: 'OG description',
            type: 'text',
            rows: 2,
            description: 'Defaults to meta description when blank.',
        }),
        defineField({
            name: 'ogImage',
            title: 'OG image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'noIndex',
            title: 'No-index',
            type: 'boolean',
            description: 'When enabled, search engines are asked not to index this page.',
            initialValue: false,
        }),
        defineField({
            name: 'focusKeyword',
            title: 'Focus keyword',
            type: 'string',
            description: 'Primary keyword for editorial tracking (not a public meta tag).',
        }),
    ],
});

export const link = defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'href',
            title: 'URL / path',
            type: 'string',
            description: 'Internal path (/book-a-call) or full URL.',
            validation: (rule) => rule.required(),
        }),
    ],
});

export const cta = defineType({
    name: 'cta',
    title: 'Call to action',
    type: 'object',
    fields: [
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
        }),
        defineField({
            name: 'body',
            title: 'Supporting text',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'buttonText',
            title: 'Button text',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'buttonHref',
            title: 'Button link',
            type: 'string',
            initialValue: '/book-a-call',
        }),
        defineField({
            name: 'secondaryButtonText',
            title: 'Secondary button text',
            type: 'string',
        }),
        defineField({
            name: 'secondaryButtonHref',
            title: 'Secondary button link',
            type: 'string',
        }),
    ],
});

export const faqItem = defineType({
    name: 'faqItem',
    title: 'FAQ item',
    type: 'object',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
            rows: 4,
            validation: (rule) => rule.required(),
        }),
    ],
});

export const stat = defineType({
    name: 'stat',
    title: 'Stat',
    type: 'object',
    fields: [
        defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'sublabel',
            title: 'Sublabel',
            type: 'string',
        }),
    ],
});

export const testimonial = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'object',
    fields: [
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'text',
            rows: 4,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role / title',
            type: 'string',
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'string',
            description: 'Example: 5.0 or 5 stars',
        }),
        defineField({
            name: 'source',
            title: 'Source',
            type: 'string',
            description: 'Example: Clutch, Upwork',
        }),
        defineField({
            name: 'engagementMeta',
            title: 'Engagement note',
            type: 'string',
        }),
    ],
});

export const labelValue = defineType({
    name: 'labelValue',
    title: 'Label / value',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
    ],
});

export const caseStudySectionItem = defineType({
    name: 'caseStudySectionItem',
    title: 'Case study section item',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'points',
            title: 'Bullet points',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'table',
            title: 'Table rows',
            type: 'array',
            of: [{ type: 'labelValue' }],
        }),
        defineField({
            name: 'tableCaption',
            title: 'Table caption',
            type: 'string',
        }),
        defineField({
            name: 'tableHeaderLeft',
            title: 'Table header (left)',
            type: 'string',
        }),
        defineField({
            name: 'tableHeaderRight',
            title: 'Table header (right)',
            type: 'string',
        }),
    ],
});

export const caseStudySection = defineType({
    name: 'caseStudySection',
    title: 'Case study section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Intro copy',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'caseStudySectionItem' }],
        }),
    ],
});
