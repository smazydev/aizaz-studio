export type BlogStatus = 'draft' | 'scheduled' | 'published';

export interface BlogPostRow {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string | null;
    category: string;
    tags: string;
    seo_title: string | null;
    meta_description: string | null;
    canonical_url: string | null;
    og_image: string | null;
    status: BlogStatus;
    published_at: string | null;
    scheduled_at: string | null;
    preview_token: string | null;
    author: string;
    created_at: string;
    updated_at: string;
}

export interface BlogPostInput {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image?: string | null;
    category: string;
    tags: string[];
    seo_title?: string | null;
    meta_description?: string | null;
    canonical_url?: string | null;
    og_image?: string | null;
    status: BlogStatus;
    published_at?: string | null;
    scheduled_at?: string | null;
    author?: string;
}

export function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export function parseTags(raw: string | string[] | null | undefined): string[] {
    if (Array.isArray(raw)) return raw.filter(Boolean);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw) as unknown;
        return Array.isArray(parsed) ? parsed.filter((tag) => typeof tag === 'string') : [];
    } catch {
        return raw
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);
    }
}

export function serializeTags(tags: string[]): string {
    return JSON.stringify(tags.filter(Boolean));
}

export function calculateReadTime(content: string): string {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 220));
    return `${minutes} min read`;
}

export function formatDisplayDate(isoDate: string | null | undefined): string {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export async function publishDueScheduledPosts(db: D1Database): Promise<number> {
    const result = await db
        .prepare(
            `UPDATE blog_posts
             SET status = 'published',
                 published_at = COALESCE(scheduled_at, datetime('now')),
                 updated_at = datetime('now')
             WHERE status = 'scheduled'
               AND scheduled_at IS NOT NULL
               AND datetime(scheduled_at) <= datetime('now')`,
        )
        .run();
    return result.meta.changes ?? 0;
}

export async function getPostById(db: D1Database, id: string): Promise<BlogPostRow | null> {
    return db.prepare('SELECT * FROM blog_posts WHERE id = ?').bind(id).first<BlogPostRow>();
}

export async function getPostBySlug(db: D1Database, slug: string): Promise<BlogPostRow | null> {
    return db.prepare('SELECT * FROM blog_posts WHERE slug = ?').bind(slug).first<BlogPostRow>();
}

export async function getPostByPreviewToken(db: D1Database, token: string): Promise<BlogPostRow | null> {
    return db.prepare('SELECT * FROM blog_posts WHERE preview_token = ?').bind(token).first<BlogPostRow>();
}

export async function listPosts(db: D1Database, status?: BlogStatus): Promise<BlogPostRow[]> {
    if (status) {
        const result = await db
            .prepare('SELECT * FROM blog_posts WHERE status = ? ORDER BY updated_at DESC')
            .bind(status)
            .all<BlogPostRow>();
        return result.results ?? [];
    }
    const result = await db.prepare('SELECT * FROM blog_posts ORDER BY updated_at DESC').all<BlogPostRow>();
    return result.results ?? [];
}

export async function listPublishedPosts(db: D1Database): Promise<BlogPostRow[]> {
    await publishDueScheduledPosts(db);
    const result = await db
        .prepare(
            `SELECT * FROM blog_posts
             WHERE status = 'published'
               AND published_at IS NOT NULL
               AND datetime(published_at) <= datetime('now')
             ORDER BY datetime(published_at) DESC`,
        )
        .all<BlogPostRow>();
    return result.results ?? [];
}

export async function countPostsByStatus(db: D1Database): Promise<Record<BlogStatus, number>> {
    const result = await db
        .prepare('SELECT status, COUNT(*) as count FROM blog_posts GROUP BY status')
        .all<{ status: BlogStatus; count: number }>();
    const counts: Record<BlogStatus, number> = {
        draft: 0,
        scheduled: 0,
        published: 0,
    };
    for (const row of result.results ?? []) {
        counts[row.status] = row.count;
    }
    return counts;
}

export async function createPost(db: D1Database, input: BlogPostInput): Promise<BlogPostRow> {
    const id = crypto.randomUUID();
    const previewToken = crypto.randomUUID().replace(/-/g, '');
    const now = new Date().toISOString();
    await db
        .prepare(
            `INSERT INTO blog_posts (
                id, title, slug, excerpt, content, featured_image, category, tags,
                seo_title, meta_description, canonical_url, og_image, status,
                published_at, scheduled_at, preview_token, author, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
            id,
            input.title,
            input.slug,
            input.excerpt,
            input.content,
            input.featured_image ?? null,
            input.category,
            serializeTags(input.tags),
            input.seo_title ?? null,
            input.meta_description ?? null,
            input.canonical_url ?? null,
            input.og_image ?? null,
            input.status,
            input.published_at ?? null,
            input.scheduled_at ?? null,
            previewToken,
            input.author ?? 'Aizaz K.',
            now,
            now,
        )
        .run();
    const created = await getPostById(db, id);
    if (!created) throw new Error('Failed to create blog post');
    return created;
}

export async function updatePost(db: D1Database, id: string, input: BlogPostInput): Promise<BlogPostRow> {
    const existing = await getPostById(db, id);
    if (!existing) throw new Error('Post not found');
    const now = new Date().toISOString();
    await db
        .prepare(
            `UPDATE blog_posts SET
                title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?, category = ?, tags = ?,
                seo_title = ?, meta_description = ?, canonical_url = ?, og_image = ?, status = ?,
                published_at = ?, scheduled_at = ?, author = ?, updated_at = ?
             WHERE id = ?`,
        )
        .bind(
            input.title,
            input.slug,
            input.excerpt,
            input.content,
            input.featured_image ?? null,
            input.category,
            serializeTags(input.tags),
            input.seo_title ?? null,
            input.meta_description ?? null,
            input.canonical_url ?? null,
            input.og_image ?? null,
            input.status,
            input.published_at ?? null,
            input.scheduled_at ?? null,
            input.author ?? existing.author,
            now,
            id,
        )
        .run();
    const updated = await getPostById(db, id);
    if (!updated) throw new Error('Failed to update blog post');
    return updated;
}

export async function deletePost(db: D1Database, id: string): Promise<void> {
    await db.prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run();
}

export async function slugExists(db: D1Database, slug: string, excludeId?: string): Promise<boolean> {
    const row = excludeId
        ? await db.prepare('SELECT id FROM blog_posts WHERE slug = ? AND id != ?').bind(slug, excludeId).first()
        : await db.prepare('SELECT id FROM blog_posts WHERE slug = ?').bind(slug).first();
    return Boolean(row);
}
