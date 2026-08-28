import type { ImageMetadata } from 'astro';
import { LEGACY_AUTHORS } from '../data/authors';
import { blogs as legacyBlogs, type BlogPost as LegacyBlogPost } from '../data/blogs';
import type { ContentAuthor } from './sanity/author';
import { normalizeCategory } from './blog-categories';
import { isNonIndexableContentSlug } from './blog-utils';
import { isSanityConfigured } from './sanity/client';
import { getSanityPostBySlug, getSanityPublishedPosts } from './sanity/blog';

export { isNonIndexableContentSlug } from './blog-utils';

export interface PublicBlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    contentHtml?: string;
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
    faqs?: { question: string; answer: string }[];
    updatedAt?: string;
    source: 'cms' | 'legacy';
    status?: string;
}

/** Posts safe for lists, related/prev-next, sitemap, and internal-link maps. */
export function isLinkableBlogPost(post: Pick<PublicBlogPost, 'slug' | 'noindex'>): boolean {
    return !post.noindex && !isNonIndexableContentSlug(post.slug);
}

export function getLinkablePosts(posts: PublicBlogPost[]): PublicBlogPost[] {
    return posts.filter(isLinkableBlogPost);
}

const LEGACY_SEO_TITLES: Record<string, string> = {
    'identify-workflows-worth-automating-with-ai':
        'How to Identify Workflows Worth Automating with AI | Aizaz Studio',
    'ai-automation-workflows-for-operations-teams':
        'AI Automation Workflow Examples for Operations Teams | Aizaz Studio',
};

function legacyDisplayDateToIso(display: string): string {
    const ms = Date.parse(display);
    if (Number.isNaN(ms)) return display;
    return new Date(ms).toISOString();
}

function mapLegacyPost(post: LegacyBlogPost): PublicBlogPost {
    const author = post.authorKey ? LEGACY_AUTHORS[post.authorKey] : undefined;
    const dateIso = legacyDisplayDateToIso(post.date);
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        dateIso,
        author,
        readTime: post.readTime,
        category: normalizeCategory(post.category),
        tags: post.tags ?? [],
        image: post.image,
        faqs: post.faqs,
        seoTitle: LEGACY_SEO_TITLES[post.slug] ?? post.title,
        metaDescription: post.excerpt,
        canonicalUrl: `/blog/${post.slug}`,
        updatedAt: post.updatedAt,
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
    const markIfNeeded = (post: PublicBlogPost): PublicBlogPost =>
        isNonIndexableContentSlug(post.slug) ? { ...post, noindex: true } : post;

    if (isSanityConfigured()) {
        const sanityPost = await getSanityPostBySlug(slug);
        if (sanityPost) return markIfNeeded(sanityPost);
    }

    const legacy = legacyBlogs.find((post) => post.slug === slug);
    return legacy ? markIfNeeded(mapLegacyPost(legacy)) : null;
}

export function getRelatedPosts(posts: PublicBlogPost[], currentSlug: string, limit = 2): PublicBlogPost[] {
    const linkable = getLinkablePosts(posts);
    const current = posts.find((post) => post.slug === currentSlug);
    const sameCategory = linkable.filter(
        (post) => post.slug !== currentSlug && current && post.category === current.category,
    );
    const fallback = linkable.filter((post) => post.slug !== currentSlug);
    return [...sameCategory, ...fallback].slice(0, limit);
}

/** Previous/next among linkable posts only (excludes noindex / sanity-test). */
export function getAdjacentPosts(
    posts: PublicBlogPost[],
    currentSlug: string,
): { previous: PublicBlogPost | null; next: PublicBlogPost | null } {
    const linkable = getLinkablePosts(posts);
    const index = linkable.findIndex((post) => post.slug === currentSlug);
    if (index === -1) return { previous: null, next: null };
    return {
        previous: index > 0 ? linkable[index - 1] : null,
        next: index < linkable.length - 1 ? linkable[index + 1] : null,
    };
}

export function buildArticleSchema(post: PublicBlogPost, siteUrl: string) {
    const image = post.ogImage ?? post.imageUrl;
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.seoTitle ?? post.title,
        description: post.metaDescription ?? post.excerpt,
        image: image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : undefined,
        ...(post.author
            ? {
                  author: {
                      '@type': 'Person',
                      name: post.author.name,
                      ...(post.author.role ? { jobTitle: post.author.role } : {}),
                      ...(post.author.photoUrl ? { image: post.author.photoUrl } : {}),
                      ...((() => {
                          const sameAs = [
                              post.author.linkedin,
                              post.author.xUrl,
                              post.author.githubUrl,
                          ].filter((url): url is string => Boolean(url));
                          return sameAs.length ? { sameAs } : {};
                      })()),
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
