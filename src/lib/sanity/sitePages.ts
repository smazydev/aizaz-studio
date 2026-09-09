import {
    bookACall,
    engagementModels,
    portfolio,
    processPage,
    reviews,
    security,
    type BookACallContent,
    type EngagementModelsContent,
    type PortfolioContent,
    type ProcessPageContent,
    type ReviewsContent,
    type SecurityContent,
} from '../../data/commercialPages';
import { cachedSanityFetch, getSanityClient } from './client';
import { pickFaqs, pickLinks, pickOptionalString, pickString, pickStringArray } from './overlay';
import { sitePagesQuery } from './queries';
import { mapSanitySeo } from './seo';

export type SitePageKey =
    | 'engagement-models'
    | 'book-a-call'
    | 'portfolio'
    | 'reviews'
    | 'security'
    | 'process'
    | 'careers'
    | 'about'
    | 'services-index'
    | 'technologies-index'
    | 'compare-index'
    | 'start-a-project'
    | 'engineering-transformation';

export type IndexPageContent = {
    metaTitle: string;
    metaDescription: string;
    title: string;
    heroEyebrow?: string;
    heroHighlight?: string;
    heroSubtitle: string;
    intro?: string;
    sectionEyebrow?: string;
    sectionTitle?: string;
    sectionLede?: string;
    ctaTitle?: string;
    ctaLede?: string;
    cards?: { eyebrow?: string; heading: string; body: string }[];
};

export type AboutPageContent = IndexPageContent & {
    howSteps: { eyebrow: string; title: string; body: string }[];
};

export type CareersPageContent = IndexPageContent & {
    values: { title: string; description: string }[];
    jobs: { title: string; department: string; location: string; type: string; description: string }[];
};

export type ProcessPageCms = ProcessPageContent & {
    heroTitle?: string;
    heroEyebrow?: string;
    heroHighlight?: string;
    heroSubtitle?: string;
    faqs: { question: string; answer: string }[];
};

type SanitySiteDoc = {
    pageKey?: SitePageKey | null;
    title?: string | null;
    heroEyebrow?: string | null;
    heroHighlight?: string | null;
    heroSubtitle?: string | null;
    intro?: string | null;
    faqs?: Array<{ question?: string | null; answer?: string | null; enabled?: boolean | null }> | null;
    relatedLinks?: Array<{ label?: string | null; href?: string | null }> | null;
    cards?: Array<{ eyebrow?: string | null; heading?: string | null; body?: string | null }> | null;
    models?: Array<{
        id?: string | null;
        name?: string | null;
        summary?: string | null;
        duration?: string | null;
        bestFor?: Array<string | null> | null;
        deliverables?: Array<string | null> | null;
        startingFrom?: string | null;
    }> | null;
    comparisonHeaders?: Array<string | null> | null;
    comparisonRows?: Array<{
        feature?: string | null;
        sprint?: string | null;
        project?: string | null;
        dedicated?: string | null;
        retainer?: string | null;
    }> | null;
    included?: Array<string | null> | null;
    notIncluded?: Array<string | null> | null;
    selectorGuide?: Array<{ heading?: string | null; body?: string | null }> | null;
    listSections?: Array<{
        key?: string | null;
        heading?: string | null;
        items?: Array<string | null> | null;
    }> | null;
    projects?: Array<{
        slug?: string | null;
        name?: string | null;
        category?: string | null;
        summary?: string | null;
        outcomes?: Array<string | null> | null;
        stack?: Array<string | null> | null;
        href?: string | null;
    }> | null;
    quotes?: Array<{
        quote?: string | null;
        author?: string | null;
        role?: string | null;
        company?: string | null;
    }> | null;
    contentSections?: Array<{
        heading?: string | null;
        paragraphs?: Array<string | null> | null;
        bullets?: Array<string | null> | null;
    }> | null;
    processSteps?: Array<{
        step?: string | null;
        title?: string | null;
        subtitle?: string | null;
        description?: string | null;
    }> | null;
    values?: Array<{ heading?: string | null; body?: string | null }> | null;
    jobs?: Array<{
        title?: string | null;
        department?: string | null;
        location?: string | null;
        type?: string | null;
        description?: string | null;
    }> | null;
    sectionEyebrow?: string | null;
    sectionTitle?: string | null;
    sectionLede?: string | null;
    ctaTitle?: string | null;
    ctaLede?: string | null;
    seo?: Parameters<typeof mapSanitySeo>[0];
};

