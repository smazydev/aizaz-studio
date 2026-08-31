import groq from 'groq';
import type { LeadershipId, LeadershipProfile } from '../../data/leadership';
import { leadershipById, leadershipProfiles } from '../../data/leadership';
import { personSelection, type SanityPersonDoc } from './author';
import { cachedSanityFetch, getSanityClient, objectPositionFromHotspot, urlForImage } from './client';

const SLUG_TO_LEADERSHIP_ID: Record<string, LeadershipId> = {
    'ali-zafar': 'ali',
    nasir: 'nasir',
    ayaz: 'ayaz',
};

export const teamMembersQuery = groq`
  *[_type == "person" && !(_id in path("drafts.**"))] | order(coalesce(order, 999) asc, name asc) {
    ${personSelection}
  }
`;

function pickOptionalText(value: string | null | undefined): string | undefined {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}

function pickStringList(values: string[] | null | undefined): string[] | undefined {
    if (!values?.length) return undefined;
    const cleaned = values.map((item) => item.trim()).filter(Boolean);
    return cleaned.length ? cleaned : undefined;
}

function matchStaticProfile(doc: SanityPersonDoc): LeadershipProfile | undefined {
    if (doc._id) {
        const byAuthorId = leadershipProfiles.find((person) => person.authorId === doc._id);
        if (byAuthorId) return byAuthorId;
    }
    const slug = doc.slug?.trim();
    if (slug && SLUG_TO_LEADERSHIP_ID[slug]) {
        return leadershipById[SLUG_TO_LEADERSHIP_ID[slug]];
    }
    return undefined;
}

/** Overlay CMS person fields onto the existing LeadershipProfile shape (no UI redesign). */
export function mapSanityTeamMember(doc: SanityPersonDoc): LeadershipProfile | undefined {
    const fallback = matchStaticProfile(doc);
    const name = pickOptionalText(doc.name) || fallback?.name;
    if (!name) return undefined;

    const photoUrl = urlForImage(doc.photo ?? undefined, 960);
    if (!fallback && !photoUrl) return undefined;

    const shortName =
        pickOptionalText(doc.shortName) || fallback?.shortName || name.split(/\s+/)[0] || name;
    const id = fallback?.id || doc.slug?.trim() || doc._id || shortName.toLowerCase();

    return {
        id,
        authorId: doc._id || fallback?.authorId || `person:${id}`,
        name,
        shortName,
        role: pickOptionalText(doc.role) || fallback?.role || '',
        bio: pickOptionalText(doc.bio) || fallback?.bio || '',
        focus: pickStringList(doc.focus) || fallback?.focus || [],
        linkedin: pickOptionalText(doc.linkedin) || fallback?.linkedin || '',
        githubUrl: pickOptionalText(doc.githubUrl) || fallback?.githubUrl,
        image: fallback?.image,
        imageUrl: photoUrl,
        imageAlt:
            pickOptionalText(doc.photo?.alt) ||
            fallback?.imageAlt ||
            `${name}${doc.role ? `, ${doc.role} at Aizaz Studio` : ''}`,
        objectPosition: doc.photo?.hotspot
            ? objectPositionFromHotspot(doc.photo.hotspot, fallback?.objectPosition ?? '50% 32%')
            : fallback?.objectPosition ?? '50% 32%',
        order: typeof doc.order === 'number' ? doc.order : fallback?.order,
        featuredOnHomepage: doc.featuredOnHomepage ?? fallback?.featuredOnHomepage,
        showOnTeam: doc.showOnTeam ?? fallback?.showOnTeam,
    };
}

function sortTeam(members: LeadershipProfile[]): LeadershipProfile[] {
    const staticOrder = new Map(leadershipProfiles.map((person, index) => [person.id, index]));
    return [...members].sort((a, b) => {
        const aOrder = a.order ?? staticOrder.get(a.id) ?? 999;
        const bOrder = b.order ?? staticOrder.get(b.id) ?? 999;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return a.name.localeCompare(b.name);
    });
}

function mergeTeamDocs(docs: SanityPersonDoc[]): LeadershipProfile[] {
    const merged = new Map<string, LeadershipProfile>();
    for (const person of leadershipProfiles) {
        merged.set(person.id, { ...person });
    }

    for (const doc of docs) {
        const mapped = mapSanityTeamMember(doc);
        if (!mapped) continue;
        const existing = merged.get(mapped.id);
        if (existing) {
            merged.set(mapped.id, { ...existing, ...mapped, image: existing.image ?? mapped.image });
            continue;
        }
        if (doc.showOnTeam === true) {
            merged.set(mapped.id, mapped);
        }
    }

    return sortTeam(Array.from(merged.values()));
}

function selectTeam(merged: LeadershipProfile[], homepageOnly?: boolean): LeadershipProfile[] {
    if (homepageOnly) {
        const featured = merged.filter((person) => person.featuredOnHomepage === true);
        if (featured.length > 0) return featured;
        return merged.filter(
            (person) =>
                person.featuredOnHomepage !== false &&
                leadershipProfiles.some((staticPerson) => staticPerson.id === person.id),
        );
    }

    return merged.filter((person) => person.showOnTeam !== false);
}

/**
 * Team roster for About / homepage consumers.
 * Same shape as `leadershipProfiles` so TeamPortrait and roster markup stay unchanged.
 * Falls back to static leadership when Sanity is down or empty.
 */
export async function getTeamMembers(options?: { homepageOnly?: boolean }): Promise<LeadershipProfile[]> {
    const fallback = options?.homepageOnly
        ? leadershipProfiles.filter((person) => person.featuredOnHomepage !== false)
        : leadershipProfiles;

    const client = getSanityClient();
    if (!client) return fallback;

    try {
        const docs = await cachedSanityFetch('team:all', () => client.fetch<SanityPersonDoc[]>(teamMembersQuery));
        const visible = selectTeam(mergeTeamDocs(docs), options?.homepageOnly);
        return visible.length > 0 ? visible : fallback;
    } catch (error) {
        console.warn('[sanity] Failed to fetch team; using static leadership.', error);
        return fallback;
    }
}

export async function getHomepageTeam(): Promise<LeadershipProfile[]> {
    return getTeamMembers({ homepageOnly: true });
}
