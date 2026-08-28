import { blogs } from './blogs';
import { caseStudies } from './caseStudies';
import { extraServicePages } from './servicePagesExtra';
import { extraIndustryPages } from './industryPagesExtra';
import { comparePages } from './comparePages';
import { technologyPages } from './technologyPages';

export interface SeoPage {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    heroSubtitle: string;
    keywords: string[];
    problem: string;
    solution: string;
    capabilities: string[];
    useCases: string[];
    faqs: { question: string; answer: string }[];
    relatedSlugs?: string[];
}

export interface IndustryPage extends SeoPage {
    audienceLabel: string;
}

export const SITE_URL = 'https://aizaz.studio';

export const servicePages: SeoPage[] = [
    {
        slug: 'ai-automation-systems',
        title: 'AI Automation Systems',
        metaTitle: 'AI Automation Systems for Business | Aizaz.studio',
        metaDescription:
            'Build AI agents, chatbots, lead qualification flows, and workflow automations connected to your CRM, email, and internal tools. Aizaz.studio delivers production ready AI systems.',
        heroSubtitle:
            'Turn repetitive decisions and manual workflows into reliable AI assisted systems that connect to your real business tools.',
        keywords: [
            'AI automation',
            'AI agents for business',
            'chatbot development',
            'lead qualification automation',
            'customer support AI',
            'document processing automation',
        ],
        problem:
            'Most businesses know AI could help, but their workflows still live in spreadsheets, inboxes, and disconnected SaaS tools. Teams copy paste between systems, miss leads, and spend hours on tasks that should be automated.',
        solution:
            'We design AI automation systems that sit inside your operations, not as demos, but as working tools. From lead qualification to support triage and document processing, we connect AI to the systems your team already uses.',
        capabilities: [
            'AI agents and internal assistants',
            'Website and WhatsApp chatbots',
            'Lead qualification and routing flows',
            'Customer support triage and handoff',
            'Document extraction and summarization',
            'Workflow automations with CRM, email, and APIs',
        ],
        useCases: [
            'Website lead → AI qualification → CRM update → follow up email',
            'Support request → AI triage → ticket creation → human handoff',
            'Inbound documents → AI summary → dashboard → team notification',
            'Sales inquiry → scoring → Slack alert → rep assignment',
        ],
        faqs: [
            {
                question: 'Do you build custom AI agents or use off the shelf tools?',
                answer: 'Both. We choose the stack based on your workflow, data sensitivity, and scale, from OpenAI and Anthropic APIs to self hosted models when needed.',
            },
            {
                question: 'Can AI automation connect to our existing CRM or ERP?',
                answer: 'Yes. We integrate with HubSpot, Salesforce, NetSuite, Google Sheets, internal databases, and custom APIs so automation fits your current stack.',
            },
            {
                question: 'How fast can we launch a first AI workflow?',
                answer: 'Our AI Systems Sprint delivers one working workflow in 14 days, scoped, built, deployed, and ready for your team to use.',
            },
        ],
        relatedSlugs: ['business-process-automation', 'web-app-saas-development'],
    },
    {
        slug: 'web-app-saas-development',
        title: 'Web App & SaaS Development',
        metaTitle: 'Web App & SaaS Development Studio | Aizaz.studio',
        metaDescription:
            'Production ready web apps, dashboards, admin portals, customer portals, and SaaS platforms with auth, payments, APIs, and scalable architecture.',
        heroSubtitle:
            'Ship MVPs and full SaaS products with proper authentication, databases, payments, and architecture built for growth.',
        keywords: [
            'SaaS development',
            'web app development',
            'MVP development',
            'admin portal development',
            'customer portal',
            'startup software development',
        ],
        problem:
            'Many teams stall between a prototype and a product customers can rely on. Auth is fragile, data models break under load, and every new feature feels like a patch on top of a patch.',
        solution:
            'We build web apps and SaaS platforms with production grade foundations, clean APIs, secure authentication, scalable databases, and deployment pipelines that survive real usage.',
        capabilities: [
            'MVPs and full SaaS platforms',
            'Admin and customer portals',
            'Internal dashboards and reporting tools',
            'Authentication, roles, and permissions',
            'Payments and subscription billing',
            'REST and GraphQL APIs with scalable backends',
        ],
        useCases: [
            'Founder MVP → beta launch → paid subscriptions',
            'Operations dashboard replacing manual spreadsheets',
            'Customer self service portal with billing and support',
            'Multi tenant SaaS with admin controls and analytics',
        ],
        faqs: [
            {
                question: 'What tech stack do you use for web apps?',
                answer: 'We match the stack to the product, commonly React, Next.js, Astro, Node.js, PostgreSQL, and AWS. We prioritize maintainability and your team’s ability to extend the system.',
            },
            {
                question: 'Can you take over an existing codebase?',
                answer: 'Yes. We often help teams stabilize legacy apps, refactor critical paths, and add features without breaking production.',
            },
            {
                question: 'Do you handle deployment and DevOps?',
                answer: 'Yes. We deploy to AWS with CI/CD, monitoring, backups, and security hardening so your app stays reliable after launch.',
            },
        ],
        relatedSlugs: ['aws-devops', 'ai-automation-systems'],
    },
    {
        slug: 'aws-devops',
        title: 'AWS & DevOps',
        metaTitle: 'AWS Cloud Infrastructure & DevOps | Aizaz.studio',
        metaDescription:
            'Deploy and stabilize cloud infrastructure on AWS with Docker, CI/CD, monitoring, backups, security hardening, and scalable backend systems.',
        heroSubtitle:
            'Move from fragile deployments to stable, monitored, and secure cloud infrastructure your team can trust.',
        keywords: [
            'AWS DevOps',
            'cloud infrastructure',
            'CI/CD pipeline',
            'Docker deployment',
            'AWS consulting',
            'backend scalability',
        ],
        problem:
            'Deployments break at the worst time. Backups are unclear. Monitoring is an afterthought. Teams ship features fast but infrastructure cannot keep up, and nobody knows what will fail next.',
        solution:
            'We design and operate AWS infrastructure that matches how your product actually runs, with automated deployments, observability, disaster recovery, and security built in from the start.',
        capabilities: [
            'AWS architecture and deployment',
            'Docker containerization',
            'CI/CD pipelines (GitHub Actions, etc.)',
            'Monitoring, alerting, and logging',
            'Backup and disaster recovery planning',
            'Security hardening and access control',
        ],
        useCases: [
            'Startup MVP → production AWS deployment with CI/CD',
            'Legacy server migration to containerized AWS',
            'Auto scaling backend for traffic spikes',
            'Compliance ready logging and backup policies',
        ],
        faqs: [
            {
                question: 'Do you only work with AWS?',
                answer: 'AWS is our primary cloud platform, but we also support hybrid setups and integrations with Cloudflare, Vercel, and other services when they fit the architecture.',
            },
            {
                question: 'Can you fix an unstable production environment?',
                answer: 'Yes. We audit existing infrastructure, stabilize deployments, add monitoring, and document runbooks so your team is not flying blind.',
            },
            {
                question: 'Do you provide ongoing DevOps support?',
                answer: 'Yes. We offer ongoing infrastructure support, incident response guidance, and iterative improvements as your product scales.',
            },
        ],
        relatedSlugs: ['web-app-saas-development', 'business-process-automation'],
    },
    {
        slug: 'netsuite-erp-automation',
        title: 'NetSuite & ERP Automation',
        metaTitle: 'NetSuite Integration & ERP Automation | Aizaz.studio',
        metaDescription:
            'NetSuite integrations, SuiteScript workflows, ERP automations, data sync, and middleware between NetSuite, Shopify, CRMs, 3PLs, and custom apps.',
        heroSubtitle:
            'Connect NetSuite to Shopify, CRMs, warehouses, and custom systems so orders, inventory, and finance stay in sync.',
        keywords: [
            'NetSuite integration',
            'SuiteScript development',
            'ERP automation',
            'Shopify NetSuite sync',
            'NetSuite middleware',
            'ERP data sync',
        ],
        problem:
            'NetSuite holds critical business data, but it rarely talks cleanly to Shopify, CRMs, 3PLs, or internal tools. Teams export CSVs, fix sync errors manually, and lose hours reconciling orders and inventory.',
        solution:
            'We build NetSuite integrations and ERP automations that keep data flowing reliably, SuiteScript workflows, middleware, SFTP pipelines, and dashboards that surface issues before they become crises.',
        capabilities: [
            'NetSuite REST and SuiteScript workflows',
            'Shopify, CRM, and 3PL integrations',
            'Order, inventory, and fulfillment sync',
            'SFTP and CSV pipeline automation',
            'ERP reporting dashboards',
            'Error alerting and retry workflows',
        ],
        useCases: [
            'Shopify order → NetSuite sales order → 3PL fulfillment',
            'NetSuite inventory sync → ecommerce storefront',
            'Failed order alert → retry workflow → ops dashboard',
            'Finance reporting dashboard pulling NetSuite and CRM data',
        ],
        faqs: [
            {
                question: 'Do you work with NetSuite SuiteScript 2.x?',
                answer: 'Yes. We build SuiteScript workflows, custom records, REST integrations, and scheduled scripts tailored to your NetSuite environment.',
            },
            {
                question: 'Can you integrate NetSuite with Shopify?',
                answer: 'Yes. We build reliable sync for products, orders, inventory, customers, and fulfillment between Shopify and NetSuite.',
            },
            {
                question: 'What if our ERP data is messy?',
                answer: 'We map data carefully, add validation layers, and build monitoring so bad records are caught early instead of breaking downstream systems.',
            },
        ],
        relatedSlugs: ['business-process-automation', 'aws-devops'],
    },
    {
        slug: 'business-process-automation',
        title: 'Business Process Automation',
        metaTitle: 'Business Process Automation Services | Aizaz.studio',
        metaDescription:
            'Automate repetitive workflows across CRMs, email, WhatsApp, Google Sheets, databases, internal portals, APIs, and third party tools.',
        heroSubtitle:
            'Replace manual copy paste work with reliable automations that connect the tools your team uses every day.',
        keywords: [
            'business process automation',
            'workflow automation',
            'CRM automation',
            'operations automation',
            'no code alternative custom automation',
            'internal tool automation',
        ],
        problem:
            'Staff repeat the same steps dozens of times per day, updating CRMs, sending follow ups, moving data between spreadsheets, and checking multiple systems for one answer.',
        solution:
            'We automate the workflows that drain your team’s time, connecting CRMs, email, WhatsApp, databases, and internal portals into systems that run reliably in the background.',
        capabilities: [
            'CRM and pipeline automations',
            'Email and notification workflows',
            'WhatsApp and messaging integrations',
            'Google Sheets and spreadsheet pipelines',
            'Database sync and scheduled jobs',
            'Internal portal and API orchestration',
        ],
        useCases: [
            'New lead → enrichment → CRM → sales rep alert',
            'Invoice created → email → accounting sync → reminder',
            'Form submission → validation → database → team Slack',
            'Daily report → auto generated → emailed to leadership',
        ],
        faqs: [
            {
                question: 'Is this like Zapier or Make?',
                answer: 'We build custom automations when off the shelf tools hit limits, complex logic, high volume, sensitive data, or deep ERP integrations.',
            },
            {
                question: 'Can you automate across many tools at once?',
                answer: 'Yes. We connect CRMs, email, WhatsApp, NetSuite, Shopify, databases, and custom APIs in unified workflows.',
            },
            {
                question: 'How do you prevent automations from breaking silently?',
                answer: 'We add logging, error alerts, retry logic, and dashboards so failures are visible and fixable quickly.',
            },
        ],
        relatedSlugs: ['ai-automation-systems', 'netsuite-erp-automation'],
    },
    {
        slug: 'trading-technology-systems',
        title: 'Trading Technology Systems',
        metaTitle: 'Trading Technology & Dashboard Development | Aizaz.studio',
        metaDescription:
            'Trading dashboards, backtesting tools, signal systems, MT5 and TradingView integrations, risk monitoring, and research infrastructure for trading businesses.',
        heroSubtitle:
            'Build the dashboards, signal pipelines, and research tools serious traders and trading businesses rely on.',
        keywords: [
            'trading dashboard development',
            'backtesting platform',
            'TradingView integration',
            'MT5 integration',
            'trading signal system',
            'risk monitoring tools',
        ],
        problem:
            'Trading teams juggle spreadsheets, disconnected charting tools, manual signal alerts, and fragile scripts. Research is slow, risk checks are inconsistent, and scaling to more users or strategies is painful.',
        solution:
            'We build trading technology systems, dashboards, backtesting engines, signal pipelines, and integrations with MT5, TradingView, and messaging platforms, designed for serious operational use.',
        capabilities: [
            'Trading and portfolio dashboards',
            'Backtesting and research tools',
            'Signal generation and distribution systems',
            'MT5 and TradingView integrations',
            'Risk monitoring and alert workflows',
            'Trade journaling and analytics platforms',
        ],
        useCases: [
            'Trading signal → risk check → Telegram alert → journal entry',
            'Multi strategy backtesting dashboard for research teams',
            'Educator platform with signals, content, and member access',
            'Real time risk monitor with breach alerts and reporting',
        ],
        faqs: [
            {
                question: 'Do you build for prop firms, educators, or individual traders?',
                answer: 'All of the above. We work with trading educators, signal providers, research teams, and businesses that need reliable trading infrastructure.',
            },
            {
                question: 'Can you integrate with MT5 or TradingView?',
                answer: 'Yes. We build integrations for data feeds, alerts, webhooks, and custom dashboards connected to MT5, TradingView, and other platforms.',
            },
            {
                question: 'Do you provide financial advice or signals?',
                answer: 'No. We build the technology systems, dashboards, automation, and infrastructure, not trading advice or signal content.',
            },
        ],
        relatedSlugs: ['web-app-saas-development', 'aws-devops'],
    },
    {
        slug: 'technical-video-product-enablement',
        title: 'Technical Video & Product Enablement',
        metaTitle: 'Product Demo & Technical Video Production | Aizaz.studio',
        metaDescription:
            'Product demo videos, onboarding videos, internal training, technical walkthroughs, and sales enablement content for software and SaaS products.',
        heroSubtitle:
            'Help customers, sales teams, and internal staff understand complex software through clear, professional product videos.',
        keywords: [
            'product demo video',
            'SaaS onboarding video',
            'technical walkthrough video',
            'sales enablement video',
            'software demo production',
            'internal training video',
        ],
        problem:
            'Great products lose deals and confuse users because nobody can explain them clearly. Sales demos are inconsistent, onboarding is text heavy, and support teams answer the same questions repeatedly.',
        solution:
            'We create technical video content that explains your product accurately, demo videos for sales, onboarding walkthroughs for customers, and training content for internal teams.',
        capabilities: [
            'Product demo and launch videos',
            'Customer onboarding walkthroughs',
            'Internal training and SOP videos',
            'Technical feature deep dives',
            'Sales enablement and pitch support content',
            'Screen recordings with professional editing',
        ],
        useCases: [
            'SaaS launch → demo video → website and sales deck',
            'Complex dashboard → onboarding series → reduced support tickets',
            'New feature release → walkthrough → customer email campaign',
            'Internal ERP workflow → training video → faster team adoption',
        ],
        faqs: [
            {
                question: 'Do you need to build the product first?',
                answer: 'Ideally yes, or at least a working prototype. We can also create videos for MVPs, beta features, and internal tools.',
            },
            {
                question: 'Can you combine video with documentation?',
                answer: 'Yes. We often pair videos with written guides, help center content, and sales one pagers for a complete enablement package.',
            },
            {
                question: 'Do you script and record, or just edit?',
                answer: 'End to end, scripting, recording, editing, and delivery in formats ready for your website, LMS, or sales team.',
            },
        ],
        relatedSlugs: ['web-app-saas-development', 'ai-automation-systems'],
    },
    ...extraServicePages,
];

