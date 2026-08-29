/**
 * Seed the Homepage singleton with current approved fallback content.
 *
 * Usage (from /studio after `npx sanity login`):
 *   npx sanity exec scripts/seed-homepage.ts --with-user-token
 *
 * Idempotent: creates document id `homepage` only if missing.
 * Will NOT overwrite an existing edited Homepage.
 * To force overwrite (destructive): FORCE_SEED=1 npx sanity exec scripts/seed-homepage.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });
const force = process.env.FORCE_SEED === '1' || process.env.FORCE_SEED === 'true';

const homepageDoc = {
    _id: 'homepage',
    _type: 'homepage' as const,
    title: 'Homepage',
    stats: [
        {
            _type: 'homepageStat',
            _key: 'stat-14',
            value: '14',
            suffix: ' days',
            label: 'Typical sprint delivery',
            enabled: true,
        },
        {
            _type: 'homepageStat',
            _key: 'stat-50',
            value: '50+',
            suffix: '',
            label: 'Systems & integrations shipped',
            enabled: true,
        },
        {
            _type: 'homepageStat',
            _key: 'stat-6',
            value: '6',
            suffix: '+',
            label: 'Countries served remotely',
            enabled: true,
        },
        {
            _type: 'homepageStat',
            _key: 'stat-uptime',
            value: '99.9',
            suffix: '%',
            label: 'Uptime target on managed infra',
            enabled: true,
        },
    ],
    marqueeLabel: 'Trusted by product teams & operators',
    marqueeItems: [
        { _type: 'marqueeItem', _key: 'm-1archiver', name: '1Archiver', enabled: true },
        { _type: 'marqueeItem', _key: 'm-tradingdojo', name: 'TradingDojo', enabled: true },
        { _type: 'marqueeItem', _key: 'm-vamsbiome', name: 'VamsBiome', enabled: true },
        { _type: 'marqueeItem', _key: 'm-ethicalai', name: 'EthicalAI', enabled: true },
        { _type: 'marqueeItem', _key: 'm-mvp', name: 'MVP Travel', enabled: true },
    ],
    showcaseEyebrow: 'Case Studies',
    showcaseTitle: 'Production systems, not portfolio filler',
    showcaseDescription:
        'Compliance, fintech, and infrastructure work built for teams that need software to hold up under real load.',
    featuredCaseStudies: [
        {
            _type: 'featuredCaseStudy',
            _key: 'f-property',
            caseStudySlug: 'propertymatchmaker-real-estate-saas',
            enabled: true,
        },
        {
            _type: 'featuredCaseStudy',
            _key: 'f-salesangel',
            caseStudySlug: 'designing-multi-tenant-crm-architecture',
            enabled: true,
        },
        {
            _type: 'featuredCaseStudy',
            _key: 'f-1archiver',
            caseStudySlug: '1archiver-compliance-platform',
            enabled: true,
        },
        {
            _type: 'featuredCaseStudy',
            _key: 'f-codechecker',
            caseStudySlug: 'modernizing-multi-language-code-checking-tool',
            enabled: true,
        },
    ],
};

async function seedHomepage() {
    const existing = await client.fetch<string | null>(`*[_id == "homepage"][0]._id`);

    if (existing && !force) {
        console.log('Homepage document already exists (id: homepage). Skipping — will not overwrite edits.');
        console.log('To overwrite intentionally: FORCE_SEED=1 npx sanity exec scripts/seed-homepage.ts --with-user-token');
        return;
    }

    if (existing && force) {
        await client.createOrReplace(homepageDoc);
        console.log('FORCE_SEED: replaced homepage document (id: homepage)');
        return;
    }

    await client.createIfNotExists(homepageDoc);
    console.log('Created homepage document (id: homepage)');
}

seedHomepage().catch((error) => {
    console.error(error);
    process.exit(1);
});
