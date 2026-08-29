/**
 * One-time migration: post.author string → person reference.
 * Preserves the original author text on each post as `authorLegacy`.
 *
 * Usage (from /studio after `npx sanity login`):
 *   npx sanity exec scripts/migrate-author-strings.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });

type PostRow = {
    _id: string;
    title?: string;
    author?: unknown;
};

/** Known legacy strings → stable person ids + profile fields. */
const KNOWN_AUTHORS: Record<
    string,
    { id: string; name: string; role?: string; bio?: string }
> = {
    'ali zafar technical founder, aizaz studio': {
        id: 'person.ali-zafar',
        name: 'Ali Zafar',
        role: 'Technical Founder, Aizaz Studio',
        bio: 'Technical Founder at Aizaz Studio.',
    },
    'ali zafar': {
        id: 'person.ali-zafar',
        name: 'Ali Zafar',
        role: 'Technical Founder, Aizaz Studio',
        bio: 'Technical Founder at Aizaz Studio.',
    },
    'aizaz k.': {
        id: 'person.aizaz-k',
        name: 'Aizaz K.',
        role: 'Author',
    },
};

function slugifyId(name: string): string {
    return `person.${name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 64)}`;
}

function parseAuthorString(raw: string): { name: string; role?: string } {
    const text = raw.trim();
    const known = KNOWN_AUTHORS[text.toLowerCase()];
    if (known) return { name: known.name, role: known.role };

    const comma = text.indexOf(',');
    if (comma > 0) {
        const before = text.slice(0, comma).trim();
        const after = text.slice(comma + 1).trim();
        const parts = before.split(/\s+/);
        if (parts.length >= 3) {
            return {
                name: parts.slice(0, 2).join(' '),
                role: `${parts.slice(2).join(' ')}${after ? `, ${after}` : ''}`,
            };
        }
        return { name: before, role: after || undefined };
    }
    return { name: text };
}

function isReference(value: unknown): value is { _type: 'reference'; _ref: string } {
    return Boolean(
        value &&
            typeof value === 'object' &&
            '_ref' in (value as object) &&
            typeof (value as { _ref?: unknown })._ref === 'string',
    );
}

async function ensurePerson(raw: string): Promise<string> {
    const key = raw.trim().toLowerCase();
    const known = KNOWN_AUTHORS[key];
    const parsed = parseAuthorString(raw);
    const personId = known?.id ?? slugifyId(parsed.name);

    const existing = await client.getDocument(personId).catch(() => null);
    if (existing) {
        console.log(`Reusing person ${personId} (${parsed.name})`);
        return personId;
    }

    const byName = await client.fetch<{ _id: string } | null>(
        `*[_type == "person" && name == $name][0]{ _id }`,
        { name: parsed.name },
    );
    if (byName?._id) {
        console.log(`Reusing existing person ${byName._id} by name "${parsed.name}"`);
        return byName._id;
    }

    await client.createOrReplace({
        _id: personId,
        _type: 'person',
        name: known?.name ?? parsed.name,
        ...(known?.role || parsed.role ? { role: known?.role ?? parsed.role } : {}),
        ...(known?.bio ? { bio: known.bio } : {}),
    });
    console.log(`Created person ${personId} for "${parsed.name}"`);
    return personId;
}

async function main() {
    // String authors have no _ref; reference authors do.
    const posts = await client.fetch<PostRow[]>(
        `*[_type == "post" && defined(author) && !defined(author._ref)]{ _id, title, author }`,
    );

    const stringPosts = posts.filter((p) => typeof p.author === 'string' && p.author.trim());
    console.log(`Found ${stringPosts.length} post(s) with string author values.`);

    if (stringPosts.length === 0) {
        const already = await client.fetch<number>(
            `count(*[_type == "post" && defined(author._ref)])`,
        );
        console.log(`Nothing to migrate. Posts with author references: ${already}`);
        return;
    }

    const personByKey = new Map<string, string>();

    for (const post of stringPosts) {
        if (isReference(post.author)) continue;
        const raw = String(post.author).trim();
        const key = raw.toLowerCase();

        let personId = personByKey.get(key);
        if (!personId) {
            personId = await ensurePerson(raw);
            personByKey.set(key, personId);
        }

        await client
            .patch(post._id)
            .set({
                authorLegacy: raw,
                author: { _type: 'reference', _ref: personId },
            })
            .commit({ autoGenerateArrayKeys: true });

        console.log(`Patched post "${post.title ?? post._id}" → ${personId} (legacy preserved)`);
    }

    console.log('Done. Original strings saved on each post as authorLegacy.');
    console.log('Edit Ali under People → Authors (person.ali-zafar).');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