export const industryPages: IndustryPage[] = [
    {
        slug: 'saas-startups',
        audienceLabel: 'SaaS Startups',
        title: 'AI, Cloud & Automation for SaaS Startups',
        metaTitle: 'Software Development for SaaS Startups | Aizaz.studio',
        metaDescription:
            'Aizaz.studio helps SaaS startups build MVPs, scale cloud infrastructure, automate operations, and ship reliable products faster.',
        heroSubtitle:
            'From MVP to scale, web apps, AI features, AWS infrastructure, and automations built for startup velocity.',
        keywords: ['SaaS startup development', 'startup MVP', 'SaaS engineering partner'],
        problem:
            'SaaS founders need to ship fast without building on fragile foundations. Every sprint adds tech debt, deployments are scary, and operational work steals time from product.',
        solution:
            'We help SaaS startups build production ready products with scalable architecture, automated workflows, and cloud infrastructure that grows with you.',
        capabilities: [
            'MVP and v1 SaaS development',
            'Auth, billing, and multi tenant architecture',
            'AI feature integration',
            'AWS deployment and CI/CD',
            'Internal ops automations',
            'Product demo and onboarding content',
        ],
        useCases: [
            'Founder idea → MVP in weeks → first paying customers',
            'Manual onboarding → automated workflow → faster activation',
            'Fragile deploys → CI/CD → confident releases',
        ],
        faqs: [
            {
                question: 'Can you work as an extended engineering team?',
                answer: 'Yes. We embed as senior engineers and architects, working alongside founders and existing teams.',
            },
            {
                question: 'Do you help with AI features in SaaS products?',
                answer: 'Yes. We add AI assistants, document processing, smart search, and workflow agents into SaaS products.',
            },
            {
                question: 'What is the fastest way to start?',
                answer: 'Book a call or start an AI Systems Sprint to automate one workflow or ship one critical feature in 14 days.',
            },
        ],
    },
    {
        slug: 'ecommerce-wholesale',
        audienceLabel: 'E commerce & Wholesale',
        title: 'Automation for E commerce & Wholesale Businesses',
        metaTitle: 'E commerce & Wholesale Automation | Aizaz.studio',
        metaDescription:
            'Connect Shopify, NetSuite, CRMs, and warehouses. Automate orders, inventory, fulfillment, and reporting for e commerce and wholesale operations.',
        heroSubtitle:
            'Stop reconciling orders manually. Build systems that sync inventory, fulfillment, and customer data across your stack.',
        keywords: ['ecommerce automation', 'wholesale ERP integration', 'Shopify NetSuite sync'],
        problem:
            'Orders flow in from multiple channels but inventory, fulfillment, and finance live in different systems. Teams fix sync errors instead of growing the business.',
        solution:
            'We build integrations and automations between Shopify, NetSuite, CRMs, 3PLs, and internal tools so operations run smoothly at scale.',
        capabilities: [
            'Shopify and NetSuite integrations',
            'Inventory and order sync',
            'Fulfillment and 3PL automation',
            'Customer and wholesale portal development',
            'Ops dashboards and alerting',
            'CSV and SFTP pipeline automation',
        ],
        useCases: [
            'Multi channel orders → unified fulfillment workflow',
            'Inventory mismatch alerts → auto retry sync',
            'Wholesale buyer portal → pricing → NetSuite orders',
        ],
        faqs: [
            {
                question: 'Do you integrate Shopify with NetSuite?',
                answer: 'Yes. Product, order, inventory, and customer sync between Shopify and NetSuite is one of our core specialties.',
            },
            {
                question: 'Can you build custom wholesale portals?',
                answer: 'Yes. We build B2B ordering portals connected to your ERP and inventory systems.',
            },
            {
                question: 'What if we use spreadsheets today?',
                answer: 'We migrate spreadsheet workflows into reliable systems with validation, automation, and reporting.',
            },
        ],
    },
    {
        slug: 'healthtech-clinics',
        audienceLabel: 'Clinics & Healthtech',
        title: 'Software Systems for Clinics & Healthtech',
        metaTitle: 'Healthtech & Clinic Automation | Aizaz.studio',
        metaDescription:
            'Patient intake automation, AI summaries, appointment reminders, internal dashboards, and workflow systems for clinics and healthtech companies.',
        heroSubtitle:
            'Reduce admin load with intake automations, AI assisted summaries, and dashboards your clinical team can trust.',
        keywords: ['healthtech development', 'clinic automation', 'patient intake automation'],
        problem:
            'Clinic staff spend too much time on forms, follow ups, and manual data entry. Patient information is scattered and operational bottlenecks slow care delivery.',
        solution:
            'We build healthtech workflows and internal systems, intake forms, AI summaries, appointment reminders, and ops dashboards, with privacy and reliability in mind.',
        capabilities: [
            'Patient intake and form automation',
            'AI assisted summaries and triage',
            'Appointment reminder workflows',
            'Internal clinic dashboards',
            'CRM and scheduling integrations',
            'Secure cloud deployment',
        ],
        useCases: [
            'Clinic form → AI summary → dashboard → appointment reminder',
            'Referral intake → routing → staff notification',
            'Daily ops report → automated → clinic manager inbox',
        ],
        faqs: [
            {
                question: 'Do you handle HIPAA or healthcare compliance?',
                answer: 'We design with privacy and security best practices. Compliance requirements vary by region and use case, we scope this during discovery.',
            },
            {
                question: 'Can you integrate with existing clinic software?',
                answer: 'Yes. We connect forms, CRMs, scheduling tools, and internal databases via APIs and automation layers.',
            },
            {
                question: 'How quickly can a clinic workflow go live?',
                answer: 'Our 14 day AI Systems Sprint is ideal for one intake or reminder workflow end to end.',
            },
        ],
    },
    {
        slug: 'trading-businesses',
        audienceLabel: 'Trading Educators & Signal Providers',
        title: 'Trading Technology for Educators & Signal Providers',
        metaTitle: 'Trading Platform Development | Aizaz.studio',
        metaDescription:
            'Dashboards, signal systems, member portals, MT5 and TradingView integrations, and research tools for trading educators and signal businesses.',
        heroSubtitle:
            'Build the infrastructure behind your signals, research, and member experience, not just another spreadsheet.',
        keywords: ['trading platform development', 'signal provider software', 'trading educator tech'],
        problem:
            'Trading businesses outgrow Telegram groups and manual signal delivery. Members want dashboards, educators need reliable infrastructure, and risk checks must be consistent.',
        solution:
            'We build trading technology, signal pipelines, member portals, dashboards, journaling tools, and integrations, so your business scales beyond manual workflows.',
        capabilities: [
            'Signal distribution systems',
            'Member portals and subscriptions',
            'Trading dashboards and analytics',
            'MT5 and TradingView integrations',
            'Risk monitoring and alerts',
            'Research and backtesting tools',
        ],
        useCases: [
            'Signal → risk check → Discord/Telegram alert → journal',
            'Member portal with signals, content, and billing',
            'Educator dashboard with performance analytics',
        ],
        faqs: [
            {
                question: 'Can you build a custom signal delivery platform?',
                answer: 'Yes. Web apps, alerts, member access, and integrations tailored to your trading business model.',
            },
            {
                question: 'Do you integrate with Telegram or Discord?',
                answer: 'Yes. We automate alerts, member notifications, and bot workflows across messaging platforms.',
            },
            {
                question: 'Can you connect to MT5 or TradingView?',
                answer: 'Yes. Data feeds, webhooks, and custom dashboards connected to your trading stack.',
            },
        ],
    },
    {
        slug: 'netsuite-users',
        audienceLabel: 'NetSuite & ERP Users',
        title: 'Custom Integrations for NetSuite Users',
        metaTitle: 'NetSuite Automation for Operations Teams | Aizaz.studio',
        metaDescription:
            'For companies running NetSuite with disconnected Shopify, CRM, spreadsheet, and warehouse tools, we build the middleware that connects everything.',
        heroSubtitle:
            'Your ERP should not be an island. We connect NetSuite to the rest of your business.',
        keywords: ['NetSuite automation company', 'ERP integration services', 'NetSuite consultant developer'],
        problem:
            'NetSuite is the system of record, but sales, ecommerce, logistics, and finance teams still work in disconnected tools. Data drift and manual fixes consume operations.',
        solution:
            'We specialize in NetSuite integrations, SuiteScript, middleware, and reporting dashboards that make ERP data usable across the business.',
        capabilities: [
            'NetSuite ↔ Shopify sync',
            'CRM and sales pipeline integration',
            '3PL and warehouse connectors',
            'SuiteScript custom workflows',
            'SFTP and CSV automation',
            'Executive ERP reporting dashboards',
        ],
        useCases: [
            'NetSuite order issue → alert → retry → dashboard',
            'Finance close → automated reports → leadership inbox',
            'Inventory sync across ecommerce and wholesale channels',
        ],
        faqs: [
            {
                question: 'We already have a NetSuite partner. Can you still help?',
                answer: 'Yes. We often handle integrations, custom scripts, and middleware that sit outside core ERP implementation work.',
            },
            {
                question: 'Do you support multi subsidiary NetSuite setups?',
                answer: 'Yes. We scope multi entity, multi currency, and multi channel requirements during discovery.',
            },
            {
                question: 'Can you fix broken existing integrations?',
                answer: 'Yes. We audit sync failures, add monitoring, and rebuild unreliable pipelines.',
            },
        ],
    },
    {
        slug: 'agencies',
        audienceLabel: 'Agencies',
        title: 'Senior Backend & Cloud Support for Agencies',
        metaTitle: 'White Label Engineering for Agencies | Aizaz.studio',
        metaDescription:
            'Agencies partner with Aizaz.studio for senior backend, cloud, automation, and ERP work their in house team does not cover.',
        heroSubtitle:
            'Extend your agency with senior engineers for backend, AWS, automation, and ERP integrations, without hiring full time.',
        keywords: ['agency development partner', 'white label engineering', 'backend agency support'],
        problem:
            'Agencies win projects that need deep backend, cloud, or ERP expertise their core team does not have. Subcontracting is risky and quality is hard to control.',
        solution:
            'We act as a technical partner for agencies, delivering backend systems, AWS infrastructure, automations, and NetSuite integrations under your client relationship.',
        capabilities: [
            'Backend and API development',
            'AWS and DevOps delivery',
            'ERP and ecommerce integrations',
            'AI and automation systems',
            'Technical documentation and handoff',
            'Ongoing support and maintenance',
        ],
        useCases: [
            'Client needs NetSuite + Shopify → agency fronts, we build integration',
            'Complex backend sprint → agency design, we engineer and deploy',
            'Cloud migration → we architect and operate AWS infrastructure',
        ],
        faqs: [
            {
                question: 'Do you white label under our agency brand?',
                answer: 'Yes. We can work behind the scenes or join client calls as part of your team.',
            },
            {
                question: 'What types of projects fit best?',
                answer: 'Backend systems, cloud infrastructure, ERP integrations, and automation, especially when timelines are tight and quality bar is high.',
            },
            {
                question: 'How do we start a partnership?',
                answer: 'Book a call to discuss your current pipeline and where senior engineering support would help most.',
            },
        ],
    },
    ...extraIndustryPages,
];

