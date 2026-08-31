import { objectPositionFromHotspot, urlForImage, type SanityImageSource } from './client';
import { sanityImageProjection } from './image';

export interface ContentAuthor {
    id: string;
    name: string;
    role?: string;
    bio?: string;
    photoUrl?: string;
    photoObjectPosition?: string;
    photoAlt?: string;
    linkedin?: string;
    xUrl?: string;
    githubUrl?: string;
}

export type SanityPersonDoc = {
    _id?: string;
    name?: string | null;
    slug?: string | null;
    shortName?: string | null;
    role?: string | null;
    bio?: string | null;
    focus?: string[] | null;
    order?: number | null;
    showOnTeam?: boolean | null;
    featuredOnHomepage?: boolean | null;
    linkedin?: string | null;
    xUrl?: string | null;
    githubUrl?: string | null;
    photo?: SanityImageSource | null;
};

function pickOptionalUrl(value: string | null | undefined): string | undefined {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}

function pickOptionalText(value: string | null | undefined): string | undefined {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}

/** Shared person fields for Author + Team (same Sanity document). */
export const personSelection = `
    _id,
    name,
    "slug": slug.current,
    shortName,
    role,
    bio,
    focus,
    order,
    showOnTeam,
    featuredOnHomepage,
    linkedin,
    xUrl,
    githubUrl,
    photo${sanityImageProjection}
`;

/** Accept person document, or legacy string author values from older posts. */
export function mapSanityAuthor(
    authorDoc: SanityPersonDoc | null | undefined,
    legacyName?: string | null,
): ContentAuthor | undefined {
    const docName = pickOptionalText(authorDoc?.name);
    if (docName) {
        const photo = authorDoc?.photo ?? undefined;
        return {
            id: authorDoc?._id || `person:${docName}`,
            name: docName,
            role: pickOptionalText(authorDoc?.role),
            bio: pickOptionalText(authorDoc?.bio),
            photoUrl: urlForImage(photo, 256, { height: 256 }),
            photoObjectPosition: photo?.hotspot
                ? objectPositionFromHotspot(photo.hotspot, '50% 32%')
                : undefined,
            photoAlt: pickOptionalText(photo?.alt) || docName,
            linkedin: pickOptionalUrl(authorDoc?.linkedin),
            xUrl: pickOptionalUrl(authorDoc?.xUrl),
            githubUrl: pickOptionalUrl(authorDoc?.githubUrl),
        };
    }

    if (typeof legacyName === 'string' && legacyName.trim()) {
        return {
            id: `string:${legacyName.trim()}`,
            name: legacyName.trim(),
        };
    }

    return undefined;
}

export const authorProjection = `
  author,
  authorLegacy,
  "authorDoc": author->{
    ${personSelection}
  }
`;
