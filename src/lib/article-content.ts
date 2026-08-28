import { marked } from 'marked';

/** True when HTML already contains h2/h3 structure for TOC/anchors. */
export function htmlHasHeadingStructure(html: string): boolean {
    return /<h[23]\b/i.test(html);
}

/** True when markdown source includes heading lines. */
export function markdownHasHeadings(markdown: string): boolean {
    return /^#{2,3}\s+/m.test(markdown);
}

/** Portable Text sometimes flattens markdown headings into paragraph/br HTML. */
export function htmlContainsFlattenedMarkdownHeadings(html: string): boolean {
    return /<(?:p|div|span)[^>]*>[\s\S]*?#{2,3}\s+/i.test(html) || /(?:^|[>\n])#{2,3}\s+/m.test(html);
}

/** Strip basic article HTML back to markdown-friendly plain text. */
export function htmlToMarkdownishText(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
        .replace(/<\/li>\s*<li[^>]*>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

/**
 * Pick the best article HTML source: structured portable text/markdown HTML,
 * or legacy markdown when PT flattened headings into plain paragraphs.
 */
export function resolveArticleHtml(contentHtml?: string, content?: string): string {
    const html = contentHtml?.trim() ?? '';
    const markdown = content?.trim() ?? '';

    if (html && htmlHasHeadingStructure(html)) {
        return html;
    }

    if (markdown && markdownHasHeadings(markdown) && !htmlHasHeadingStructure(html)) {
        return marked.parse(markdown) as string;
    }

    if (html && !htmlHasHeadingStructure(html) && htmlContainsFlattenedMarkdownHeadings(html)) {
        const text = htmlToMarkdownishText(html);
        if (markdownHasHeadings(text)) {
            return marked.parse(text) as string;
        }
    }

    if (html) return html;
    if (markdown) return marked.parse(markdown) as string;
    return '';
}
