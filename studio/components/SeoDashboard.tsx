import { useEffect, useState } from 'react';
import { useClient } from 'sanity';

type PostRow = {
    _id: string;
    title?: string;
    slug?: { current?: string };
    metaDescription?: string;
    seoTitle?: string;
    focusKeyword?: string;
    publishedAt?: string;
    ogImage?: unknown;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        focusKeyword?: string;
        ogImage?: unknown;
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
              _id, title, slug, metaDescription, seoTitle, focusKeyword, publishedAt, ogImage,
              seo{ metaTitle, metaDescription, focusKeyword, ogImage }
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
    const postsMissingOg = stats.posts.filter((post) => !postOg(post));
    const postsMissingKeyword = stats.posts.filter((post) => !postKeyword(post)?.trim());
    const caseStudiesMissingSeo = stats.caseStudies.filter(
        (study) => !studyDesc(study)?.trim() || !studyTitle(study)?.trim(),
    );

    return (
        <div style={{ display: 'grid', gap: 20, padding: 24, maxWidth: 1100 }}>
            <div>
                <h2 style={{ margin: 0, fontSize: 28 }}>SEO & Content Dashboard</h2>
                <p style={{ color: '#a1a1aa', marginTop: 8 }}>
                    Track published content health. Blog and case studies are editable in Sanity. Service and landing
                    pages remain in code until Phase 2.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                <div style={cardStyle}>
                    <div style={{ color: '#a1a1aa', fontSize: 12 }}>Published posts</div>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.posts.length}</div>
                </div>
                <div style={cardStyle}>
                    <div style={{ color: '#a1a1aa', fontSize: 12 }}>Case studies</div>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.caseStudies.length}</div>
                </div>
                <div style={cardStyle}>
                    <div style={{ color: '#a1a1aa', fontSize: 12 }}>SEO issues</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: '#fbbf24' }}>
                        {postsMissingMeta.length + postsMissingOg.length + caseStudiesMissingSeo.length}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
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
                    title="Case studies missing SEO title/description"
                    items={caseStudiesMissingSeo.map((study) => study.title || study._id)}
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
                        <a href="https://pagespeed.web.dev/" target="_blank" rel="noreferrer">
                            PageSpeed Insights
                        </a>{' '}
                        — Core Web Vitals
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
