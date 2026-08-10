import type { ImageMetadata } from 'astro';
import { blogs as legacyBlogs, type BlogPost as LegacyBlogPost } from '../data/blogs';
import { normalizeCategory } from './blog-categories';
import {
    calculateReadTime,
    formatDisplayDate,
    getPostByPreviewToken,
    getPostBySlug,
    listPublishedPosts,
    parseTags,
    publishDueScheduledPosts,
    type BlogPostRow,
} from './blog-db';

export interface PublicBlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    dateIso: string;
    author: string;
    readTime: string;
    category: string;
    tags: string[];
    image?: ImageMetadata;
    imageUrl?: string;
    seoTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogImage?: string;
    updatedAt?: string;
    source: 'cms' | 'legacy';
    status?: string;
}

function mapLegacyPost(post: LegacyBlogPost): PublicBlogPost {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        dateIso: post.date,
        author: post.author,
        readTime: post.readTime,
        category: normalizeCategory(post.category),
        tags: post.tags ?? [],
        image: post.image,
        seoTitle: post.title,
        metaDescription: post.excerpt,
        canonicalUrl: `/blog/${post.slug}`,
        source: 'legacy',
        status: 'published',
    };
}

export function mapDbPost(row: BlogPostRow): PublicBlogPost {
    const publishedAt = row.published_at ?? row.created_at;
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        content: row.content,
        date: formatDisplayDate(publishedAt),
        dateIso: publishedAt,
        author: row.author,
        readTime: calculateReadTime(row.content),
        category: normalizeCategory(row.category),
        tags: parseTags(row.tags),
        imageUrl: row.featured_image ?? undefined,
        seoTitle: row.seo_title ?? row.title,
        metaDescription: row.meta_description ?? row.excerpt,
        canonicalUrl: row.canonical_url ?? `/blog/${row.slug}`,
        ogImage: row.og_image ?? row.featured_image ?? undefined,
        updatedAt: row.updated_at,
        source: 'cms',
        status: row.status,
    };
}

export async function getPublishedPosts(db?: D1Database): Promise<PublicBlogPost[]> {
    const cmsPosts = db ? (await listPublishedPosts(db)).map(mapDbPost) : [];
    const cmsSlugs = new Set(cmsPosts.map((post) => post.slug));
    const legacyPosts = legacyBlogs
        .filter((post) => !cmsSlugs.has(post.slug))
        .map(mapLegacyPost)
        .sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime());

    return [...cmsPosts, ...legacyPosts].sort(
        (a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime(),
    );
}

export async function getPublishedPostBySlug(
    db: D1Database | undefined,
    slug: string,
): Promise<PublicBlogPost | null> {
    if (db) {
        await publishDueScheduledPosts(db);
        const row = await getPostBySlug(db, slug);
        if (row && row.status === 'published' && row.published_at) {
            const publishedAt = new Date(row.published_at);
            if (!Number.isNaN(publishedAt.getTime()) && publishedAt.getTime() <= Date.now()) {
                return mapDbPost(row);
            }
        }
    }

    const legacy = legacyBlogs.find((post) => post.slug === slug);
    return legacy ? mapLegacyPost(legacy) : null;
}

export async function getPreviewPostByToken(
    db: D1Database | undefined,
    token: string,
): Promise<PublicBlogPost | null> {
    if (!db) return null;
    const row = await getPostByPreviewToken(db, token);
    return row ? mapDbPost(row) : null;
}

export function getRelatedPosts(posts: PublicBlogPost[], currentSlug: string, limit = 2): PublicBlogPost[] {
    const current = posts.find((post) => post.slug === currentSlug);
    const sameCategory = posts.filter(
        (post) => post.slug !== currentSlug && current && post.category === current.category,
    );
    const fallback = posts.filter((post) => post.slug !== currentSlug);
    return [...sameCategory, ...fallback].slice(0, limit);
}

export function buildArticleSchema(post: PublicBlogPost, siteUrl: string) {
    const image = post.ogImage ?? post.imageUrl;
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.seoTitle ?? post.title,
        description: post.metaDescription ?? post.excerpt,
        image: image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : undefined,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Aizaz Studio',
            url: siteUrl,
        },
        datePublished: post.dateIso,
        dateModified: post.updatedAt ?? post.dateIso,
        mainEntityOfPage: `${siteUrl}${post.canonicalUrl ?? `/blog/${post.slug}`}`,
    };
}
