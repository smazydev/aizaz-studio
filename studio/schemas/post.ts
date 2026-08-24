import { defineField, defineType } from 'sanity';
import { validateCanonicalPath, validateContentSlug } from './slugValidation';

/**
 * Blog Post schema used by Sanity Studio (`schemaTypes` → `post`).
 * Author MUST be a reference to `person` (document title: Author) — never a free-text string.
 */
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
            description:
                'Enter only the slug segment, e.g. automate-manual-business-workflow-with-ai — not "Slug: …" or /blog/…',
            validation: (rule) =>
                rule.required().custom((value) => validateContentSlug(value?.current, 'blog')),
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
            name: 'bodyBlocks',
            title: 'Body (rich text)',
            type: 'blockContent',
            group: 'content',
            description: 'Preferred editor — paragraphs, headings, lists, links, code, and inline images.',
        }),
        defineField({
            name: 'body',
            title: 'Body (Markdown legacy)',
            type: 'text',
            rows: 20,
            group: 'content',
            description:
                'Legacy Markdown field. Use Body (rich text) for new posts. Markdown still renders if rich text is empty.',
            hidden: ({ document }) => Boolean(document?.bodyBlocks?.length),
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
            description:
                'Pick an Author from Authors (e.g. Ali Zafar). Legacy posts may publish without a reference until migrated.',
            options: { disableNew: false },
        }),
        defineField({
            name: 'authorLegacy',
            title: 'Author (legacy text)',
            type: 'string',
            group: 'content',
            readOnly: true,
            hidden: ({ document }) => !document?.authorLegacy,
            description: 'Original author text kept for safety after migrating to Author documents.',
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
            description: 'Normally /blog/{slug}. Override only when genuinely needed.',
            hidden: ({ document }) => Boolean(document?.seo),
            deprecated: { reason: 'Use the SEO object instead' },
            validation: (rule) =>
                rule.custom((value, context) => {
                    const slug = (context.document as { slug?: { current?: string } } | undefined)?.slug?.current;
                    return validateCanonicalPath(value, slug);
                }),
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
            authorName: 'author.name',
        },
        prepare({ title, subtitle, media, publishedAt, authorName }) {
            return {
                title,
                subtitle: [authorName, subtitle, publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft']
                    .filter(Boolean)
                    .join(' · '),
                media,
            };
        },
    },
});
