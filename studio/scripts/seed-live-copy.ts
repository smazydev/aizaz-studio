/**
 * Push generated live-copy documents to Sanity.
 *
 * From repo root:
 *   npx tsx scripts/seed-sanity-live-copy.ts --write-json-only
 *   npm run seed:live-copy --prefix studio
 *
 * From /studio after `npx sanity login`:
 *   npx sanity exec scripts/seed-live-copy.ts --with-user-token
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });
const jsonPath = join(dirname(fileURLToPath(import.meta.url)), 'generated/live-copy.json');

type SanityDoc = { _id: string; _type: string };

async function run() {
    const docs = JSON.parse(readFileSync(jsonPath, 'utf8')) as SanityDoc[];
    if (!Array.isArray(docs) || docs.length === 0) {
        throw new Error(`No documents in ${jsonPath}. Run npx tsx scripts/seed-sanity-live-copy.ts --write-json-only first.`);
    }

    const chunkSize = 25;
    for (let i = 0; i < docs.length; i += chunkSize) {
        const chunk = docs.slice(i, i + chunkSize);
        let tx = client.transaction();
        for (const doc of chunk) {
            tx = tx.createOrReplace(doc);
        }
        await tx.commit();
        console.log(`Wrote documents ${i + 1}–${Math.min(i + chunkSize, docs.length)} of ${docs.length}`);
    }
    console.log(`Pushed ${docs.length} live-copy documents to Sanity.`);
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
