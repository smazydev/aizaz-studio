/**
 * Publish curated capability-card destinations to the service documents.
 *
 * From /studio after `npx sanity login`:
 *   npx sanity exec scripts/seed-service-capability-links.ts --with-user-token
 *   npx sanity exec scripts/seed-service-capability-links.ts --with-user-token -- --commit
 *
 * The default run validates and previews only. Pass --commit to patch Sanity.
 */
import { getCliClient } from 'sanity/cli';
import { serviceCapabilityLinks } from '../../src/data/serviceCapabilityLinks';

const client = getCliClient({ apiVersion: '2025-01-01' });
const commit = process.argv.includes('--commit');

type ServiceDoc = {
    _id: string;
    slug: string;
    capabilities: string[];
};

async function run() {
    const services = await client.fetch<ServiceDoc[]>(
        `*[_type == "landingPage" && category == "service" && !(_id in path("drafts.**"))]{
            _id,
            "slug": slug.current,
            capabilities
        } | order(slug asc)`,
    );

    const invalid: string[] = [];
    for (const service of services) {
        const capabilitySet = new Set((service.capabilities ?? []).map((item) => item.trim()));
        for (const link of serviceCapabilityLinks[service.slug] ?? []) {
            if (!capabilitySet.has(link.label)) invalid.push(`${service.slug}: ${link.label}`);
        }
    }

    if (invalid.length > 0) {
        throw new Error(`Capability link labels do not match published capability cards:\n${invalid.join('\n')}`);
    }

    const summary = services.map((service) => ({
        slug: service.slug,
        links: serviceCapabilityLinks[service.slug]?.length ?? 0,
    }));
    console.log(JSON.stringify({ commit, serviceCount: services.length, summary }, null, 2));

    if (!commit) {
        console.log('Validation only. Re-run with --commit to publish capability links.');
        return;
    }

    let tx = client.transaction();
    for (const service of services) {
        const links = (serviceCapabilityLinks[service.slug] ?? []).map((link, index) => ({
            _type: 'link',
            _key: `${service.slug}-capability-link-${index}`,
            label: link.label,
            href: link.href,
        }));
        tx = tx.patch(service._id, { set: { capabilityLinks: links } });
    }

    const result = await tx.commit({ returnDocuments: false });
    console.log(`Published capability links to ${services.length} service documents at ${result.transactionId}.`);
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
