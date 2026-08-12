import type { PublicBlogPost } from '../blog';
import { normalizeCategory } from '../blog-categories';
import { mapSanityAuthor } from './author';
import { calculateReadTime, formatDisplayDate } from '../blog-utils';
import { getSanityClient, urlForImage } from './client';
import { postBySlugQuery, publishedPostsQuery } from './queries';
import { mapSanitySeo, type PageSeo } from './seo';

type SanityPost = {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    category?: string;
    tags?: string[];
    author?: string | { _ref?: string };
    authorDoc?: Parameters<typeof mapSanityAuthor>[0];
    publishedAt?: string | null;
    _createdAt?: string;
    seo?: Parameters<typeof mapSanitySeo>[0];
    seoTitle?: string;
    metaDescription?: string;
    canonicalPath?: string;
    focusKeyword?: string;
    coverImage?: { asset?: { _ref?: string } };
    ogImage?: { asset?: { _ref?: string } };
    _updatedAt?: string;
};

function mapSanityPost(post: SanityPost): PublicBlogPost | null {
    if (!post.slug || !post.title) return null;

    const coverUrl = urlForImage(post.coverImage);
    const legacyAuthorName = typeof post.author === 'string' ? post.author : null;
    const author = mapSanityAuthor(post.authorDoc, legacyAuthorName);
    const publishedAt = post.publishedAt || post._updatedAt || post._createdAt || new Date().toISOString();
    const seo: PageSeo = mapSanitySeo(
        post.seo,
        {
            seoTitle: post.seoTitle,
            metaDescription: post.metaDescription,
            canonicalPath: post.canonicalPath,
            ogImage: post.ogImage,
            focusKeyword: post.focusKeyword,
        },
        {
            title: post.title,
            description: post.excerpt,
            canonicalPath: `/blog/${post.slug}`,
            ogImageUrl: coverUrl,
        },
    );

    return {
        id: post._id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt ?? '',
        content: post.body ?? '',
        date: formatDisplayDate(publishedAt),
        dateIso: publishedAt,
        author,
        readTime: calculateReadTime(post.body ?? ''),
        category: normalizeCategory(post.category ?? 'Engineering Insights'),
        tags: post.tags ?? [],
        imageUrl: coverUrl,
        seoTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        canonicalUrl: seo.canonicalPath,
        ogTitle: seo.ogTitle,
        ogDescription: seo.ogDescription,
        ogImage: seo.ogImageUrl,
        noindex: seo.noIndex ?? false,
        focusKeyword: seo.focusKeyword,
        updatedAt: post._updatedAt ?? publishedAt,
        source: 'cms',
        status: 'published',
    };
}

export async function getSanityPublishedPosts(): Promise<PublicBlogPost[]> {
    const client = getSanityClient();
    if (!client) return [];

    try {
        const posts = await client.fetch<SanityPost[]>(publishedPostsQuery);
        return posts.map(mapSanityPost).filter((post): post is PublicBlogPost => Boolean(post));
    } catch (error) {
        console.warn('[sanity] Failed to fetch published posts; using static fallback.', error);
        return [];
    }
}

export async function getSanityPostBySlug(slug: string): Promise<PublicBlogPost | null> {
    const client = getSanityClient();
    if (!client) return null;

    try {
        const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
        if (!post) return null;
        return mapSanityPost(post);
    } catch (error) {
        console.warn(`[sanity] Failed to fetch post "${slug}"; using static fallback.`, error);
        return null;
    }
}

export async function getSanityBlogSlugs(): Promise<string[]> {
    const posts = await getSanityPublishedPosts();
    return posts.map((post) => post.slug);
}
