import { processSteps } from './processSteps';

export interface EngagementModel {
    id: string;
    name: string;
    summary: string;
    duration: string;
    bestFor: string[];
    deliverables: string[];
    startingFrom?: string;
}

export interface ComparisonRow {
    feature: string;
    sprint: string;
    project: string;
    dedicated: string;
    retainer: string;
}

export interface EngagementModelsContent {
    metaTitle: string;
    metaDescription: string;
    title: string;
    heroSubtitle: string;
    models: EngagementModel[];
    comparisonTable: {
        headers: string[];
        rows: ComparisonRow[];
    };
    included: string[];
    notIncluded: string[];
    selectorGuide: { heading: string; body: string }[];
    faqs: { question: string; answer: string }[];
    relatedLinks: { label: string; href: string }[];
}

export interface BookACallContent {
    metaTitle: string;
    metaDescription: string;
    title: string;
    heroSubtitle: string;
    sections: {
        whoFor: { heading: string; items: string[] };
        whatWeCover: { heading: string; items: string[] };
        whatToPrepare: { heading: string; items: string[] };
        goodFit: { heading: string; items: string[] };
        notFit: { heading: string; items: string[] };
        faqs: { question: string; answer: string }[];
    };
}

export interface PortfolioProject {
    slug: string;
    name: string;
    category: string;
    summary: string;
    outcomes: string[];
    stack: string[];
    href?: string;
}

export interface PortfolioContent {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    projects: PortfolioProject[];
}

export interface ReviewsContent {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    placeholderQuotes: { quote: string; author: string; role: string; company: string }[];
}

export interface SecurityContent {
    metaTitle: string;
    metaDescription: string;
    title: string;
    heroSubtitle: string;
    sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
}

export interface ProcessPageContent {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    steps: { step: string; title: string; subtitle: string; description: string }[];
}

