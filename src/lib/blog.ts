import type { ImageMetadata } from 'astro';
import { blogs as legacyBlogs, type BlogPost as LegacyBlogPost } from '../data/blogs';
import type { ContentAuthor } from './sanity/author';
import { normalizeCategory } from './blog-categories';
import { isSanityConfigured } from './sanity/client';
import { getSanityPostBySlug, getSanityPublishedPosts } from './sanity/blog';

/** Debug / CMS smoke-test slugs — keep reachable, never index. */
export function isNonIndexableContentSlug(slug: string): boolean {
    return /sanity-test/i.test(slug) || /^test-/i.test(slug) || /-test$/i.test(slug) || /^demo-/i.test(slug);
}

export interface PublicBlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    dateIso: string;
    author?: ContentAuthor;
    readTime: string;
    category: string;
    tags: string[];
    image?: ImageMetadata;
    imageUrl?: string;
    seoTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    noindex?: boolean;
    focusKeyword?: string;
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

export async function getPublishedPosts(): Promise<PublicBlogPost[]> {
    const sanityPosts = isSanityConfigured() ? await getSanityPublishedPosts() : [];
    const sanitySlugs = new Set(sanityPosts.map((post) => post.slug));

    const legacyPosts = legacyBlogs
        .filter((post) => !sanitySlugs.has(post.slug))
        .map(mapLegacyPost)
        .sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime());

    return [...sanityPosts, ...legacyPosts]
        .map((post) =>
            isNonIndexableContentSlug(post.slug) ? { ...post, noindex: true } : post,
        )
        .sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime());
}

export async function getPublishedPostBySlug(slug: string): Promise<PublicBlogPost | null> {
    if (isSanityConfigured()) {
        const sanityPost = await getSanityPostBySlug(slug);
        if (sanityPost) return sanityPost;
    }

    const legacy = legacyBlogs.find((post) => post.slug === slug);
    return legacy ? mapLegacyPost(legacy) : null;
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
        ...(post.author
            ? {
                  author: {
                      '@type': 'Person',
                      name: post.author.name,
                      jobTitle: post.author.role,
                      ...(post.author.linkedin ? { sameAs: [post.author.linkedin] } : {}),
                  },
              }
            : {}),
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
