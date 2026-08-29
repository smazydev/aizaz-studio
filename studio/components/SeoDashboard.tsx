import { useEffect, useState } from 'react';
import { useClient } from 'sanity';

/** Public legacy/code case studies (excludes hidden entries like InvestorsGoneWild). */
const LEGACY_CODE_CASE_STUDY_COUNT = 4;

type PostRow = {
    _id: string;
    title?: string;
    slug?: { current?: string };
    metaDescription?: string;
    seoTitle?: string;
    focusKeyword?: string;
    publishedAt?: string;
    ogImage?: unknown;
    author?: { _ref?: string };
    authorLegacy?: string;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        focusKeyword?: string;
        ogImage?: unknown;
        canonicalPath?: string;
    };
};

type CaseStudyRow = {
    _id: string;
    title?: string;
    seoDescription?: string;
    seoTitle?: string;
    focusKeyword?: string;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        focusKeyword?: string;
        ogImage?: unknown;
    };
};

type DashboardStats = {
    posts: PostRow[];
    caseStudies: CaseStudyRow[];
};

const cardStyle: React.CSSProperties = {
    background: '#111',
    border: '1px solid #2a2a2a',
    borderRadius: 12,
    padding: 16,
};

function postMeta(post: PostRow) {
    return post.seo?.metaDescription || post.metaDescription;
}

function postTitle(post: PostRow) {
    return post.seo?.metaTitle || post.seoTitle;
}

function postOg(post: PostRow) {
    return post.seo?.ogImage || post.ogImage;
}

function postKeyword(post: PostRow) {
    return post.seo?.focusKeyword || post.focusKeyword;
}

function studyTitle(study: CaseStudyRow) {
    return study.seo?.metaTitle || study.seoTitle;
}

function studyDesc(study: CaseStudyRow) {
    return study.seo?.metaDescription || study.seoDescription;
}

function isMalformedSlug(slug?: string): boolean {
    if (!slug?.trim()) return true;
    if (/^Slug:/i.test(slug)) return true;
    if (/\s/.test(slug)) return true;
    if (slug.startsWith('/') || slug.includes('/blog/')) return true;
    return false;
}

