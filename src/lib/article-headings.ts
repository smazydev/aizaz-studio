export type ArticleHeading = {
    level: 2 | 3;
    id: string;
    text: string;
};

/** Strip HTML tags from a fragment. */
export function stripHtmlTags(html: string): string {
    return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/** Decode common HTML entities for display labels and slug input. */
export function decodeHtmlEntities(text: string): string {
    let decoded = text
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
    return decoded;
}

/** Deterministic slug for TOC hrefs and heading id attributes. */
export function slugifyHeading(text: string): string {
    const decoded = decodeHtmlEntities(stripHtmlTags(text));
    const slug = decoded
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return slug || 'section';
}

function uniqueHeadingId(base: string, used: Map<string, number>): string {
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
}

/** Assign id attributes to h2/h3 in article HTML (single source of truth for anchors). */
export function injectArticleHeadingIds(html: string): string {
    const used = new Map<string, number>();
    return html.replace(/<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi, (match, level, attrs = '', inner) => {
        const text = stripHtmlTags(inner);
        const id = uniqueHeadingId(slugifyHeading(text), used);
        const cleanAttrs = String(attrs).replace(/\sid=(['"])[^'"]*\1/i, '');
        return `<h${level}${cleanAttrs} id="${id}">${inner}</h${level}>`;
    });
}

/** Read h2/h3 headings (with ids) from rendered article HTML for TOC. */
export function extractArticleHeadings(html: string): ArticleHeading[] {
    const headings: ArticleHeading[] = [];
    const pattern = /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(html)) !== null) {
        const level = Number(match[1]) as 2 | 3;
        const attrs = match[2] ?? '';
        const inner = match[3];
        const idMatch = attrs.match(/\sid=(['"])([^'"]+)\1/i);
        const text = decodeHtmlEntities(stripHtmlTags(inner));
        const id = idMatch?.[2] ?? slugifyHeading(text);
        headings.push({ level, id, text });
    }
    return headings;
}
