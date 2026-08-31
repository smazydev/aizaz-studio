import { defineField, defineType } from 'sanity';

/** Alt + optional caption, attached to Sanity `image` fields (hotspot/crop live on the image). */
export const imageAltCaptionFields = [
    defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description: 'Describe the image for accessibility. Required when replacing a public image.',
    }),
    defineField({
        name: 'caption',
        title: 'Caption',
        type: 'string',
        description: 'Optional caption shown with the image.',
    }),
];

/** Reusable SEO fields for every page/document type */
export const seoFields = defineType({
    name: 'seoFields',
    title: 'SEO',
    type: 'object',
    fields: [
        defineField({
            name: 'metaTitle',
            title: 'SEO title',
            type: 'string',
            description:
                'Browser/search title for this page. Leave blank to use the document title. Aim for ~50–60 characters.',
            validation: (rule) => rule.max(70),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta description',
            type: 'text',
            rows: 3,
            description:
                'Short summary for search snippets and social previews when OG description is blank. Aim for ~140–155 characters.',
            validation: (rule) => rule.max(160),
        }),
        defineField({
            name: 'canonicalPath',
            title: 'Canonical URL path',
            type: 'string',
            description:
                'Path-only canonical, e.g. /blog/my-post-slug. Leave blank to auto-use /blog/{slug}. Do not enter a full https:// URL.',
            validation: (rule) =>
                rule.custom((value) => {
                    if (!value?.trim()) return true;
                    if (!value.startsWith('/')) return 'Must start with /';
                    if (/\s/.test(value)) return 'Cannot contain spaces';
                    if (/Slug:/i.test(value)) return 'Remove malformed slug text from canonical path';
                    return true;
                }),
        }),
        defineField({
            name: 'ogTitle',
            title: 'OG title',
            type: 'string',
            description: 'Open Graph / social share title. Defaults to SEO title when blank.',
        }),
        defineField({
            name: 'ogDescription',
            title: 'OG description',
            type: 'text',
            rows: 2,
            description: 'Open Graph / social share description. Defaults to meta description when blank.',
        }),
        defineField({
            name: 'ogImage',
            title: 'OG image',
            type: 'image',
            description: 'Social share image. Defaults to the cover image when blank.',
            options: { hotspot: true },
        }),
        defineField({
            name: 'noIndex',
            title: 'No-index',
            type: 'boolean',
            description: 'When enabled, search engines are asked not to index this page (adds noindex).',
            initialValue: false,
        }),
        defineField({
            name: 'focusKeyword',
            title: 'Focus keyword',
            type: 'string',
            description:
                'Editorial-only primary keyword for writers. Not emitted as a public meta keywords tag.',
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
            validation: (rule) => rule.required().max(180),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
            rows: 4,
            validation: (rule) => rule.required().min(1),
        }),
        defineField({
            name: 'enabled',
            title: 'Enabled',
            type: 'boolean',
            description: 'Disabled entries stay editable in Studio but are not shown on the public site.',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'question',
            enabled: 'enabled',
        },
        prepare({ title, enabled }) {
            return {
                title: title || 'Untitled FAQ',
                subtitle: enabled === false ? 'Disabled' : 'Enabled',
            };
        },
    },
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
            fields: imageAltCaptionFields,
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

export const bodyImage = defineType({
    name: 'bodyImage',
    title: 'Inline image',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'alt',
            title: 'Alt text',
            type: 'string',
            validation: (rule) => rule.required().min(3),
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
        }),
        defineField({
            name: 'sourceUrl',
            title: 'Source / link',
            type: 'url',
            description: 'Optional attribution or source link.',
            validation: (rule) =>
                rule.uri({
                    scheme: ['http', 'https'],
                    allowRelative: false,
                }),
        }),
    ],
    preview: {
        select: {
            title: 'alt',
            media: 'image',
        },
    },
});

/** Portable Text body for blog posts — paragraphs, headings, lists, links, code, images. */
export const blockContent = defineType({
    name: 'blockContent',
    title: 'Rich text',
    type: 'array',
    of: [
        {
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
            ],
            marks: {
                decorators: [{ title: 'Code', value: 'code' }],
                annotations: [
                    {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                            defineField({
                                name: 'href',
                                title: 'URL',
                                type: 'url',
                                validation: (rule) =>
                                    rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
                            }),
                        ],
                    },
                ],
            },
        },
        { type: 'bodyImage' },
    ],
});
