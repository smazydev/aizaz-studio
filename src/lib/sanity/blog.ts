import type { PublicBlogPost } from '../blog';
import { normalizeCategory } from '../blog-categories';
import { calculateReadTime, formatDisplayDate } from '../blog-utils';
import { getSanityClient, urlForImage } from './client';
import { postBySlugQuery, publishedPostsQuery } from './queries';

type SanityPost = {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    category?: string;
    tags?: string[];
    author?: string;
    publishedAt: string;
    seoTitle?: string;
    metaDescription?: string;
    canonicalPath?: string;
    focusKeyword?: string;
    coverImage?: { asset?: { _ref?: string } };
    ogImage?: { asset?: { _ref?: string } };
    _updatedAt?: string;
};

function mapSanityPost(post: SanityPost): PublicBlogPost {
    const coverUrl = urlForImage(post.coverImage);
    const ogUrl = urlForImage(post.ogImage) ?? coverUrl;

    return {
        id: post._id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.body,
        date: formatDisplayDate(post.publishedAt),
        dateIso: post.publishedAt,
        author: post.author ?? 'Aizaz K.',
        readTime: calculateReadTime(post.body),
        category: normalizeCategory(post.category ?? 'Engineering Insights'),
        tags: post.tags ?? [],
        imageUrl: coverUrl,
        seoTitle: post.seoTitle ?? post.title,
        metaDescription: post.metaDescription ?? post.excerpt,
        canonicalUrl: post.canonicalPath ?? `/blog/${post.slug}`,
        ogImage: ogUrl,
        updatedAt: post._updatedAt ?? post.publishedAt,
        source: 'cms',
        status: 'published',
    };
}

export async function getSanityPublishedPosts(): Promise<PublicBlogPost[]> {
    const client = getSanityClient();
    if (!client) return [];

    const posts = await client.fetch<SanityPost[]>(publishedPostsQuery);
    return posts.map(mapSanityPost);
}

export async function getSanityPostBySlug(slug: string): Promise<PublicBlogPost | null> {
    const client = getSanityClient();
    if (!client) return null;

    const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
    return post ? mapSanityPost(post) : null;
}

export async function getSanityBlogSlugs(): Promise<string[]> {
    const posts = await getSanityPublishedPosts();
    return posts.map((post) => post.slug);
}