export const engagementModels: EngagementModelsContent = {
    metaTitle: 'Engagement Models for AI, SaaS & Cloud Engineering | Aizaz Studio',
    metaDescription:
        'Flexible engineering engagement models for AI automation, SaaS MVPs, cloud infrastructure, project rescue, and ongoing product development.',
    title: 'Flexible Engineering Engagements for AI, SaaS & Automation Projects',
    heroSubtitle:
        'Whether you need one workflow live in two weeks or a senior team embedded for a platform build — every model follows the same discovery to deploy discipline.',
    models: [
        {
            id: 'ai-systems-sprint',
            name: 'AI Systems Sprint',
            summary:
                'A focused 14 day engagement to design, build, deploy, and hand off one high impact AI or automation workflow connected to your real tools.',
            duration: '14 days',
            bestFor: [
                'Teams validating AI or automation ROI before a larger build',
                'Founders who need one workflow live — not another strategy deck',
                'Ops leaders replacing a single painful manual process',
            ],
            deliverables: [
                'Workflow discovery and scoped architecture',
                'Production deployment with monitoring and retry logic',
                'Documentation and team handoff',
                'Clear path to extend into the next workflow or platform phase',
            ],
            startingFrom: 'Fixed scope sprint',
        },
        {
            id: 'mvp-build',
            name: 'MVP Build',
            summary:
                'Four to eight week SaaS or product build — auth, APIs, dashboards, billing hooks, and AWS deployment scoped in milestones your stakeholders can track.',
            duration: '4 to 8 weeks typical',
            bestFor: [
                'SaaS founders launching v1 with paying customers in mind',
                'Businesses replacing spreadsheet ops with a real product',
                'Teams that need design, backend, frontend, and deploy in one place',
            ],
            deliverables: [
                'Architecture and milestone roadmap',
                'Iterative builds with staging and production environments',
                'Auth, core features, integrations, and CI/CD',
                'Launch support and optional post launch engineering',
            ],
            startingFrom: 'Scoped project quote',
        },
        {
            id: 'engineering-retainer',
            name: 'Engineering Retainer',
            summary:
                'Ongoing senior engineering for product, cloud, and automation work — features, infra, integrations, and the next workflow on your backlog.',
            duration: 'Monthly retainer',
            bestFor: [
                'Scale ups shipping features weekly across backend and cloud',
                'Teams post launch who need reliable ops without a full hire',
                'Businesses running multiple automations that need an owner',
            ],
            deliverables: [
                'Agreed monthly capacity for fixes, features, and infra work',
                'Monitoring review and incident response within SLA',
                'Priority queue for backlog items',
                'Quarterly health check on infra and integrations',
            ],
            startingFrom: 'Monthly retainer block',
        },
        {
            id: 'project-rescue',
            name: 'Project Rescue',
            summary:
                'Audit, stabilize, and rebuild stalled or broken software — when previous devs left, deploys fail, or nobody trusts the codebase.',
            duration: '2 to 12 weeks typical',
            bestFor: [
                'Half built SaaS or internal tools that stopped moving',
                'Production systems with recurring outages or failed deploys',
                'Agency handoffs that left fragile architecture behind',
            ],
            deliverables: [
                'Technical audit and prioritized recovery plan',
                'Critical bug fixes and deployment stabilization',
                'Architecture roadmap for refactor or rebuild decisions',
                'Documentation and handoff for your next hire or retainer',
            ],
            startingFrom: 'Audit first, then scoped rescue',
        },
        {
            id: 'technical-audit',
            name: 'Technical Audit',
            summary:
                'Senior review of architecture, codebase, cloud, DevOps, and AI workflows before you scale, rebuild, or hire.',
            duration: '1 to 2 weeks typical',
            bestFor: [
                'Founders preparing for fundraise or major rebuild',
                'Ops leaders evaluating vendor or in house delivery quality',
                'Teams unsure whether to fix, refactor, or replace a system',
            ],
            deliverables: [
                'Findings document with risk map and quick wins',
                'Rebuild or refactor roadmap with effort ranges',
                'Recommended next steps and engagement model',
                'Optional follow on rescue or build engagement',
            ],
            startingFrom: 'Fixed scope audit',
        },
    ],
    comparisonTable: {
        headers: ['', 'AI Systems Sprint', 'MVP & Platform Build', 'Dedicated Pod', 'Retainer'],
        rows: [
            {
                feature: 'Typical duration',
                sprint: '14 days',
                project: '6 to 16 weeks',
                dedicated: '3+ months',
                retainer: 'Ongoing monthly',
            },
            {
                feature: 'Scope',
                sprint: 'One workflow or AI automation',
                project: 'Full product or major module',
                dedicated: 'Your roadmap priorities',
                retainer: 'Maintenance and small enhancements',
            },
            {
                feature: 'Team access',
                sprint: 'Focused sprint team',
                project: 'Project squad with milestones',
                dedicated: 'Embedded senior engineer(s)',
                retainer: 'Shared support capacity',
            },
            {
                feature: 'Deploy & monitoring',
                sprint: 'Included for scoped workflow',
                project: 'Included for v1 scope',
                dedicated: 'Included as part of delivery',
                retainer: 'Ongoing monitoring review',
            },
            {
                feature: 'Best starting point',
                sprint: 'Prove automation ROI fast',
                project: 'Launch or rebuild a platform',
                dedicated: 'Scale feature velocity',
                retainer: 'Keep production stable',
            },
        ],
    },
    included: [
        'Discovery and architecture before code — every engagement',
        'Direct access to senior engineers, not account manager layers',
        'Production minded delivery: logging, deploys, and handoff docs',
        'Async updates with clear milestones and visible progress',
        'Stack fit guidance — we recommend tools based on your business, not trends',
    ],
    notIncluded: [
        'Open ended scope without milestones or written acceptance criteria',
        'Design only engagements with no engineering delivery',
        '24/7 on call unless explicitly agreed in a support SLA',
        'Third party license fees, cloud bills, and SaaS subscription costs',
        'Legal, compliance certification, or audit representation on your behalf',
    ],
    selectorGuide: [
        {
            heading: 'Start with the AI Systems Sprint if…',
            body: 'You know automation or AI should help but need one working proof in production — connected to CRM, email, or internal tools — before committing to a platform budget.',
        },
        {
            heading: 'Choose MVP & Platform Build if…',
            body: 'You are launching or rebuilding a SaaS product, customer portal, or internal platform and need auth, APIs, billing, and cloud infra delivered as one coherent system.',
        },
        {
            heading: 'Choose Integration & Automation Project if…',
            body: 'Your product exists but data between NetSuite, Shopify, CRM, and warehouses is wrong — and you need reliable sync, webhooks, or middleware, not another manual export.',
        },
        {
            heading: 'Choose Dedicated Engineering if…',
            body: 'You have a roadmap, paying customers or internal users, and need senior capacity embedded weekly — faster than hiring and safer than rotating freelancers.',
        },
        {
            heading: 'Choose Ongoing Retainer if…',
            body: 'Systems are live and generating value — you need someone to own monitoring, fixes, and the next small improvements without restarting a full project every time.',
        },
    ],
    faqs: [
        {
            question: 'Can we start with a sprint and expand into a platform build?',
            answer: 'Yes — that is one of our most common paths. The sprint proves value on one workflow; the platform build extends the same architecture across your product.',
        },
        {
            question: 'Do you sign NDAs and work with existing codebases?',
            answer: 'Always. We routinely audit, extend, and harden existing Node.js, Python, and React codebases rather than forcing a rewrite.',
        },
        {
            question: 'How do you price engagements?',
            answer: 'Sprints are fixed scope. Projects are quoted after discovery. Dedicated pods and retainers are monthly — aligned to hours and seniority, shared upfront before work begins.',
        },
        {
            question: 'Are you timezone friendly for remote teams?',
            answer: 'Yes. We work with founders and ops teams across the US, UK, Middle East, and South Asia with overlapping hours for standups and demos.',
        },
    ],
    relatedLinks: [
        { label: 'AI Systems Sprint', href: '/ai-systems-sprint' },
        { label: 'AI Automation', href: '/services/ai-automation-systems' },
        { label: 'SaaS MVP Development', href: '/services/saas-mvp-development' },
        { label: 'DevOps Consulting', href: '/services/devops-consulting' },
        { label: 'Project Rescue', href: '/services/project-rescue' },
        { label: 'Technical Audit', href: '/services/technical-audit' },
        { label: 'Book a Call', href: '/book-a-call' },
    ],
};

