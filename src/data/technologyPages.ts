export interface TechnologyPage {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    heroSubtitle: string;
    outcomes: string[];
    useCases: string[];
    stackNotes: string[];
    relatedServices: { label: string; href: string }[];
    faqs: { question: string; answer: string }[];
}

export const technologyPages: TechnologyPage[] = [
    {
        slug: 'nodejs-development',
        title: 'Node.js Development for SaaS and API Platforms',
        metaTitle: 'Node.js Development for SaaS & APIs | Aizaz.studio',
        metaDescription:
            'Senior Node.js development for SaaS products, REST and GraphQL APIs, real time dashboards, and automation backends. Production ready architecture from day one.',
        heroSubtitle:
            'Build fast, scalable backends and APIs that power SaaS products, internal tools, and workflow automation, without fragile scripts holding your business together.',
        outcomes: [
            'Ship SaaS backends with auth, billing hooks, and role based access',
            'Replace manual spreadsheet workflows with reliable API driven systems',
            'Handle high concurrency webhooks, queues, and integration traffic',
            'Deploy Node.js services on AWS with monitoring and rollback ready pipelines',
        ],
        useCases: [
            'Multi tenant SaaS platform with subscription billing and admin dashboards',
            'Webhook hub connecting CRM, ecommerce, and internal ERP systems',
            'Real time notification and alert pipelines for operations teams',
            'Internal automation APIs that orchestrate AI agents and third party tools',
        ],
        stackNotes: [
            'TypeScript first for maintainable SaaS codebases',
            'Express, Fastify, or NestJS depending on team scale and structure needs',
            'PostgreSQL, Redis, and message queues for durable async workflows',
            'AWS ECS, Lambda, or EC2 with CI/CD and structured logging',
        ],
        relatedServices: [
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
            { label: 'Business Process Automation', href: '/services/business-process-automation' },
            { label: 'AWS DevOps', href: '/services/aws-devops' },
        ],
        faqs: [
            {
                question: 'When should we choose Node.js over Python for our backend?',
                answer: 'Node.js excels when your product is API heavy, real time, or shares TypeScript with a React frontend. We recommend it for SaaS dashboards, webhook orchestration, and teams that want one language across the stack.',
            },
            {
                question: 'Can you extend an existing Node.js codebase?',
                answer: 'Yes. We audit architecture, add tests where missing, and ship features without a full rewrite, common for founders who outgrew their first MVP backend.',
            },
            {
                question: 'Do you build Node.js APIs for AI and automation workflows?',
                answer: 'Often. Node.js is a strong fit for routing AI requests, managing tool calls, and connecting OpenAI, LangChain, and CRM systems in one orchestration layer.',
            },
            {
                question: 'How do you handle deployment and uptime for Node.js services?',
                answer: 'We deploy to AWS with health checks, autoscaling, structured logs, and alerts. Most clients start with a 14 day sprint and extend into ongoing DevOps support.',
            },
        ],
    },
    {
        slug: 'python-development',
        title: 'Python Development for AI, Data, and Automation',
        metaTitle: 'Python Development for AI & Automation | Aizaz.studio',
        metaDescription:
            'Python development for AI pipelines, data processing, internal automation, and API services. Connect models, databases, and business tools with production grade code.',
        heroSubtitle:
            'Use Python where it wins, AI workflows, data pipelines, scraping, and backend services that turn raw information into automated business decisions.',
        outcomes: [
            'Automate document processing, reporting, and data enrichment at scale',
            'Build AI pipelines that feed CRMs, dashboards, and internal tools',
            'Replace fragile scripts with tested, deployable Python services',
            'Integrate Python workers with Node.js frontends and cloud infrastructure',
        ],
        useCases: [
            'Batch ETL jobs syncing ERP, ecommerce, and warehouse data',
            'AI document extraction feeding compliance and finance workflows',
            'Scheduled analytics reports delivered to Slack or email',
            'Background workers processing leads, orders, and support tickets',
        ],
        stackNotes: [
            'FastAPI or Flask for API layers; Celery or RQ for async jobs',
            'Pandas, Pydantic, and SQLAlchemy for structured data handling',
            'OpenAI, LangChain, and custom model integrations where needed',
            'Docker on AWS with secrets management and job monitoring',
        ],
        relatedServices: [
            { label: 'AI Automation Systems', href: '/services/ai-automation-systems' },
            { label: 'Business Process Automation', href: '/services/business-process-automation' },
            { label: 'NetSuite ERP Automation', href: '/services/netsuite-erp-automation' },
        ],
        faqs: [
            {
                question: 'Is Python a good choice for SaaS backends?',
                answer: 'Yes, especially when AI, data processing, or scientific logic is core to the product. We often pair Python APIs with React frontends and Node.js edge services.',
            },
            {
                question: 'Can you migrate our spreadsheet automations to Python?',
                answer: 'That is a common engagement. We map manual steps, rebuild them as scheduled jobs or APIs, and add logging so failures are visible, not silent.',
            },
            {
                question: 'Do you write Python for NetSuite and ecommerce integrations?',
                answer: 'Yes. Python handles CSV pipelines, SFTP drops, middleware sync, and custom validation between Shopify, NetSuite, and internal databases.',
            },
            {
                question: 'How do you keep Python services maintainable?',
                answer: 'Type hints, tests on critical paths, clear module boundaries, and deployment docs so your next hire can extend the system without guesswork.',
            },
        ],
    },
    {
        slug: 'react-development',
        title: 'React Development for SaaS Dashboards and Customer Portals',
        metaTitle: 'React Development for SaaS & Portals | Aizaz.studio',
        metaDescription:
            'React development for SaaS dashboards, admin portals, customer facing apps, and internal tools. Fast UX, clean architecture, and API ready frontends.',
        heroSubtitle:
            'Ship interfaces your users actually enjoy, admin panels, customer portals, and operational dashboards wired to real APIs and live data.',
        outcomes: [
            'Launch founder MVPs with polished, responsive React interfaces',
            'Replace legacy admin UIs with maintainable component driven code',
            'Build customer portals with auth, billing views, and self service flows',
            'Connect React frontends to AI features, webhooks, and cloud APIs',
        ],
        useCases: [
            'SaaS admin dashboard with role based views and analytics',
            'Customer portal for subscriptions, documents, and support requests',
            'Internal ops console for automation monitoring and manual overrides',
            'Trading or finance dashboards with real time data feeds',
        ],
        stackNotes: [
            'React with TypeScript for type safe, scalable UI codebases',
            'Tailwind CSS or your design system for consistent product UX',
            'React Query or SWR for efficient API state and caching',
            'Vite or Next.js depending on SEO and routing requirements',
        ],
        relatedServices: [
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
            { label: 'Trading Technology Systems', href: '/services/trading-technology-systems' },
            { label: 'AI Automation Systems', href: '/services/ai-automation-systems' },
        ],
        faqs: [
            {
                question: 'Do you build React apps from Figma or existing designs?',
                answer: 'Both. We implement from your designs or collaborate on UX for dashboards and portals where clarity matters more than pixel perfection.',
            },
            {
                question: 'Can React connect to our existing backend?',
                answer: 'Yes. We integrate with REST, GraphQL, WebSockets, and third party SDKs, whether your API is Node.js, Python, or a legacy system.',
            },
            {
                question: 'Should we use React or Next.js for our SaaS?',
                answer: 'React SPA works well for authenticated dashboards. Next.js adds SEO and server rendering for marketing plus app routes. We help you choose based on product stage.',
            },
            {
                question: 'Do you embed AI chat or copilot features in React UIs?',
                answer: 'Yes. We build streaming chat, tool use panels, and human in the loop approval flows connected to OpenAI and LangChain backends.',
            },
        ],
    },
    {
        slug: 'nextjs-development',
        title: 'Next.js Development for SaaS and Marketing Sites',
        metaTitle: 'Next.js Development for SaaS Products | Aizaz.studio',
        metaDescription:
            'Next.js development for SaaS landing pages, authenticated app routes, SEO friendly marketing sites, and full stack products with API routes and server actions.',
        heroSubtitle:
            'One framework for your marketing site, authenticated app, and API layer, built for SEO, performance, and the speed SaaS founders need at launch.',
        outcomes: [
            'Launch SEO optimized marketing pages alongside your product app',
            'Reduce frontend and backend fragmentation with Next.js API routes',
            'Improve conversion with fast, server rendered landing experiences',
            'Scale from MVP to production with edge caching and cloud deploys',
        ],
        useCases: [
            'SaaS product with public pricing pages and logged in dashboard routes',
            'Content driven site with blog, docs, and gated customer resources',
            'Ecommerce or wholesale portal with catalog and account management',
            'AI powered public tools with authenticated premium features',
        ],
        stackNotes: [
            'App Router with TypeScript for modern Next.js architecture',
            'Server components and API routes for secure backend logic',
            'Auth integrations with Supabase, Auth0, or custom JWT flows',
            'Vercel or AWS deployment with preview environments and CI/CD',
        ],
        relatedServices: [
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
            { label: 'AI Automation Systems', href: '/services/ai-automation-systems' },
            { label: 'AWS DevOps', href: '/services/aws-devops' },
        ],
        faqs: [
            {
                question: 'Is Next.js right for a B2B SaaS with a heavy dashboard?',
                answer: 'Often yes. Marketing and docs stay SEO friendly while app routes handle authenticated UX. We split concerns so dashboards stay fast and crawlable pages rank.',
            },
            {
                question: 'Can Next.js replace a separate Node.js backend?',
                answer: 'For many MVPs, yes. API routes and server actions cover auth, webhooks, and CRUD. Larger products may still use a dedicated Node.js or Python service, we design for growth.',
            },
            {
                question: 'Do you handle Next.js performance and Core Web Vitals?',
                answer: 'Yes. Image optimization, caching, and bundle analysis are part of delivery, not optional polish after launch.',
            },
            {
                question: 'How does Next.js fit with Stripe billing and Supabase auth?',
                answer: 'We wire checkout, webhooks, and session handling in one codebase so billing events and user state stay consistent across marketing and app routes.',
            },
        ],
    },
    {
        slug: 'nestjs-development',
        title: 'NestJS Development for Enterprise APIs and SaaS Backends',
        metaTitle: 'NestJS Development for SaaS & APIs | Aizaz.studio',
        metaDescription:
            'NestJS development for structured SaaS backends, microservices, GraphQL APIs, and integration layers. Modular architecture built for growing engineering teams.',
        heroSubtitle:
            'When your API surface grows beyond a single file, NestJS gives you modules, guards, and patterns that keep SaaS backends maintainable as the team scales.',
        outcomes: [
            'Establish clear module boundaries for auth, billing, and domain logic',
            'Ship GraphQL or REST APIs with validation, docs, and test coverage',
            'Build integration layers that connect CRM, ERP, and AI services reliably',
            'Onboard new engineers faster with consistent NestJS conventions',
        ],
        useCases: [
            'Multi module SaaS backend with teams, permissions, and audit logs',
            'BFF layer aggregating data from NetSuite, Shopify, and internal DBs',
            'Microservice extraction from a monolithic Node.js prototype',
            'Webhook ingestion service with queue backed retry logic',
        ],
        stackNotes: [
            'Modular NestJS with TypeScript, DTOs, and class validation',
            'Prisma or TypeORM with PostgreSQL for relational SaaS data',
            'Bull or SQS backed job queues for async integration work',
            'OpenAPI or GraphQL schema first docs for partner and frontend teams',
        ],
        relatedServices: [
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
            { label: 'NetSuite ERP Automation', href: '/services/netsuite-erp-automation' },
            { label: 'AWS DevOps', href: '/services/aws-devops' },
        ],
        faqs: [
            {
                question: 'When is NestJS worth it over plain Express?',
                answer: 'When you have multiple engineers, complex domains, or long lived APIs. NestJS pays off as modules, auth, and integrations accumulate, typical for B2B SaaS past MVP.',
            },
            {
                question: 'Can you refactor an Express app into NestJS?',
                answer: 'Yes, incrementally. We extract modules by domain, preserve API contracts, and migrate without stopping feature delivery.',
            },
            {
                question: 'Does NestJS work well with AI and automation features?',
                answer: 'Yes. Dedicated modules for AI providers, rate limiting, and tool orchestration keep LLM logic isolated from core business rules.',
            },
            {
                question: 'How do you deploy NestJS in production?',
                answer: 'Docker on AWS ECS or EC2 with health checks, migrations, and environment based config. CI/CD runs tests before every deploy.',
            },
        ],
    },
    {
        slug: 'fastapi-development',
        title: 'FastAPI Development for AI APIs and High Speed Backends',
        metaTitle: 'FastAPI Development for AI & APIs | Aizaz.studio',
        metaDescription:
            'FastAPI development for AI endpoints, data services, and automation APIs. Async Python backends with automatic docs, validation, and cloud ready deployment.',
        heroSubtitle:
            'Fast, typed Python APIs for AI features, data services, and automation, with OpenAPI docs your frontend and partner teams can actually use.',
        outcomes: [
            'Expose AI and ML capabilities through secure, documented APIs',
            'Build async ingestion endpoints for webhooks and file uploads',
            'Reduce latency for data heavy SaaS features with Python async IO',
            'Integrate FastAPI services with React frontends and AWS infrastructure',
        ],
        useCases: [
            'AI copilot API with streaming responses and tool calling',
            'Document upload and extraction pipeline for compliance workflows',
            'High throughput webhook receiver with background task processing',
            'Internal analytics API feeding dashboards and scheduled reports',
        ],
        stackNotes: [
            'FastAPI with Pydantic models and automatic OpenAPI generation',
            'Async SQLAlchemy or asyncpg for PostgreSQL at scale',
            'Celery, Redis, or SQS for long running AI and ETL jobs',
            'Uvicorn behind nginx or AWS ALB with structured logging',
        ],
        relatedServices: [
            { label: 'AI Automation Systems', href: '/services/ai-automation-systems' },
            { label: 'Business Process Automation', href: '/services/business-process-automation' },
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
        ],
        faqs: [
            {
                question: 'Why FastAPI for AI powered SaaS features?',
                answer: 'FastAPI handles async IO, streaming, and validation cleanly, ideal for LLM endpoints, embeddings, and file processing that would block a synchronous stack.',
            },
            {
                question: 'Can FastAPI sit behind our existing Node.js gateway?',
                answer: 'Yes. Common pattern: Node.js for auth and billing, FastAPI for AI and data heavy routes, unified behind one API domain.',
            },
            {
                question: 'Do you generate API documentation for our team?',
                answer: 'OpenAPI is built in. We extend schemas with examples and auth notes so frontend and integration partners ship faster.',
            },
            {
                question: 'How do you secure FastAPI endpoints in production?',
                answer: 'API keys, JWT validation, rate limits, and network isolation on AWS. Secrets never live in code, they come from parameter store or env management.',
            },
        ],
    },
    {
        slug: 'aws',
        title: 'AWS Cloud Infrastructure for SaaS and Automation Platforms',
        metaTitle: 'AWS Cloud & Infrastructure for SaaS | Aizaz.studio',
        metaDescription:
            'AWS architecture, deployment, and DevOps for SaaS products, automation pipelines, and API platforms. Reliable cloud infrastructure your business can depend on.',
        heroSubtitle:
            'Move from fragile manual deploys to AWS infrastructure with monitoring, backups, and pipelines, so your SaaS and automation systems survive real traffic.',
        outcomes: [
            'Deploy SaaS and API workloads with autoscaling and health checks',
            'Cut downtime with CI/CD, rollback strategies, and alert driven ops',
            'Secure data with VPC design, IAM policies, and encrypted storage',
            'Right size cloud spend as automation and user volume grow',
        ],
        useCases: [
            'SaaS production environment with staging, prod, and preview branches',
            'Serverless webhook and queue processing for integration heavy stacks',
            'Migration from Heroku or VPS to ECS, RDS, and managed services',
            'Compliance oriented logging and backup for regulated industries',
        ],
        stackNotes: [
            'ECS, EC2, or Lambda chosen by workload, not resume driven defaults',
            'RDS PostgreSQL, S3, CloudWatch, and IAM as core building blocks',
            'Terraform or CloudFormation for reproducible infrastructure',
            'GitHub Actions or CodePipeline for test gated deployments',
        ],
        relatedServices: [
            { label: 'AWS DevOps', href: '/services/aws-devops' },
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
            { label: 'AI Automation Systems', href: '/services/ai-automation-systems' },
        ],
        faqs: [
            {
                question: 'Do you only work with AWS?',
                answer: 'AWS is our primary cloud for SaaS and automation clients. We focus depth there, ECS, RDS, Lambda, S3, and CloudWatch, rather than spreading thin across every provider.',
            },
            {
                question: 'Can you fix our existing AWS setup without a full rebuild?',
                answer: 'Often. We start with deploy reliability, cost leaks, and missing alerts, then improve architecture where it blocks growth.',
            },
            {
                question: 'How does AWS support AI and automation workloads?',
                answer: 'Queues, Lambda, and containerized workers run LLM pipelines, schedulers, and webhook processors at scale with pay per use economics where it fits.',
            },
            {
                question: 'Do you provide ongoing DevOps after the initial setup?',
                answer: 'Yes. Many clients retain us for monitoring, incident response, and infrastructure changes as product and integration scope grows.',
            },
        ],
    },
    {
        slug: 'postgresql',
        title: 'PostgreSQL for SaaS Data Models and Reliable Analytics',
        metaTitle: 'PostgreSQL for SaaS & Data Platforms | Aizaz.studio',
        metaDescription:
            'PostgreSQL database design, optimization, and integration for SaaS products, automation systems, and analytics. Durable data layers your business can trust.',
        heroSubtitle:
            'Your SaaS, automation, and AI features need a database that stays correct under load, PostgreSQL is our default for transactional truth and rich queries.',
        outcomes: [
            'Design multi tenant schemas that scale without painful migrations',
            'Keep CRM, billing, and automation data consistent and queryable',
            'Improve slow dashboards with indexes, views, and tuned queries',
            'Support audit trails and compliance with immutable event logs',
        ],
        useCases: [
            'SaaS subscription and usage billing with historical reporting',
            'Automation state machines tracking workflow runs and failures',
            'Unified data store for ecommerce, ERP sync, and internal dashboards',
            'Vector search extensions alongside relational product data',
        ],
        stackNotes: [
            'RDS PostgreSQL on AWS or Supabase managed Postgres',
            'Row level security and tenant isolation for B2B SaaS',
            'Migrations with Prisma, Drizzle, Alembic, or Flyway',
            'Read replicas and connection pooling for high traffic APIs',
        ],
        relatedServices: [
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
            { label: 'NetSuite ERP Automation', href: '/services/netsuite-erp-automation' },
            { label: 'AWS DevOps', href: '/services/aws-devops' },
        ],
        faqs: [
            {
                question: 'PostgreSQL or MongoDB for our SaaS?',
                answer: 'PostgreSQL wins when relationships, transactions, and reporting matter, which is most B2B SaaS. We use document patterns inside Postgres JSONB when flexibility is needed.',
            },
            {
                question: 'Can you optimize an existing PostgreSQL database?',
                answer: 'Yes. We analyze slow queries, fix indexing, review schema design, and add pooling, common after MVPs outgrow their first data model.',
            },
            {
                question: 'Does PostgreSQL work with AI and vector search?',
                answer: 'Yes. pgvector and hybrid search patterns let you store embeddings next to business records without a separate siloed database.',
            },
            {
                question: 'How do you handle backups and disaster recovery?',
                answer: 'Automated RDS snapshots, point in time recovery, and tested restore runbooks, configured as part of production delivery, not as a later phase.',
            },
        ],
    },
    {
        slug: 'supabase',
        title: 'Supabase for Rapid SaaS Auth, Data, and Realtime Features',
        metaTitle: 'Supabase Development for SaaS MVPs | Aizaz.studio',
        metaDescription:
            'Supabase for SaaS authentication, PostgreSQL backends, realtime subscriptions, and storage. Ship founder MVPs faster without sacrificing a path to scale.',
        heroSubtitle:
            'Launch SaaS MVPs with auth, database, and APIs in days, then extend with custom backend logic, Stripe billing, and AWS as you grow.',
        outcomes: [
            'Ship founder MVPs with email, OAuth, and row level security fast',
            'Reduce backend boilerplate while keeping PostgreSQL as source of truth',
            'Add realtime dashboards and live collaboration features quickly',
            'Migrate off Supabase gracefully when enterprise requirements arrive',
        ],
        useCases: [
            'B2B SaaS MVP with teams, invites, and role based data access',
            'Customer portal with file uploads and profile management',
            'Internal tool with realtime status boards for automation jobs',
            'Prototype to production path with Next.js and Supabase auth',
        ],
        stackNotes: [
            'Supabase Auth with RLS policies for tenant safe data access',
            'Edge functions for webhooks, Stripe events, and lightweight logic',
            'Storage buckets for documents, exports, and user generated content',
            'Custom Node.js or Python services when logic exceeds edge limits',
        ],
        relatedServices: [
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
            { label: 'AI Automation Systems', href: '/services/ai-automation-systems' },
            { label: 'AWS DevOps', href: '/services/aws-devops' },
        ],
        faqs: [
            {
                question: 'Is Supabase only for prototypes?',
                answer: 'No, many production SaaS products run on Supabase through early scale. We design RLS, migrations, and escape hatches so you are not trapped at growth.',
            },
            {
                question: 'Can Supabase integrate with Stripe and external APIs?',
                answer: 'Yes. Edge functions and database webhooks handle billing events, CRM updates, and automation triggers alongside your app.',
            },
            {
                question: 'How do you secure multi tenant data on Supabase?',
                answer: 'Row level security policies, service role isolation, and audited migrations, treated as production security, not demo defaults.',
            },
            {
                question: 'When should we move off Supabase to self hosted Postgres?',
                answer: 'When compliance, custom networking, or heavy compute requires it. We plan that transition early so migration is incremental, not a crisis.',
            },
        ],
    },
    {
        slug: 'openai',
        title: 'OpenAI Integration for Business Automation and SaaS AI',
        metaTitle: 'OpenAI Integration for Business Automation | Aizaz.studio',
        metaDescription:
            'OpenAI API integration for chatbots, document AI, lead qualification, and SaaS copilots. Production ready LLM features connected to your CRM, ERP, and workflows.',
        heroSubtitle:
            'Turn OpenAI from a demo into business software, lead scoring, support triage, document extraction, and copilots wired to the tools your team already uses.',
        outcomes: [
            'Automate lead qualification and routing with CRM connected AI',
            'Reduce support load with triage, summarization, and smart handoff',
            'Extract structured data from documents for finance and compliance',
            'Add AI copilots inside SaaS products with guardrails and logging',
        ],
        useCases: [
            'Website chatbot that qualifies leads and creates HubSpot records',
            'Support inbox assistant that drafts replies and escalates edge cases',
            'Contract and invoice parsing into ERP ready structured fields',
            'In app copilot that queries product data with tool use and approvals',
        ],
        stackNotes: [
            'GPT models with function calling for reliable tool orchestration',
            'Prompt versioning, evals, and fallbacks for production reliability',
            'Rate limiting, caching, and cost controls per tenant or workflow',
            'Human in the loop UI for approvals on high stakes decisions',
        ],
        relatedServices: [
            { label: 'AI Automation Systems', href: '/services/ai-automation-systems' },
            { label: 'Business Process Automation', href: '/services/business-process-automation' },
            { label: 'AI Systems Sprint', href: '/ai-systems-sprint' },
        ],
        faqs: [
            {
                question: 'Can OpenAI integrate with our CRM and internal tools?',
                answer: 'Yes. Function calling and custom APIs let models read and write HubSpot, NetSuite, Slack, and internal databases within defined guardrails.',
            },
            {
                question: 'How do you prevent AI hallucinations in business workflows?',
                answer: 'Structured outputs, retrieval over your data, validation steps, and human approval on actions that affect customers or money.',
            },
            {
                question: 'What about data privacy and OpenAI?',
                answer: 'We configure API usage per your policy, zero retention where available, VPC options for enterprise, and no training on your data when using standard API terms.',
            },
            {
                question: 'How fast can we launch a first OpenAI workflow?',
                answer: 'Our 14 day AI Systems Sprint delivers one production workflow, scoped, integrated, monitored, and ready for daily use.',
            },
        ],
    },
    {
        slug: 'langchain',
        title: 'LangChain for Multi Step AI Agents and Workflow Automation',
        metaTitle: 'LangChain Development for AI Agents | Aizaz.studio',
        metaDescription:
            'LangChain development for AI agents, RAG pipelines, and multi step automations. Connect LLMs to databases, APIs, and business tools with observable, maintainable chains.',
        heroSubtitle:
            'When a single prompt is not enough, LangChain orchestrates multi step AI agents, retrieval, tool use, and memory, tied to real business outcomes.',
        outcomes: [
            'Build agents that query internal docs and databases with citations',
            'Orchestrate multi tool workflows across CRM, email, and APIs',
            'Add retrieval augmented generation over your product and policy data',
            'Monitor agent runs with logging, retries, and failure alerts',
        ],
        useCases: [
            'Internal knowledge agent over Notion, Confluence, and ticket history',
            'Sales research agent pulling CRM, web, and enrichment APIs',
            'Compliance review agent comparing documents against policy rules',
            'SaaS feature that answers customer questions from their account data',
        ],
        stackNotes: [
            'LangChain or LangGraph for agent graphs and stateful workflows',
            'Vector stores with PostgreSQL pgvector or managed search services',
            'LangSmith or custom tracing for debugging production agent behavior',
            'Python FastAPI or Node.js hosts depending on stack fit',
        ],
        relatedServices: [
            { label: 'AI Automation Systems', href: '/services/ai-automation-systems' },
            { label: 'Business Process Automation', href: '/services/business-process-automation' },
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
        ],
        faqs: [
            {
                question: 'Do we need LangChain or is OpenAI function calling enough?',
                answer: 'Simple flows need only function calling. LangChain helps when you have retrieval, multiple tools, branching logic, and long running agent state, typical in ops automation.',
            },
            {
                question: 'Can LangChain agents write to our production systems?',
                answer: 'Yes, with strict tool schemas, approval gates, and audit logs. We treat agent actions like any integration, idempotent, validated, and reversible where possible.',
            },
            {
                question: 'How do you keep RAG answers accurate for our business?',
                answer: 'Chunking strategy, metadata filters, hybrid search, and eval sets tuned on your real questions, not generic demo documents.',
            },
            {
                question: 'LangChain in Python or JavaScript?',
                answer: 'We use both. Python for data heavy pipelines; JavaScript when your stack is Node.js and Next.js first. Architecture matters more than language preference.',
            },
        ],
    },
    {
        slug: 'stripe',
        title: 'Stripe Integration for SaaS Billing and Subscription Revenue',
        metaTitle: 'Stripe Integration for SaaS Billing | Aizaz.studio',
        metaDescription:
            'Stripe integration for SaaS subscriptions, usage billing, customer portals, and webhook automation. Reliable payments connected to your product and ops workflows.',
        heroSubtitle:
            'Get subscription billing, invoicing, and payment webhooks right, so revenue flows into your SaaS product and CRM without manual reconciliation every month.',
        outcomes: [
            'Launch Stripe Checkout or embedded billing with minimal friction',
            'Sync subscription state to your database and CRM automatically',
            'Handle upgrades, proration, trials, and failed payment recovery',
            'Automate finance alerts and internal workflows from Stripe events',
        ],
        useCases: [
            'B2B SaaS with tiered plans, seat billing, and admin managed subscriptions',
            'Usage based billing with metered API consumption reporting',
            'Customer self service portal for invoices and payment methods',
            'Webhook driven provisioning when new subscriptions activate',
        ],
        stackNotes: [
            'Stripe Checkout, Billing Portal, and Customer objects mapped to your user model',
            'Webhook handlers with idempotency, signature verification, and retries',
            'Stripe Connect when marketplaces or partner payouts are required',
            'Test mode CI fixtures so billing logic ships with confidence',
        ],
        relatedServices: [
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
            { label: 'Business Process Automation', href: '/services/business-process-automation' },
            { label: 'AWS DevOps', href: '/services/aws-devops' },
        ],
        faqs: [
            {
                question: 'Can you add Stripe to an existing SaaS without downtime?',
                answer: 'Yes. We migrate customers carefully, run parallel billing tests, and use feature flags so cutover is controlled, not a weekend gamble.',
            },
            {
                question: 'Do you integrate Stripe webhooks with our CRM?',
                answer: 'Common pattern: subscription events update HubSpot, Slack alerts finance, and your app database stays the source of entitlements.',
            },
            {
                question: 'Stripe with Supabase or custom Node.js backends?',
                answer: 'Both. Edge functions work for MVPs; dedicated webhook services on AWS handle high volume and complex provisioning logic.',
            },
            {
                question: 'How do you handle failed payments and dunning?',
                answer: 'Stripe Billing settings plus app side grace periods and email automations, so churn from card failures drops without manual chasing.',
            },
        ],
    },
    {
        slug: 'twilio',
        title: 'Twilio Integration for SMS, Voice, and WhatsApp Automation',
        metaTitle: 'Twilio Integration for Business Automation | Aizaz.studio',
        metaDescription:
            'Twilio integration for SMS alerts, voice workflows, WhatsApp business messaging, and customer communication automation connected to your CRM and ops stack.',
        heroSubtitle:
            'Reach customers and ops teams where they respond, SMS, voice, and WhatsApp, automated and logged, not scattered across personal phones and spreadsheets.',
        outcomes: [
            'Automate appointment reminders, OTP, and transactional notifications',
            'Route inbound SMS and WhatsApp to CRM records and support queues',
            'Build voice IVR flows for lead capture and after hours routing',
            'Connect messaging events to AI triage and internal dashboards',
        ],
        useCases: [
            'WhatsApp lead qualification bot handing warm leads to sales reps',
            'Order and shipment SMS updates synced from ecommerce and ERP',
            'Two factor auth and magic link delivery for SaaS login flows',
            'Ops alert channel when automation jobs fail or sync breaks',
        ],
        stackNotes: [
            'Twilio Programmable SMS, Voice, and WhatsApp Business API',
            'Webhook receivers on Node.js or Python with queue backed processing',
            'Message templates, compliance, and opt out handling for regulated use',
            'CRM and ticketing integrations so every message ties to a customer record',
        ],
        relatedServices: [
            { label: 'AI Automation Systems', href: '/services/ai-automation-systems' },
            { label: 'Business Process Automation', href: '/services/business-process-automation' },
            { label: 'Web App & SaaS Development', href: '/services/web-app-saas-development' },
        ],
        faqs: [
            {
                question: 'WhatsApp automation for lead gen, is that supported?',
                answer: 'Yes. We build WhatsApp flows for qualification and support with template messages, handoff to humans, and CRM logging, common for ecommerce and services businesses.',
            },
            {
                question: 'Can Twilio trigger our existing automation workflows?',
                answer: 'Inbound messages hit webhooks that update databases, create tickets, and kick off AI triage, same patterns we use for email and form automations.',
            },
            {
                question: 'How do you handle message deliverability and compliance?',
                answer: 'Registered sender IDs, template approval where required, opt in tracking, and rate limits, configured before campaigns go live.',
            },
            {
                question: 'Twilio plus OpenAI for conversational support?',
                answer: 'Yes. AI handles routine questions; Twilio routes complex threads to agents with full conversation history in your support stack.',
            },
        ],
    },
];

export function getTechnologyBySlug(slug: string): TechnologyPage | undefined {
    return technologyPages.find((page) => page.slug === slug);
}
