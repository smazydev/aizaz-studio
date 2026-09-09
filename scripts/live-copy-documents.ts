import { comparePages } from '../src/data/comparePages';
import {
    bookACall,
    engagementModels,
    portfolio,
    processPage,
    reviews,
    security,
} from '../src/data/commercialPages';
import { integrationPages } from '../src/data/integrationPages';
import { clientLogos, siteStats } from '../src/data/siteContent';
import { siteFooter, siteNav } from '../src/data/siteChrome';
import { seoExtras } from '../src/data/seoExtras';
import { aiSystemsSprintPage, industryPages, servicePages, type IndustryPage, type SeoPage } from '../src/data/seoPages';
import { technologyPages } from '../src/data/technologyPages';
import {
    defaultAboutPage,
    defaultCareersPage,
    defaultCompareIndex,
    defaultEngineeringTransformation,
    defaultServicesIndex,
    defaultStartProject,
    defaultTechnologiesIndex,
} from '../src/lib/sanity/sitePages';

type SanityDoc = Record<string, unknown> & { _id: string; _type: string };

function keyed<T extends Record<string, unknown>>(
    prefix: string,
    items: T[],
    typeName?: string,
): Array<T & { _key: string; _type?: string }> {
    return items.map((item, index) => ({
        ...(typeName ? { _type: typeName } : {}),
        _key: `${prefix}-${index}`,
        ...item,
    }));
}

function faqs(items: { question: string; answer: string }[] | undefined, prefix: string) {
    return keyed(
        prefix,
        (items ?? []).map((item) => ({
            question: item.question,
            answer: item.answer,
            enabled: true,
        })),
        'faqItem',
    );
}

function links(items: { label: string; href: string }[] | undefined, prefix: string) {
    return keyed(prefix, items ?? [], 'link');
}

function seo(metaTitle: string, metaDescription: string, canonicalPath: string, focusKeyword?: string) {
    return {
        _type: 'seoFields',
        metaTitle,
        metaDescription,
        canonicalPath,
        focusKeyword,
    };
}

function landingDoc(
    category: 'service' | 'industry' | 'integration' | 'sprint',
    page: SeoPage | IndustryPage | (typeof aiSystemsSprintPage & { useCases?: string[] }),
    extrasSlug: string,
    canonicalPath: string,
): SanityDoc {
    const extras = seoExtras[extrasSlug];
    const useCases =
        'useCases' in page && Array.isArray(page.useCases)
            ? page.useCases
            : 'examples' in page
              ? page.examples
              : [];
    const audienceLabel = 'audienceLabel' in page ? page.audienceLabel : undefined;

    return {
        _id: `landing.${category}.${page.slug}`,
        _type: 'landingPage',
        category,
        title: page.title,
        slug: { _type: 'slug', current: page.slug },
        audienceLabel,
        heroSubtitle: page.heroSubtitle,
        keywords: page.keywords ?? [],
        problem: page.problem,
        solution: page.solution,
        capabilities: page.capabilities ?? [],
        useCases,
        faqs: faqs(page.faqs, `${page.slug}-faq`),
        relatedSlugs: 'relatedSlugs' in page ? (page.relatedSlugs ?? []) : [],
        primaryCta: page.primaryCta
            ? { _type: 'link', label: page.primaryCta.label, href: page.primaryCta.href }
            : undefined,
        secondaryCta: page.secondaryCta
            ? { _type: 'link', label: page.secondaryCta.label, href: page.secondaryCta.href }
            : undefined,
        ctaTitle: 'ctaTitle' in page ? page.ctaTitle : undefined,
        ctaLede: 'ctaLede' in page ? page.ctaLede : undefined,
        benefits: keyed(
            `${page.slug}-benefit`,
            (extras?.benefits ?? []).map((item) => ({
                title: item.title,
                description: item.description,
            })),
            'benefitItem',
        ),
        seoSections: keyed(
            `${page.slug}-section`,
            (extras?.seoSections ?? []).map((item) => ({
                heading: item.heading,
                paragraphs: item.paragraphs,
            })),
            'richSection',
        ),
        processSteps: keyed(
            `${page.slug}-step`,
            (extras?.processSteps ?? []).map((item) => ({
                step: item.step,
                title: item.title,
                description: item.description,
            })),
            'processStepItem',
        ),
        proof: extras?.proof
            ? {
                  _type: 'proofBlock',
                  eyebrow: extras.proof.eyebrow,
                  heading: extras.proof.heading,
                  body: extras.proof.body,
                  links: links(extras.proof.links, `${page.slug}-proof`),
              }
            : undefined,
        seo: seo(page.metaTitle, page.metaDescription, canonicalPath, page.keywords?.[0]),
    };
}

