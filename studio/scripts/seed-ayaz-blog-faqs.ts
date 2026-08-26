/**
 * One-time (idempotent) migration for:
 *   /blog/has-ai-made-software-development-cheaper
 *
 * - Moves Markdown FAQ block into structured `faqs`
 * - Removes the embedded "## Frequently Asked Questions" section from body
 * - Adds a few natural contextual internal links (without keyword spam)
 *
 * Usage (from /studio after `npx sanity login`):
 *   npx sanity exec scripts/seed-ayaz-blog-faqs.ts --with-user-token
 *
 * Safe to re-run: skips FAQ overwrite if structured faqs already present
 * unless FORCE_SEED=1. Always re-applies body cleanup + link patches carefully.
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });
const force = process.env.FORCE_SEED === '1' || process.env.FORCE_SEED === 'true';
const SLUG = 'has-ai-made-software-development-cheaper';

const FAQ_ITEMS = [
    {
        _type: 'faqItem' as const,
        _key: 'faq-costs',
        question: 'Has AI actually reduced software development costs?',
        answer:
            'Yes, especially for prototyping, boilerplate, testing, documentation and getting to a first working version. But production software still requires architecture, integration work, debugging, security, deployment and ongoing ownership.',
        enabled: true,
    },
    {
        _type: 'faqItem' as const,
        _key: 'faq-senior',
        question: 'Can AI replace a senior software engineer?',
        answer:
            'AI can make an experienced engineer substantially faster, but it does not replace the judgment required to understand complex systems, choose safe architecture, debug production failures and take responsibility for the result.',
        enabled: true,
    },
    {
        _type: 'faqItem' as const,
        _key: 'faq-expensive',
        question: 'Why can AI-generated software still be expensive?',
        answer:
            'Because writing code is only one part of building software. Reliable products also require requirements, system design, integrations, testing, deployment, monitoring, maintenance and someone who understands the system when it fails.',
        enabled: true,
    },
    {
        _type: 'faqItem' as const,
        _key: 'faq-cheaper',
        question: 'Should software projects become cheaper because of AI?',
        answer:
            'In many cases, yes. Clients should benefit when AI lets experienced teams deliver faster. But pricing should reflect the outcome, complexity and responsibility involved rather than only the number of hours spent typing code.',
        enabled: true,
    },
];

/** Strip trailing Markdown FAQ section if present. */
function stripMarkdownFaq(body: string): string {
    const marker = /\n## Frequently Asked Questions\s*\n[\s\S]*$/i;
    if (!marker.test(body)) return body;
    return body.replace(marker, '\n').replace(/\n{3,}$/g, '\n\n').trimEnd() + '\n';
}

/**
 * Insert contextual internal links only when the target href is still absent
 * (avoids double-linking on re-runs).
 */
function applyContextualLinks(body: string): string {
    let next = body;

    if (
        !next.includes('](/ai-systems-sprint)') &&
        next.includes('like our AI Systems Sprint.')
    ) {
        next = next.replace(
            'like our AI Systems Sprint.',
            'like our [AI Systems Sprint](/ai-systems-sprint).',
        );
    }

    if (
        !next.includes('](/services/saas-mvp-development)') &&
        next.includes('Focused MVPs should become easier to justify.')
    ) {
        next = next.replace(
            'Focused MVPs should become easier to justify.',
            'Focused [MVPs](/services/saas-mvp-development) should become easier to justify.',
        );
    }

    if (
        !next.includes('](/engagement-models)') &&
        next.includes(
            'rethink pricing models built entirely around the number of hours somebody spends typing.',
        )
    ) {
        next = next.replace(
            'rethink pricing models built entirely around the number of hours somebody spends typing.',
            'rethink [pricing models](/engagement-models) built entirely around the number of hours somebody spends typing.',
        );
    }

    if (
        !next.includes('](/services/ai-automation-systems)') &&
        next.includes(
            'The amount of parallel work a small engineering team can now handle is completely different from what was possible a few years ago.',
        )
    ) {
        next = next.replace(
            'The amount of parallel work a small engineering team can now handle is completely different from what was possible a few years ago.',
            'The amount of parallel work a small engineering team can now handle — including [AI automation systems](/services/ai-automation-systems) for real workflows — is completely different from what was possible a few years ago.',
        );
    }

    return next;
}

async function run() {
    const post = await client.fetch<{
        _id: string;
        body?: string | null;
        faqs?: unknown[] | null;
    } | null>(
        `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
      _id, body, faqs
    }`,
        { slug: SLUG },
    );

    if (!post?._id) {
        throw new Error(`Published post not found for slug: ${SLUG}`);
    }

    const hasFaqs = Array.isArray(post.faqs) && post.faqs.length > 0;
    let body = typeof post.body === 'string' ? post.body : '';
    body = stripMarkdownFaq(body);
    body = applyContextualLinks(body);

    const patch = client.patch(post._id).set({ body });

    if (!hasFaqs || force) {
        patch.set({ faqs: FAQ_ITEMS });
        console.log(force && hasFaqs ? 'FORCE_SEED: replacing structured faqs' : 'Setting structured faqs (4 items)');
    } else {
        console.log('Structured faqs already present — leaving them unchanged (FORCE_SEED=1 to overwrite)');
    }

    await patch.commit({ autoGenerateArrayKeys: false });
    console.log(`Updated post ${post._id} (${SLUG})`);
    console.log('Publish/revalidate via Studio publish or existing /api/revalidate webhook so CDN cache refreshes.');
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
