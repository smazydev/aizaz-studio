import type { ContentAuthor } from '../lib/sanity/author';
import { leadershipById, leadershipToAuthor } from './leadership';

/** Static author records for legacy markdown posts — portraits come from leadership config. */
export const LEGACY_AUTHORS = {
    ali: leadershipToAuthor(leadershipById.ali),
    nasir: leadershipToAuthor(leadershipById.nasir),
    ayaz: leadershipToAuthor(leadershipById.ayaz),
} as const satisfies Record<string, ContentAuthor>;

export type LegacyAuthorKey = keyof typeof LEGACY_AUTHORS;
