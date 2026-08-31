import { urlForImage } from './client';

export interface ContentAuthor {
    id: string;
    name: string;
    role?: string;
    bio?: string;
    photoUrl?: string;
    photoObjectPosition?: string;
    linkedin?: string;
    xUrl?: string;
    githubUrl?: string;
}

type SanityAuthorDoc = {
    _id?: string;
    name?: string | null;
    role?: string | null;
    bio?: string | null;
    linkedin?: string | null;
    xUrl?: string | null;
    githubUrl?: string | null;
    photo?: { asset?: { _ref?: string } } | null;
};

function pickOptionalUrl(value: string | null | undefined): string | undefined {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}

function pickOptionalText(value: string | null | undefined): string | undefined {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}

/** Accept person document, or legacy string author values from older posts. */
export function mapSanityAuthor(
    authorDoc: SanityAuthorDoc | null | undefined,
    legacyName?: string | null,
): ContentAuthor | undefined {
    const docName = pickOptionalText(authorDoc?.name);
    if (docName) {
        return {
            id: authorDoc?._id || `person:${docName}`,
            name: docName,
            role: pickOptionalText(authorDoc?.role),
            bio: pickOptionalText(authorDoc?.bio),
            photoUrl: urlForImage(authorDoc?.photo ?? undefined, 256),
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
    _id,
    name,
    role,
    bio,
    linkedin,
    xUrl,
    githubUrl,
    photo
  }
`;
