import type { CaseStudy } from '../../data/caseStudies';
import { clientLogos, siteStats } from '../../data/siteContent';
import { cachedSanityFetch, getSanityClient } from './client';
import { getAllCaseStudies } from './caseStudies';
import { isHiddenCaseStudySlug, isPublicCaseStudy } from '../case-study-visibility';
import { pickFaqs, pickString } from './overlay';

export type HomepageStat = {
    value: string;
    suffix: string;
    label: string;
    supportingText?: string;
};

export type HomepageMarqueeItem = {
    name: string;
    href?: string;
};

export type HomepageFeaturedCaseStudy = {
    study: CaseStudy;
    tabLabel: string;
};

export type HomepageService = {
    n: string;
    title: string;
    body: string;
    items: string[];
    href: string;
};

export type HomepageProcessStep = {
    n: string;
    title: string;
    body: string;
    meta: string;
    art: string;
};

export type HomepageContent = {
    stats: HomepageStat[];
    marqueeLabel: string;
    marqueeItems: HomepageMarqueeItem[];
    showcaseEyebrow: string;
    showcaseTitle: string;
    showcaseDescription: string;
    featuredCaseStudies: HomepageFeaturedCaseStudy[];
    workEyebrow: string;
    workTitle: string;
    workLede: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesLede: string;
    processMark: string;
    processTitle: string;
    teamEyebrow: string;
    teamTitle: string;
    teamLede: string;
    shipEyebrow: string;
    shipTitle: string;
    shipLede: string;
    services: HomepageService[];
    process: HomepageProcessStep[];
    faqs: { q: string; a: string }[];
};

type SanityHomepageDoc = {
    stats?: Array<{
        value?: string | null;
        suffix?: string | null;
        label?: string | null;
        supportingText?: string | null;
        enabled?: boolean | null;
    }> | null;
    marqueeLabel?: string | null;
    marqueeItems?: Array<{
        name?: string | null;
        href?: string | null;
        enabled?: boolean | null;
    }> | null;
    showcaseEyebrow?: string | null;
    showcaseTitle?: string | null;
    showcaseDescription?: string | null;
    featuredCaseStudies?: Array<{
        caseStudySlug?: string | null;
        labelOverride?: string | null;
        enabled?: boolean | null;
    }> | null;
    workEyebrow?: string | null;
    workTitle?: string | null;
    workLede?: string | null;
    servicesEyebrow?: string | null;
    servicesTitle?: string | null;
    servicesLede?: string | null;
    processMark?: string | null;
    processTitle?: string | null;
    teamEyebrow?: string | null;
    teamTitle?: string | null;
    teamLede?: string | null;
    shipEyebrow?: string | null;
    shipTitle?: string | null;
    shipLede?: string | null;
    services?: Array<{
        n?: string | null;
        title?: string | null;
        body?: string | null;
        items?: Array<string | null> | null;
        href?: string | null;
        enabled?: boolean | null;
    }> | null;
    processSteps?: Array<{
        n?: string | null;
        title?: string | null;
        body?: string | null;
        meta?: string | null;
        art?: string | null;
        enabled?: boolean | null;
    }> | null;
    faqs?: Array<{ question?: string | null; answer?: string | null; enabled?: boolean | null }> | null;
};

/** Default featured order matches current public homepage emphasis. */
const DEFAULT_FEATURED_SLUGS = [
    'propertymatchmaker-real-estate-saas',
    'designing-multi-tenant-crm-architecture',
    '1archiver-compliance-platform',
    'modernizing-multi-language-code-checking-tool',
] as const;

