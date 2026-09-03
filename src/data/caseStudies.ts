import { BOOKING_URL } from './siteConfig';
import type { ImageMetadata } from 'astro';
import type { ContentAuthor } from '../lib/sanity/author';
import archiverCover from '../assets/1archiver-enterprise-email-archiving-cover.jpg';
import archiverBg1 from '../assets/1archiver-bg-dashboard-1.png';
import archiverBg2 from '../assets/1archiver-bg-dashboard-2.png';
import igwCover from '../assets/igw-casestudy-cover.png';
import igwBg1 from '../assets/igw-bg-dashboard-1.png';
import igwBg2 from '../assets/igw-bg-dashboard-2.png';
import propertyMatchmakerCover from '../assets/propertymatch-property-matching-saas-cover.jpg';
import propertyMatchmakerBuyer from '../assets/propertymatchmaker-bg-buyer-management.png';
import propertyMatchmakerSearch from '../assets/propertymatchmaker-bg-property-search.png';
import codeCheckerCover from '../assets/codechecker-casestudy-cover.png';
import salesangelCover from '../assets/salesangel-ai-sales-platform-cover.jpg';
import salesangelArchitecture from '../assets/salesangel-architecture-diagram.png';
import salesangelDashboard from '../assets/salesangel-dashboard.png';
import salesangelAiAgents from '../assets/salesangel-ai-agents.png';
import salesangelCrmContacts from '../assets/salesangel-crm-contacts.png';
import salesangelLiveDialer from '../assets/salesangel-live-dialer.png';

export interface CaseStudy {
    id: string;
    slug: string;
    category: string;
    title: string;
    subtitle: string;
    description: string;
    image: ImageMetadata;
    imageAlt?: string;
    logo?: string;
    client?: string;
    location?: string;
    industry?: string;
    projectValue?: string;
    projectPeriod?: string;
    deliveryDuration?: string;
    deliveredBy?: string;
    atAGlance?: { value: string; label: string; sublabel?: string }[];
    engagement?: { label: string; value: string }[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
        rating: string;
        source: string;
        engagementMeta?: string;
    };
    engagementNote?: string;
    portfolioNote?: string;
    stats?: { label: string; value: string }[];
    content: {
        challenge: string;
        solution: string;
        outcome: string;
        testimonial?: {
            quote: string;
            author: string;
            role: string;
            avatar?: string;
        };
    };
    // New field for rich content
    detailedContent?: {
        title: string;
        content: string; // Can be markdown like or just text
        items?: {
            title: string;
            description: string;
            points?: string[];
            image?: ImageMetadata;
            imageUrl?: string;
            table?: { label: string; value: string }[];
            tableCaption?: string;
            tableHeaders?: { left: string; right: string };
        }[];
    }[];
    gallery?: string[];
    backgroundImages?: ImageMetadata[];
    backgroundImageUrls?: string[];
    /** Letterbox a non-wide source inside the 2048/958 frame instead of cropping. */
    coverFit?: 'cover' | 'contain';
    imageUrl?: string;
    seoTitle?: string;
    seoDescription?: string;
    canonicalPath?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImageUrl?: string;
    noindex?: boolean;
    focusKeyword?: string;
    author?: ContentAuthor;
    /** Excluded from listings, sitemap, and internal links — data kept in source. */
    hiddenFromPublic?: boolean;
    cta?: {
        headline: string;
        buttonText: string;
        buttonHref?: string;
    };
}

/** Homepage proof grid only. Listing order on /case-studies stays getAllCaseStudies(). */
export const HOMEPAGE_PROOF_SLUGS = [
    '1archiver-compliance-platform',
    'designing-multi-tenant-crm-architecture',
    'propertymatchmaker-real-estate-saas',
] as const;

