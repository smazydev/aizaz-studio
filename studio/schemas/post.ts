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
            type: 'string',
            group: 'content',
            initialValue: 'Aizaz K.',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            group: 'content',
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO title',
            type: 'string',
            group: 'seo',
            description: 'Leave blank to use the post title.',
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta description',
            type: 'text',
            rows: 3,
            group: 'seo',
            validation: (rule) => rule.max(160),
        }),
        defineField({
            name: 'canonicalPath',
            title: 'Canonical path',
            type: 'string',
            group: 'seo',
            description: 'Example: /blog/my-post-slug',
        }),
        defineField({
            name: 'ogImage',
            title: 'Open Graph image',
            type: 'image',
            group: 'seo',
        }),
        defineField({
            name: 'focusKeyword',
            title: 'Focus keyword',
            type: 'string',
            group: 'seo',
            description: 'Primary keyword you are targeting for this post.',
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