export const defaultHomepageContent: Omit<HomepageContent, 'featuredCaseStudies'> & {
    featuredSlugs: string[];
} = {
    stats: siteStats.map((stat) => ({
        value: stat.value,
        suffix: stat.suffix,
        label: stat.label,
    })),
    marqueeLabel: 'Trusted by product teams & operators',
    marqueeItems: clientLogos.map((name) => ({ name })),
    showcaseEyebrow: 'Case Studies',
    showcaseTitle: 'Production systems, not portfolio filler',
    showcaseDescription:
        'Compliance, fintech, and infrastructure work built for teams that need software to hold up under real load.',
    featuredSlugs: [...DEFAULT_FEATURED_SLUGS],
    workEyebrow: 'The work',
    workTitle: 'Give us the\nproblem.\nWe ship the\nsystem.',
    workLede:
        'You shouldn’t have to manage the people building it. Hand us the stuck workflow or the stalled product — we own it through production.',
    servicesEyebrow: 'Services',
    servicesTitle: 'What we\ntake on',
    servicesLede:
        'AI automation, product, integrations, NetSuite, and cloud — scoped to the systems you already run, then owned through production.',
    processMark: '03 / Process',
    processTitle: 'From the problem\nto production.',
    teamEyebrow: 'Meet the team',
    teamTitle: 'A studio built\nto ship systems',
    teamLede:
        'Senior software engineering across AI & automation, product/SaaS, ERP/NetSuite, and cloud production. A small founding team, direct ownership, no agency layer.',
    shipEyebrow: 'Case studies',
    shipTitle: 'Systems that ship',
    shipLede:
        'PropertyMatch shipped as a SaaS MVP in 14 days. 1Archiver was designed for tens of terabytes. Every card opens the full case study.',
    services: [
        {
            n: '01',
            title: 'AI Automation',
            body: 'Agents and workflows that take work off your team, from intake to action, with evals and a human handoff.',
            items: ['Workflow mapping', 'Tool use & guardrails', 'Production evals'],
            href: '/services/ai-automation-systems',
        },
        {
            n: '02',
            title: 'Product Engineering',
            body: 'Web apps and SaaS products built to ship: architecture, UI, and the backend your users actually hit.',
            items: ['MVP to production', 'React / Node', 'Auth, billing, APIs'],
            href: '/services/web-app-saas-development',
        },
        {
            n: '03',
            title: 'Systems Integration',
            body: 'CRM, helpdesk, warehouse, and internal tools connected so data stops living in five places.',
            items: ['API connectors', 'Event buses', 'Idempotent sync'],
            href: '/services/api-integration',
        },
        {
            n: '04',
            title: 'ERP / NetSuite',
            body: 'NetSuite and operations systems wired to the rest of the stack: orders, inventory, and finance in one flow.',
            items: ['NetSuite REST / SuiteQL', 'Order sync', 'Custom records'],
            href: '/services/netsuite-integration',
        },
        {
            n: '05',
            title: 'Cloud Infrastructure',
            body: 'AWS environments that stay up: CI/CD, observability, and the reliability work that makes shipping safe.',
            items: ['AWS landing zone', 'Pipelines & canaries', 'Logs, traces, alerts'],
            href: '/services/aws-devops',
        },
    ],
    process: [
        { n: '01', title: 'Discover', body: 'Understand the workflow, constraints and systems.', meta: 'INPUT / OPS / USERS', art: 'nodes' },
        { n: '02', title: 'Design', body: 'Map the experience, prompts, and handoff states.', meta: 'UX / PROMPTS / GUARDS', art: 'wire' },
        { n: '03', title: 'Build', body: 'Assemble the agent, pipeline, or product.', meta: 'APP / MODEL / API', art: 'blocks' },
        { n: '04', title: 'Integrate', body: 'Join CRM, ERP, warehouse, and internal tools.', meta: 'BUS / SYNC / AUTH', art: 'join' },
        { n: '05', title: 'Ship', body: 'Deploy with tracing, canaries, and rollback.', meta: 'CI / CANARY / PROD', art: 'ship' },
        { n: '06', title: 'Observe', body: 'Keep evals, cost, latency, and safety visible.', meta: 'EVAL / COST / P95', art: 'wave' },
    ],
    faqs: [
        { q: 'How is this different from an agency or a freelancer?', a: 'You talk to the people who build. No account layer, no staff-aug bench, no slide-deck phase. We take a defined operational problem and own it through production.' },
        { q: 'What do we need to start?', a: 'A clear problem, a decision-maker, and access to the systems involved. We run discovery as part of the work — not as a separate theater.' },
        { q: 'What’s the typical timeline?', a: 'A focused AI Systems Sprint is 14 days for one workflow. Broader product, integration, or infrastructure work is typically 3–8 weeks, scoped before we start.' },
        { q: 'How do engagements work?', a: 'Scoped sprints and project delivery, not opaque retainers. We align on the outcome, then ship with clear ownership through launch.' },
    ],
};

export const homepageQuery = `*[_type == "homepage" && _id == "homepage"][0]{
  stats[]{ value, suffix, label, supportingText, enabled },
  marqueeLabel,
  marqueeItems[]{ name, href, enabled },
  showcaseEyebrow,
  showcaseTitle,
  showcaseDescription,
  featuredCaseStudies[]{ caseStudySlug, labelOverride, enabled },
  workEyebrow,
  workTitle,
  workLede,
  servicesEyebrow,
  servicesTitle,
  servicesLede,
  processMark,
  processTitle,
  teamEyebrow,
  teamTitle,
  teamLede,
  shipEyebrow,
  shipTitle,
  shipLede,
  services[]{ n, title, body, items, href, enabled },
  processSteps[]{ n, title, body, meta, art, enabled },
  faqs[]{ question, answer, enabled }
}`;