export const bookACall: BookACallContent = {
    metaTitle: 'Book a Technical Discovery Call | Aizaz Studio',
    metaDescription:
        'Book a technical discovery call with Aizaz Studio to discuss your AI, SaaS, automation, cloud, or software project.',
    title: 'Book a Technical Discovery Call',
    heroSubtitle:
        'A 30 minute conversation to map your workflow, stack, and timeline — no pitch deck, no pressure. You leave knowing whether we can help and what a sensible first step looks like.',
    sections: {
        whoFor: {
            heading: 'Who this call is for',
            items: [
                'Founders launching or scaling a SaaS product',
                'Ops and revenue leaders exploring AI or process automation',
                'Teams struggling with NetSuite, Shopify, CRM, or API integrations',
                'CTOs and engineering leads who need senior capacity without a long hire cycle',
            ],
        },
        whatWeCover: {
            heading: 'What we cover on the call',
            items: [
                'Your highest impact manual workflow or product milestone',
                'Current stack — CRM, ERP, cloud, and where data breaks today',
                'Timeline, budget range, and what success looks like in plain language',
                'Which engagement model fits: sprint, project, pod, or retainer',
                'Honest fit assessment — we refer out when we are not the right team',
            ],
        },
        whatToPrepare: {
            heading: 'What to prepare (optional but helpful)',
            items: [
                'A short description of the problem — even a Loom or bullet list works',
                'Names of tools you use today (HubSpot, NetSuite, Shopify, AWS, etc.)',
                'Any hard deadlines: launch date, audit, funding milestone',
                'Links to existing product, repo, or workflow docs if available',
            ],
        },
        goodFit: {
            heading: 'Good fit signals',
            items: [
                'You want production software — not a demo that stalls after the kickoff',
                'You can share access to stakeholders or systems within a reasonable window',
                'You value direct senior engineering over large agency overhead',
                'You are ready to start within the next few weeks, not indefinitely researching',
            ],
        },
        notFit: {
            heading: 'When we are likely not the fit',
            items: [
                'You need staff augmentation with no product or workflow ownership on our side',
                'Budget expects enterprise delivery at freelancer rates',
                'Project has no decision maker available for weekly alignment',
                'Primary need is marketing, SEO content, or generic IT support',
            ],
        },
        faqs: [
            {
                question: 'Is the discovery call free?',
                answer: 'Yes. It is a fit and scope conversation — not a paid consultation. If we proceed, pricing follows the engagement model we recommend.',
            },
            {
                question: 'Will I get a proposal after the call?',
                answer: 'If there is a clear fit, we send a written scope outline, timeline, and pricing within a few business days — often same week for sprint candidates.',
            },
            {
                question: 'Can multiple stakeholders join?',
                answer: 'Please do. Founders, ops leads, and technical stakeholders on one call saves rework and speeds discovery.',
            },
            {
                question: 'What if we are not ready to build yet?',
                answer: 'We still help you clarify next steps. If timing is early, we may suggest a lighter sprint later or point you to resources — no hard sell.',
            },
        ],
    },
};

