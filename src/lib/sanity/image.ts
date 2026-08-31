import {
    objectPositionFromHotspot,
    urlForImage,
    type SanityImageSource,
    type UrlForImageOptions,
} from './client';

export type ManagedImage = {
    url: string;
    alt?: string;
    caption?: string;
    objectPosition?: string;
};

function pickOptionalText(value: string | null | undefined): string | undefined {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}

/** Map a Sanity image (asset + hotspot/crop + alt/caption) for existing <img> / CSS consumers. */
export function mapManagedImage(
    source: SanityImageSource | null | undefined,
    width = 1600,
    options?: UrlForImageOptions,
): ManagedImage | undefined {
    const url = urlForImage(source ?? undefined, width, options);
    if (!url) return undefined;
    return {
        url,
        alt: pickOptionalText(source?.alt),
        caption: pickOptionalText(source?.caption),
        objectPosition: source?.hotspot
            ? objectPositionFromHotspot(source.hotspot)
            : undefined,
    };
}

export const sanityImageProjection = `{
  asset,
  crop,
  hotspot,
  alt,
  caption
}`;
