import type { IndustryPage } from './seoPages';

export const extraIndustryPages: IndustryPage[] = [
    {
        slug: 'startups',
        audienceLabel: 'Startups',
        title: 'Product Engineering for Startups',
        metaTitle: 'Product Engineering for Startups | Aizaz Studio',
        metaDescription:
            'Aizaz Studio helps startups ship MVPs, automate operations, and build production ready software with senior engineers who own outcomes, not billable hours.',
        heroSubtitle:
            'Move from idea to revenue faster with a product engineering partner that ships working software, not slide decks.',
        keywords: [
            'startup product engineering',
            'startup MVP development',
            'founder engineering partner',
            'startup automation',
            'early stage software studio',
        ],
        problem:
            'Founders lose weeks hiring, onboarding, and managing contractors while critical product and ops work stalls. Prototypes pile up, but nothing reliable reaches customers.',
        solution:
            'We embed as a senior product engineering team that scopes, builds, and deploys the systems your startup needs now — from MVPs and internal tools to AI workflows and cloud infrastructure.',
        capabilities: [
            'MVP and v1 product development',
            'Founder facing dashboards and admin tools',
            'AI assisted workflows for sales and support',
            'AWS deployment, CI/CD, and monitoring',
            'CRM and billing integrations',
            'Ops automations that replace manual busywork',
        ],
        useCases: [
            'Pitch deck promise → production MVP → first paying users',
            'Spreadsheet ops → automated pipeline → founder time back',
            'Manual onboarding → self serve flow → faster activation',
            'Fragile prototype → hardened architecture → confident releases',
        ],
        faqs: [
            {
                question: 'Do you work with pre seed and seed stage startups?',
                answer: 'Yes. We focus on the highest leverage build or automation that moves your startup toward revenue, retention, or operational clarity.',
            },
            {
                question: 'Can you join alongside an existing technical cofounder?',
                answer: 'Absolutely. We complement in house teams with senior execution on infrastructure, integrations, and features that would otherwise wait in the backlog.',
            },
            {
                question: 'How quickly can we start shipping?',
                answer: 'Most engagements begin with a scoped sprint. Our AI Systems Sprint delivers one working workflow or feature in 14 days.',
            },
            {
                question: 'Do you help with fundraising demos and investor ready products?',
                answer: 'Yes. We build polished, reliable demos and production paths so what you show investors is what customers can actually use.',
            },
        ],
        relatedSlugs: ['web-app-saas-development', 'ai-automation-systems'],
    },
    {
        slug: 'b2b-saas',
        audienceLabel: 'B2B SaaS',
        title: 'Engineering for B2B SaaS Companies',
        metaTitle: 'B2B SaaS Product Engineering | Aizaz Studio',
        metaDescription:
            'Scale B2B SaaS products with multi tenant architecture, customer portals, billing, integrations, and AI features built by a product engineering agency.',
        heroSubtitle:
            'Ship enterprise ready features, integrations, and automations without slowing your core roadmap.',
        keywords: [
            'B2B SaaS development',
            'SaaS product engineering',
            'enterprise SaaS integrations',
            'SaaS admin portal',
            'multi tenant SaaS architecture',
        ],
        problem:
            'B2B SaaS teams juggle customer specific requests, brittle integrations, and mounting tech debt. Sales promises outpace engineering capacity, and every enterprise deal adds custom work.',
        solution:
            'We help B2B SaaS companies build scalable product foundations, customer facing portals, and integration layers that turn one off requests into repeatable platform capabilities.',
        capabilities: [
            'Multi tenant architecture and role based access',
            'Customer and partner portals',
            'Billing, usage metering, and subscription logic',
            'CRM, ERP, and webhook integrations',
            'AI assistants embedded in the product',
            'Internal ops dashboards for CS and sales',
        ],
        useCases: [
            'Enterprise pilot → standardized integration → reusable connector',
            'Manual provisioning → automated tenant setup → faster time to value',
            'Support inbox overload → AI triage → ticket routing → SLA visibility',
            'Spreadsheet reporting → live customer health dashboard → proactive renewals',
        ],
        faqs: [
            {
                question: 'Can you build Salesforce or HubSpot integrations for our product?',
                answer: 'Yes. We design bi directional sync, webhook handlers, and admin tools so integrations stay reliable as customer volume grows.',
            },
            {
                question: 'Do you help with SOC 2 or enterprise security expectations?',
                answer: 'We build with security best practices, audit friendly logging, and deployment patterns that support compliance conversations with enterprise buyers.',
            },
            {
                question: 'How do you avoid creating more tech debt?',
                answer: 'We scope around outcomes, document architecture decisions, and ship in increments that fit your existing codebase rather than parallel prototypes.',
            },
            {
                question: 'Can you augment our team without becoming staff augmentation?',
                answer: 'Yes. We own defined deliverables and production outcomes, not open ended hourly resourcing.',
            },
        ],
        relatedSlugs: ['web-app-saas-development', 'business-process-automation'],
    },
    {
        slug: 'operations-teams',
        audienceLabel: 'Operations Teams',
        title: 'Software Systems for Operations Teams',
        metaTitle: 'Operations Automation & Internal Tools | Aizaz Studio',
        metaDescription:
            'Aizaz Studio builds internal tools, workflow automations, and dashboards for operations teams tired of spreadsheets, manual reconciliations, and disconnected SaaS apps.',
        heroSubtitle:
            'Replace manual reconciliations and copy paste workflows with systems your ops team can run and extend.',
        keywords: [
            'operations automation',
            'internal tools development',
            'ops dashboard',
            'workflow automation for operations',
            'business process engineering',
        ],
        problem:
            'Operations teams inherit processes built from spreadsheets, email threads, and one off scripts. Errors surface late, reporting takes days, and nobody trusts a single source of truth.',
        solution:
            'We map how work actually flows through your team, then build automations, internal apps, and dashboards that make operations predictable, auditable, and fast.',
        capabilities: [
            'Internal web apps and ops dashboards',
            'Cross system data sync and validation',
            'Alerting, exception queues, and SLA tracking',
            'Document and CSV pipeline automation',
            'Role based workflows and approvals',
            'AI assisted summarization and routing',
        ],
        useCases: [
            'Daily reconciliation → automated checks → exception only review',
            'Order exceptions → routed queue → resolution tracking → reporting',
            'Weekly KPI build → live dashboard → leadership visibility',
            'Vendor onboarding → structured workflow → audit trail',
        ],
        faqs: [
            {
                question: 'We still run critical processes in spreadsheets. Can you help?',
                answer: 'Yes. We migrate spreadsheet logic into validated systems with automation, permissions, and reporting your team can maintain.',
            },
            {
                question: 'Do you integrate with NetSuite, Shopify, or our warehouse system?',
                answer: 'We regularly connect ERPs, ecommerce platforms, 3PL tools, CRMs, and custom APIs into unified ops workflows.',
            },
            {
                question: 'Will our non technical ops team be able to use what you build?',
                answer: 'We design for daily operators with clear UI, documentation, and handoff sessions so adoption is practical from day one.',
            },
            {
                question: 'How do you prioritize which workflow to automate first?',
                answer: 'We start with the manual process that costs the most time or creates the most errors, then expand in measured phases.',
            },
        ],
        relatedSlugs: ['business-process-automation', 'ai-automation-systems'],
    },
    {
        slug: 'healthtech',
        audienceLabel: 'Healthtech',
        title: 'Product Engineering for Healthtech',
        metaTitle: 'Healthtech Software & Workflow Systems | Aizaz Studio',
        metaDescription:
            'Build patient intake flows, clinical ops dashboards, AI assisted summaries, and secure integrations for healthtech companies and care delivery teams.',
        heroSubtitle:
            'Reduce administrative load with reliable workflows, secure integrations, and tools clinical staff can trust.',
        keywords: [
            'healthtech software development',
            'clinical workflow automation',
            'patient intake systems',
            'healthcare internal tools',
            'medical ops dashboard',
        ],
        problem:
            'Healthtech products and clinic operations depend on fragmented tools, manual intake, and staff time spent on paperwork instead of care or product growth.',
        solution:
            'We build healthtech software with privacy aware architecture — intake automation, internal dashboards, appointment workflows, and AI assisted summaries connected to the systems you already use.',
        capabilities: [
            'Patient and client intake automation',
            'Clinical and ops dashboards',
            'Appointment reminders and follow up flows',
            'EHR, CRM, and scheduling integrations',
            'AI assisted document and form summarization',
            'Secure cloud deployment and access controls',
        ],
        useCases: [
            'Intake form → structured record → staff notification → follow up sequence',
            'Referral pipeline → routing rules → dashboard visibility',
            'Daily census report → automated generation → manager inbox',
            'Support requests → AI triage → human review → resolution tracking',
        ],
        faqs: [
            {
                question: 'Do you build HIPAA compliant systems?',
                answer: 'We design with security and privacy best practices. Specific compliance requirements depend on your region, data types, and hosting choices — we scope this during discovery.',
            },
            {
                question: 'Can you integrate with our existing clinic or practice software?',
                answer: 'Yes. We connect forms, scheduling tools, CRMs, and internal databases through APIs and automation layers.',
            },
            {
                question: 'Do you work with digital health startups or care providers?',
                answer: 'Both. We support healthtech products scaling features and care organizations modernizing internal operations.',
            },
            {
                question: 'How do you handle sensitive patient data in AI workflows?',
                answer: 'We minimize data exposure, use appropriate model hosting options, and design workflows where human review stays in the loop when needed.',
            },
        ],
        relatedSlugs: ['ai-automation-systems', 'web-app-saas-development'],
    },
    {
        slug: 'fintech',
        audienceLabel: 'Fintech',
        title: 'Engineering for Fintech Products',
        metaTitle: 'Fintech Product Engineering | Aizaz Studio',
        metaDescription:
            'Aizaz Studio helps fintech teams ship secure web apps, payment flows, reporting dashboards, and automation systems with production grade architecture.',
        heroSubtitle:
            'Ship financial products and internal ops systems with engineering discipline, clear audit trails, and reliable integrations.',
        keywords: [
            'fintech software development',
            'payment integration development',
            'fintech dashboard',
            'financial workflow automation',
            'fintech MVP engineering',
        ],
        problem:
            'Fintech teams move fast but inherit fragile payment flows, manual compliance checks, and reporting built in spreadsheets. Regulators and customers expect precision engineering cannot fake.',
        solution:
            'We build fintech software with secure auth, payment integrations, ledger friendly data models, and ops automations that give finance and product teams confidence at scale.',
        capabilities: [
            'Customer facing fintech web apps',
            'Payment and banking API integrations',
            'KYC and onboarding workflow automation',
            'Finance and ops reporting dashboards',
            'Webhook processing and reconciliation tools',
            'Role based access and audit logging',
        ],
        useCases: [
            'Manual KYC review → structured workflow → faster account activation',
            'Payment webhooks → reconciliation dashboard → exception alerts',
            'Investor reporting → automated data pipeline → trusted metrics',
            'Support disputes → case management tool → resolution tracking',
        ],
        faqs: [
            {
                question: 'Which payment providers do you integrate with?',
                answer: 'We work with Stripe and other major payment and banking APIs, designing webhook handlers and reconciliation flows that match your product model.',
            },
            {
                question: 'Can you help with audit trails and access control?',
                answer: 'Yes. We implement role based permissions, immutable logs, and admin tooling that supports finance and compliance reviews.',
            },
            {
                question: 'Do you build MVPs for new fintech products?',
                answer: 'We ship scoped MVPs with production foundations so you can validate with real users without rebuilding later.',
            },
            {
                question: 'How do you handle sensitive financial data?',
                answer: 'We follow least privilege access, encrypted transport, secure secret management, and environment separation from design through deployment.',
            },
        ],
        relatedSlugs: ['web-app-saas-development', 'business-process-automation'],
    },
    {
        slug: 'ecommerce-operations',
        audienceLabel: 'Ecommerce Operations',
        title: 'Systems for Ecommerce Operations',
        metaTitle: 'Ecommerce Operations Automation | Aizaz Studio',
        metaDescription:
            'Connect storefronts, ERPs, warehouses, and finance tools. Aizaz Studio automates orders, inventory, fulfillment, and reporting for ecommerce operations teams.',
        heroSubtitle:
            'Stop fighting sync errors. Build operations that keep inventory, orders, and customer data aligned across every channel.',
        keywords: [
            'ecommerce operations automation',
            'Shopify ERP integration',
            'inventory sync automation',
            'order fulfillment software',
            'multichannel ecommerce systems',
        ],
        problem:
            'Orders arrive from multiple storefronts and marketplaces, but inventory, fulfillment, and finance live in different systems. Teams spend hours fixing mismatches instead of growing revenue.',
        solution:
            'We build ecommerce operations systems that connect Shopify, ERPs, 3PLs, and internal tools with reliable sync, exception handling, and dashboards ops teams actually use.',
        capabilities: [
            'Shopify and marketplace integrations',
            'Inventory and catalog sync',
            'Order routing and fulfillment automation',
            'Wholesale and B2B ordering portals',
            'Ops dashboards and alerting',
            'Returns, refunds, and exception workflows',
        ],
        useCases: [
            'Multichannel orders → unified fulfillment queue → 3PL handoff',
            'Inventory drift → automated reconciliation → alert before oversell',
            'Wholesale buyers → self serve portal → ERP order creation',
            'Daily ops report → automated → leadership and finance visibility',
        ],
        faqs: [
            {
                question: 'Do you integrate Shopify with NetSuite or other ERPs?',
                answer: 'Yes. Product, order, inventory, and customer sync between Shopify and NetSuite is a core specialty.',
            },
            {
                question: 'Can you fix our existing broken integration?',
                answer: 'We audit failure points, add retries and monitoring, and rebuild sync logic where patches are no longer enough.',
            },
            {
                question: 'Do you support wholesale and B2B ordering workflows?',
                answer: 'We build portals and automations for B2B buyers with pricing rules tied to your ERP and inventory systems.',
            },
            {
                question: 'What if we rely on CSV and SFTP today?',
                answer: 'We replace fragile file based workflows with validated pipelines, error queues, and visibility when something fails.',
            },
        ],
        relatedSlugs: ['business-process-automation', 'web-app-saas-development'],
    },
    {
        slug: 'logistics',
        audienceLabel: 'Logistics',
        title: 'Software for Logistics and Supply Chain Ops',
        metaTitle: 'Logistics & Supply Chain Software | Aizaz Studio',
        metaDescription:
            'Build shipment tracking dashboards, warehouse workflows, carrier integrations, and ops automations for logistics and supply chain teams.',
        heroSubtitle:
            'Give logistics teams real time visibility, automated handoffs, and systems that scale with shipment volume.',
        keywords: [
            'logistics software development',
            'supply chain automation',
            'shipment tracking dashboard',
            'warehouse workflow software',
            'carrier API integration',
        ],
        problem:
            'Logistics operations depend on phone calls, shared inboxes, and outdated spreadsheets. Delays get discovered late, customers chase updates, and teams react instead of orchestrate.',
        solution:
            'We build logistics software that connects carriers, warehouses, and customer systems — tracking dashboards, exception queues, and automations that keep freight moving.',
        capabilities: [
            'Shipment tracking and status dashboards',
            'Carrier and 3PL API integrations',
            'Warehouse intake and dispatch workflows',
            'Exception management and SLA alerting',
            'Customer notification automations',
            'Reporting for ops and finance teams',
        ],
        useCases: [
            'Carrier updates → unified tracking view → proactive customer alerts',
            'Warehouse exceptions → routed queue → resolution before cutoff',
            'Daily lane performance → automated report → ops review meeting',
            'Manual booking → structured workflow → audit ready history',
        ],
        faqs: [
            {
                question: 'Can you integrate with our TMS or WMS?',
                answer: 'We connect transportation and warehouse systems through APIs, webhooks, and structured data pipelines based on what your vendors expose.',
            },
            {
                question: 'Do you build customer facing tracking experiences?',
                answer: 'Yes. We create branded tracking pages and notification flows that reduce support tickets and improve delivery confidence.',
            },
            {
                question: 'How do you handle unreliable carrier data?',
                answer: 'We design reconciliation rules, fallback sources, and exception queues so bad data surfaces quickly instead of silently propagating.',
            },
            {
                question: 'Can you automate internal reporting for logistics KPIs?',
                answer: 'We build dashboards and scheduled reports for on time performance, cost per lane, and exception rates your team can trust.',
            },
        ],
        relatedSlugs: ['business-process-automation', 'ai-automation-systems'],
    },
    {
        slug: 'professional-services',
        audienceLabel: 'Professional Services',
        title: 'Systems for Professional Services Firms',
        metaTitle: 'Professional Services Automation | Aizaz Studio',
        metaDescription:
            'Aizaz Studio builds client portals, proposal workflows, CRM automations, and internal tools for agencies, consultancies, and professional services firms.',
        heroSubtitle:
            'Win back billable time with client workflows, delivery dashboards, and automations built for how your firm actually operates.',
        keywords: [
            'professional services automation',
            'agency internal tools',
            'consulting workflow software',
            'client portal development',
            'services firm CRM automation',
        ],
        problem:
            'Professional services firms sell expertise but lose margin to manual proposals, disjointed client communication, and delivery tracking spread across email, docs, and spreadsheets.',
        solution:
            'We build systems that streamline client onboarding, project delivery, and internal ops — so your team spends time on high value work, not administrative reconstruction.',
        capabilities: [
            'Client portals and secure document sharing',
            'Proposal and onboarding workflow automation',
            'CRM and project tool integrations',
            'Resource planning and delivery dashboards',
            'Time tracking and reporting pipelines',
            'AI assisted research and document drafting',
        ],
        useCases: [
            'New client signed → automated onboarding → portal access → kickoff scheduled',
            'Proposal template → structured intake → scoped project record',
            'Weekly status updates → dashboard → partner visibility',
            'Support requests → routed queue → SLA tracking → client satisfaction',
        ],
        faqs: [
            {
                question: 'Do you work with marketing agencies and consultancies?',
                answer: 'Yes. We build internal tools and client facing systems for agencies, consultancies, and boutique professional services firms.',
            },
            {
                question: 'Can you connect our CRM, billing, and project management tools?',
                answer: 'We integrate HubSpot, Salesforce, QuickBooks, Notion, Asana, and custom stacks into coherent workflows.',
            },
            {
                question: 'Will this replace our existing tools or connect them?',
                answer: 'Usually connect. We design around the tools your team already uses, filling gaps with custom software where off the shelf products fall short.',
            },
            {
                question: 'How do you measure success for a services firm engagement?',
                answer: 'We define success around reduced manual hours, faster client onboarding, clearer delivery visibility, and systems your team adopts without constant support.',
            },
        ],
        relatedSlugs: ['business-process-automation', 'web-app-saas-development'],
    },
];

export function getExtraIndustryBySlug(slug: string): IndustryPage | undefined {
    return extraIndustryPages.find((page) => page.slug === slug);
}