const defaultProcessFaqs = [
    {
        question: 'Does every project use every stage?',
        answer: 'Yes in spirit. Discovery and design always happen, even on a focused sprint. Build, integrate, ship, and observe scale with the engagement model you choose.',
    },
    {
        question: 'Can we start with one stage only?',
        answer: 'Yes. Many clients start with discovery and a 14-day AI Systems Sprint before committing to a platform build or retainer.',
    },
    {
        question: 'Do you document everything for our team?',
        answer: 'Yes. Handoff includes architecture notes, runbooks, and access documentation so your team can operate and extend the system.',
    },
    {
        question: 'Who works on our project?',
        answer: 'Senior engineers and architects. We do not rotate junior staff onto production systems without senior oversight.',
    },
];

export const defaultAboutPage: AboutPageContent = {
    metaTitle: 'About Aizaz Studio | Senior Systems Team',
    metaDescription:
        'A senior systems team for stuck workflows, stalled products, and systems that don’t talk. AI automation, SaaS, NetSuite, and AWS — owned through production.',
    title: 'A senior systems',
    heroHighlight: 'team on demand',
    heroEyebrow: 'About',
    heroSubtitle:
        'You shouldn’t have to manage the people building the system. Hand us the operational problem — we diagnose, build, and ship.',
    intro: 'We help founders and operations teams replace manual, scattered workflows with connected software, from a focused sprint to a full platform build.',
    sectionEyebrow: 'What we are',
    sectionTitle: 'Systems thinking, senior delivery',
    sectionLede:
        'We help founders and operations teams replace manual, scattered workflows with connected software, from a focused sprint to a full platform build.',
    cards: [
        {
            eyebrow: 'Who we work with',
            heading: 'Ops-heavy teams and product builders',
            body: 'SaaS founders, ecommerce operators, clinics, trading businesses, NetSuite users, and agencies that need senior engineering, not another layer of account management.',
        },
        {
            eyebrow: 'How we think',
            heading: 'Across architecture, automation, and handoff',
            body: 'Isolated vendors create gaps. We design the technical layer so CRM, ERP, product, and cloud stay coherent, and your team can operate what we ship.',
        },
    ],
    howSteps: [
        { eyebrow: '01', title: 'Discover', body: 'Map the stack and pick the highest-leverage workflow or product milestone.' },
        { eyebrow: '02', title: 'Build & integrate', body: 'Senior engineers ship against real systems, not isolated demos.' },
        { eyebrow: '03', title: 'Ship & observe', body: 'Deploy with CI/CD, logging, and handoff so operations stay quiet after launch.' },
    ],
    ctaTitle: 'Ready to talk through a system?',
    ctaLede: 'Tell us what needs fixing. We’ll map fit, scope, and a sensible first step.',
};

export const defaultCareersPage: CareersPageContent = {
    metaTitle: 'Careers | Aizaz.studio',
    metaDescription:
        'Join a small senior team that builds AI automation, SaaS, NetSuite, and AWS systems. Exceptional engineers welcome even when roles are paused.',
    title: 'Build systems that',
    heroHighlight: 'businesses depend on',
    heroEyebrow: 'Careers',
    heroSubtitle:
        'A small senior team. Direct ownership. AI automation, SaaS, NetSuite, and cloud. Exceptional engineers welcome even when we are not hiring.',
    sectionEyebrow: 'Roles',
    sectionTitle: 'Open roles',
    sectionLede: 'We review applications continuously — reach out even if a role is marked paused.',
    values: [
        {
            title: 'Systems over slides',
            description: 'We measure success by working software in production, not decks and wireframes that never ship.',
        },
        {
            title: 'Ownership mentality',
            description: 'We think like architects and build like engineers. Every project gets proper deployment, docs, and handoff.',
        },
        {
            title: 'Remote-first, delivery-focused',
            description: 'Distributed team, clear communication, and async-friendly workflows that keep projects moving.',
        },
    ],
    jobs: [
        {
            title: 'Senior Full Stack Engineer',
            department: 'Engineering',
            location: 'Remote',
            type: 'full time',
            description: 'Build production web apps, APIs, and automations for clients across SaaS, ecommerce, and fintech.',
        },
        {
            title: 'Backend / Integration Engineer',
            department: 'Engineering',
            location: 'Remote',
            type: 'full time',
            description: 'NetSuite, ERP middleware, AWS backends, and high reliability data sync systems.',
        },
        {
            title: 'AI Automation Engineer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Contract / full time',
            description: 'Design and ship AI assisted workflows, agents, and internal tools connected to business systems.',
        },
    ],
};