export function SeoDashboard() {
    const client = useClient({ apiVersion: '2024-01-01' });
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const [posts, caseStudies] = await Promise.all([
                    client.fetch<PostRow[]>(
                        `*[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
              _id, title, slug, metaDescription, seoTitle, focusKeyword, publishedAt, ogImage, author, authorLegacy,
              seo{ metaTitle, metaDescription, focusKeyword, ogImage, canonicalPath }
            }`,
                    ),
                    client.fetch<CaseStudyRow[]>(
                        `*[_type == "caseStudy"] | order(_updatedAt desc) {
              _id, title, seoDescription, seoTitle, focusKeyword,
              seo{ metaTitle, metaDescription, focusKeyword, ogImage }
            }`,
                    ),
                ]);

                if (!cancelled) {
                    setStats({ posts, caseStudies });
                }
            } catch (loadError) {
                if (!cancelled) {
                    setError(loadError instanceof Error ? loadError.message : 'Failed to load dashboard');
                }
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [client]);

    if (error) {
        return <p style={{ color: '#f87171' }}>{error}</p>;
    }

    if (!stats) {
        return <p>Loading SEO dashboard…</p>;
    }

    const postsMissingMeta = stats.posts.filter((post) => !postMeta(post)?.trim());
    const postsMissingTitle = stats.posts.filter((post) => !postTitle(post)?.trim());
    const postsMissingOg = stats.posts.filter((post) => !postOg(post));
    const postsMissingKeyword = stats.posts.filter((post) => !postKeyword(post)?.trim());
    const postsMissingAuthor = stats.posts.filter((post) => !post.author?._ref && !post.authorLegacy?.trim());
    const postsMalformedSlug = stats.posts.filter((post) => isMalformedSlug(post.slug?.current));
    const caseStudiesMissingSeo = stats.caseStudies.filter(
        (study) => !studyDesc(study)?.trim() || !studyTitle(study)?.trim(),
    );
    const caseStudiesMissingOg = stats.caseStudies.filter((study) => !(study.seo?.ogImage || study.seoTitle));

    const seoIssueCount =
        postsMissingMeta.length +
        postsMissingTitle.length +
        postsMissingOg.length +
        postsMissingAuthor.length +
        postsMalformedSlug.length +
        caseStudiesMissingSeo.length;

    return (
        <div style={{ display: 'grid', gap: 20, padding: 24, maxWidth: 1100 }}>
            <div>
                <h2 style={{ margin: 0, fontSize: 28 }}>SEO & Content Dashboard</h2>
                <p style={{ color: '#a1a1aa', marginTop: 8 }}>
                    Editorial safety checks for Sanity content. Service and landing pages remain in code until Phase 2.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                <div style={cardStyle}>
                    <div style={{ color: '#a1a1aa', fontSize: 12 }}>Published posts</div>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.posts.length}</div>
                </div>
                <div style={cardStyle}>
                    <div style={{ color: '#a1a1aa', fontSize: 12 }}>Sanity case studies</div>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.caseStudies.length}</div>
                    <div style={{ color: '#71717a', fontSize: 11, marginTop: 4 }}>
                        Legacy code case studies: {LEGACY_CODE_CASE_STUDY_COUNT}
                    </div>
                </div>
                <div style={cardStyle}>
                    <div style={{ color: '#a1a1aa', fontSize: 12 }}>SEO issues</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: '#fbbf24' }}>{seoIssueCount}</div>
                </div>
            </div>

            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                <IssueList
                    title="Posts missing SEO title"
                    items={postsMissingTitle.map((post) => post.title || post.slug?.current || post._id)}
                />
                <IssueList
                    title="Posts missing meta description"
                    items={postsMissingMeta.map((post) => post.title || post.slug?.current || post._id)}
                />
                <IssueList
                    title="Posts missing OG image"
                    items={postsMissingOg.map((post) => post.title || post.slug?.current || post._id)}
                />
                <IssueList
                    title="Posts missing focus keyword"
                    items={postsMissingKeyword.map((post) => post.title || post.slug?.current || post._id)}
                />
                <IssueList
                    title="Posts missing author reference"
                    items={postsMissingAuthor.map((post) => post.title || post.slug?.current || post._id)}
                />
                <IssueList
                    title="Posts with malformed slug"
                    items={postsMalformedSlug.map((post) => post.title || post.slug?.current || post._id)}
                />
                <IssueList
                    title="Case studies missing SEO title/description"
                    items={caseStudiesMissingSeo.map((study) => study.title || study._id)}
                />
                <IssueList
                    title="Case studies missing OG image"
                    items={caseStudiesMissingOg.map((study) => study.title || study._id)}
                />
            </div>

            <div style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>External SEO tools</h3>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#d4d4d8' }}>
                    <li>
                        <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer">
                            Google Search Console
                        </a>{' '}
                        — rankings, clicks, indexing
                    </li>
                    <li>
                        <a href="https://www.bing.com/webmasters" target="_blank" rel="noreferrer">
                            Bing Webmaster Tools
                        </a>{' '}
                        — IndexNow, sitemap
                    </li>
                    <li>
                        <a href="https://aizaz.studio/sitemap.xml" target="_blank" rel="noreferrer">
                            Live sitemap
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function IssueList({ title, items }: { title: string; items: string[] }) {
    return (
        <div style={cardStyle}>
            <h3 style={{ marginTop: 0, fontSize: 16 }}>{title}</h3>
            {items.length === 0 ? (
                <p style={{ color: '#4ade80', margin: 0 }}>All good</p>
            ) : (
                <ul style={{ margin: 0, paddingLeft: 18, color: '#d4d4d8' }}>
                    {items.slice(0, 8).map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                    {items.length > 8 && <li>+{items.length - 8} more</li>}
                </ul>
            )}
        </div>
    );
}