function homepageDoc(): SanityDoc {
    return {
        _id: 'homepage',
        _type: 'homepage',
        title: 'Homepage',
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
        services: keyed(
            'home-service',
            [
                {
                    n: '01',
                    title: 'AI Automation',
                    body: 'Agents and workflows that take work off your team, from intake to action, with evals and a human handoff.',
                    items: ['Workflow mapping', 'Tool use & guardrails', 'Production evals'],
                    href: '/services/ai-automation-systems',
                    enabled: true,
                },
                {
                    n: '02',
                    title: 'Product Engineering',
                    body: 'Web apps and SaaS products built to ship: architecture, UI, and the backend your users actually hit.',
                    items: ['MVP to production', 'React / Node', 'Auth, billing, APIs'],
                    href: '/services/web-app-saas-development',
                    enabled: true,
                },
                {
                    n: '03',
                    title: 'Systems Integration',
                    body: 'CRM, helpdesk, warehouse, and internal tools connected so data stops living in five places.',
                    items: ['API connectors', 'Event buses', 'Idempotent sync'],
                    href: '/services/api-integration',
                    enabled: true,
                },
                {
                    n: '04',
                    title: 'ERP / NetSuite',
                    body: 'NetSuite and operations systems wired to the rest of the stack: orders, inventory, and finance in one flow.',
                    items: ['NetSuite REST / SuiteQL', 'Order sync', 'Custom records'],
                    href: '/services/netsuite-integration',
                    enabled: true,
                },
                {
                    n: '05',
                    title: 'Cloud Infrastructure',
                    body: 'AWS environments that stay up: CI/CD, observability, and the reliability work that makes shipping safe.',
                    items: ['AWS landing zone', 'Pipelines & canaries', 'Logs, traces, alerts'],
                    href: '/services/aws-devops',
                    enabled: true,
                },
            ],
            'homepageService',
        ),
        processSteps: keyed(
            'home-process',
            [
                { n: '01', title: 'Discover', body: 'Understand the workflow, constraints and systems.', meta: 'INPUT / OPS / USERS', art: 'nodes', enabled: true },
                { n: '02', title: 'Design', body: 'Map the experience, prompts, and handoff states.', meta: 'UX / PROMPTS / GUARDS', art: 'wire', enabled: true },
                { n: '03', title: 'Build', body: 'Assemble the agent, pipeline, or product.', meta: 'APP / MODEL / API', art: 'blocks', enabled: true },
                { n: '04', title: 'Integrate', body: 'Join CRM, ERP, warehouse, and internal tools.', meta: 'BUS / SYNC / AUTH', art: 'join', enabled: true },
                { n: '05', title: 'Ship', body: 'Deploy with tracing, canaries, and rollback.', meta: 'CI / CANARY / PROD', art: 'ship', enabled: true },
                { n: '06', title: 'Observe', body: 'Keep evals, cost, latency, and safety visible.', meta: 'EVAL / COST / P95', art: 'wave', enabled: true },
            ],
            'homepageProcessStep',
        ),
        faqs: keyed(
            'home-faq',
            [
                { question: 'How is this different from an agency or a freelancer?', answer: 'You talk to the people who build. No account layer, no staff-aug bench, no slide-deck phase. We take a defined operational problem and own it through production.', enabled: true },
                { question: 'What do we need to start?', answer: 'A clear problem, a decision-maker, and access to the systems involved. We run discovery as part of the work — not as a separate theater.', enabled: true },
                { question: 'What’s the typical timeline?', answer: 'A focused AI Systems Sprint is 14 days for one workflow. Broader product, integration, or infrastructure work is typically 3–8 weeks, scoped before we start.', enabled: true },
                { question: 'How do engagements work?', answer: 'Scoped sprints and project delivery, not opaque retainers. We align on the outcome, then ship with clear ownership through launch.', enabled: true },
            ],
            'faqItem',
        ),
        stats: keyed(
            'stat',
            siteStats.map((stat) => ({
                value: stat.value,
                suffix: stat.suffix,
                label: stat.label,
                enabled: true,
            })),
            'homepageStat',
        ),
        marqueeLabel: 'Trusted by product teams & operators',
        marqueeItems: keyed(
            'marquee',
            clientLogos.map((name) => ({ name, enabled: true })),
            'marqueeItem',
        ),
        showcaseEyebrow: 'Case Studies',
        showcaseTitle: 'Production systems, not portfolio filler',
        showcaseDescription:
            'Compliance, fintech, and infrastructure work built for teams that need software to hold up under real load.',
        featuredCaseStudies: keyed(
            'featured',
            [
                { caseStudySlug: 'propertymatchmaker-real-estate-saas', enabled: true },
                { caseStudySlug: 'designing-multi-tenant-crm-architecture', enabled: true },
                { caseStudySlug: '1archiver-compliance-platform', enabled: true },
                { caseStudySlug: 'modernizing-multi-language-code-checking-tool', enabled: true },
            ],
            'featuredCaseStudy',
        ),
    };
}