export const defaultServicesIndex: IndexPageContent = {
    metaTitle: 'Engineering Services for AI, SaaS & Cloud | Aizaz',
    metaDescription:
        'Stuck workflows, a product that needs to ship, or systems that don’t talk. Senior engineers for AI automation, SaaS, NetSuite, and AWS.',
    title: 'Turn operational bottlenecks',
    heroHighlight: 'into systems you can run.',
    heroEyebrow: 'Engineering services',
    heroSubtitle:
        'Hand us a manual process, a product that needs to ship, disconnected tools, or infrastructure that cannot keep up. We own it through production.',
};

export const defaultTechnologiesIndex: IndexPageContent = {
    metaTitle: 'Technologies We Build With | Aizaz Studio',
    metaDescription:
        'Node.js, Python, React, AWS, OpenAI, LangChain, and more, applied to SaaS, AI systems, automation, and cloud delivery.',
    title: 'Technologies tied to business outcomes',
    heroEyebrow: 'Stack',
    heroSubtitle:
        'We choose tools based on reliability, maintainability, and fit for your product, not resume-driven hype.',
};

export const defaultCompareIndex: IndexPageContent = {
    metaTitle: 'Compare Engagement Options | Aizaz Studio',
    metaDescription:
        'Compare product engineering with staff augmentation, agencies vs freelancers, and AI Systems Sprint vs traditional automation projects.',
    title: 'Compare your options',
    heroEyebrow: 'Resources',
    heroSubtitle: 'Honest comparisons to help you choose the right model for AI, SaaS, cloud, and automation work.',
};

export const defaultStartProject: IndexPageContent = {
    metaTitle: 'Tell Us What Needs Fixing | Aizaz.studio',
    metaDescription:
        'Send a short brief about the workflow, product, or system that needs fixing. Aizaz Studio reviews it and follows up by email — or talk to an engineer live.',
    title: 'Tell us what needs fixing',
    heroEyebrow: 'Start a project',
    heroSubtitle:
        'Share a short brief. We’ll review it and follow up on the email you provide. Prefer a live conversation? Talk through your system instead.',
};

export const defaultEngineeringTransformation: IndexPageContent = {
    metaTitle: 'How We Work | Aizaz.studio',
    metaDescription:
        'Our process for discovery, architecture, build, deployment, and handoff, designed to ship reliable AI, automation, and software systems.',
    title: 'From manual workflow',
    heroHighlight: 'to production system',
    heroEyebrow: 'How we work',
    heroSubtitle:
        'Discover, design, build, integrate, ship, and observe: the same disciplined process whether you start with a 14-day sprint or a full platform engagement.',
    intro: 'We do not assign random freelancers or disappear after a demo. One senior team maps your workflow, connects your tools, deploys to production, and documents everything your ops team needs to run it.',
};

async function fetchSiteDocs(): Promise<SanitySiteDoc[]> {
    const client = getSanityClient();
    if (!client) return [];
    try {
        return await cachedSanityFetch('sitePages:all', () => client.fetch<SanitySiteDoc[]>(sitePagesQuery));
    } catch (error) {
        console.warn('[sanity] Failed to fetch site pages; using static fallback.', error);
        return [];
    }
}

async function getDoc(key: SitePageKey): Promise<SanitySiteDoc | null> {
    const docs = await fetchSiteDocs();
    return docs.find((doc) => doc.pageKey === key) ?? null;
}

