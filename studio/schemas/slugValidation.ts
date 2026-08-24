/** Shared slug validation for Sanity Studio document types. */
export function validateContentSlug(value: string | undefined, context: 'blog' | 'author'): string | true {
    if (!value?.trim()) return 'Slug is required';
    const slug = value.trim();

    if (/^Slug:/i.test(slug)) {
        return 'Remove the "Slug:" prefix — enter only the slug segment (e.g. my-post-title).';
    }
    if (slug.includes(' ')) {
        return 'Slugs cannot contain spaces. Use hyphens instead.';
    }
    if (slug.startsWith('/')) {
        return 'Enter the slug only, without a leading slash.';
    }
    if (slug.includes('/blog/') || slug.startsWith('blog/')) {
        return context === 'blog'
            ? 'Enter only the post slug — not the full /blog/… path.'
            : 'Enter only the author slug segment.';
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        return 'Use lowercase letters, numbers, and hyphens only.';
    }
    return true;
}

export function validateCanonicalPath(value: string | undefined, slug?: string): string | true {
    if (!value?.trim()) return true;
    const path = value.trim();
    if (!path.startsWith('/')) return 'Canonical path must start with / (e.g. /blog/my-post).';
    if (/\s/.test(path)) return 'Canonical path cannot contain spaces.';
    if (slug && path === `/blog/${slug}`) return true;
    if (path.includes('/blog/Slug:')) return 'Fix the slug first — canonical path should not include malformed slug text.';
    return true;
}