export const portfolio: PortfolioContent = {
    metaTitle: 'Portfolio — SaaS, Compliance & FinTech Builds | Aizaz.studio',
    metaDescription:
        'Selected Aizaz.studio portfolio work: compliance grade platforms, investment intelligence systems, and production SaaS — built for scale, security, and real business outcomes.',
    title: 'Portfolio',
    intro:
        'These projects represent production systems — not concept work. Each started with a hard operational or compliance problem and shipped as software teams could run, audit, and extend.',
    projects: [
        {
            slug: '1archiver-compliance-platform',
            name: '1Archiver',
            category: 'Compliance • eDiscovery • Data Retention',
            summary:
                'Enterprise grade email archiving and compliance platform designed for tens of terabytes, multiple mail providers, and audit defensible retention — built as systems engineering, not a simple CRUD app.',
            outcomes: [
                'Secure, verifiable email ingestion across IMAP, Exchange, and Gmail',
                'Horizontal scale via streaming ingestion and decoupled search indexes',
                'Immutable storage and tamper evident logs for legal and audit readiness',
                'Architecture ready for on prem and cloud deployments',
            ],
            stack: ['Node.js', 'PostgreSQL', 'AWS', 'Message queues', 'Search indexes'],
            href: '/case-studies/1archiver-compliance-platform',
        },
    ],
};

export const reviews: ReviewsContent = {
    metaTitle: 'Client Reviews | Aizaz.studio',
    metaDescription:
        'Client reviews and testimonials for Aizaz.studio — SaaS development, AI automation, and integration delivery. Replace placeholders with approved quotes as they are collected.',
    title: 'Client Reviews',
    intro:
        'We measure success in production deployments and hours recovered — not slide decks. Testimonials below include placeholders until final client approvals are on file.',
    placeholderQuotes: [
        {
            quote: 'Client quote placeholder — replace with approved testimonial.',
            author: 'Placeholder Name',
            role: 'Founder',
            company: '1Archiver',
        },
        {
            quote: 'Client quote placeholder — replace with approved testimonial.',
            author: 'Placeholder Name',
            role: 'Founder',
            company: 'InvestorsGoWild',
        },
        {
            quote: 'Client quote placeholder — replace with approved testimonial.',
            author: 'Placeholder Name',
            role: 'Operations Lead',
            company: 'SaaS Client',
        },
    ],
};

