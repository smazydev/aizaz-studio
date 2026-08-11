import { urlForImage } from './client';

export interface ContentAuthor {
    id: string;
    name: string;
    role: string;
    photoUrl?: string;
    linkedin?: string;
}

type SanityAuthorSource = {
    _id: string;
    name: string;
    role: string;
    linkedin?: string;
    photo?: { asset?: { _ref?: string } };
};

export function mapSanityAuthor(author: SanityAuthorSource | null | undefined): ContentAuthor | undefined {
    if (!author?.name || !author.role) return undefined;

    return {
        id: author._id,
        name: author.name,
        role: author.role,
        photoUrl: urlForImage(author.photo, 256),
        linkedin: author.linkedin,
    };
}

export const authorProjection = `author->{
  _id,
  name,
  role,
  linkedin,
  photo
}`;
