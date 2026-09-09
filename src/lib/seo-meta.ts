import { stripInvisibleSeoChars } from './seo-url';

export const SEO_TITLE_MAX = 60;
export const SEO_DESCRIPTION_MAX = 160;
export const DEFAULT_OG_IMAGE_PATH = '/og-default.png';
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

function collapseWhitespace(value: string): string {
    return stripInvisibleSeoChars(value).replace(/\s+/g, ' ').trim();
}

/** Keep titles inside typical SERP width; drop brand suffix before cutting words. */
export function formatSeoTitle(title: string): string {
    let next = collapseWhitespace(title);
    if (next.length <= SEO_TITLE_MAX) return next;
    next = next.replace(/\s*\|\s*Aizaz(?:\.studio| Studio)$/i, '').trim();
    if (next.length <= SEO_TITLE_MAX) return next;
    const cut = next.slice(0, SEO_TITLE_MAX);
    const space = cut.lastIndexOf(' ');
    return (space >= 36 ? cut.slice(0, space) : cut).replace(/[\s—–\-:;,]+$/u, '').trim();
}

/** Keep descriptions inside typical SERP width without a mid-word cut. */
export function formatSeoDescription(description: string): string {
    const next = collapseWhitespace(description);
    if (next.length <= SEO_DESCRIPTION_MAX) return next;
    const cut = next.slice(0, SEO_DESCRIPTION_MAX - 1);
    const space = cut.lastIndexOf(' ');
    const clipped = (space >= 100 ? cut.slice(0, space) : cut).replace(/[\s—–\-:;,]+$/u, '');
    return clipped.endsWith('.') ? clipped : `${clipped}.`;
}
