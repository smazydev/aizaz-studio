import type { SeoPage } from './seoPages';

export interface SeoExtra {
    benefits: { title: string; description: string }[];
    seoSections: { heading: string; paragraphs: string[] }[];
    processSteps?: { step: string; title: string; description: string }[];
}

export const seoExtras: Record<string, SeoExtra> = {
    'ai-automation-systems': {
        benefits: [
            { title: 'Connected to your stack', description: 'HubSpot, Salesforce, NetSuite, Slack, WhatsApp, and custom APIs — not isolated chatbot demos.' },
            { title: 'Human in the loop by design', description: 'AI handles triage and routine decisions; your team keeps control on edge cases and approvals.' },
            { title: 'Production monitoring', description: 'Logging, error alerts, and retry logic so automations fail loudly — not silently.' },
        ],
        seoSections: [
            {
                heading: 'AI automation agency for operations heavy businesses',
                paragraphs: [
                    'Businesses searching for an AI automation partner usually need more than a chatbot widget. They need lead qualification that updates the CRM, support triage that creates tickets, or document workflows that feed internal dashboards.',
                    'Aizaz.studio builds AI automation systems as production software — scoped around one high value workflow first, then expanded across the business. That is why many clients start with our 14 day AI Systems Sprint before committing to a larger platform build.',
                ],
            },
            {
                heading: 'When to choose custom AI automation over off the shelf tools',
                paragraphs: [
                    'Zapier, Make, and native CRM automations work until logic gets complex, volume increases, or ERP data enters the picture. Custom AI automation makes sense when you need multi step decisions, sensitive data handling, or deep integrations with NetSuite, Shopify, and internal databases.',
                ],
            },
        ],
        processSteps: [
            { step: '01', title: 'Workflow audit', description: 'Identify the manual process costing the most time each week.' },
            { step: '02', title: 'Agent & integration build', description: 'Connect AI to CRM, email, chat, or ERP with clear handoff rules.' },
            { step: '03', title: 'Launch & tune', description: 'Deploy, monitor, and refine based on real usage — not lab tests.' },
        ],
    },
    'web-app-saas-development': {
        benefits: [
            { title: 'MVP to scale ready', description: 'Auth, billing, APIs, and deployment pipelines built in from the start — not bolted on later.' },
            { title: 'Founder friendly delivery', description: 'Clear milestones, visible progress, and documentation your next hire can actually use.' },
            { title: 'Full stack ownership', description: 'Frontend, backend, database, and AWS infrastructure from one senior team.' },
        ],
        seoSections: [
            {
                heading: 'Web app development for SaaS startups and growing teams',
                paragraphs: [
                    'Whether you are launching a founder MVP or scaling a product with paying customers, the gap between prototype and production is where most teams stall. Aizaz.studio builds web apps and SaaS platforms with the foundations investors and customers expect: secure authentication, reliable APIs, and cloud infrastructure that survives traffic spikes.',
                    'We work with SaaS founders, agencies white labeling backend work, and operations teams replacing spreadsheet workflows with internal dashboards and customer portals.',
                ],
            },
            {
                heading: 'What to look for in a SaaS development partner',
                paragraphs: [
                    'Strong SaaS partners ship iteratively, document architecture decisions, and design data models that survive feature growth. Look for teams that own deployment, monitoring, and handoff — not just frontend screens.',
                    'If you are unsure whether to rebuild or extend an existing product, start with a technical audit or a scoped sprint before committing to a full platform engagement.',
                ],
            },
        ],
        processSteps: [
            { step: '01', title: 'Scope & architecture', description: 'Define v1 features, data model, and deployment approach.' },
            { step: '02', title: 'Iterative build', description: 'Ship usable increments with CI/CD from early in the project.' },
            { step: '03', title: 'Launch & support', description: 'Production deploy, monitoring, and optional ongoing engineering support.' },
        ],
    },
    'aws-devops': {
        benefits: [
            { title: 'AWS native architecture', description: 'EC2, ECS, Lambda, RDS, S3, CloudWatch — chosen for your workload, not resume driven design.' },
            { title: 'CI/CD that teams trust', description: 'Automated tests, staging environments, and rollback friendly deploy pipelines.' },
            { title: 'Incident ready ops', description: 'Alerts, logs, backups, and runbooks so outages are rare and recoverable.' },
        ],
        seoSections: [
            {
                heading: 'AWS consulting and DevOps for product teams',
                paragraphs: [
                    'Cloud infrastructure should reduce risk, not create it. We help startups and scale ups move from fragile manual deploys to automated, monitored AWS environments — including migrations, containerization, and security hardening.',
                    'Our DevOps work often pairs with SaaS builds and ERP integrations: the same team that writes your application also owns how it runs in production.',
                ],
            },
            {
                heading: 'Signs your AWS environment needs senior DevOps help',
                paragraphs: [
                    'Deployments that only one person understands, missing backups, no staging environment, and surprise outages during feature releases are common signals that infrastructure debt is catching up with product velocity.',
                    'We stabilize production first, then add CI/CD, observability, and runbooks so your engineering team can ship with confidence.',
                ],
            },
        ],
    },
    'netsuite-erp-automation': {
        benefits: [
            { title: 'Shopify ↔ NetSuite specialists', description: 'Order, inventory, customer, and fulfillment sync with validation and retry logic.' },
            { title: 'SuiteScript & middleware', description: 'Custom workflows, REST integrations, and SFTP/CSV pipelines when native connectors fall short.' },
            { title: 'Ops visibility', description: 'Dashboards and alerts when sync fails — before finance or support finds out manually.' },
        ],
        seoSections: [
            {
                heading: 'NetSuite integration services for ecommerce and wholesale',
                paragraphs: [
                    'NetSuite is often the system of record, but ecommerce, CRM, and warehouse tools run on different timelines. We build NetSuite integrations and ERP automation that keep orders, inventory, and customer data aligned across channels.',
                    'From SuiteScript workflows to middleware between Shopify, 3PLs, and custom apps, Aizaz.studio focuses on reliability, auditability, and ops teams that can trust the data again.',
                ],
            },
            {
                heading: 'Common NetSuite integration problems we fix',
                paragraphs: [
                    'Duplicate orders, inventory drift between Shopify and NetSuite, failed fulfillment updates, and manual CSV reconciliation usually point to missing validation, retry logic, or monitoring — not bad NetSuite configuration alone.',
                    'We audit existing connectors, rebuild fragile sync paths, and add dashboards so finance and ops see issues before customers do.',
                ],
            },
        ],
    },
    'business-process-automation': {
        benefits: [
            { title: 'Cross tool orchestration', description: 'CRMs, email, WhatsApp, Sheets, databases, and internal portals in one workflow.' },
            { title: 'Beyond no code limits', description: 'Custom logic, volume, and ERP depth when Zapier style tools break down.' },
            { title: 'Measurable time saved', description: 'Automations scoped around hours recovered per week — not vanity integrations.' },
        ],
        seoSections: [
            {
                heading: 'Business process automation for messy operational stacks',
                paragraphs: [
                    'Process automation is not about adding another SaaS subscription. It is about removing repeatable work between the tools you already pay for. We automate lead routing, invoice flows, reporting pipelines, and internal approvals with systems your team can monitor and extend.',
                ],
            },
            {
                heading: 'Custom automation vs Zapier and Make',
                paragraphs: [
                    'No code tools work well for simple triggers, but they struggle with high volume, complex branching logic, ERP data, and sensitive internal systems. Custom business process automation gives you full control over error handling, audit logs, and long term maintainability.',
                    'Many clients start with one automated workflow in our 14 day sprint, then expand across sales, finance, and operations once ROI is proven.',
                ],
            },
        ],
    },
    'trading-technology-systems': {
        benefits: [
            { title: 'Signal & alert pipelines', description: 'Telegram, Discord, and dashboard delivery with risk checks before alerts go out.' },
            { title: 'Member & educator platforms', description: 'Portals, subscriptions, content, and analytics for trading businesses scaling beyond manual delivery.' },
            { title: 'MT5 & TradingView integrations', description: 'Data feeds, webhooks, and research infrastructure for serious operational use.' },
        ],
        seoSections: [
            {
                heading: 'Trading technology development for educators and signal providers',
                paragraphs: [
                    'Trading businesses outgrow spreadsheets and manual Telegram workflows quickly. We build trading dashboards, backtesting tools, journaling platforms, and signal infrastructure — technology systems, not financial advice.',
                ],
            },
            {
                heading: 'Infrastructure trading teams need as they scale',
                paragraphs: [
                    'As member counts grow, manual signal delivery and ad hoc risk checks become liability. Reliable trading technology includes alert pipelines, role based access, audit trails, and integrations with MT5, TradingView, and messaging platforms.',
                    'We help educators and signal businesses productize delivery without rebuilding from scratch every quarter.',
                ],
            },
        ],
    },
    'technical-video-product-enablement': {
        benefits: [
            { title: 'Technical accuracy', description: 'Engineers who understand the product record demos that match how the software actually works.' },
            { title: 'Sales & onboarding ready', description: 'Assets formatted for websites, decks, help centers, and internal training.' },
            { title: 'Shipped alongside the build', description: 'Enablement content created while context is fresh — not months after launch.' },
        ],
        seoSections: [
            {
                heading: 'Product demo and enablement video for software teams',
                paragraphs: [
                    'Complex products lose deals when nobody can explain them clearly. We produce demo videos, onboarding walkthroughs, and sales enablement content for SaaS, automation, and internal tools — scripted, recorded, and edited for business use.',
                ],
            },
            {
                heading: 'When product video pays for itself',
                paragraphs: [
                    'Enablement content reduces sales cycle friction, speeds up onboarding, and gives support teams a reusable reference. It is especially valuable after launches when engineering context is still fresh.',
                    'We often produce demos alongside the build so messaging matches how the product actually works in production.',
                ],
            },
        ],
    },
    'saas-startups': {
        benefits: [
            { title: 'Speed without fragility', description: 'MVPs and v1 platforms engineered to survive real users and investor diligence.' },
            { title: 'AI features in product', description: 'Assistants, document processing, and workflow agents embedded in your SaaS — not side projects.' },
            { title: 'One team, full stack', description: 'Product engineering, cloud, and automation under one roof.' },
        ],
        seoSections: [
            {
                heading: 'Engineering partner for SaaS startups',
                paragraphs: [
                    'SaaS founders need velocity, but not at the cost of a rebuild in twelve months. Aizaz.studio helps early stage and growth stage startups ship AI features, customer portals, billing, and AWS infrastructure with senior engineers who think in systems — not ticket queues.',
                ],
            },
            {
                heading: 'How SaaS startups should scope v1 engineering',
                paragraphs: [
                    'The best v1 products solve one painful workflow exceptionally well — with auth, billing, and deployment handled properly from day one. Avoid feature sprawl before you have paying users and clear retention signals.',
                    'Our sprint model lets founders validate one workflow in 14 days before committing to a full platform build.',
                ],
            },
        ],
    },
    'ecommerce-wholesale': {
        benefits: [
            { title: 'Multi channel order flow', description: 'Unified pipelines from storefront to ERP to fulfillment.' },
            { title: 'Inventory you can trust', description: 'Sync rules and alerts that reduce overselling and manual reconciliation.' },
            { title: 'Wholesale portals', description: 'B2B ordering experiences connected to NetSuite and inventory systems.' },
        ],
        seoSections: [
            {
                heading: 'Ecommerce automation and wholesale software development',
                paragraphs: [
                    'Ecommerce and wholesale operators lose margin to manual ops — fixing sync errors, reconciling inventory, and chasing orders across Shopify, NetSuite, and 3PLs. We build integrations and custom portals that make multi channel commerce operable at scale.',
                ],
            },
            {
                heading: 'Multi channel commerce systems that stay in sync',
                paragraphs: [
                    'Wholesale and DTC brands need one source of truth for inventory, pricing, and fulfillment status. We connect storefronts, ERP, and logistics partners with validation layers and ops dashboards.',
                    'If your team spends hours each week fixing order or inventory mismatches, integration architecture — not more staff — is usually the fix.',
                ],
            },
        ],
    },
    'healthtech-clinics': {
        benefits: [
            { title: 'Intake automation', description: 'Forms, routing, summaries, and reminders that reduce front desk load.' },
            { title: 'Privacy aware design', description: 'Security first workflows scoped to your compliance requirements.' },
            { title: 'Clinic ops dashboards', description: 'Visibility for managers without another spreadsheet export.' },
        ],
        seoSections: [
            {
                heading: 'Healthtech and clinic workflow automation',
                paragraphs: [
                    'Clinics and healthtech teams drown in admin — intake, follow ups, scheduling, and manual data entry. Aizaz.studio builds internal systems and automations that reduce repetitive work while keeping clinical teams in control of patient facing decisions.',
                ],
            },
            {
                heading: 'Clinic operations software without the bloat',
                paragraphs: [
                    'Off the shelf clinic software often forces workflows that do not match how your team actually operates. Custom intake automation, reminders, and internal dashboards can reduce front desk load while keeping humans in the loop for clinical decisions.',
                    'We scope projects around privacy requirements and existing systems — EMR, scheduling tools, and messaging platforms your staff already use.',
                ],
            },
        ],
    },
    'trading-businesses': {
        benefits: [
            { title: 'Scale beyond Telegram', description: 'Member portals, billing, signals, and content in one platform.' },
            { title: 'Consistent risk checks', description: 'Automated gates before alerts or signals reach your audience.' },
            { title: 'Research infrastructure', description: 'Dashboards and backtesting tools for educators and research teams.' },
        ],
        seoSections: [
            {
                heading: 'Software for trading educators and signal businesses',
                paragraphs: [
                    'Trading educators and signal providers need infrastructure that matches their audience growth — not another spreadsheet and manual broadcast workflow. We build the technology layer: alerts, portals, dashboards, and integrations.',
                ],
            },
            {
                heading: 'From manual delivery to a real trading platform',
                paragraphs: [
                    'Growing trading businesses need member access, billing, content delivery, and consistent alert pipelines in one system. We help educators graduate from Telegram only workflows to platforms their team can operate reliably.',
                ],
            },
        ],
    },
    'netsuite-users': {
        benefits: [
            { title: 'ERP as hub, not island', description: 'Connect NetSuite to sales, ecommerce, logistics, and finance tools.' },
            { title: 'Fix broken syncs', description: 'Audit, rebuild, and monitor unreliable integrations.' },
            { title: 'Executive reporting', description: 'Dashboards that pull ERP and operational data into one view.' },
        ],
        seoSections: [
            {
                heading: 'NetSuite automation for finance and operations teams',
                paragraphs: [
                    'If your team exports CSVs to fix NetSuite data every week, the problem is integration architecture — not user error. We build SuiteScript, middleware, and reporting systems that make NetSuite data usable across the business.',
                ],
            },
            {
                heading: 'Making NetSuite data useful outside finance',
                paragraphs: [
                    'Sales, ops, and leadership need ERP data in dashboards, CRMs, and internal tools — not buried in saved searches. We build the middleware and reporting layer that turns NetSuite into a hub the whole business can trust.',
                ],
            },
        ],
    },
    agencies: {
        benefits: [
            { title: 'White label friendly', description: 'Senior backend, cloud, and ERP delivery behind your client brand.' },
            { title: 'Deadline reliability', description: 'Engineering depth when your core team is at capacity.' },
            { title: 'Clean handoff', description: 'Documentation and code your agency can maintain or extend.' },
        ],
        seoSections: [
            {
                heading: 'Development partner for agencies',
                paragraphs: [
                    'Agencies win deals that need NetSuite integrations, AWS backends, or AI automation — skills that are hard to hire for on every project. Aizaz.studio acts as a technical partner for delivery, not a competitor for your client relationship.',
                ],
            },
            {
                heading: 'White label engineering without delivery risk',
                paragraphs: [
                    'We work behind your brand with clear milestones, documentation, and handoff packages your team can present to clients confidently. Ideal when you have sold the strategy but need senior execution capacity.',
                ],
            },
        ],
    },
};

function buildFallbackSeoExtras(page: SeoPage): SeoExtra {
    const keywordList = page.keywords.slice(0, 4).join(', ');

    return {
        benefits: page.capabilities.slice(0, 3).map((capability) => ({
            title: capability,
            description: `Delivered as production ready software with monitoring, documentation, and clear handoff — not throwaway scripts.`,
        })),
        seoSections: [
            {
                heading: `${page.title} for operations heavy teams`,
                paragraphs: [
                    page.solution,
                    `${page.problem} Aizaz.studio helps teams searching for ${keywordList} ship reliable systems with senior engineering — starting with one high value workflow when that is the fastest path to ROI.`,
                ],
            },
            {
                heading: `When to invest in ${page.title.toLowerCase()}`,
                paragraphs: [
                    `Businesses usually reach out when manual work, fragile integrations, or stalled software starts costing hours every week. Typical starting points include ${page.useCases.slice(0, 2).join('; ')}.`,
                    'Book a free strategy call to map scope, or start with our 14 day AI Systems Sprint to automate one workflow before a larger build.',
                ],
            },
        ],
    };
}

export function getSeoExtras(page: SeoPage): SeoExtra {
    return seoExtras[page.slug] ?? buildFallbackSeoExtras(page);
}
