/**
 * Create starter Author / team documents (no fabricated social URLs).
 * Non-destructive: existing documents keep photos and edited copy; missing team
 * fields are filled with the public site defaults.
 *
 * Usage (from /studio after `npx sanity login` with Editor token):
 *   npx sanity exec scripts/seed-authors.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });

const AUTHORS = [
    {
        _id: 'person.ali-zafar',
        name: 'Syed Ali Zafar',
        slug: { _type: 'slug' as const, current: 'ali-zafar' },
        shortName: 'Ali',
        role: 'Founder & Principal Engineer',
        bio: 'Technical founder focused on SaaS architecture, AI Systems, backend engineering, and cloud infrastructure.',
        focus: ['Product Engineering', 'SaaS', 'AI Systems', 'Cloud / Backend'],
        linkedin: 'https://www.linkedin.com/in/syedalizfr/',
        githubUrl: 'https://github.com/smazydev',
        order: 0,
        showOnTeam: true,
        featuredOnHomepage: true,
    },
    {
        _id: 'person.nasir',
        name: 'Nasir Mahmood',
        slug: { _type: 'slug' as const, current: 'nasir' },
        shortName: 'Nasir',
        role: 'Co-Founder, ERP & Integrations',
        bio: 'Co-founder focused on ERP, NetSuite, and commerce integration work across business systems.',
        focus: ['NetSuite', 'ERP', 'Commerce Integrations', 'Business Systems'],
        linkedin: 'https://www.linkedin.com/in/muh-nasir-mahmood/',
        githubUrl: 'https://github.com/muh-nasiruit',
        order: 1,
        showOnTeam: true,
        featuredOnHomepage: true,
    },
    {
        _id: 'person.ayaz',
        name: 'Ayaz Khan',
        slug: { _type: 'slug' as const, current: 'ayaz' },
        shortName: 'Ayaz',
        role: 'Co-Founder, Operations & Growth',
        bio: 'Co-founder focused on operations, growth, and keeping client delivery commercially clear.',
        focus: ['Operations', 'Growth', 'Client Delivery', 'Commercial Strategy'],
        linkedin: 'https://www.linkedin.com/in/ayaz-khan22/',
        order: 2,
        showOnTeam: true,
        featuredOnHomepage: true,
    },
] as const;

async function seedAuthors() {
    for (const author of AUTHORS) {
        const existing = await client.getDocument(author._id);
        if (!existing) {
            await client.create({
                _type: 'person',
                ...author,
            });
            console.log(`Created author: ${author.name}`);
            continue;
        }

        const { _id, ...fields } = author;
        await client.patch(_id).setIfMissing(fields).commit();
        console.log(`Filled missing team fields for: ${author.name} (photo and edited copy left intact)`);
    }
}

seedAuthors().catch((error) => {
    console.error(error);
    process.exit(1);
});
