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
            {
                heading: 'AI automation consultant: advise and implement, not a tool license',
                paragraphs: [
                    'An AI automation consultant should tell you which workflow is worth paying for, then ship it. We do both. We will not sell you a platform subscription and leave your ops team to wire the CRM.',
                    'If the job is one multi-step operations path, the AI workflow automation page and the 14 day sprint are the conversion path. This page is the umbrella: agents, chat, documents, and CRM-connected systems.',
                ],
            },
            {
                heading: 'Where this sits vs AI workflow automation and the sprint',
                paragraphs: [
                    'Use AI Workflow Automation when the buyer wants a multi-step ops pipeline with AI decision nodes. Use the AI Systems Sprint when they can start with one workflow in 14 days. Stay on this page when they need the broader systems conversation — agents, chat, documents — before picking a first workflow.',
                    'SalesAngel is public proof of AI inside a product (multi-tenant CRM architecture), not a warehouse or ERP ops case study. We do not invent an operations automation client we cannot name.',
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
            { title: 'Platform, not a prototype', description: 'Auth, billing, APIs, and multi-tenant paths designed for paying customers — not a demo environment that will be rewritten.' },
            { title: 'Outcome-owned delivery', description: 'A product engineering agency: we own the milestone, not a bench of leased engineers on Slack.' },
            { title: 'Code your next hire can run', description: 'Frontend, backend, database, and AWS from one senior team, with documentation that survives handoff.' },
        ],
        seoSections: [
            {
                heading: 'SaaS development agency for products past prototype',
                paragraphs: [
                    'If you are searching for a SaaS development agency or a product engineering agency, you usually already have users — or a codebase that is supposed to. This page is that job: harden the platform, ship the next features, and take over what a previous team left behind.',
                    'Founders who need a first v1 should use SaaS MVP Development and the 4–8 week MVP Build. We will not pretend this URL is a second MVP homepage.',
                ],
            },
            {
                heading: 'Product engineering vs staff augmentation or a freelancer',
                paragraphs: [
                    'Aizaz.studio sells outcomes. We are not staff augmentation and we do not productize embedded engineers as rented seats. If you need extra people on Slack indefinitely, read Product Engineering Agency vs Staff Augmentation and Engagement Models — then book a fit-check call.',
                    'A freelancer can ship a screen. A product engineering team owns auth, billing, APIs, deploy, and the data model that has to survive the next two quarters.',
                ],
            },
            {
                heading: 'Platform foundations: auth, billing, APIs, multi-tenant paths',
                paragraphs: [
                    '1Archiver is public proof of a production compliance platform, not a weekend prototype. SalesAngel is public proof of multi-tenant CRM architecture with AI in the product. PropertyMatch is the v1 story — it belongs on the MVP page; we link it here only to show we also ship first versions.',
                    'Typical work on this URL: role-based access, Stripe or invoice flows, partner APIs, admin and customer portals, AWS plus CI/CD. We do not quote fake user counts or invented ARR.',
                ],
            },
            {
                heading: 'Taking over an existing SaaS codebase',
                paragraphs: [
                    'If deploys fail, nobody trusts the repo, or an agency walked away, do not start a feature retainer. Start with a technical audit, then project rescue. This page is for products that are already shipping and need a senior team to keep going.',
                ],
            },
        ],
        processSteps: [
            { step: '01', title: 'Architecture & current-state review', description: 'Map what is live, what is fragile, and which platform gaps block the next release.' },
            { step: '02', title: 'Iterative product engineering', description: 'Ship usable increments with CI/CD — auth, billing, APIs, and tenancy in the order that reduces risk.' },
            { step: '03', title: 'Launch support & optional retainer', description: 'Production monitoring and an engineering retainer if you want the same team after the milestone.' },
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
            { title: 'Inside NetSuite, not another connector page', description: 'SuiteScript, scheduled scripts, and ERP workflows after the record already exists in NetSuite.' },
            { title: 'Order automation without a second landing', description: 'Sales order → fulfillment → finance when saved searches and the native workflow manager stall.' },
            { title: 'Ops and finance can see failures', description: 'Alerts when a script or approval queue stops — before close or the 3PL notices.' },
        ],
        seoSections: [
            {
                heading: 'SuiteScript and ERP workflows inside NetSuite',
                paragraphs: [
                    'This URL owns work inside NetSuite: SuiteScript 2.x, RESTlets used as ERP logic, custom records, and scheduled scripts. It does not own Shopify or BigCommerce storefront sync — that is NetSuite Integration.',
                    'Co-founder Nasir Mahmood focuses on ERP and commerce systems. We will not invent a named NetSuite case study we cannot publish.',
                ],
            },
            {
                heading: 'Order automation: sales order → fulfillment → finance, without another connector landing',
                paragraphs: [
                    'Once a sales order is in NetSuite, ops still copies data into fulfillment, 3PL files, and finance. Native workflows cover the happy path. We script exceptions, approvals, and the last mile so order automation is an ERP job, not a CSV job.',
                    'Storefronts are sources. If you need Shopify or BigCommerce ingest, start on NetSuite Integration, then return here for the inside-ERP path.',
                ],
            },
            {
                heading: 'Finance and ops automation the native workflow manager cannot finish',
                paragraphs: [
                    'Saved searches are not an application. The native workflow manager stops at branching your close actually needs. We choose saved search, SuiteScript, or middleware based on volume, auditability, and who has to operate the failure.',
                    'Middleware that talks to vendor APIs outside NetSuite is API Integration. Do not use this page for unnamed ecommerce connectors.',
                ],
            },
            {
                heading: 'How this differs from NetSuite integration',
                paragraphs: [
                    'NetSuite Integration: connectors and middleware — Shopify, BigCommerce, 3PL, CRM, inventory sync into NetSuite. This page: SuiteScript and order/finance automation after NetSuite already has the record. One intent per URL so the two pages do not compete for the same query.',
                ],
            },
        ],
        processSteps: [
            { step: '01', title: 'ERP workflow audit', description: 'Map which steps still need a human inside NetSuite and which native tools already cover.' },
            { step: '02', title: 'SuiteScript & workflow build', description: 'Scripts, custom records, and approval queues with validation — not unmonitored scheduled jobs.' },
            { step: '03', title: 'Operate & hand off', description: 'Alerts, runbooks, and documentation finance and ops can use without calling engineering for every exception.' },
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
            { title: 'Consultant first, then a build URL', description: 'Scope what to connect. Implementation is NetSuite Integration, not another iPaaS seat.' },
            { title: 'Fix broken syncs', description: 'Audit, rebuild, and monitor unreliable native connectors and middleware.' },
            { title: 'ERP as hub, not island', description: 'Sales, ecommerce, and ops get NetSuite data without living in saved searches.' },
        ],
        seoSections: [
            {
                heading: 'When you need a NetSuite integration consultant, not another iPaaS license',
                paragraphs: [
                    'Ops and finance leads already on NetSuite usually do not need a new middleware brand. They need someone who can say which fields NetSuite should own, which native connector will fail, and what to monitor on day two.',
                    'That consultant conversation lives here. We will not create a second “NetSuite consultant” service slug.',
                ],
            },
            {
                heading: 'Implementation lives on the NetSuite integration service',
                paragraphs: [
                    'Shopify, BigCommerce, 3PL, and CRM builds are delivered on NetSuite Integration. SuiteScript and order automation inside the ERP are NetSuite ERP Automation. This page routes the buyer; it does not compete with those two URLs for implementation queries.',
                ],
            },
            {
                heading: 'Making NetSuite data usable outside finance',
                paragraphs: [
                    'Sales, ops, and leadership need ERP data in dashboards, CRMs, and internal tools — not buried in saved searches. We build the middleware and reporting layer that turns NetSuite into a hub the whole business can trust.',
                    'Proof today is production writing on Shopify and BigCommerce sync failures, plus ERP cofounder positioning. There is no public named NetSuite case study yet. We will not invent one.',
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
    'netsuite-integration': {
        benefits: [
            { title: 'Shopify and BigCommerce, same engagement', description: 'Storefront pairs are first-class. We do not bury BigCommerce under a Shopify-only H1.' },
            { title: 'Inventory that does not oversell', description: 'Sync rules, validation, and retries so quantity drift is an alert — not a customer apology.' },
            { title: 'Ops sees the failure first', description: 'Dashboards and queues when a native connector drops an order at 2am.' },
        ],
        seoSections: [
            {
                heading: 'NetSuite integration services for Shopify, BigCommerce, and 3PL',
                paragraphs: [
                    'This page is the money URL for NetSuite integration services and NetSuite ecommerce integration. We build connector and middleware software: orders, inventory, customers, and fulfillment between storefronts, warehouses, CRMs, and NetSuite.',
                    'It is not a SuiteScript-inside-ERP homepage. Inside-NetSuite order and finance automation lives on NetSuite ERP Automation. Ops leaders who need a consultant conversation start on Custom Integrations for NetSuite Users.',
                ],
            },
            {
                heading: 'Shopify ↔ NetSuite: orders, inventory, and fulfillment without CSV',
                paragraphs: [
                    'Native Shopify connectors cover the happy path and then fail on kits, multi-location inventory, or fulfillment feedback. We map products, orders, customers, and tracking with validation so finance is not reconciling CSVs every morning.',
                    'We published a production guide on NetSuite–Shopify integration pitfalls. Use it as failure-mode proof. We do not have a public named Shopify case study yet and will not invent a client.',
                ],
            },
            {
                heading: 'BigCommerce ↔ NetSuite in production',
                paragraphs: [
                    'BigCommerce is a first-class storefront on this URL — not a footnote under Shopify. Catalog, inventory, and order sync in production has different failure modes than Shopify; we wrote those up in BigCommerce + NetSuite integration production problems.',
                    'We will not create /services/bigcommerce-netsuite-integration. That would be a doorway duplicate of this page.',
                ],
            },
            {
                heading: 'Inventory sync that prevents oversell',
                paragraphs: [
                    'Inventory sync is a section on this page, not a new slug. The job is stopping oversell and drift across Shopify, BigCommerce, and NetSuite with retry, validation, and an ops view when quantity disagrees.',
                    'Order automation after the sales order already exists in NetSuite is ERP automation, not another inventory landing.',
                ],
            },
            {
                heading: 'When a native connector is not enough',
                paragraphs: [
                    'REST, RESTlets, and SuiteScript 2.x are how we implement — not a reason to split a developer landing. Custom pricing, multi-warehouse, and 3PL handoffs are why native tools stall.',
                    'Co-founder Nasir Mahmood leads ERP and commerce integration. Book a call to scope. A 14 day sprint only fits if you have one order or inventory exception workflow, not a multi-storefront program.',
                ],
            },
            {
                heading: 'What we need to scope a NetSuite engagement',
                paragraphs: [
                    'Which storefronts, which 3PL, which NetSuite records are system of truth, and where the native connector already fails. Bring sample payloads or a list of sync errors if you have them.',
                    'Hire-a-consultant intent belongs on the NetSuite users page. Come back here when you are ready to fund the build.',
                ],
            },
        ],
        processSteps: [
            { step: '01', title: 'Systems & mapping discovery', description: 'Storefronts, NetSuite records, 3PL, and the fields that already drift.' },
            { step: '02', title: 'Connector & middleware build', description: 'REST, RESTlets, validation, and retries — not an unmonitored native connector hope.' },
            { step: '03', title: 'Ops dashboard & handoff', description: 'Alerts, retry queues, and documentation finance and ops can run without a developer on call.' },
        ],
    },
    'ai-workflow-automation': {
        benefits: [
            { title: 'Production workflows, not widgets', description: 'Multi-step ops with AI decision nodes, approvals, and a dashboard — not a chatbot demo.' },
            { title: 'Start with one path in 14 days', description: 'The AI Systems Sprint is the first paid implementation when you can grant API access in week one.' },
            { title: 'Failures are loud', description: 'Retries, alerts, and human-in-the-loop so the workflow does not fail silently.' },
        ],
        seoSections: [
            {
                heading: 'AI workflow automation company for multi-step operations',
                paragraphs: [
                    'Buyers searching for an AI workflow automation company or agency want a studio that ships production workflows, not a prompt pack. This URL owns that query. We will not add /services/ai-workflow-automation-agency.',
                    'Umbrella AI systems (agents, chat, documents) stay on AI Automation Systems. Orchestration when AI judgment is optional stays on Business Process Automation.',
                ],
            },
            {
                heading: 'Custom workflows vs Zapier, Make, and native CRM automations',
                paragraphs: [
                    'No-code tools work until the path needs judgment, volume, or ERP data. Custom workflows are software: branching, validation, and an owner when the vendor API flakes.',
                    'If you are deciding sprint versus traditional automation, read AI Systems Sprint vs Traditional Automation, then book the sprint or a call.',
                ],
            },
            {
                heading: 'AI decision nodes on CRM, email, and ERP data',
                paragraphs: [
                    'Classification, extraction, and routing on HubSpot, Salesforce, email, and NetSuite as systems — not a new AI-integration slug. Named Shopify or BigCommerce ↔ NetSuite programs still go to NetSuite Integration.',
                    'SalesAngel is adjacent proof: AI inside a sales product and CRM architecture. It is not a warehouse ops workflow case study. We label it that way on purpose.',
                ],
            },
            {
                heading: 'Start with one workflow in 14 days',
                paragraphs: [
                    'The conversion offer is the AI Systems Sprint: one workflow, live system, monitoring, and handoff. Book a call if you already know you need several workflows. Do not use the sprint for a greenfield SaaS MVP or a stalled repo.',
                ],
            },
            {
                heading: 'What production monitoring looks like',
                paragraphs: [
                    'Logs, retries where safe, alerts, and a human approval gate on irreversible actions. Ops should see a failed run before a customer does.',
                ],
            },
        ],
        processSteps: [
            { step: '01', title: 'Pick the workflow', description: 'Identify the multi-step path costing the most hours — and confirm CRM or API access in week one.' },
            { step: '02', title: 'Build the decision path', description: 'AI nodes, integrations, and approval gates as production software.' },
            { step: '03', title: 'Monitor & hand off', description: 'Deploy, watch real runs, and document how ops retries or escalates.' },
        ],
    },
    'saas-mvp-development': {
        benefits: [
            { title: 'A real v1, not a prototype', description: 'Auth, core workflow, Stripe if needed, AWS and CI/CD — people can log in.' },
            { title: '4–8 week MVP Build', description: 'Scoped on Engagement Models. We cut features so you launch, then product-engineer the rest elsewhere.' },
            { title: 'Named MVP proof', description: 'PropertyMatch: Airtable prototype to a production SaaS MVP, with a public client testimonial.' },
        ],
        seoSections: [
            {
                heading: 'SaaS MVP development company for founders who need a real v1',
                paragraphs: [
                    'If you are hiring a SaaS MVP development company or an MVP software development company, you need users or investors in a product — not a Figma walkthrough. This URL owns that job. We will not add a company-suffix doorway slug.',
                    'Non-SaaS portals and internal tools can still be a v1 on this engagement; ongoing platform work moves to Web App & SaaS Development.',
                ],
            },
            {
                heading: 'What “investor-ready” means here',
                paragraphs: [
                    'Someone can create an account, complete the core workflow, and you can deploy with CI/CD on AWS. Stripe when you are charging. It is the 4–8 week MVP Build on Engagement Models — not a multi-tenant enterprise platform on day one, and not a 14 day AI sprint unless the “MVP” is actually one ops workflow.',
                ],
            },
            {
                heading: 'PropertyMatch: a production SaaS MVP, not a clickable prototype',
                paragraphs: [
                    'PropertyMatch is the public MVP story: a validated Airtable buyer-matching prototype became a standalone SaaS MVP so the founder owned the workflow instead of per-agent SaaS licensing. Delivery was 14 days because the workflow was already proven — that is not the default quote for a blank-slate product.',
                    'Oran’s testimonial is on the case study. We do not retarget PropertyMatch as NetSuite proof or as the AI Systems Sprint of record.',
                ],
            },
            {
                heading: 'MVP vs ongoing product engineering',
                paragraphs: [
                    'After v1, features, tenancy, and partner APIs belong on Web App & SaaS Development (SalesAngel and 1Archiver support that sibling). Do not use this page as a second product-engineering homepage.',
                ],
            },
            {
                heading: 'If the repo is already half-built',
                paragraphs: [
                    'Stop. Audit first, then project rescue if the code is salvageable. We wrote How to Rescue a Half Built SaaS Product for that decision. Starting an MVP Build on a stalled agency repo is how you pay twice.',
                ],
            },
        ],
        processSteps: [
            { step: '01', title: 'Cut v1 to what users must do', description: 'One core workflow, auth, and deploy. Wishlist waits.' },
            { step: '02', title: 'Build in visible milestones', description: 'Staging early, CI/CD from the start, Stripe only if the v1 charges.' },
            { step: '03', title: 'Launch & decide the next model', description: 'Production handoff, then MVP Build is done. Retainer or product engineering if you keep shipping.' },
        ],
    },
    'api-integration': {
        benefits: [
            { title: 'REST, GraphQL, SOAP, webhooks', description: 'Versioned adapters with retries — not a weekend script on a vendor API.' },
            { title: 'Middleware when vendors cannot talk', description: 'Transform, validate, and route when there is no native pair.' },
            { title: 'A dashboard when it breaks', description: 'Rate limits and vendor downtime become queues and alerts, not silent data loss.' },
        ],
        seoSections: [
            {
                heading: 'API integration services: REST, GraphQL, SOAP, and webhooks with retries',
                paragraphs: [
                    'API integration services means production software: mappings, auth, backoff, and monitoring. This URL owns that query and the API integration developer variant. We will not add a developer doorway slug.',
                ],
            },
            {
                heading: 'Ecommerce and ERP examples (Shopify, BigCommerce, NetSuite, 3PL)',
                paragraphs: [
                    'Ecommerce without a named ERP can start here or on the ecommerce industry pages. The moment the buyer says Shopify or BigCommerce with NetSuite, we hand off to NetSuite Integration so Cluster A does not leak into this URL.',
                    'Failure-mode proof is the Shopify pitfalls article and the BigCommerce + NetSuite production-problems post — those are integration failures, not a named middleware case study. We do not have one to invent.',
                ],
            },
            {
                heading: 'Middleware when two vendors cannot talk directly',
                paragraphs: [
                    'Two APIs, incompatible payloads, different auth. We sit in the middle: validate, transform, retry, and show ops what failed. CRM-specific work can also land on CRM Integration; this page stays the general API and middleware engagement.',
                ],
            },
            {
                heading: 'What an API integration developer actually delivers',
                paragraphs: [
                    'Field mappings, versioned adapters, webhook receivers, and a failure dashboard — plus documentation. SalesAngel’s multi-tenant CRM architecture is adjacent (APIs inside a product), not an ecommerce sync story. Book a call. A sprint only fits if the “integration” is one AI or ops workflow.',
                ],
            },
        ],
        processSteps: [
            { step: '01', title: 'Map systems and ownership', description: 'Which API owns each field, rate limits, and what a failure should do.' },
            { step: '02', title: 'Adapters, queues, and validation', description: 'Build the middleware as software with tests around vendor quirks.' },
            { step: '03', title: 'Monitor & document', description: 'Dashboards, alerts, and partner docs your team can extend.' },
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
