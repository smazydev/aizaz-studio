import { defineField, defineType } from 'sanity';

export const post = defineType({
    name: 'post',
    title: 'Blog Post',
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
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            group: 'content',
            validation: (rule) => rule.required().max(320),
        }),
        defineField({
            name: 'body',
            title: 'Body (Markdown)',
            type: 'text',
            rows: 20,
            group: 'content',
            description: 'Write in Markdown. Use ## for section headings.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover image',
            type: 'image',
            group: 'content',
            options: { hotspot: true },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            group: 'content',
            options: {
                list: [
                    'Engineering Insights',
                    'AI & Automation',
                    'ERP & NetSuite',
                    'NetSuite & ERP',
                    'Cloud & DevOps',
                    'SaaS & Product',
                ],
            },
            initialValue: 'Engineering Insights',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'content',
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'person' }],
            group: 'content',
            description: 'Create an Author under People first, then select them here.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            group: 'content',
            description: 'Optional. If empty, the post goes live when you click Publish in Studio.',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seoFields',
            group: 'seo',
        }),
        // Legacy flat SEO fields — kept for existing documents; prefer `seo` above
        defineField({
            name: 'seoTitle',
            title: 'SEO title (legacy)',
            type: 'string',
            group: 'seo',
            hidden: ({ document }) => Boolean(document?.seo),
            deprecated: { reason: 'Use the SEO object instead' },
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta description (legacy)',
            type: 'text',
            rows: 3,
            group: 'seo',
            hidden: ({ document }) => Boolean(document?.seo),
            deprecated: { reason: 'Use the SEO object instead' },
        }),
        defineField({
            name: 'canonicalPath',
            title: 'Canonical path (legacy)',
            type: 'string',
            group: 'seo',
            hidden: ({ document }) => Boolean(document?.seo),
            deprecated: { reason: 'Use the SEO object instead' },
        }),
        defineField({
            name: 'ogImage',
            title: 'OG image (legacy)',
            type: 'image',
            group: 'seo',
            hidden: ({ document }) => Boolean(document?.seo),
            deprecated: { reason: 'Use the SEO object instead' },
        }),
        defineField({
            name: 'focusKeyword',
            title: 'Focus keyword (legacy)',
            type: 'string',
            group: 'seo',
            hidden: ({ document }) => Boolean(document?.seo),
            deprecated: { reason: 'Use the SEO object instead' },
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'coverImage',
            publishedAt: 'publishedAt',
        },
        prepare({ title, subtitle, media, publishedAt }) {
            return {
                title,
                subtitle: [subtitle, publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft']
                    .filter(Boolean)
                    .join(' · '),
                media,
            };
        },
    },
});