function siteSettingsDoc(): SanityDoc {
    return {
        _id: 'siteSettings',
        _type: 'siteSettings',
        title: 'Site settings',
        navLinks: links([...siteNav], 'nav'),
        navCtaLabel: 'Start a Project',
        navCtaHref: '/start-a-project',
        studioHeading: siteFooter.studio.heading,
        studioBlurb: siteFooter.studio.blurb,
        email: siteFooter.studio.email,
        phone: siteFooter.studio.phone,
        phoneHref: siteFooter.studio.phoneHref,
        footerColumns: keyed(
            'footer-col',
            siteFooter.columns.map((column) => ({
                heading: column.heading,
                links: links([...column.links], `footer-${column.heading}`),
            })),
            'footerColumn',
        ),
    };
}

function personDocs(): SanityDoc[] {
    return [
        {
            _id: 'person.ali-zafar',
            _type: 'person',
            name: 'Syed Ali Zafar',
            slug: { _type: 'slug', current: 'ali-zafar' },
            role: 'Founder & Principal Engineer',
            bio: 'Technical founder focused on SaaS architecture, AI systems, backend engineering, and cloud infrastructure.',
            focus: ['Product Engineering', 'SaaS', 'AI Systems', 'Cloud / Backend'],
            linkedin: 'https://www.linkedin.com/in/syedalizfr/',
            githubUrl: 'https://github.com/smazydev',
        },
        {
            _id: 'person.nasir',
            _type: 'person',
            name: 'Nasir Mahmood',
            slug: { _type: 'slug', current: 'nasir' },
            role: 'Co-Founder, ERP & Integrations',
            bio: 'Co-founder focused on ERP, NetSuite, and commerce integration work across business systems.',
            focus: ['NetSuite', 'ERP', 'Commerce Integrations', 'Business Systems'],
            linkedin: 'https://www.linkedin.com/in/muh-nasir-mahmood/',
            githubUrl: 'https://github.com/muh-nasiruit',
        },
        {
            _id: 'person.ayaz',
            _type: 'person',
            name: 'Ayaz Khan',
            slug: { _type: 'slug', current: 'ayaz' },
            role: 'Co-Founder, Operations & Growth',
            bio: 'Co-founder focused on operations, growth, and keeping client delivery commercially clear.',
            focus: ['Operations', 'Growth', 'Client Delivery', 'Commercial Strategy'],
            linkedin: 'https://www.linkedin.com/in/ayaz-khan22/',
        },
    ];
}

function indexSitePage(
    pageKey: string,
    page: {
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
    },
    canonicalPath: string,
    extra: Record<string, unknown> = {},
): SanityDoc {
    return {
        _id: `sitePage.${pageKey}`,
        _type: 'sitePage',
        pageKey,
        title: page.title,
        heroEyebrow: page.heroEyebrow,
        heroHighlight: page.heroHighlight,
        heroSubtitle: page.heroSubtitle,
        intro: page.intro,
        sectionEyebrow: page.sectionEyebrow,
        sectionTitle: page.sectionTitle,
        sectionLede: page.sectionLede,
        ctaTitle: page.ctaTitle,
        ctaLede: page.ctaLede,
        cards: keyed(
            `${pageKey}-card`,
            (page.cards ?? []).map((card) => ({
                eyebrow: card.eyebrow,
                heading: card.heading,
                body: card.body,
            })),
            'titledText',
        ),
        seo: seo(page.metaTitle, page.metaDescription, canonicalPath),
        ...extra,
    };
}