function mapStats(doc: SanityHomepageDoc | null): HomepageStat[] {
    const fromCms = (doc?.stats ?? [])
        .filter((item) => item?.enabled !== false && item?.value?.trim() && item?.label?.trim())
        .map((item) => ({
            value: item.value!.trim(),
            suffix: item.suffix?.trim() ?? '',
            label: item.label!.trim(),
            supportingText: item.supportingText?.trim() || undefined,
        }));
    return fromCms.length > 0 ? fromCms : defaultHomepageContent.stats;
}

function mapServices(doc: SanityHomepageDoc | null): HomepageService[] {
    const fromCms = (doc?.services ?? [])
        .filter((item) => item?.enabled !== false && item?.title?.trim() && item?.body?.trim())
        .map((item) => ({
            n: item.n?.trim() || '',
            title: item.title!.trim(),
            body: item.body!.trim(),
            items: (item.items ?? []).map((tag) => tag?.trim()).filter((tag): tag is string => Boolean(tag)),
            href: item.href?.trim() || '/services',
        }));
    return fromCms.length > 0 ? fromCms : defaultHomepageContent.services;
}

function mapProcess(doc: SanityHomepageDoc | null): HomepageProcessStep[] {
    const fromCms = (doc?.processSteps ?? [])
        .filter((item) => item?.enabled !== false && item?.title?.trim() && item?.body?.trim())
        .map((item) => ({
            n: item.n?.trim() || '',
            title: item.title!.trim(),
            body: item.body!.trim(),
            meta: item.meta?.trim() || '',
            art: item.art?.trim() || 'nodes',
        }));
    return fromCms.length > 0 ? fromCms : defaultHomepageContent.process;
}

function mapHomeFaqs(doc: SanityHomepageDoc | null): { q: string; a: string }[] {
    return pickFaqs(doc?.faqs, defaultHomepageContent.faqs.map((item) => ({
        question: item.q,
        answer: item.a,
    }))).map((item) => ({ q: item.question, a: item.answer }));
}

function mapMarquee(doc: SanityHomepageDoc | null): HomepageMarqueeItem[] {
    const fromCms = (doc?.marqueeItems ?? [])
        .filter((item) => item?.enabled !== false && item?.name?.trim())
        .map((item) => ({
            name: item.name!.trim(),
            href: item.href?.trim() || undefined,
        }));
    return fromCms.length > 0 ? fromCms : defaultHomepageContent.marqueeItems;
}

function resolveFeatured(
    doc: SanityHomepageDoc | null,
    allStudies: CaseStudy[],
): HomepageFeaturedCaseStudy[] {
    // allStudies is already public-filtered from getAllCaseStudies(); re-check for safety.
    const publicStudies = allStudies.filter(isPublicCaseStudy);
    const bySlug = new Map(publicStudies.map((study) => [study.slug, study]));
    const configured = (doc?.featuredCaseStudies ?? [])
        .filter((item) => item?.enabled !== false && item?.caseStudySlug?.trim())
        .map((item) => ({
            slug: item.caseStudySlug!.trim(),
            labelOverride: item.labelOverride?.trim() || undefined,
        }));

    const selected = configured.length
        ? configured
        : DEFAULT_FEATURED_SLUGS.map((slug) => ({ slug, labelOverride: undefined as string | undefined }));

    const featured: HomepageFeaturedCaseStudy[] = [];
    for (const item of selected) {
        if (isHiddenCaseStudySlug(item.slug)) continue;
        const study = bySlug.get(item.slug);
        if (!study) continue; // unknown / missing / unpublished slug — skip safely
        featured.push({
            study,
            tabLabel: item.labelOverride || study.category || study.title,
        });
    }

    if (featured.length > 0) return featured;

    // Last-resort fallback: public studies in default order, then remaining.
    // Avoids empty homepage showcase when CMS config is empty or all slugs invalid.
    const fallbackSlugs = [
        ...DEFAULT_FEATURED_SLUGS,
        ...publicStudies
            .map((study) => study.slug)
            .filter((slug) => !DEFAULT_FEATURED_SLUGS.includes(slug as (typeof DEFAULT_FEATURED_SLUGS)[number])),
    ];
    for (const slug of fallbackSlugs) {
        if (isHiddenCaseStudySlug(slug)) continue;
        const study = bySlug.get(slug);
        if (!study) continue;
        if (featured.some((item) => item.study.slug === study.slug)) continue;
        featured.push({ study, tabLabel: study.category || study.title });
    }
    return featured;
}

