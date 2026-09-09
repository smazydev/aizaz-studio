/**
 * Create stub Sanity documents for landing, technology, compare, and site pages.
 *
 * Usage (from /studio after `npx sanity login`):
 *   npx sanity exec scripts/seed-site-pages.ts --with-user-token
 *
 * Idempotent: skips documents that already exist.
 * To force overwrite stubs only (keeps edited fields if you use Studio after): not supported.
 * Static TypeScript content remains the public fallback until a field is filled in Studio.
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });

const services = [
    'ai-automation-systems',
    'web-app-saas-development',
    'aws-devops',
    'netsuite-erp-automation',
    'business-process-automation',
    'trading-technology-systems',
    'technical-video-product-enablement',
    'project-rescue',
    'technical-audit',
    'ai-agent-development',
    'ai-chatbot-development',
    'ai-workflow-automation',
    'ai-integration',
    'llm-app-development',
    'saas-mvp-development',
    'b2b-saas-development',
    'backend-engineering',
    'aws-cloud-engineering',
    'devops-consulting',
    'cloud-migration',
    'platform-engineering',
    'api-integration',
    'crm-integration',
    'netsuite-integration',
];

const industries = [
    'saas-startups',
    'ecommerce-wholesale',
    'healthtech-clinics',
    'trading-businesses',
    'netsuite-users',
    'agencies',
    'startups',
    'b2b-saas',
    'operations-teams',
    'healthtech',
    'fintech',
    'ecommerce-operations',
    'logistics',
    'professional-services',
];

const integrations = ['netsuite-bigcommerce'];

const technologies = [
    'nodejs-development',
    'python-development',
    'react-development',
    'nextjs-development',
    'nestjs-development',
    'fastapi-development',
    'aws',
    'postgresql',
    'supabase',
    'openai',
    'langchain',
    'stripe',
    'twilio',
];

const compares = [
    'aizaz-vs-staff-augmentation',
    'agency-vs-freelancer',
    'ai-systems-sprint-vs-traditional-automation',
];

const sitePages = [
    'engagement-models',
    'book-a-call',
    'portfolio',
    'reviews',
    'security',
    'process',
    'careers',
    'about',
    'services-index',
    'technologies-index',
    'compare-index',
    'start-a-project',
    'engineering-transformation',
];

async function createIfMissing(id: string, doc: Record<string, unknown>): Promise<boolean> {
    const existing = await client.getDocument(id);
    if (existing) return false;
    await client.createOrReplace({ _id: id, ...doc });
    return true;
}

async function run() {
    let created = 0;

    for (const slug of services) {
        if (
            await createIfMissing(`landing.service.${slug}`, {
                _type: 'landingPage',
                category: 'service',
                slug: { _type: 'slug', current: slug },
            })
        )
            created += 1;
    }

    for (const slug of industries) {
        if (
            await createIfMissing(`landing.industry.${slug}`, {
                _type: 'landingPage',
                category: 'industry',
                slug: { _type: 'slug', current: slug },
            })
        )
            created += 1;
    }

    for (const slug of integrations) {
        if (
            await createIfMissing(`landing.integration.${slug}`, {
                _type: 'landingPage',
                category: 'integration',
                slug: { _type: 'slug', current: slug },
            })
        )
            created += 1;
    }

    if (
        await createIfMissing('landing.sprint.ai-systems-sprint', {
            _type: 'landingPage',
            category: 'sprint',
            slug: { _type: 'slug', current: 'ai-systems-sprint' },
        })
    )
        created += 1;

    for (const slug of technologies) {
        if (
            await createIfMissing(`technology.${slug}`, {
                _type: 'technologyPage',
                slug: { _type: 'slug', current: slug },
            })
        )
            created += 1;
    }

    for (const slug of compares) {
        if (
            await createIfMissing(`compare.${slug}`, {
                _type: 'comparePage',
                slug: { _type: 'slug', current: slug },
            })
        )
            created += 1;
    }

    for (const pageKey of sitePages) {
        if (
            await createIfMissing(`sitePage.${pageKey}`, {
                _type: 'sitePage',
                pageKey,
            })
        )
            created += 1;
    }

    if (
        await createIfMissing('siteSettings', {
            _type: 'siteSettings',
            title: 'Site settings',
        })
    )
        created += 1;

    console.log(`Seed complete. Created ${created} missing documents.`);
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