export const caseStudies: CaseStudy[] = [
    {
        id: '1',
        slug: '1archiver-compliance-platform',
        category: 'Compliance • eDiscovery • Data Retention',
        title: '1Archiver: Enterprise Email Archiving',
        subtitle: 'Enterprise email archiving platform',
        description:
            'A scalable email archiving and search platform with ingestion, retention, legal hold, and audit workflows.',
        seoTitle: '1Archiver: Enterprise Email Archiving | Aizaz Studio',
        seoDescription:
            'Email archiving and search with IMAP, Gmail API, Microsoft Graph, Elasticsearch, retention, legal hold, and audit workflows.',
        image: archiverCover,
        imageAlt: '1Archiver enterprise email archiving platform cover illustration',
        backgroundImages: [
            archiverBg1,
            archiverBg2,
            archiverBg1,
            archiverBg1,
            archiverBg1,
            archiverBg1
        ],
        content: {
            challenge:
                'Enterprises need email retention they can search, hold, and audit. Many archiving tools mix ingestion with business logic, or make it hard to prove what was kept across IMAP, Gmail, and Microsoft 365.',
            solution:
                'Ali identified the opportunity through experience around enterprise archiving and worked across product design and core development. The system uses connectors at the edge, workers for integrity, and a core as the system of record, with Apache NiFi, Apache Kafka, IMAP, Gmail API, Microsoft Graph, MIME processing, Elasticsearch, S3 and Glacier, RBAC, retention policies, legal hold, and audit workflows.',
            outcome:
                '1Archiver is an email archiving and search platform with verifiable ingestion, retention, legal hold, and audit workflows, designed for cloud and on-premises deployment.',
        },
        detailedContent: [
            {
                title: "The Problem",
                content: "Most archiving solutions fail in one of three ways: they mix business logic with ingestion, treat security as an afterthought, or collapse under real world data volumes. 1Archiver started with a simple question: 'What if we built an email archiver the way it should actually be built: safe, secure, and searchable with retention and legal hold workflows?'",
                items: [
                    {
                        title: "Architectural Challenges",
                        description: "The platform needed to support email data across multiple providers (IMAP, Exchange, Gmail), with retention policies, legal hold, and audit workflows."
                    }
                ]
            },
            {
                title: "Our Approach",
                content: "Instead of rushing to implementation, we treated this as a systems engineering problem, not a CRUD app.",
                items: [
                    {
                        title: "1. Designing for Compliance First",
                        description: "We separated responsibilities at a system level:",
                        image: archiverBg1,
                        points: [
                            "Connectors (The Edge): Responsible only for fetching raw email data (IMAP/Exchange/Gmail). Stateless, no filtering.",
                            "Workers (The Muscle): Responsible for data integrity (SHA 256 hashing, Deduplication, Secure blob storage).",
                            "Compliance Core (System of Record): Authoritative source for retention policies, legal holds, audit logs, and access control."
                        ]
                    },
                    {
                        title: "2. Security Was a Default, Not a Feature",
                        description: "Every decision was made assuming hostile environments:",
                        image: archiverBg2,
                        points: [
                            "Immutable data once ingested",
                            "Tamper evident audit logs",
                            "Clear separation between raw data and indexed/searchable metadata",
                            "No connector allowed to 'decide' what data is important"
                        ]
                    },
                    {
                        title: "3. Built for Scale from Day One",
                        description: "We designed the system to scale horizontally:",
                        points: [
                            "Streaming ingestion via message queues",
                            "Workers that scale independently from the UI",
                            "Search indexes decoupled from raw storage",
                            "Metadata driven schemas to support future features without migrations"
                        ]
                    },
                    {
                        title: "4. Technology Choices That Serve the System",
                        description: "We intentionally avoided 'over engineering' while choosing tools that survive enterprise workloads:",
                        points: [
                            "Use battle tested components where correctness matters",
                            "Favor explicit data flows over hidden magic",
                            "Design schemas assuming audits, not demos"
                        ]
                    }
                ]
            },
            {
                title: "The Outcome",
                content: "1Archiver is now a compliance ready platform, not just an MVP.",
                items: [
                    {
                        title: "Key Achievements",
                        description: "",
                        points: [
                            "Secure, verifiable email ingestion",
                            "Clear separation of concerns",
                            "Scalable search across massive datasets",
                            "Architecture ready for on prem and cloud deployments",
                            "Designed to support retention, legal hold, search, and audit workflows."
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        slug: 'investorsgonewild-investment-platform',
        hiddenFromPublic: true,
        category: 'FinTech • Investment Intelligence • Financial Analytics',
        title: 'InvestorsGoneWild: Building a Unified, Metadata Driven Investment Platform',
        subtitle: 'Multi Asset Investment Intelligence Platform',
        description: 'A unified platform where investors can analyze, compare, and act across stocks, crypto, and real estate without being locked into rigid workflows.',
        image: igwCover,
        content: {
            challenge: 'Modern investors suffer from fragmentation. Real estate, stocks, and crypto data live in isolated systems. The challenge was to create a single platform to unify these fundamentally different asset classes without turning the platform brittle, while keeping everything customizable as strategies evolve.',
            solution: 'We treated InvestorsGoneWild as a financial operating system. We designed a layered abstraction for multi asset support, an integration first architecture connecting Bloomberg, Gemini, and BatchData, and adopted a metadata driven approach inspired by Salesforce to allow dynamic configuration of entities and UIs.',
            outcome: 'InvestorsGoneWild emerged as a unified investment intelligence platform. It supports multiple asset classes, maintains clean separation between data providers and logic, and offers metadata driven customization. It proves that financial tooling doesn’t need to be rigid to be powerful.',
        },
        detailedContent: [
            {
                title: "The Problem",
                content: "Modern investors don’t suffer from a lack of data — they suffer from fragmentation. Real estate, stocks, and crypto data live in isolated systems. The real problem was architectural: How do you unify fundamentally different asset classes under one system without turning the platform brittle?",
                items: [
                    {
                        title: "Architectural Challenges",
                        description: "Integrating powerful but complex data sources (Bloomberg, Gemini, BatchData) and keeping everything customizable as investor strategies evolve."
                    }
                ]
            },
            {
                title: "Our Approach",
                content: "Instead of building a fixed investment app, we treated InvestorsGoneWild as a financial operating system.",
                items: [
                    {
                        title: "1. A One Stop Shop — Without a Monolith",
                        description: "We designed a layered abstraction that allowed each data source to remain independent while still being queryable under a unified experience.",
                        image: igwBg1,
                        points: [
                            "Stocks & Commodities — market data, performance, trends",
                            "Crypto — volatility aware analytics and signals",
                            "Real Estate — batch data ingestion and regional insights"
                        ]
                    },
                    {
                        title: "2. Integration First Architecture",
                        description: "Each integration was treated as a data provider, not a dependency. Loosely coupled and replaceable.",
                        image: igwBg2,
                        points: [
                            "Bloomberg Terminal for market grade financial data",
                            "Gemini for AI powered investment recommendations",
                            "BatchData for real estate analytics"
                        ]
                    },
                    {
                        title: "3. Metadata Driven by Design",
                        description: "Inspired by Salesforce, we built a system where entities, fields, and behaviors are defined by metadata, not hard coded.",
                        points: [
                            "Custom dashboards per investor",
                            "Strategy specific views without code changes",
                            "Rapid iteration as new asset classes were added"
                        ]
                    },
                    {
                        title: "4. Designing for Power Users Without Overwhelm",
                        description: "We focused on progressive disclosure of data and consistent interaction patterns across asset types.",
                        points: [
                            "Progressive disclosure of data",
                            "Clean, CRM style layouts",
                            "Consistent interaction patterns across asset types"
                        ]
                    }
                ]
            },
            {
                title: "The Outcome",
                content: "InvestorsGoneWild emerged as a unified investment intelligence platform, not just another portfolio tracker.",
                items: [
                    {
                        title: "Key Achievements",
                        description: "",
                        points: [
                            "Multi asset support under a single system",
                            "Clean separation between data providers and core logic",
                            "Metadata driven customization inspired by enterprise CRMs",
                            "AI assisted insights layered on top of trusted data sources"
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: '3',
        slug: 'propertymatchmaker-real-estate-saas',
        category: 'Real Estate • SaaS • Buyer Matching',
        title: 'PropertyMatch: Property Matching SaaS',
        subtitle: 'Property matching SaaS for real estate teams',
        description:
            'A real estate SaaS that matches buyers with properties, built from a validated Airtable prototype into a focused product.',
        seoTitle: 'PropertyMatch: Property Matching SaaS | Aizaz Studio',
        seoDescription:
            'How PropertyMatch moved from an Airtable prototype to a focused real estate property matching SaaS.',
        image: propertyMatchmakerCover,
        imageAlt: 'PropertyMatch property matching SaaS cover illustration',
        client: 'Oran',
        location: 'Los Angeles, California, USA',
        industry: 'Real Estate',
        projectValue: '$800 Fixed-Price',
        projectPeriod: 'March 10–26, 2026',
        deliveryDuration: '14 days',
        deliveredBy: 'Ali Zafar, Founder and Lead Engineer, Aizaz Studio',
        engagementNote:
            'Originally completed through Upwork by Syed Ali. Now showcased as part of the Aizaz Studio portfolio. The original Upwork contract was not signed by Aizaz Studio.',
        atAGlance: [
            { value: '$800', label: 'Project value' },
            { value: '14 days', label: 'Delivery timeline', sublabel: 'Mar 10–26, 2026' },
            { value: '5.0/5.0', label: 'Client rating' },
            { value: 'Real Estate', label: 'Buyer & property matching' },
        ],
        engagement: [
            { label: 'Platform', value: 'Upwork' },
            { label: 'Project value', value: '$800' },
            { label: 'Engagement type', value: 'Fixed Price' },
            { label: 'Duration', value: 'Mar 10–26, 2026' },
            { label: 'Delivery', value: '14 days' },
            { label: 'Client rating', value: '5.0 / 5.0' },
            { label: 'Client location', value: 'Los Angeles, USA' },
        ],
        testimonial: {
            quote:
                'I hired Syed Ali to help build me a real estate platform to connect agents together and put more deals together within our brokerage. Ali did an incredible job completing my project, he worked hard and fast to get everything done within the short time frame I had. The quality of the work was great as well, anytime I had an edit or fix I wanted he was able to get it done perfectly. I highly recommend working with Ali for any MvP, SaaS, etc needs. I will not be looking elsewhere for future projects as I believe I have found one of the best. Thank you again for all the hard work, I could not be happier with the outcome. You can tell he has been doing this effectively for years and has extensive knowledge of this field.',
            author: 'Oran',
            role: 'Los Angeles, USA',
            rating: '★★★★★ 5.0 / 5.0',
            source: 'Client feedback from Upwork',
            engagementMeta: '$800 Fixed-Price | Mar 10–26, 2026',
        },
        content: {
            challenge:
                'Oran had a working Airtable prototype that validated the core real estate matching workflow. The prototype needed to become a standalone SaaS MVP without unnecessary complexity, while reducing dependence on per-agent SaaS licensing.',
            solution:
                'We took the existing workflow and translated the essential functionality into a purpose-built SaaS MVP rather than rebuilding features that already worked in the prototype.',
            outcome:
                'The Airtable prototype became a functioning SaaS MVP that gave Oran ownership of the core workflow and removed the need to depend entirely on a per-agent SaaS licensing model.',
        },
        detailedContent: [
            {
                title: 'The Starting Point',
                content:
                    'Oran had already built a working prototype of a real estate buyer and property matching platform in Airtable. The core workflow was clear: agent accounts, agents upload buyer criteria, agents upload off-market properties, and the system automatically matches buyers with relevant properties across the network.',
                items: [
                    {
                        title: 'A validated workflow, not a blank slate',
                        description:
                            'The Airtable prototype proved the idea worked. The goal was explicitly to build the simplest viable version first rather than over-engineer the product or rebuild functionality that already worked.',
                    },
                ],
            },
            {
                title: 'The Problem',
                content:
                    'The prototype needed to become a standalone SaaS MVP. Oran wanted to move away from a per-agent SaaS cost of approximately $40 per agent and build a solution where additional agents would not introduce the same recurring software licensing cost.',
                items: [
                    {
                        title: 'Before',
                        description: 'Per-agent SaaS licensing tied software cost directly to agent growth.',
                    },
                    {
                        title: 'After',
                        description:
                            'A custom platform backed by fixed infrastructure costs, where the core workflow runs on infrastructure controlled by the client.',
                        points: [
                            'Near-zero marginal software licensing cost per additional agent',
                            'Replaced the per-agent SaaS licensing model with owned software',
                        ],
                    },
                ],
            },
            {
                title: 'The Approach',
                content:
                    'We used the existing Airtable prototype as the starting point. The focus was the minimum viable product required to make the platform usable as an independent SaaS product, translating core workflows into a custom application built around how Oran actually wanted the product to work.',
                items: [
                    {
                        title: 'Simplest viable version first',
                        description:
                            'Instead of rebuilding everything, we scoped around the workflows that mattered for launch: agent accounts, buyer intake, property submission, and matching across the network.',
                    },
                    {
                        title: 'Delivered in 14 days',
                        description:
                            'The engagement ran from March 10 to March 26, 2026. The MVP was delivered within a 14 day delivery window on a fixed $800 price.',
                    },
                ],
            },
            {
                title: 'What We Built',
                content:
                    'The MVP translated the validated prototype into a purpose-built SaaS application focused on the workflows Oran needed to run the matching network.',
                items: [
                    {
                        title: 'Agent accounts',
                        description:
                            'Individual agent accounts with authentication and access management so each agent could manage their own data within the platform.',
                    },
                    {
                        title: 'Buyer criteria management',
                        description:
                            'Agents could enter buyer requirements, including target locations, budget, and notes, stored in a structured format across the platform.',
                        image: propertyMatchmakerBuyer,
                        points: [
                            'Target cities and neighborhoods',
                            'Budget and requirement notes',
                            'Centralized buyer records per agent',
                        ],
                    },
                    {
                        title: 'Off-market property management',
                        description:
                            'Agents could submit off-market properties with structured property information stored in a centralized property database.',
                    },
                    {
                        title: 'Buyer and property matching',
                        description:
                            'Buyer requirements were compared against available properties so relevant matches could be identified across the agent network.',
                        image: propertyMatchmakerSearch,
                        points: [
                            'Location-based property search',
                            'Buyer-to-property match identification',
                            'Agent-to-agent outreach workflows',
                        ],
                    },
                    {
                        title: 'Shared network and SaaS-ready foundation',
                        description:
                            'A shared network of buyers and properties across participating agents, with centralized data management and multi-user architecture designed to support additional agents without another per-seat SaaS subscription.',
                        points: [
                            'Shared network of buyers and properties',
                            'Centralized data management',
                            'Multi-user SaaS-ready architecture',
                        ],
                    },
                ],
            },
            {
                title: 'Outcome',
                content:
                    'The Airtable prototype was turned into a functioning SaaS MVP that gave Oran ownership of the core workflow. Instead of adding another recurring software license every time an agent joined the platform, the custom MVP moved the core workflow onto infrastructure controlled by the client.',
                items: [
                    {
                        title: 'Illustrative per-agent SaaS cost at scale',
                        description:
                            'The examples below are illustrative calculations based on an approximate $40 per agent pricing model. They are not documented actual savings from this project.',
                        tableHeaders: {
                            left: 'Agent network (illustrative)',
                            right: 'Approximate third-party SaaS cost',
                        },
                        table: [
                            { label: '10 agents', value: '~$400/month' },
                            { label: '50 agents', value: '~$2,000/month' },
                            { label: '100 agents', value: '~$4,000/month' },
                            { label: '200 agents', value: '~$8,000/month' },
                        ],
                        tableCaption:
                            'Illustrative only, based on ~$40 per agent per month. Not actual documented savings.',
                    },
                    {
                        title: 'What the $800 MVP delivered',
                        description: '',
                        points: [
                            'Ownership of the underlying software',
                            'Control over data and workflows',
                            'A foundation for a real SaaS product',
                            'Reduced vendor dependency',
                            'Near-zero marginal software licensing cost per additional agent',
                            'A platform that could evolve beyond the original Airtable prototype',
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: '4',
        slug: 'modernizing-multi-language-code-checking-tool',
        category: 'Developer Tooling • Code Quality • CI/CD',
        title: 'Modernizing a Multilanguage Code Checking Tool',
        subtitle:
            'Extending an existing developer tool with multilanguage checks, observability, Azure CI/CD, and npm package preparation.',
        description:
            'How Aizaz Studio extended a multilanguage code checking tool with observability, Azure CI/CD, and npm package preparation.',
        image: codeCheckerCover,
        imageAlt: 'Multilanguage code checking tool cover',
        coverFit: 'contain',
        client: 'Jesse Dahir-Kanehl, Kanehl Consulting LLC',
        location: 'West Salem, Oregon, USA',
        industry: 'Multi-Language Code Checking Tool',
        projectValue: 'Fixed Price · Upwork',
        projectPeriod: 'Sep 28, 2025 – Jan 8, 2026',
        deliveredBy: 'Aizaz Studio',
        seoTitle: 'Modernizing a Multilanguage Code Checking Tool | Aizaz Studio',
        seoDescription:
            'How Aizaz Studio extended a multi-language code checking tool with observability, Azure CI/CD, and npm package preparation.',
        atAGlance: [
            { value: '3', label: 'Language ecosystems', sublabel: 'Python, Node.js, .NET' },
            { value: 'Sep 28 to Jan 8', label: 'Project period', sublabel: '2025 to 2026' },
            { value: '5.0/5.0', label: 'Client rating' },
            { value: 'Developer Tooling', label: 'Code checking extension' },
        ],
        engagement: [
            { label: 'Project', value: 'Multi-Language Code Checking Tool' },
            { label: 'Client', value: 'Jesse Dahir-Kanehl, Kanehl Consulting LLC' },
            { label: 'Location', value: 'West Salem, Oregon, USA' },
            { label: 'Duration', value: 'Sep 28, 2025 – Jan 8, 2026' },
            { label: 'Engagement', value: 'Fixed Price · Upwork' },
            { label: 'Client rating', value: '★★★★★ 5.0 / 5.0' },
            { label: 'Project value', value: '$85' },
        ],
        testimonial: {
            quote:
                'Aizaz Studio demonstrated a high level of professionalism and technical expertise throughout the engagement. Their full-stack development skills, attention to detail, and adherence to best practices made them a valuable contributor to our project. The work was delivered on time and met all requirements.',
            author: 'Jesse Dahir-Kanehl',
            role: 'Kanehl Consulting LLC',
            rating: '★★★★★ 5.0 / 5.0',
            source: 'Client feedback from Upwork',
        },
        content: {
            challenge:
                'Jesse Dahir-Kanehl at Kanehl Consulting LLC already had a code checking tool but needed to expand and stabilize its capabilities across multiple programming ecosystems. The challenge was not building a new application from scratch. It involved working within an existing developer tool, identifying missing functionality, implementing additional checks, improving the existing codebase, and preparing the project for better observability and deployment.',
            solution:
                'Aizaz Studio extended the existing code checking system across Python, Node.js and .NET, cleaned up the repository structure, added OpenTelemetry instrumentation, connected Azure CI/CD, and prepared the project for npm package distribution.',
            outcome:
                'The engagement moved the existing code checking tool closer to a maintainable, observable and distributable developer product.',
        },
        cta: {
            headline: 'Have an existing developer tool that needs to be extended, stabilized or taken to production?',
            buttonText: 'Talk to Aizaz Studio',
            buttonHref: BOOKING_URL,
        },
        detailedContent: [
            {
                title: 'The Challenge',
                content:
                    'Jesse Dahir-Kanehl at Kanehl Consulting LLC already had a code checking tool but needed to expand and stabilize its capabilities across multiple programming ecosystems. The challenge was not simply building a new application from scratch. It involved working within an existing developer tool, identifying missing functionality, implementing additional checks, improving the existing codebase, and preparing the project for better observability and deployment.',
            },
            {
                title: 'The Scope',
                content: 'Our team covered language support, existing functionality, observability, delivery, and distribution.',
                items: [
                    {
                        title: 'Multi-language checks',
                        description: 'We extended checking capabilities across the ecosystems the tool needed to support.',
                        points: ['Python', 'Node.js', '.NET'],
                    },
                    {
                        title: 'Existing functionality',
                        description: 'We addressed gaps in the existing tool and expanded what it could validate.',
                        points: ['Fix missing checks', 'Implement missing functionality', 'Add additional checks'],
                    },
                    {
                        title: 'Engineering infrastructure',
                        description: 'We improved how the tool is observed, built, and delivered.',
                        points: ['OpenTelemetry', 'Azure CI/CD'],
                    },
                    {
                        title: 'Distribution',
                        description: 'We prepared the codebase for package based distribution.',
                        points: ['npm package preparation'],
                    },
                ],
            },
            {
                title: 'What We Worked On',
                content:
                    'Aizaz Studio focused on extending the existing code checking system rather than replacing it. Our engineering work spanned language specific checks, repository cleanup, observability, delivery infrastructure, and distribution preparation.',
                items: [
                    {
                        title: 'Python',
                        description:
                            'We implemented and fixed existing checks and added additional checking functionality.',
                    },
                    {
                        title: 'Node.js',
                        description: 'We implemented and fixed existing checks and expanded the available checks.',
                    },
                    {
                        title: '.NET',
                        description: 'We implemented and fixed existing checks and expanded the available checks.',
                    },
                    {
                        title: 'Codebase cleanup',
                        description:
                            'We cleaned up the project and root directory and improved the overall project structure.',
                    },
                    {
                        title: 'Observability',
                        description:
                            'We added OpenTelemetry instrumentation as part of improving visibility into the application.',
                    },
                    {
                        title: 'CI/CD',
                        description: 'We connected the project to Azure based CI/CD infrastructure.',
                    },
                    {
                        title: 'npm distribution',
                        description: 'We prepared the project for npm package distribution.',
                    },
                ],
            },
            {
                title: 'Engineering Approach',
                content: 'Our team followed a practical extension model. Inspect first, preserve what worked, and improve the tool incrementally.',
                items: [
                    {
                        title: 'How we approached the engagement',
                        description: '',
                        points: [
                            'Inspect the existing implementation and identify incomplete or missing checks.',
                            'Preserve the existing architecture where practical instead of rewriting the tool unnecessarily.',
                            'Extend language specific checks across Python, Node.js and .NET.',
                            'Clean up the repository and development structure.',
                            'Introduce OpenTelemetry for observability.',
                            'Connect the project to Azure CI/CD.',
                            'Prepare the codebase for npm package distribution.',
                        ],
                    },
                ],
            },
            {
                title: 'Engineering Workflow',
                content:
                    'Conceptual workflow for how the tool fits into a developer workflow. This is an engineering workflow illustration, not a verified production architecture diagram.',
                items: [
                    {
                        title: 'Engineering Workflow',
                        description: '',
                        points: [
                            'Developer Code',
                            '↓ Code Checking Tool',
                            '↓ Python · Node.js · .NET',
                            '↓ Results',
                            '↓ OpenTelemetry',
                            '↓ Azure CI/CD',
                            '↓ npm Package Preparation',
                        ],
                    },
                ],
            },
            {
                title: 'Outcome',
                content:
                    'Our engineering work moved the existing code checking tool closer to a maintainable, observable and distributable developer product.',
                items: [
                    {
                        title: 'What changed',
                        description: '',
                        points: [
                            'Expanded code checking capabilities across Python, Node.js and .NET',
                            'Addressed missing functionality in the existing tool',
                            'Improved project organization',
                            'Added OpenTelemetry instrumentation',
                            'Established Azure CI/CD integration',
                            'Prepared the project for npm package distribution',
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: '5',
        slug: 'designing-multi-tenant-crm-architecture',
        category: 'SaaS Architecture • CRM • Sales Enablement',
        title: 'SalesAngel: AI Sales Platform',
        subtitle: 'AI sales platform for organizations and sales teams',
        description:
            'A multi-tenant CRM, live dialer, and sales enablement platform designed for organizations and sales teams.',
        image: salesangelCover,
        imageAlt: 'SalesAngel AI sales platform cover illustration',
        client: 'Sanjay Khosla',
        location: 'Tracy, California, USA',
        industry: 'AI Sales Platform · CRM · Dialer',
        projectValue: 'Hourly · Upwork',
        projectPeriod: 'Oct 27, 2025 – Jan 29, 2026',
        deliveredBy: 'Aizaz Studio',
        seoTitle: 'SalesAngel: AI Sales Platform | Aizaz Studio',
        seoDescription:
            'How Aizaz Studio designed the SalesAngel technical foundation: multi-tenant CRM, dialer, and sales workflows.',
        atAGlance: [
            { value: 'Multi-tenant', label: 'Architecture focus', sublabel: 'Organizations & users' },
            { value: '9 days', label: 'Engagement length', sublabel: 'Oct 27, 2025 – Jan 29, 2026' },
            { value: '5.0/5.0', label: 'Client rating' },
            { value: 'CRM + Dialer', label: 'Platform scope', sublabel: 'Sales enablement SaaS' },
        ],
        engagement: [
            { label: 'Project', value: 'SalesAngel: AI Sales Platform' },
            { label: 'Client', value: 'Sanjay Khosla' },
            { label: 'Location', value: 'Tracy, California, USA' },
            { label: 'Duration', value: 'Oct 27, 2025 – Jan 29, 2026' },
            { label: 'Engagement', value: 'Hourly · Upwork' },
            { label: 'Days', value: '9' },
            { label: 'Project value', value: '$735' },
            { label: 'Client rating', value: '★★★★★ 5.0 / 5.0' },
        ],
        testimonial: {
            quote:
                'I had some hesitation working with a relatively new studio, but Aizaz Studio exceeded my expectations. Their technical expertise, out-of-the-box thinking, and direct collaboration made the engagement exceptional. Having direct access to the studio\'s technical leadership throughout the project was particularly valuable. They understood the complexity of building a scalable multi-tenant SaaS architecture and approached the work with professionalism, clarity, and a strong focus on getting things right.',
            author: 'Sanjay Khosla',
            role: '',
            rating: '★★★★★ 5.0 / 5.0',
            source: 'Client feedback from Upwork',
        },
        content: {
            challenge:
                'Sanjay Khosla was planning a multi-tenant CRM and dialer SaaS platform focused on sales and sales enablement teams. The architecture needed to support multiple organizations, multiple users, tenant isolation, CRM workflows, dialer functionality, and a maintainable application structure that could scale with the product.',
            solution:
                'Aizaz Studio reviewed the product requirements, epics and user stories, then designed a multi-tenant architecture with clear frontend, backend and data layer boundaries informed by Salesforce Force.com\'s approach to tenant-aware systems.',
            outcome:
                'The engagement established a technical foundation for a multi-tenant CRM SaaS platform and translated product requirements into an architecture designed to evolve with CRM, dialer and sales enablement capabilities.',
        },
        cta: {
            headline: 'Building a complex SaaS product? Turn your product requirements into an architecture built for scale.',
            buttonText: 'Talk to Aizaz Studio',
            buttonHref: BOOKING_URL,
        },
        detailedContent: [
            {
                title: 'Taking a Chance on a New Studio',
                content:
                    'When this engagement began, Aizaz Studio was still establishing itself as a studio brand. Sanjay Khosla took a chance on a newer engineering studio, but the engagement was structured around something larger agencies often make difficult: direct access to technical leadership and close collaboration throughout the architecture process. Rather than creating layers between the client and engineering team, Aizaz Studio worked directly through the product requirements, epics and user stories to establish the technical foundation for the proposed SaaS platform. The engagement demonstrated that a small, senior engineering studio could bring the architectural depth and product thinking normally associated with a much larger consultancy.',
            },
            {
                title: 'The Challenge',
                content:
                    'The client was planning a multi-tenant CRM and dialer SaaS platform focused on sales and sales enablement teams. The architecture needed to support multiple organizations, multiple users, tenant isolation, CRM workflows, dialer functionality, sales enablement workflows, scalable SaaS architecture, and a maintainable application structure. The client supplied detailed epics and user stories and wanted the architecture to take inspiration from Salesforce Force.com\'s approach to multi-tenant systems.',
                items: [
                    {
                        title: 'Platform capabilities in scope',
                        description: 'The architecture had to account for the full product vision across CRM, dialer and sales enablement workflows.',
                        points: [
                            'Multiple organizations and users',
                            'Tenant isolation',
                            'CRM workflows',
                            'Dialer functionality',
                            'Sales enablement workflows',
                            'Scalable SaaS architecture',
                            'Maintainable application structure',
                        ],
                    },
                ],
            },
            {
                title: 'Our Approach',
                content: 'Our team structured the engagement around five architectural phases, from requirements through long-term product evolution.',
                items: [
                    {
                        title: '01 Requirements',
                        description:
                            'We reviewed the product requirements, epics and user stories to understand the intended CRM, dialer and sales enablement workflows.',
                    },
                    {
                        title: '02 Multi-Tenant Architecture',
                        description:
                            'We designed the application around multiple organizations and users, with tenant-aware architecture as a core consideration.',
                    },
                    {
                        title: '03 Application Architecture',
                        description:
                            'We established clear boundaries between frontend, backend services and data layers.',
                    },
                    {
                        title: '04 Scalability',
                        description:
                            'We considered architectural patterns required for a SaaS platform that could grow across organizations, users and product capabilities.',
                    },
                    {
                        title: '05 Product Evolution',
                        description:
                            'We designed the foundation so CRM, dialer and sales enablement capabilities could evolve without requiring a complete architectural rewrite.',
                    },
                ],
            },
            {
                title: 'Technology & Architecture Context',
                content:
                    'These technologies were part of the project\'s technical requirements and architecture context. They do not imply that every technology was necessarily deployed to production.',
                items: [
                    {
                        title: 'Frontend',
                        description: '',
                        points: ['React', 'Next.js', 'Chakra UI'],
                    },
                    {
                        title: 'Backend',
                        description: '',
                        points: ['Node.js', 'Python'],
                    },
                    {
                        title: 'Data',
                        description: '',
                        points: ['PostgreSQL', 'MongoDB'],
                    },
                    {
                        title: 'Development / AI Tooling',
                        description: '',
                        points: ['Bolt', 'Cursor', 'Claude'],
                    },
                    {
                        title: 'Architectural Reference',
                        description: 'Multi-tenant design patterns informed by Salesforce Force.com.',
                        points: ['Salesforce Force.com'],
                    },
                ],
            },
            {
                title: 'Conceptual Multi-Tenant Architecture',
                content:
                    'Conceptual architecture for how organizations, tenant context, application services and data layers relate within the proposed platform. This is a conceptual diagram, not a verified production architecture.',
                items: [
                    {
                        title: 'Conceptual Multi-Tenant Architecture',
                        description: '',
                        image: salesangelArchitecture,
                        points: [
                            'Organizations',
                            '↓ Tenant Context',
                            '↓ Authentication / Authorization',
                            '↓ Multi-Tenant Application Layer',
                            '↓ CRM Services · Dialer Services · Sales Enablement',
                            '↓ Data Layer (PostgreSQL / MongoDB)',
                        ],
                    },
                ],
            },
            {
                title: 'Product Context',
                content:
                    'The following visuals reflect the CRM, dialer and sales enablement capabilities defined in the product requirements. They illustrate the platform context the architecture was designed to support.',
                items: [
                    {
                        title: 'Sales dashboard and performance tracking',
                        description: 'Dashboard workflows for sales teams, call activity and performance visibility.',
                        image: salesangelDashboard,
                    },
                    {
                        title: 'AI agent monitoring',
                        description: 'Sales enablement workflows including AI-assisted agent monitoring and coaching context.',
                        image: salesangelAiAgents,
                    },
                    {
                        title: 'CRM contact and activity management',
                        description: 'CRM workflows for contacts, cadences, opportunities and activity timelines.',
                        image: salesangelCrmContacts,
                    },
                    {
                        title: 'Live dialer workspace',
                        description: 'Dialer functionality for live calls, disposition handling and interaction management.',
                        image: salesangelLiveDialer,
                    },
                ],
            },
            {
                title: 'Outcome',
                content:
                    'Our engineering work established a technical foundation designed to support the client\'s multi-tenant CRM SaaS vision without claiming full product delivery in this engagement.',
                items: [
                    {
                        title: 'What the architecture engagement delivered',
                        description: '',
                        points: [
                            'Established a technical foundation for a multi-tenant CRM SaaS platform',
                            'Translated product epics and user stories into an actionable architecture',
                            'Addressed multi-organization and multi-user requirements',
                            'Defined application and data layer boundaries',
                            'Created an architecture designed to evolve with the product',
                            'Provided direct technical collaboration throughout the engagement',
                        ],
                    },
                ],
            },
        ],
    },
];
