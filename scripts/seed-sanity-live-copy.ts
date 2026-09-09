/**
 * Build live site copy into Sanity documents and write them via the API.
 *
 *   npx tsx scripts/seed-sanity-live-copy.ts
 *   npx tsx scripts/seed-sanity-live-copy.ts --write-json-only
 *
 * Auth: SANITY_API_WRITE_TOKEN, or `npx sanity exec` in studio after this writes JSON.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import { buildLiveCopyDocuments } from './live-copy-documents';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jsonPath = path.join(root, 'studio/scripts/generated/live-copy.json');

function stripUndefined(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(stripUndefined);
    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value as Record<string, unknown>)
                .filter(([, item]) => item !== undefined)
                .map(([key, item]) => [key, stripUndefined(item)]),
        );
    }
    return value;
}

async function writeJson(docs: Record<string, unknown>[]) {
    await mkdir(path.dirname(jsonPath), { recursive: true });
    await writeFile(jsonPath, JSON.stringify(docs, null, 2));
    console.log(`Wrote ${docs.length} documents to ${path.relative(root, jsonPath)}`);
}

async function getToken(): Promise<string | undefined> {
    const fromEnv =
        process.env.SANITY_API_WRITE_TOKEN ||
        process.env.SANITY_WRITE_TOKEN ||
        process.env.SANITY_TOKEN ||
        process.env.SANITY_API_TOKEN;
    if (fromEnv?.trim()) return fromEnv.trim();

    try {
        const configPath = path.join(os.homedir(), '.config/sanity/config.json');
        const config = JSON.parse(await readFile(configPath, 'utf8')) as { authToken?: string };
        return config.authToken?.trim() || undefined;
    } catch {
        return undefined;
    }
}

async function pushDocs(docs: Record<string, unknown>[]) {
    const token = await getToken();
    if (!token) {
        console.log('No Sanity write token. Log in with `npx sanity login --provider google` from /studio, or set SANITY_API_WRITE_TOKEN.');
        return false;
    }

    const client = createClient({
        projectId: process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'bmcdpga9',
        dataset: process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production',
        apiVersion: '2025-01-01',
        token,
        useCdn: false,
    });

    const chunkSize = 25;
    for (let i = 0; i < docs.length; i += chunkSize) {
        const chunk = docs.slice(i, i + chunkSize);
        let tx = client.transaction();
        for (const doc of chunk) {
            tx = tx.createOrReplace(doc as { _id: string; _type: string });
        }
        await tx.commit();
        console.log(`Wrote documents ${i + 1}–${Math.min(i + chunkSize, docs.length)} of ${docs.length}`);
    }
    return true;
}

const docs = buildLiveCopyDocuments().map((doc) => stripUndefined(doc) as Record<string, unknown>);
await writeJson(docs);

if (!process.argv.includes('--write-json-only')) {
    const pushed = await pushDocs(docs);
    if (pushed) console.log(`Pushed ${docs.length} live-copy documents to Sanity.`);
}
