import type { BlogPostInput, BlogStatus } from './blog-db';
import { BLOG_CATEGORIES } from './blog-categories';
import { slugify } from './blog-db';

export interface BlogFormPayload {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    featured_image?: string | null;
    category?: string;
    tags?: string | string[];
    seo_title?: string | null;
    meta_description?: string | null;
    canonical_url?: string | null;
    og_image?: string | null;
    status?: BlogStatus;
    publish_mode?: 'draft' | 'publish' | 'schedule' | 'unpublish';
    scheduled_at?: string | null;
    author?: string;
}

export function parseBlogPayload(payload: BlogFormPayload): BlogPostInput {
    const title = (payload.title ?? '').trim();
    const slug = slugify((payload.slug ?? title).trim());
    const excerpt = (payload.excerpt ?? '').trim();
    const content = (payload.content ?? '').trim();
    const category = (payload.category ?? 'Engineering Insights').trim();

    if (!title) throw new Error('Title is required');
    if (!slug) throw new Error('Slug is required');
    if (!excerpt) throw new Error('Excerpt is required');
    if (!content) throw new Error('Content is required');
    if (!BLOG_CATEGORIES.includes(category as (typeof BLOG_CATEGORIES)[number])) {
        throw new Error('Invalid category');
    }

    let status: BlogStatus = payload.status ?? 'draft';
    let published_at: string | null = null;
    let scheduled_at: string | null = payload.scheduled_at ?? null;

    if (payload.publish_mode === 'publish') {
        status = 'published';
        published_at = new Date().toISOString();
        scheduled_at = null;
    } else if (payload.publish_mode === 'schedule') {
        if (!scheduled_at) throw new Error('Scheduled date and time are required');
        status = 'scheduled';
        published_at = null;
    } else if (payload.publish_mode === 'unpublish') {
        status = 'draft';
        published_at = null;
        scheduled_at = null;
    } else if (payload.publish_mode === 'draft') {
        status = 'draft';
        published_at = null;
        scheduled_at = null;
    }

    const tags = Array.isArray(payload.tags)
        ? payload.tags
        : (payload.tags ?? '')
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean);

    return {
        title,
        slug,
        excerpt,
        content,
        featured_image: payload.featured_image ?? null,
        category,
        tags,
        seo_title: payload.seo_title?.trim() || null,
        meta_description: payload.meta_description?.trim() || null,
        canonical_url: payload.canonical_url?.trim() || null,
        og_image: payload.og_image?.trim() || null,
        status,
        published_at,
        scheduled_at,
        author: payload.author?.trim() || 'Aizaz K.',
    };
}
