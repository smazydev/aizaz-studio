import { urlForImage } from './client';

export interface ContentAuthor {
    id: string;
    name: string;
    role: string;
    photoUrl?: string;
    linkedin?: string;
}

type SanityAuthorDoc = {
    _id: string;
    name: string;
    role?: string;
    linkedin?: string;
    photo?: { asset?: { _ref?: string } };
};

/** Accept person document, or legacy string author values from older posts. */
export function mapSanityAuthor(
    authorDoc: SanityAuthorDoc | null | undefined,
    legacyName?: string | null,
): ContentAuthor | undefined {
    if (authorDoc?.name) {
        return {
            id: authorDoc._id,
            name: authorDoc.name,
            role: authorDoc.role || 'Author',
            photoUrl: urlForImage(authorDoc.photo, 256),
            linkedin: authorDoc.linkedin,
        };
    }

    if (typeof legacyName === 'string' && legacyName.trim()) {
        return {
            id: `string:${legacyName.trim()}`,
            name: legacyName.trim(),
            role: 'Author',
        };
    }

    return undefined;
}

export const authorProjection = `
  author,
  "authorDoc": author->{
    _id,
    name,
    role,
    linkedin,
    photo
  }
`;