/**
 * Single homepage document fetch + case-study resolution.
 * Safe when Sanity is down or the Homepage document does not exist yet.
 * Empty/disabled CMS arrays fall back to approved code defaults (do not blank the homepage).
 */
export async function getHomepageContent(): Promise<HomepageContent> {
    let allStudies: CaseStudy[] = [];
    try {
        allStudies = await getAllCaseStudies();
    } catch (error) {
        console.warn('[sanity] Failed to load case studies for homepage; continuing with empty set.', error);
        allStudies = [];
    }

    const fallback = (): HomepageContent => ({
        stats: defaultHomepageContent.stats,
        marqueeLabel: defaultHomepageContent.marqueeLabel,
        marqueeItems: defaultHomepageContent.marqueeItems,
        showcaseEyebrow: defaultHomepageContent.showcaseEyebrow,
        showcaseTitle: defaultHomepageContent.showcaseTitle,
        showcaseDescription: defaultHomepageContent.showcaseDescription,
        featuredCaseStudies: resolveFeatured(null, allStudies),
        workEyebrow: defaultHomepageContent.workEyebrow,
        workTitle: defaultHomepageContent.workTitle,
        workLede: defaultHomepageContent.workLede,
        servicesEyebrow: defaultHomepageContent.servicesEyebrow,
        servicesTitle: defaultHomepageContent.servicesTitle,
        servicesLede: defaultHomepageContent.servicesLede,
        processMark: defaultHomepageContent.processMark,
        processTitle: defaultHomepageContent.processTitle,
        teamEyebrow: defaultHomepageContent.teamEyebrow,
        teamTitle: defaultHomepageContent.teamTitle,
        teamLede: defaultHomepageContent.teamLede,
        shipEyebrow: defaultHomepageContent.shipEyebrow,
        shipTitle: defaultHomepageContent.shipTitle,
        shipLede: defaultHomepageContent.shipLede,
        services: defaultHomepageContent.services,
        process: defaultHomepageContent.process,
        faqs: defaultHomepageContent.faqs,
    });

    const client = getSanityClient();
    if (!client) return fallback();

    try {
        const doc = await cachedSanityFetch('homepage', () =>
            client.fetch<SanityHomepageDoc | null>(homepageQuery),
        );

        return {
            stats: mapStats(doc),
            marqueeLabel: pickString(doc?.marqueeLabel, defaultHomepageContent.marqueeLabel),
            marqueeItems: mapMarquee(doc),
            showcaseEyebrow: pickString(doc?.showcaseEyebrow, defaultHomepageContent.showcaseEyebrow),
            showcaseTitle: pickString(doc?.showcaseTitle, defaultHomepageContent.showcaseTitle),
            showcaseDescription: pickString(
                doc?.showcaseDescription,
                defaultHomepageContent.showcaseDescription,
            ),
            featuredCaseStudies: resolveFeatured(doc, allStudies),
            workEyebrow: pickString(doc?.workEyebrow, defaultHomepageContent.workEyebrow),
            workTitle: pickString(doc?.workTitle, defaultHomepageContent.workTitle),
            workLede: pickString(doc?.workLede, defaultHomepageContent.workLede),
            servicesEyebrow: pickString(doc?.servicesEyebrow, defaultHomepageContent.servicesEyebrow),
            servicesTitle: pickString(doc?.servicesTitle, defaultHomepageContent.servicesTitle),
            servicesLede: pickString(doc?.servicesLede, defaultHomepageContent.servicesLede),
            processMark: pickString(doc?.processMark, defaultHomepageContent.processMark),
            processTitle: pickString(doc?.processTitle, defaultHomepageContent.processTitle),
            teamEyebrow: pickString(doc?.teamEyebrow, defaultHomepageContent.teamEyebrow),
            teamTitle: pickString(doc?.teamTitle, defaultHomepageContent.teamTitle),
            teamLede: pickString(doc?.teamLede, defaultHomepageContent.teamLede),
            shipEyebrow: pickString(doc?.shipEyebrow, defaultHomepageContent.shipEyebrow),
            shipTitle: pickString(doc?.shipTitle, defaultHomepageContent.shipTitle),
            shipLede: pickString(doc?.shipLede, defaultHomepageContent.shipLede),
            services: mapServices(doc),
            process: mapProcess(doc),
            faqs: mapHomeFaqs(doc),
        };
    } catch (error) {
        console.warn('[sanity] Failed to fetch homepage; using code fallbacks.', error);
        return fallback();
    }
}