export const security: SecurityContent = {
    metaTitle: 'Security & Data Handling | Aizaz.studio',
    metaDescription:
        'How Aizaz.studio handles security, access, data, and cloud delivery for SaaS and automation clients. Practical practices for production systems — not checkbox compliance theater.',
    title: 'Security & Data Handling',
    heroSubtitle:
        'We build systems that touch customer, financial, and operational data — security is part of delivery, not a document you receive after launch.',
    sections: [
        {
            heading: 'Access & least privilege',
            paragraphs: [
                'We request the minimum access needed for each engagement — separate staging credentials where possible, time bound access for production, and no shared passwords in chat or email.',
            ],
            bullets: [
                'Individual accounts and MFA on client systems we touch',
                'Secrets stored in environment managers or parameter stores — never in repos',
                'Access revoked or rotated at project end unless retainer continues',
            ],
        },
        {
            heading: 'Code & repository practices',
            paragraphs: [
                'Client code stays in client owned repositories when required. We follow branch protection, review on critical paths, and avoid committing credentials or PII to git history.',
            ],
            bullets: [
                'Private repos and signed commits where client policy requires',
                'Dependency scanning and pinned versions on maintained projects',
                'No subcontracting without explicit client approval',
            ],
        },
        {
            heading: 'Data handling & AI workflows',
            paragraphs: [
                'Automation and AI features often process documents, leads, and support content. We design retention, redaction, and logging so sensitive data does not leak into the wrong stores or model training paths.',
            ],
            bullets: [
                'API configurations aligned to provider zero retention options when available',
                'PII minimization in prompts and structured tool outputs',
                'Audit friendly logs without storing full message bodies when not required',
            ],
        },
        {
            heading: 'Cloud & infrastructure',
            paragraphs: [
                'AWS deployments use VPC isolation, encrypted storage, IAM roles over long lived keys, and backups with tested restore paths — standard on SaaS and integration projects we operate.',
            ],
            bullets: [
                'TLS in transit for public endpoints and internal service communication',
                'CloudWatch or equivalent monitoring with alert routing',
                'Infrastructure as code where environments must be reproducible',
            ],
        },
        {
            heading: 'Incident response & communication',
            paragraphs: [
                'If something goes wrong, we prioritize containment, client notification, and documented remediation. Retainer clients receive agreed response windows; project clients receive handoff runbooks for ops they own.',
            ],
            bullets: [
                'Clear escalation contacts during active engagements',
                'Post incident summaries with root cause and preventive changes',
                'No public disclosure of client systems without written approval',
            ],
        },
        {
            heading: 'Compliance scope',
            paragraphs: [
                'We implement technical controls that support your compliance goals — encryption, access logs, retention policies — but we do not act as your legal counsel or certify SOC 2 on your behalf. We coordinate with your compliance team when audits require evidence.',
            ],
        },
    ],
};

export const processPage: ProcessPageContent = {
    metaTitle: 'Our Delivery Process | Aizaz.studio',
    metaDescription:
        'How Aizaz.studio delivers SaaS, AI automation, and integration projects: workflow discovery, architecture, build, deploy, and handoff — the same discipline on every engagement.',
    title: 'Our Engineering Process',
    intro:
        'Every engagement — sprint, MVP, or dedicated pod — follows the same five phases. Discovery finds the highest leverage problem; architecture prevents rebuilds; delivery ends with software your team can run.',
    steps: processSteps.map((step) => ({
        step: step.step,
        title: step.title,
        subtitle: step.subtitle,
        description: step.description,
    })),
};
