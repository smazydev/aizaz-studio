import type { PublicBlogPost } from '../blog';
import { normalizeCategory } from '../blog-categories';
import {
    calculateReadTime,
    formatDisplayDate,
    isMalformedBlogSlug,
    isNonIndexableContentSlug,
    normalizeBlogSlug,
} from '../blog-utils';
import { estimatePortableTextReadTime, portableTextToHtml, type PortableTextBlock } from '../portable-text';
import { mapSanityAuthor } from './author';
import { getSanityClient, cachedSanityFetch, urlForImage } from './client';
import { postBySlugQuery, publishedPostsQuery } from './queries';
import { mapSanitySeo, type PageSeo } from './seo';

type SanityPost = {
    _id: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    body?: string;
    bodyBlocks?: PortableTextBlock[];
    category?: string;
    tags?: string[];
    author?: string | { _ref?: string };
    authorLegacy?: string | null;
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
    faqs?: Array<{
        question?: string | null;
        answer?: string | null;
        enabled?: boolean | null;
    }> | null;
    _updatedAt?: string;
};

function normalizeFaqs(
    faqs: SanityPost['faqs'],
): { question: string; answer: string }[] {
    if (!Array.isArray(faqs)) return [];
    return faqs
        .filter((item) => item?.enabled !== false)
        .map((item) => ({
            question: item?.question?.trim() ?? '',
            answer: item?.answer?.trim() ?? '',
        }))
        .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

function mapSanityPost(post: SanityPost): PublicBlogPost | null {
    const rawSlug = post.slug?.trim();
    if (!rawSlug || !post.title?.trim()) return null;
    if (isMalformedBlogSlug(rawSlug)) return null;

    const slug = normalizeBlogSlug(rawSlug);
    const coverUrl = urlForImage(post.coverImage);
    const legacyAuthorName =
        post.authorLegacy?.trim() ||
        (typeof post.author === 'string' ? post.author : null);
    const author = mapSanityAuthor(post.authorDoc, legacyAuthorName);
    const publishedAt = post.publishedAt || post._updatedAt || post._createdAt || new Date().toISOString();
    const bodyHtml = portableTextToHtml(post.bodyBlocks);
    const markdownBody = post.body ?? '';
    const content = bodyHtml || markdownBody;
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
            description: post.excerpt ?? '',
            canonicalPath: `/blog/${slug}`,
            ogImageUrl: coverUrl,
        },
    );

    return {
        id: post._id,
        slug,
        title: post.title,
        excerpt: post.excerpt ?? '',
        content,
        contentHtml: bodyHtml || undefined,
        date: formatDisplayDate(publishedAt),
        dateIso: publishedAt,
        author,
        readTime: bodyHtml
            ? estimatePortableTextReadTime(post.bodyBlocks)
            : calculateReadTime(markdownBody),
        category: normalizeCategory(post.category ?? 'Engineering Insights'),
        tags: post.tags ?? [],
        imageUrl: coverUrl,
        seoTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        canonicalUrl: seo.canonicalPath,
        ogTitle: seo.ogTitle,
        ogDescription: seo.ogDescription,
        ogImage: seo.ogImageUrl,
        noindex: (seo.noIndex ?? false) || isNonIndexableContentSlug(slug),
        focusKeyword: seo.focusKeyword,
        faqs: normalizeFaqs(post.faqs),
        updatedAt: post._updatedAt ?? publishedAt,
        source: 'cms',
        status: 'published',
    };
}

export async function getSanityPublishedPosts(): Promise<PublicBlogPost[]> {
    const client = getSanityClient();
    if (!client) return [];

    try {
        const posts = await cachedSanityFetch('posts:all', () => client.fetch<SanityPost[]>(publishedPostsQuery));
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
        const post = await cachedSanityFetch(`posts:slug:${slug}`, () =>
            client.fetch<SanityPost | null>(postBySlugQuery, { slug }),
        );
        if (!post) return null;
        return mapSanityPost(post);
    } catch (error) {
        console.warn(`[sanity] Failed to fetch post "${slug}"; using static fallback.`, error);
        return null;
    }
}

export async function getSanityBlogSlugs(): Promise<string[]> {
    const posts = await getSanityPublishedPosts();
    return posts.filter((post) => !post.noindex).map((post) => post.slug);
}
