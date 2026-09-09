import { leadershipProfiles, type LeadershipProfile } from '../../data/leadership';
import { cachedSanityFetch, getSanityClient } from './client';
import { pickOptionalString, pickString, pickStringArray } from './overlay';
import { personsQuery } from './queries';

type SanityPerson = {
    _id?: string | null;
    name?: string | null;
    slug?: string | null;
    role?: string | null;
    bio?: string | null;
    focus?: Array<string | null> | null;
    linkedin?: string | null;
    githubUrl?: string | null;
};

async function fetchPersons(): Promise<SanityPerson[]> {
    const client = getSanityClient();
    if (!client) return [];
    try {
        return await cachedSanityFetch('persons:all', () => client.fetch<SanityPerson[]>(personsQuery));
    } catch (error) {
        console.warn('[sanity] Failed to fetch authors for leadership; using static profiles.', error);
        return [];
    }
}

export async function getLeadershipProfiles(): Promise<LeadershipProfile[]> {
    const persons = await fetchPersons();
    if (persons.length === 0) return leadershipProfiles;

    return leadershipProfiles.map((profile) => {
        const person = persons.find(
            (item) =>
                item._id === profile.authorId ||
                item.slug === profile.id ||
                item.name?.trim() === profile.name,
        );
        if (!person) return profile;

        const focus = pickStringArray(person.focus, profile.focus);
        return {
            ...profile,
            name: pickString(person.name, profile.name),
            role: pickString(person.role, profile.role),
            bio: pickString(person.bio, profile.bio),
            focus,
            linkedin: pickOptionalString(person.linkedin) ?? profile.linkedin,
            githubUrl: pickOptionalString(person.githubUrl) ?? profile.githubUrl,
        };
    });
}