function sitePageDocs(): SanityDoc[] {
    const processFaqs = [
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

    return [
        {
            _id: 'sitePage.engagement-models',
            _type: 'sitePage',
            pageKey: 'engagement-models',
            title: engagementModels.title,
            heroSubtitle: engagementModels.heroSubtitle,
            faqs: faqs(engagementModels.faqs, 'engagement-faq'),
            relatedLinks: links(engagementModels.relatedLinks, 'engagement-link'),
            models: keyed(
                'model',
                engagementModels.models.map((model) => ({
                    id: model.id,
                    name: model.name,
                    summary: model.summary,
                    duration: model.duration,
                    bestFor: model.bestFor,
                    deliverables: model.deliverables,
                    startingFrom: model.startingFrom,
                })),
                'engagementModel',
            ),
            comparisonHeaders: engagementModels.comparisonTable.headers,
            comparisonRows: keyed(
                'cmp-row',
                engagementModels.comparisonTable.rows.map((row) => ({
                    feature: row.feature,
                    sprint: row.sprint,
                    project: row.project,
                    dedicated: row.dedicated,
                    retainer: row.retainer,
                })),
                'comparisonTableRow',
            ),
            included: engagementModels.included,
            notIncluded: engagementModels.notIncluded,
            selectorGuide: keyed(
                'selector',
                engagementModels.selectorGuide.map((item) => ({
                    heading: item.heading,
                    body: item.body,
                })),
                'titledText',
            ),
            seo: seo(engagementModels.metaTitle, engagementModels.metaDescription, '/engagement-models'),
        },
        {
            _id: 'sitePage.book-a-call',
            _type: 'sitePage',
            pageKey: 'book-a-call',
            title: bookACall.title,
            heroSubtitle: bookACall.heroSubtitle,
            faqs: faqs(bookACall.sections.faqs, 'book-faq'),
            listSections: keyed(
                'book-list',
                (
                    [
                        ['whoFor', bookACall.sections.whoFor],
                        ['whatWeCover', bookACall.sections.whatWeCover],
                        ['whatToPrepare', bookACall.sections.whatToPrepare],
                        ['goodFit', bookACall.sections.goodFit],
                        ['notFit', bookACall.sections.notFit],
                    ] as const
                ).map(([key, section]) => ({
                    key,
                    heading: section.heading,
                    items: section.items,
                })),
                'titledList',
            ),
            seo: seo(bookACall.metaTitle, bookACall.metaDescription, '/book-a-call'),
        },
        {
            _id: 'sitePage.portfolio',
            _type: 'sitePage',
            pageKey: 'portfolio',
            title: portfolio.title,
            intro: portfolio.intro,
            projects: keyed(
                'project',
                portfolio.projects.map((project) => ({
                    slug: project.slug,
                    name: project.name,
                    category: project.category,
                    summary: project.summary,
                    outcomes: project.outcomes,
                    stack: project.stack,
                    href: project.href,
                })),
                'portfolioProject',
            ),
            seo: seo(portfolio.metaTitle, portfolio.metaDescription, '/portfolio'),
        },
        {
            _id: 'sitePage.reviews',
            _type: 'sitePage',
            pageKey: 'reviews',
            title: reviews.title,
            intro: reviews.intro,
            quotes: keyed(
                'quote',
                reviews.placeholderQuotes.map((quote) => ({
                    quote: quote.quote,
                    author: quote.author,
                    role: quote.role,
                    company: quote.company,
                })),
                'testimonial',
            ),
            seo: seo(reviews.metaTitle, reviews.metaDescription, '/reviews'),
        },
        {
            _id: 'sitePage.security',
            _type: 'sitePage',
            pageKey: 'security',
            title: security.title,
            heroSubtitle: security.heroSubtitle,
            contentSections: keyed(
                'security-section',
                security.sections.map((section) => ({
                    heading: section.heading,
                    paragraphs: section.paragraphs,
                    bullets: section.bullets ?? [],
                })),
                'richSection',
            ),
            seo: seo(security.metaTitle, security.metaDescription, '/security'),
        },
        {
            _id: 'sitePage.process',
            _type: 'sitePage',
            pageKey: 'process',
            title: processPage.title,
            heroEyebrow: 'How we work',
            heroHighlight: 'a delivery discipline',
            heroSubtitle:
                'Every engagement follows the same lifecycle: discover, design, build, integrate, ship, and observe. Timelines depend on scope. We do not invent universal delivery dates.',
            intro: processPage.intro,
            faqs: faqs(processFaqs, 'process-faq'),
            processSteps: keyed(
                'process-step',
                processPage.steps.map((step) => ({
                    step: step.step,
                    title: step.title,
                    subtitle: step.subtitle,
                    description: step.description,
                })),
                'processStepItem',
            ),
            seo: seo(processPage.metaTitle, processPage.metaDescription, '/process'),
        },
        indexSitePage('about', defaultAboutPage, '/about', {
            contentSections: keyed(
                'about-how',
                defaultAboutPage.howSteps.map((step) => ({
                    heading: step.title,
                    paragraphs: [step.body],
                })),
                'richSection',
            ),
        }),
        indexSitePage('careers', defaultCareersPage, '/careers', {
            values: keyed(
                'career-value',
                defaultCareersPage.values.map((value) => ({
                    heading: value.title,
                    body: value.description,
                })),
                'titledText',
            ),
            jobs: keyed(
                'job',
                defaultCareersPage.jobs.map((job) => ({
                    title: job.title,
                    department: job.department,
                    location: job.location,
                    type: job.type,
                    description: job.description,
                })),
                'jobListing',
            ),
        }),
        indexSitePage('services-index', defaultServicesIndex, '/services'),
        indexSitePage('technologies-index', defaultTechnologiesIndex, '/technologies'),
        indexSitePage('compare-index', defaultCompareIndex, '/compare'),
        indexSitePage('start-a-project', defaultStartProject, '/start-a-project'),
        indexSitePage('engineering-transformation', defaultEngineeringTransformation, '/engineering-transformation'),
    ];
}

export function buildLiveCopyDocuments(): SanityDoc[] {
    const docs: SanityDoc[] = [
        homepageDoc(),
        siteSettingsDoc(),
        ...personDocs(),
        ...servicePages.map((page) => landingDoc('service', page, page.slug, `/services/${page.slug}`)),
        ...industryPages.map((page) => landingDoc('industry', page, page.slug, `/for/${page.slug}`)),
        ...integrationPages.map((page) =>
            landingDoc('integration', page, page.slug, `/integrations/${page.slug}`),
        ),
        landingDoc('sprint', { ...aiSystemsSprintPage, useCases: aiSystemsSprintPage.examples }, 'ai-systems-sprint', '/ai-systems-sprint'),
        ...technologyPages.map((page) => ({
            _id: `technology.${page.slug}`,
            _type: 'technologyPage',
            title: page.title,
            slug: { _type: 'slug', current: page.slug },
            heroSubtitle: page.heroSubtitle,
            outcomes: page.outcomes,
            useCases: page.useCases,
            stackNotes: page.stackNotes,
            relatedServices: links(page.relatedServices, `${page.slug}-rel`),
            faqs: faqs(page.faqs, `${page.slug}-faq`),
            seo: seo(page.metaTitle, page.metaDescription, `/technologies/${page.slug}`),
        })),
        ...comparePages.map((page) => ({
            _id: `compare.${page.slug}`,
            _type: 'comparePage',
            title: page.title,
            slug: { _type: 'slug', current: page.slug },
            heroSubtitle: page.heroSubtitle,
            intro: page.intro,
            comparisonRows: keyed(
                `${page.slug}-row`,
                page.comparisonRows.map((row) => ({
                    label: row.label,
                    optionA: row.optionA,
                    optionB: row.optionB,
                })),
                'comparisonRow',
            ),
            sections: keyed(
                `${page.slug}-section`,
                page.sections.map((section) => ({
                    heading: section.heading,
                    paragraphs: section.paragraphs,
                })),
                'richSection',
            ),
            faqs: faqs(page.faqs, `${page.slug}-faq`),
            ctaText: page.ctaText,
            relatedLinks: links(page.relatedLinks, `${page.slug}-rel`),
            seo: seo(page.metaTitle, page.metaDescription, `/compare/${page.slug}`),
        })),
        ...sitePageDocs(),
    ];

    return docs;
}