function mapIndex(doc: SanitySiteDoc | null, fallback: IndexPageContent): IndexPageContent {
    const seo = mapSanitySeo(doc?.seo, undefined, {
        title: fallback.metaTitle,
        description: fallback.metaDescription,
    });
    const cards = (doc?.cards ?? [])
        .filter((card) => card?.heading?.trim() && card?.body?.trim())
        .map((card) => ({
            eyebrow: pickOptionalString(card.eyebrow),
            heading: card.heading!.trim(),
            body: card.body!.trim(),
        }));

    return {
        metaTitle: seo.metaTitle || fallback.metaTitle,
        metaDescription: seo.metaDescription || fallback.metaDescription,
        title: pickString(doc?.title, fallback.title),
        heroEyebrow: pickOptionalString(doc?.heroEyebrow) ?? fallback.heroEyebrow,
        heroHighlight: pickOptionalString(doc?.heroHighlight) ?? fallback.heroHighlight,
        heroSubtitle: pickString(doc?.heroSubtitle, fallback.heroSubtitle),
        intro: pickOptionalString(doc?.intro) ?? fallback.intro,
        sectionEyebrow: pickOptionalString(doc?.sectionEyebrow) ?? fallback.sectionEyebrow,
        sectionTitle: pickOptionalString(doc?.sectionTitle) ?? fallback.sectionTitle,
        sectionLede: pickOptionalString(doc?.sectionLede) ?? fallback.sectionLede,
        ctaTitle: pickOptionalString(doc?.ctaTitle) ?? fallback.ctaTitle,
        ctaLede: pickOptionalString(doc?.ctaLede) ?? fallback.ctaLede,
        cards: cards.length > 0 ? cards : fallback.cards,
    };
}

export async function getEngagementModels(): Promise<EngagementModelsContent> {
    const doc = await getDoc('engagement-models');
    const seo = mapSanitySeo(doc?.seo, undefined, {
        title: engagementModels.metaTitle,
        description: engagementModels.metaDescription,
    });
    const models = (doc?.models ?? [])
        .filter((model) => model?.name?.trim() && model?.summary?.trim())
        .map((model) => ({
            id: model.id?.trim() || model.name!.trim().toLowerCase().replace(/\s+/g, '-'),
            name: model.name!.trim(),
            summary: model.summary!.trim(),
            duration: model.duration?.trim() || '',
            bestFor: pickStringArray(model.bestFor, []),
            deliverables: pickStringArray(model.deliverables, []),
            startingFrom: pickOptionalString(model.startingFrom),
        }));
    const comparisonRows = (doc?.comparisonRows ?? [])
        .filter((row) => row?.feature?.trim())
        .map((row) => ({
            feature: row.feature!.trim(),
            sprint: row.sprint?.trim() || '',
            project: row.project?.trim() || '',
            dedicated: row.dedicated?.trim() || '',
            retainer: row.retainer?.trim() || '',
        }));
    const selectorGuide = (doc?.selectorGuide ?? [])
        .filter((item) => item?.heading?.trim() && item?.body?.trim())
        .map((item) => ({ heading: item.heading!.trim(), body: item.body!.trim() }));

    return {
        metaTitle: seo.metaTitle || engagementModels.metaTitle,
        metaDescription: seo.metaDescription || engagementModels.metaDescription,
        title: pickString(doc?.title, engagementModels.title),
        heroSubtitle: pickString(doc?.heroSubtitle, engagementModels.heroSubtitle),
        models: models.length > 0 ? models : engagementModels.models,
        comparisonTable: {
            headers: pickStringArray(doc?.comparisonHeaders, engagementModels.comparisonTable.headers),
            rows: comparisonRows.length > 0 ? comparisonRows : engagementModels.comparisonTable.rows,
        },
        included: pickStringArray(doc?.included, engagementModels.included),
        notIncluded: pickStringArray(doc?.notIncluded, engagementModels.notIncluded),
        selectorGuide: selectorGuide.length > 0 ? selectorGuide : engagementModels.selectorGuide,
        faqs: pickFaqs(doc?.faqs, engagementModels.faqs),
        relatedLinks: pickLinks(doc?.relatedLinks, engagementModels.relatedLinks),
    };
}

