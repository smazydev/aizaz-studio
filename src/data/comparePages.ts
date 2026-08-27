export interface ComparePage {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    heroSubtitle: string;
    intro: string;
    comparisonRows: { label: string; optionA: string; optionB: string }[];
    sections: { heading: string; paragraphs: string[] }[];
    faqs: { question: string; answer: string }[];
    ctaText: string;
    relatedLinks: { label: string; href: string }[];
}

export const comparePages: ComparePage[] = [
    {
        slug: 'aizaz-vs-staff-augmentation',
        title: 'Product Engineering Agency vs Staff Augmentation',
        metaTitle: 'Product Engineering Agency vs Staff Augmentation | Aizaz Studio',
        metaDescription:
            'Compare a product engineering agency focused on shipped outcomes with staff augmentation models that rent developers by the hour. See which model fits your goals.',
        heroSubtitle:
            'When you need working systems, not another seat on your Slack channel.',
        intro:
            'Staff augmentation adds developers to your roster. A product engineering agency owns deliverables end to end, architecture, build, deployment, and handoff. If your goal is rented capacity, augmentation can work. If your goal is a production outcome on a defined timeline, the models are not interchangeable.',
        comparisonRows: [
            {
                label: 'Primary deliverable',
                optionA: 'Working software, automation, or infrastructure in production',
                optionB: 'Additional developer hours assigned to your backlog',
            },
            {
                label: 'Accountability',
                optionA: 'Agency owns scope, quality, and delivery against agreed outcomes',
                optionB: 'You manage priorities, code review, and whether work ships',
            },
            {
                label: 'Team composition',
                optionA: 'Senior engineers, architects, and delivery leads assembled for the engagement',
                optionB: 'Individual contractors slotted into existing team structure',
            },
            {
                label: 'Onboarding burden',
                optionA: 'Minimal. Agency maps workflows and ships with documented handoff',
                optionB: 'High. You onboard, context share, and integrate contractors into rituals',
            },
            {
                label: 'Best for',
                optionA: 'Founders and ops leaders who need a defined system shipped fast',
                optionB: 'Teams with strong internal leadership and spare management bandwidth',
            },
            {
                label: 'Pricing model',
                optionA: 'Scoped engagements tied to outcomes and milestones',
                optionB: 'Hourly or monthly rates tied to headcount',
            },
            {
                label: 'Risk profile',
                optionA: 'Scope and timeline agreed upfront with clear acceptance criteria',
                optionB: 'Timeline drift if backlog grows or contractors rotate',
            },
        ],
        sections: [
            {
                heading: 'Why founders choose outcomes over rented developers',
                paragraphs: [
                    'Staff augmentation sounds flexible: add a senior React developer for three months and see what happens. In practice, founders and ops leaders become project managers for people they did not hire, chasing status updates instead of customer results.',
                    'A product engineering agency inverts that dynamic. You describe the business problem, a broken order sync, a missing customer portal, an AI workflow that should run every morning, and the agency returns with architecture, implementation, deployment, and documentation.',
                    'That difference matters when speed and clarity beat headcount. You are not buying hours. You are buying a shipped system your team can run.',
                ],
            },
            {
                heading: 'When staff augmentation still makes sense',
                paragraphs: [
                    'Augmentation works when you already have strong technical leadership, a groomed backlog, and established engineering rituals. The contractor plugs into your sprint cadence and your CTO directs the work.',
                    'If those conditions are not true, augmentation often becomes expensive capacity without proportional output. The developer is skilled, but nobody owns the whole outcome from discovery through production monitoring.',
                    'Aizaz Studio sits in the product engineering lane: we scope, build, and deploy. You get outcomes, not a line item for borrowed developers.',
                ],
            },
            {
                heading: 'What working with Aizaz Studio looks like',
                paragraphs: [
                    'Engagements start with workflow mapping and a clear definition of done. We identify the highest leverage system to build or automate, then ship in focused sprints with senior engineers who have done this before.',
                    'You receive production ready software, not a folder of pull requests waiting for your team to finish. We handle integrations, error handling, monitoring, and handoff so adoption is practical from day one.',
                    'If you need a partner who treats your operations like product work, not staff leasing, that is the comparison that matters.',
                ],
            },
        ],
        faqs: [
            {
                question: 'Is Aizaz Studio just staff augmentation with a different label?',
                answer: 'No. We do not sell open ended developer hours. Engagements are scoped around deliverables, a workflow, integration, portal, or sprint outcome, with clear acceptance criteria.',
            },
            {
                question: 'Can you work alongside our internal engineering team?',
                answer: 'Yes. We complement internal teams by owning specific systems or sprints end to end while your team focuses on core product roadmap work.',
            },
            {
                question: 'How is pricing different from staff augmentation?',
                answer: 'Staff augmentation bills for time. We price around scoped outcomes and milestones, so you know what you are paying for before build starts.',
            },
            {
                question: 'What if we only need one feature, not a full team?',
                answer: 'That is common. Our AI Systems Sprint delivers one working workflow or feature in 14 days, ideal when you want a result, not a long term contractor search.',
            },
            {
                question: 'Do you provide developers we can manage directly?',
                answer: 'We provide a product engineering team that owns delivery. If you need managed contractors, staff augmentation firms are the better fit.',
            },
        ],
        ctaText: 'Book a call to scope your next outcome',
        relatedLinks: [
            { label: 'AI Systems Sprint', href: '/ai-systems-sprint' },
            { label: 'Services', href: '/services' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'Agency vs Freelancer', href: '/compare/agency-vs-freelancer' },
        ],
    },
    {
        slug: 'agency-vs-freelancer',
        title: 'Product Engineering Agency vs Freelancer',
        metaTitle: 'Product Engineering Agency vs Freelancer | Aizaz Studio',
        metaDescription:
            'Compare hiring a freelancer with engaging a product engineering agency. Understand tradeoffs in speed, accountability, architecture, and long term maintainability.',
        heroSubtitle:
            'Freelancers excel at tasks. Agencies own systems.',
        intro:
            'A freelancer can be the right choice for a well defined task with a patient manager on your side. A product engineering agency fits when the work spans discovery, architecture, multiple integrations, deployment, and handoff, and you need it done as a cohesive outcome, not a collection of gigs.',
        comparisonRows: [
            {
                label: 'Scope handling',
                optionA: 'End to end ownership from discovery through production',
                optionB: 'Typically limited to assigned tasks or small modules',
            },
            {
                label: 'Speed to start',
                optionA: 'Team assembled quickly with defined sprint plan',
                optionB: 'Fast for small tasks, slower when scope expands',
            },
            {
                label: 'Architecture quality',
                optionA: 'Senior architects design for scale, security, and maintainability',
                optionB: 'Varies widely by individual experience and availability',
            },
            {
                label: 'Continuity',
                optionA: 'Team backup and documented handoff if individuals rotate',
                optionB: 'Single point of failure if freelancer becomes unavailable',
            },
            {
                label: 'Integrations and DevOps',
                optionA: 'Included: APIs, deployment, monitoring, and error handling',
                optionB: 'Often out of scope unless explicitly hired separately',
            },
            {
                label: 'Best for',
                optionA: 'Business critical systems, automations, and product builds',
                optionB: 'Small fixes, design assets, or isolated code changes',
            },
        ],
        sections: [
            {
                heading: 'The hidden cost of cheap hourly rates',
                paragraphs: [
                    'Freelancer marketplaces optimize for low hourly cost, not business outcomes. A founder saves on rate but spends on coordination: writing specs, reviewing partial work, fixing integration gaps, and hiring someone else when the first freelancer moves on.',
                    'Product engineering agencies price for the whole journey. Discovery, build, deployment, and documentation are part of the engagement because production software requires all of them.',
                    'When the project is a landing page tweak, hire a freelancer. When the project is your order pipeline, customer portal, or AI ops workflow, the comparison is not about hourly rate, it is about total cost to a working system.',
                ],
            },
            {
                heading: 'Accountability changes the engagement',
                paragraphs: [
                    'Freelancers deliver what you ask for. Agencies help you ask for the right thing. That starts with workflow mapping, stack review, and a definition of done tied to business metrics, fewer support tickets, faster onboarding, reliable inventory sync.',
                    'Agencies also carry delivery risk across disciplines. Backend, frontend, integrations, and infrastructure do not sit in separate Upwork contracts. One team owns the thread from first commit to production monitoring.',
                    'For founders without a technical cofounder, that accountability is often the difference between a demo and a product customers can rely on.',
                ],
            },
            {
                heading: 'How to choose for your stage',
                paragraphs: [
                    'Choose a freelancer when the task is narrow, the spec is complete, and you have technical leadership in house to review and integrate the work.',
                    'Choose a product engineering agency when the problem is operational or product shaped, touches multiple systems, and needs to survive real usage after launch.',
                    'Aizaz Studio is built for the second case: senior engineers shipping outcomes for startups and ops teams who cannot afford fragile software.',
                ],
            },
        ],
        faqs: [
            {
                question: 'Are agencies always more expensive than freelancers?',
                answer: 'Not in total cost. Freelancer rates look lower hourly, but management time, rework, and follow on hires often exceed a scoped agency engagement.',
            },
            {
                question: 'Can an agency move as fast as a solo freelancer?',
                answer: 'For small tasks, a freelancer may start faster. For multi week builds with integrations and deployment, an agency team often ships sooner because work happens in parallel with clear ownership.',
            },
            {
                question: 'What if I already hired a freelancer and need help finishing?',
                answer: 'We can take over scoped systems, harden architecture, and deploy work that stalled mid build. Engagements start with an audit of what exists today.',
            },
            {
                question: 'Do you compete with freelance marketplaces on price?',
                answer: 'We compete on outcomes. Clients choose us when reliability, architecture, and delivery speed matter more than the lowest hourly bid.',
            },
            {
                question: 'Can I hire one of your engineers as a freelancer?',
                answer: 'We engage as a product engineering team on scoped work, not as individual freelancers managed by the client.',
            },
        ],
        ctaText: 'Talk to us about your project scope',
        relatedLinks: [
            { label: 'Agency vs Staff Augmentation', href: '/compare/aizaz-vs-staff-augmentation' },
            { label: 'Engineering Transformation', href: '/engineering-transformation' },
            { label: 'About', href: '/about' },
            { label: 'Services', href: '/services' },
        ],
    },
    {
        slug: 'ai-systems-sprint-vs-traditional-automation',
        title: 'AI Systems Sprint vs Traditional Automation',
        metaTitle: 'AI Systems Sprint vs Traditional Automation | Aizaz Studio',
        metaDescription:
            'Compare a focused 14 day AI Systems Sprint with traditional automation projects. Learn when speed, AI assisted workflows, and scoped delivery beat long consulting engagements.',
        heroSubtitle:
            'Ship one working AI workflow in 14 days instead of waiting months for a traditional automation project.',
        intro:
            'Traditional automation projects often begin with lengthy discovery, broad platform selection, and phased rollouts measured in quarters. An AI Systems Sprint compresses that into a single outcome: one production ready workflow, built, deployed, and handed off in 14 days. Both approaches automate work, the difference is speed, scope, and how much AI changes what is possible.',
        comparisonRows: [
            {
                label: 'Timeline',
                optionA: '14 days to one live workflow',
                optionB: 'Often 8 to 16 weeks for initial phase',
            },
            {
                label: 'Scope',
                optionA: 'One high impact workflow, tightly defined',
                optionB: 'Broad process map across many departments',
            },
            {
                label: 'AI capabilities',
                optionA: 'AI agents, summarization, and intelligent routing built in',
                optionB: 'Often rule based logic unless AI added later',
            },
            {
                label: 'Delivery format',
                optionA: 'Working software in your environment with documentation',
                optionB: 'Playbooks, platform licenses, and phased configuration',
            },
            {
                label: 'Ideal starting point',
                optionA: 'Prove value on one painful manual process fast',
                optionB: 'Enterprise wide transformation with large budget',
            },
            {
                label: 'Risk',
                optionA: 'Low. Small scope, clear acceptance criteria, fast feedback',
                optionB: 'Higher. Large upfront investment before first workflow runs',
            },
        ],
        sections: [
            {
                heading: 'Why sprints beat big bang automation',
                paragraphs: [
                    'Traditional automation engagements promise transformation but deliver planning documents while manual work continues. Teams lose momentum waiting for platform procurement, stakeholder alignment, and multi phase rollouts.',
                    'An AI Systems Sprint forces prioritization. What is the one workflow costing the most time or causing the most errors? Lead qualification, support triage, document processing, order exceptions, pick one, ship it, measure it.',
                    'That proof point unlocks budget and confidence for the next workflow. Progress becomes visible in production, not in a Gantt chart.',
                ],
            },
            {
                heading: 'Where AI changes the automation equation',
                paragraphs: [
                    'Classic automation handles predictable if then logic. AI assisted workflows handle unstructured input: emails, PDFs, chat messages, and messy form data that used to require human judgment on every item.',
                    'Our sprints combine reliable integrations with AI where it adds leverage, summarizing inbound requests, scoring leads, routing exceptions, drafting first responses, while keeping humans in the loop when accuracy matters.',
                    'Traditional automation projects often bolt AI on later as a phase two upgrade. Sprints design AI into the workflow from day one because that is where modern ops teams win time back.',
                ],
            },
            {
                heading: 'When traditional automation is still the right call',
                paragraphs: [
                    'Large enterprises replacing core ERP workflows or standardizing across dozens of business units may need a traditional program with dedicated change management. Scope is wide, politics are real, and timeline is measured in years.',
                    'For startups and ops teams who need one reliable system now, the sprint model delivers faster ROI with less organizational drag. You get a partner who ships, not a program manager who schedules workshops.',
                    'Many clients start with a sprint, prove value, then expand into broader automation work with confidence and real usage data.',
                ],
            },
        ],
        faqs: [
            {
                question: 'What counts as one workflow in a sprint?',
                answer: 'A connected flow with clear start and end, for example, inbound lead → AI qualification → CRM update → follow up email. We define boundaries during discovery before day one.',
            },
            {
                question: 'Can a sprint connect to our existing CRM or ERP?',
                answer: 'Yes. Integrations with HubSpot, Salesforce, NetSuite, Shopify, Google Workspace, Slack, and custom APIs are common in sprint engagements.',
            },
            {
                question: 'Is 14 days enough for production quality software?',
                answer: 'For one focused workflow, yes. Sprints work because scope is disciplined and the team is senior. Larger platform rebuilds are better suited to extended engagements.',
            },
            {
                question: 'How does this compare to hiring an automation consultant?',
                answer: 'Consultants often deliver recommendations and configuration plans. We deliver deployed software your team uses immediately, with monitoring and handoff included.',
            },
            {
                question: 'What happens after the sprint ends?',
                answer: 'You own the system. Many clients extend with additional sprints or scoped build work once the first workflow proves value.',
            },
            {
                question: 'Do we need to choose between AI and traditional automation?',
                answer: 'No. The sprint uses the best tool for each step, reliable integrations and rules where logic is fixed, AI where input is unstructured or decisions need assistance.',
            },
        ],
        ctaText: 'Start an AI Systems Sprint',
        relatedLinks: [
            { label: 'AI Systems Sprint', href: '/ai-systems-sprint' },
            { label: 'AI Automation Systems', href: '/services/ai-automation-systems' },
            { label: 'Business Process Automation', href: '/services/business-process-automation' },
            { label: 'Agency vs Staff Augmentation', href: '/compare/aizaz-vs-staff-augmentation' },
        ],
    },
];

export function getComparePageBySlug(slug: string): ComparePage | undefined {
    return comparePages.find((page) => page.slug === slug);
}
