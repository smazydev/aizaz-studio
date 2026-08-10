import { blogs } from '../data/blogs';
import { normalizeCategory } from './blog-categories';
import { createPost, listPosts } from './blog-db';

export async function seedLegacyBlogsIfEmpty(db: D1Database): Promise<number> {
    const existing = await listPosts(db);
    const existingSlugs = new Set(existing.map((post) => post.slug));

    let seeded = 0;
    for (const legacy of blogs) {
        if (existingSlugs.has(legacy.slug)) continue;

        const publishedAt = new Date(legacy.date).toISOString();
        await createPost(db, {
            title: legacy.title,
            slug: legacy.slug,
            excerpt: legacy.excerpt,
            content: legacy.content.trim(),
            featured_image: null,
            category: normalizeCategory(legacy.category),
            tags: legacy.tags ?? [],
            seo_title: legacy.title,
            meta_description: legacy.excerpt,
            canonical_url: `/blog/${legacy.slug}`,
            og_image: null,
            status: 'published',
            published_at: Number.isNaN(new Date(legacy.date).getTime()) ? new Date().toISOString() : publishedAt,
            scheduled_at: null,
            author: legacy.author,
        });
        seeded += 1;
    }
    return seeded;
}