export async function getBookACall(): Promise<BookACallContent> {
    const doc = await getDoc('book-a-call');
    const seo = mapSanitySeo(doc?.seo, undefined, {
        title: bookACall.metaTitle,
        description: bookACall.metaDescription,
    });
    const lists = new Map(
        (doc?.listSections ?? [])
            .filter((section) => section?.key?.trim())
            .map((section) => [
                section.key!.trim(),
                {
                    heading: section.heading?.trim() || '',
                    items: pickStringArray(section.items, []),
                },
            ]),
    );
    const overlayList = (
        key: 'whoFor' | 'whatWeCover' | 'whatToPrepare' | 'goodFit' | 'notFit',
        fallback: { heading: string; items: string[] },
    ) => {
        const fromCms = lists.get(key);
        if (fromCms && fromCms.items.length > 0) {
            return { heading: fromCms.heading || fallback.heading, items: fromCms.items };
        }
        return fallback;
    };

    return {
        metaTitle: seo.metaTitle || bookACall.metaTitle,
        metaDescription: seo.metaDescription || bookACall.metaDescription,
        title: pickString(doc?.title, bookACall.title),
        heroSubtitle: pickString(doc?.heroSubtitle, bookACall.heroSubtitle),
        sections: {
            whoFor: overlayList('whoFor', bookACall.sections.whoFor),
            whatWeCover: overlayList('whatWeCover', bookACall.sections.whatWeCover),
            whatToPrepare: overlayList('whatToPrepare', bookACall.sections.whatToPrepare),
            goodFit: overlayList('goodFit', bookACall.sections.goodFit),
            notFit: overlayList('notFit', bookACall.sections.notFit),
            faqs: pickFaqs(doc?.faqs, bookACall.sections.faqs),
        },
    };
}

export async function getPortfolio(): Promise<PortfolioContent> {
    const doc = await getDoc('portfolio');
    const seo = mapSanitySeo(doc?.seo, undefined, {
        title: portfolio.metaTitle,
        description: portfolio.metaDescription,
    });
    const projects = (doc?.projects ?? [])
        .filter((project) => project?.name?.trim() && project?.summary?.trim())
        .map((project) => ({
            slug: project.slug?.trim() || project.name!.trim().toLowerCase().replace(/\s+/g, '-'),
            name: project.name!.trim(),
            category: project.category?.trim() || '',
            summary: project.summary!.trim(),
            outcomes: pickStringArray(project.outcomes, []),
            stack: pickStringArray(project.stack, []),
            href: pickOptionalString(project.href),
        }));

    return {
        metaTitle: seo.metaTitle || portfolio.metaTitle,
        metaDescription: seo.metaDescription || portfolio.metaDescription,
        title: pickString(doc?.title, portfolio.title),
        intro: pickString(doc?.intro, portfolio.intro),
        projects: projects.length > 0 ? projects : portfolio.projects,
    };
}

export async function getReviews(): Promise<ReviewsContent> {
    const doc = await getDoc('reviews');
    const seo = mapSanitySeo(doc?.seo, undefined, {
        title: reviews.metaTitle,
        description: reviews.metaDescription,
    });
    const quotes = (doc?.quotes ?? [])
        .filter((quote) => quote?.quote?.trim() && quote?.author?.trim())
        .map((quote) => ({
            quote: quote.quote!.trim(),
            author: quote.author!.trim(),
            role: quote.role?.trim() || '',
            company: quote.company?.trim() || '',
        }));

    return {
        metaTitle: seo.metaTitle || reviews.metaTitle,
        metaDescription: seo.metaDescription || reviews.metaDescription,
        title: pickString(doc?.title, reviews.title),
        intro: pickString(doc?.intro, reviews.intro),
        placeholderQuotes: quotes.length > 0 ? quotes : reviews.placeholderQuotes,
    };
}

export async function getSecurity(): Promise<SecurityContent> {
    const doc = await getDoc('security');
    const seo = mapSanitySeo(doc?.seo, undefined, {
        title: security.metaTitle,
        description: security.metaDescription,
    });
    const sections = (doc?.contentSections ?? [])
        .filter((section) => section?.heading?.trim())
        .map((section) => ({
            heading: section.heading!.trim(),
            paragraphs: (section.paragraphs ?? []).map((p) => p?.trim()).filter((p): p is string => Boolean(p)),
            bullets: pickStringArray(section.bullets, []).length
                ? pickStringArray(section.bullets, [])
                : undefined,
        }))
        .filter((section) => section.paragraphs.length > 0);

    return {
        metaTitle: seo.metaTitle || security.metaTitle,
        metaDescription: seo.metaDescription || security.metaDescription,
        title: pickString(doc?.title, security.title),
        heroSubtitle: pickString(doc?.heroSubtitle, security.heroSubtitle),
        sections: sections.length > 0 ? sections : security.sections,
    };
}

