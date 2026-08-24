import { toHTML, type PortableTextComponents } from '@portabletext/to-html';
import { urlForImage } from './sanity/client';

export type PortableTextBlock = Record<string, unknown>;

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

const components: PortableTextComponents = {
    types: {
        bodyImage: ({ value }) => {
            const imageValue = value as {
                image?: { asset?: { _ref?: string } };
                alt?: string;
                caption?: string;
                sourceUrl?: string;
            };
            const src = urlForImage(imageValue.image, 1400);
            if (!src) return '';
            const alt = escapeHtml(imageValue.alt?.trim() || '');
            const caption = imageValue.caption?.trim();
            const sourceUrl = imageValue.sourceUrl?.trim();
            const img = `<img src="${escapeHtml(src)}" alt="${alt}" loading="lazy" decoding="async" width="1400" height="788" class="w-full h-auto rounded-xl" />`;
            const captionHtml = caption
                ? `<figcaption class="mt-3 text-sm text-zinc-500 text-center">${escapeHtml(caption)}${
                      sourceUrl
                          ? ` · <a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300">Source</a>`
                          : ''
                  }</figcaption>`
                : '';
            return `<figure class="my-10">${img}${captionHtml}</figure>`;
        },
    },
    marks: {
        link: ({ children, value }) => {
            const href = (value as { href?: string })?.href?.trim() || '#';
            const safeHref = escapeHtml(href);
            return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${children}</a>`;
        },
        code: ({ children }) => `<code>${children}</code>`,
    },
    block: {
        h2: ({ children }) => `<h2>${children}</h2>`,
        h3: ({ children }) => `<h3>${children}</h3>`,
        h4: ({ children }) => `<h4>${children}</h4>`,
        blockquote: ({ children }) => `<blockquote>${children}</blockquote>`,
    },
};

export function portableTextToHtml(blocks: PortableTextBlock[] | null | undefined): string {
    if (!blocks?.length) return '';
    try {
        return toHTML(blocks, { components });
    } catch (error) {
        console.warn('[portable-text] Failed to render body blocks', error);
        return '';
    }
}

export function estimatePortableTextReadTime(blocks: PortableTextBlock[] | null | undefined): string {
    if (!blocks?.length) return '1 min read';
    const text = blocks
        .flatMap((block) => {
            if (block._type !== 'block' || !Array.isArray(block.children)) return [];
            return block.children
                .filter((child): child is { text?: string } => Boolean(child && typeof child === 'object'))
                .map((child) => child.text ?? '');
        })
        .join(' ');
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 220));
    return `${minutes} min read`;
}
