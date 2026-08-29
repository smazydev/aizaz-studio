import { urlForImage } from './client';

export interface PageSeo {
    metaTitle?: string;
    metaDescription?: string;
    canonicalPath?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImageUrl?: string;
    noIndex?: boolean;
    focusKeyword?: string;
}

type SanityImage = { asset?: { _ref?: string } };

type SanitySeoFields = {
    metaTitle?: string;
    metaDescription?: string;
    canonicalPath?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: SanityImage;
    noIndex?: boolean;
    focusKeyword?: string;
};

/** Map shared `seoFields` object, with optional legacy flat-field fallbacks. */
export function mapSanitySeo(
    seo: SanitySeoFields | null | undefined,
    legacy?: {
        seoTitle?: string;
        metaDescription?: string;
        seoDescription?: string;
        canonicalPath?: string;
        ogImage?: SanityImage;
        focusKeyword?: string;
    },
    fallbacks?: {
        title?: string;
        description?: string;
        canonicalPath?: string;
        ogImageUrl?: string;
    },
): PageSeo {
    const metaTitle = seo?.metaTitle || legacy?.seoTitle || fallbacks?.title;
    const metaDescription =
        seo?.metaDescription || legacy?.metaDescription || legacy?.seoDescription || fallbacks?.description;
    const canonicalPath = seo?.canonicalPath || legacy?.canonicalPath || fallbacks?.canonicalPath;
    const ogImageUrl =
        urlForImage(seo?.ogImage) || urlForImage(legacy?.ogImage) || fallbacks?.ogImageUrl;

    return {
        metaTitle,
        metaDescription,
        canonicalPath,
        ogTitle: seo?.ogTitle || metaTitle,
        ogDescription: seo?.ogDescription || metaDescription,
        ogImageUrl,
        noIndex: seo?.noIndex ?? false,
        focusKeyword: seo?.focusKeyword || legacy?.focusKeyword,
    };
}

export const seoProjection = `seo{
  metaTitle,
  metaDescription,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage,
  noIndex,
  focusKeyword
}`;