export const aiSystemsSprintPage = {
    slug: 'ai-systems-sprint',
    title: 'AI Systems Sprint',
    metaTitle: 'AI Systems Sprint | Working Automation in 14 Days | Aizaz.studio',
    metaDescription:
        'In 14 days, Aizaz.studio identifies one manual workflow in your business and delivers a working AI assisted system, automation, dashboard, or internal tool.',
    heroSubtitle:
        'One workflow. Fourteen days. A working system your team can use, not a slide deck.',
    keywords: ['AI sprint', 'automation sprint', '14 day MVP', 'workflow automation project'],
    problem:
        'Teams know what should be automated but never prioritize it. Projects stall in discovery, agencies deliver decks instead of working software, and manual work continues.',
    solution:
        'The AI Systems Sprint is a focused 14 day engagement. We pick one high impact manual workflow, design the system, build it, deploy it, and hand it off ready for daily use.',
    capabilities: [
        'Workflow discovery and scoping',
        'System design and architecture',
        'AI, automation, or dashboard build',
        'Integration with your existing tools',
        'Deployment and handoff documentation',
        'Optional support after launch',
    ],
    examples: [
        'Website lead → AI qualification → CRM update → follow up email',
        'Support request → AI triage → ticket creation → human handoff',
        'Clinic form → AI summary → dashboard → appointment reminder',
        'NetSuite order issue → alert → retry workflow → reporting dashboard',
        'Trading signal → risk check → Telegram/Discord alert → journal entry',
    ],
    faqs: [
        {
            question: 'What do we get at the end of 14 days?',
            answer: 'A deployed, working system for one scoped workflow, plus documentation so your team knows how to use and extend it.',
        },
        {
            question: 'Do we need to know exactly what to automate?',
            answer: 'No. We help identify the highest impact workflow during the first days of the sprint.',
        },
        {
            question: 'Can the sprint lead to a longer project?',
            answer: 'Yes. Many clients start with one sprint, then expand to additional workflows, platforms, or full product builds.',
        },
        {
            question: 'What tools can you integrate with?',
            answer: 'CRMs, email, NetSuite, Shopify, WhatsApp, Google Sheets, databases, Slack, Telegram, Discord, and custom APIs.',
        },
    ],
};

export function getServiceBySlug(slug: string): SeoPage | undefined {
    return servicePages.find((page) => page.slug === slug);
}

export function getIndustryBySlug(slug: string): IndustryPage | undefined {
    return industryPages.find((page) => page.slug === slug);
}

export function getAllSeoPaths(): string[] {
    const paths = [
        '/',
        '/services',
        '/ai-systems-sprint',
        '/about',
        '/case-studies',
        '/engineering-transformation',
        '/process',
        '/blog',
        '/careers',
        '/engagement-models',
        '/book-a-call',
        '/portfolio',
        '/reviews',
        '/security',
        '/technologies',
        '/compare',
        ...servicePages.map((p) => `/services/${p.slug}`),
        ...industryPages.map((p) => `/for/${p.slug}`),
        ...comparePages.map((p) => `/compare/${p.slug}`),
        ...technologyPages.map((p) => `/technologies/${p.slug}`),
        ...blogs.map((b) => `/blog/${b.slug}`),
        ...caseStudies.map((study) => `/case-studies/${study.slug}`),
    ];
    return paths;
}
