/**
 * Create starter Author documents (no fabricated social URLs).
 *
 * Usage (from /studio after `npx sanity login` with Editor token):
 *   npx sanity exec scripts/seed-authors.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });

const AUTHORS = [
    {
        _id: 'person.ali-zafar',
        name: 'Ali Zafar',
        slug: { _type: 'slug', current: 'ali-zafar' },
        role: 'Technical Founder',
        bio: 'Technical founder focused on SaaS architecture, AI systems, backend engineering, and cloud infrastructure.',
    },
    {
        _id: 'person.ayaz',
        name: 'Ayaz',
        slug: { _type: 'slug', current: 'ayaz' },
    },
    {
        _id: 'person.nasir',
        name: 'Nasir',
        slug: { _type: 'slug', current: 'nasir' },
    },
] as const;

async function seedAuthors() {
    for (const author of AUTHORS) {
        await client.createOrReplace({
            _type: 'person',
            ...author,
        });
        console.log(`Upserted author: ${author.name}`);
    }
}

seedAuthors().catch((error) => {
    console.error(error);
    process.exit(1);
});