export async function getProcessPage(): Promise<ProcessPageCms> {
    const doc = await getDoc('process');
    const seo = mapSanitySeo(doc?.seo, undefined, {
        title: processPage.metaTitle,
        description: processPage.metaDescription,
    });
    const steps = (doc?.processSteps ?? [])
        .filter((step) => step?.title?.trim() && step?.description?.trim())
        .map((step) => ({
            step: step.step?.trim() || '',
            title: step.title!.trim(),
            subtitle: step.subtitle?.trim() || '',
            description: step.description!.trim(),
        }));

    return {
        metaTitle: seo.metaTitle || processPage.metaTitle,
        metaDescription: seo.metaDescription || processPage.metaDescription,
        title: pickString(doc?.title, processPage.title),
        intro: pickString(doc?.intro, processPage.intro),
        steps: steps.length > 0 ? steps : processPage.steps,
        heroTitle: 'Discover → Observe',
        heroEyebrow: pickOptionalString(doc?.heroEyebrow) ?? 'How we work',
        heroHighlight: pickOptionalString(doc?.heroHighlight) ?? 'a delivery discipline',
        heroSubtitle:
            pickOptionalString(doc?.heroSubtitle) ??
            'Every engagement follows the same lifecycle: discover, design, build, integrate, ship, and observe. Timelines depend on scope. We do not invent universal delivery dates.',
        faqs: pickFaqs(doc?.faqs, defaultProcessFaqs),
    };
}

export async function getAboutPage(): Promise<AboutPageContent> {
    const doc = await getDoc('about');
    const base = mapIndex(doc, defaultAboutPage);
    const howSteps = (doc?.contentSections ?? [])
        .filter((section) => section?.heading?.trim())
        .map((section, index) => ({
            eyebrow: String(index + 1).padStart(2, '0'),
            title: section.heading!.trim(),
            body: (section.paragraphs ?? []).map((p) => p?.trim()).filter(Boolean).join(' '),
        }))
        .filter((step) => step.body);
    return {
        ...base,
        howSteps: howSteps.length > 0 ? howSteps : defaultAboutPage.howSteps,
    };
}

export async function getCareersPage(): Promise<CareersPageContent> {
    const doc = await getDoc('careers');
    const base = mapIndex(doc, defaultCareersPage);
    const values = (doc?.values ?? [])
        .filter((item) => item?.heading?.trim() && item?.body?.trim())
        .map((item) => ({ title: item.heading!.trim(), description: item.body!.trim() }));
    const jobs = (doc?.jobs ?? [])
        .filter((job) => job?.title?.trim() && job?.description?.trim())
        .map((job) => ({
            title: job.title!.trim(),
            department: job.department?.trim() || 'Engineering',
            location: job.location?.trim() || 'Remote',
            type: job.type?.trim() || 'full time',
            description: job.description!.trim(),
        }));
    const cardsAsValues = (base.cards ?? [])
        .filter((card) => card.heading && card.body)
        .map((card) => ({ title: card.heading, description: card.body }));

    return {
        ...base,
        values: values.length > 0 ? values : cardsAsValues.length > 0 ? cardsAsValues : defaultCareersPage.values,
        jobs: jobs.length > 0 ? jobs : defaultCareersPage.jobs,
    };
}

export async function getServicesIndex(): Promise<IndexPageContent> {
    return mapIndex(await getDoc('services-index'), defaultServicesIndex);
}

export async function getTechnologiesIndex(): Promise<IndexPageContent> {
    return mapIndex(await getDoc('technologies-index'), defaultTechnologiesIndex);
}

export async function getCompareIndex(): Promise<IndexPageContent> {
    return mapIndex(await getDoc('compare-index'), defaultCompareIndex);
}

export async function getStartProjectPage(): Promise<IndexPageContent> {
    return mapIndex(await getDoc('start-a-project'), defaultStartProject);
}

export async function getEngineeringTransformationPage(): Promise<IndexPageContent> {
    return mapIndex(await getDoc('engineering-transformation'), defaultEngineeringTransformation);
}
