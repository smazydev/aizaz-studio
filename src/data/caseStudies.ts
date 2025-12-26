import type { ImageMetadata } from 'astro';
import archiverCover from '../assets/1archiver-casestudy-cover.png';
import archiverBg1 from '../assets/1archiver-bg-dashboard-1.png';
import archiverBg2 from '../assets/1archiver-bg-dashboard-2.png';
import igwCover from '../assets/igw-casestudy-cover.png';
import igwBg1 from '../assets/igw-bg-dashboard-1.png';
import igwBg2 from '../assets/igw-bg-dashboard-2.png';

export interface CaseStudy {
    id: string;
    slug: string;
    category: string;
    title: string;
    subtitle: string;
    description: string;
    image: ImageMetadata;
    logo?: string;
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
        content: string; // Can be markdown-like or just text
        items?: {
            title: string;
            description: string;
            points?: string[];
            image?: ImageMetadata;
        }[];
    }[];
    gallery?: string[];
    backgroundImages?: ImageMetadata[];
}

export const caseStudies: CaseStudy[] = [
    {
        id: '1',
        slug: '1archiver-compliance-platform',
        category: 'Compliance • eDiscovery • Data Retention',
        title: '1Archiver — Building a Compliance-Grade Email Archiving Platform',
        subtitle: 'Enterprise-focused Email Archiving & Compliance Platform',
        description: 'A compliance-ready platform built for scale, security, and verification. Designed to handle tens of terabytes of email data with zero tolerance for data loss.',
        image: archiverCover,
        backgroundImages: [
            archiverBg1,
            archiverBg2,
            archiverBg1,
            archiverBg1,
            archiverBg1,
            archiverBg1
        ],
        content: {
            challenge: 'Enterprises don’t just need to store emails — they need to prove trust. Most archiving solutions are fragile, insecure, or collapse under real-world data volumes. The challenge was to build a platform that is safe, secure, fast, and defensible in court, capable of handling tens of terabytes of data, multiple providers (IMAP, Exchange, Gmail), and complex legal holds.',
            solution: 'We treated this as a systems engineering problem, not a CRUD app. We designed for compliance first by separating responsibilities into Connectors (edge), Workers (integrity), and a Compliance Core (system of record). We made security a default with immutable data and tamper-evident logs, and built for horizontal scale using streaming ingestion and decoupled search indexes.',
            outcome: '1Archiver is now a compliance-ready platform, not just an MVP. It features secure verifiable email ingestion, clear separation of concerns, and scalable search across massive datasets. The architecture is ready for on-prem and cloud deployments and is built to pass audits, ensuring the system is defensible and reliable.',
        },
        detailedContent: [
            {
                title: "The Problem",
                content: "Most archiving solutions fail in one of three ways: they mix business logic with ingestion, treat security as an afterthought, or collapse under real-world data volumes. 1Archiver started with a simple question: 'What if we built an email archiver the way it should actually be built — safe, secure, fast, and defensible in court?'",
                items: [
                    {
                        title: "Architectural Challenges",
                        description: "The platform needed to handle tens of terabytes of email data, multiple providers (IMAP, Exchange, Gmail), and complex legal holds with zero tolerance for data loss."
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
                            "Workers (The Muscle): Responsible for data integrity (SHA-256 hashing, Deduplication, Secure blob storage).",
                            "Compliance Core (System of Record): Authoritative source for retention policies, legal holds, audit logs, and access control."
                        ]
                    },
                    {
                        title: "2. Security Was a Default, Not a Feature",
                        description: "Every decision was made assuming hostile environments:",
                        image: archiverBg2,
                        points: [
                            "Immutable data once ingested",
                            "Tamper-evident audit logs",
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
                            "Metadata-driven schemas to support future features without migrations"
                        ]
                    },
                    {
                        title: "4. Technology Choices That Serve the System",
                        description: "We intentionally avoided 'over-engineering' while choosing tools that survive enterprise workloads:",
                        points: [
                            "Use battle-tested components where correctness matters",
                            "Favor explicit data flows over hidden magic",
                            "Design schemas assuming audits, not demos"
                        ]
                    }
                ]
            },
            {
                title: "The Outcome",
                content: "1Archiver is now a compliance-ready platform, not just an MVP.",
                items: [
                    {
                        title: "Key Achievements",
                        description: "",
                        points: [
                            "Secure, verifiable email ingestion",
                            "Clear separation of concerns",
                            "Scalable search across massive datasets",
                            "Architecture ready for on-prem and cloud deployments",
                            "Built to pass audits, not just demos"
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        slug: 'investorsgonewild-investment-platform',
        category: 'FinTech • Investment Intelligence • Financial Analytics',
        title: 'InvestorsGoneWild — Building a Unified, Metadata-Driven Investment Platform',
        subtitle: 'Multi-Asset Investment Intelligence Platform',
        description: 'A unified platform where investors can analyze, compare, and act across multiple asset classes — stocks, crypto, and real estate — without being locked into rigid workflows.',
        image: igwCover,
        content: {
            challenge: 'Modern investors suffer from fragmentation. Real estate, stocks, and crypto data live in isolated systems. The challenge was to create a single platform to unify these fundamentally different asset classes without turning the platform brittle, while keeping everything customizable as strategies evolve.',
            solution: 'We treated InvestorsGoneWild as a financial operating system. We designed a layered abstraction for multi-asset support, an integration-first architecture connecting Bloomberg, Gemini, and BatchData, and adopted a metadata-driven approach inspired by Salesforce to allow dynamic configuration of entities and UIs.',
            outcome: 'InvestorsGoneWild emerged as a unified investment intelligence platform. It supports multiple asset classes, maintains clean separation between data providers and logic, and offers metadata-driven customization. It proves that financial tooling doesn’t need to be rigid to be powerful.',
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
                        title: "1. A One-Stop Shop — Without a Monolith",
                        description: "We designed a layered abstraction that allowed each data source to remain independent while still being queryable under a unified experience.",
                        image: igwBg1,
                        points: [
                            "Stocks & Commodities — market data, performance, trends",
                            "Crypto — volatility-aware analytics and signals",
                            "Real Estate — batch data ingestion and regional insights"
                        ]
                    },
                    {
                        title: "2. Integration-First Architecture",
                        description: "Each integration was treated as a data provider, not a dependency. Loosely coupled and replaceable.",
                        image: igwBg2,
                        points: [
                            "Bloomberg Terminal for market-grade financial data",
                            "Gemini for AI-powered investment recommendations",
                            "BatchData for real estate analytics"
                        ]
                    },
                    {
                        title: "3. Metadata-Driven by Design",
                        description: "Inspired by Salesforce, we built a system where entities, fields, and behaviors are defined by metadata, not hard-coded.",
                        points: [
                            "Custom dashboards per investor",
                            "Strategy-specific views without code changes",
                            "Rapid iteration as new asset classes were added"
                        ]
                    },
                    {
                        title: "4. Designing for Power Users Without Overwhelm",
                        description: "We focused on progressive disclosure of data and consistent interaction patterns across asset types.",
                        points: [
                            "Progressive disclosure of data",
                            "Clean, CRM-style layouts",
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
                            "Multi-asset support under a single system",
                            "Clean separation between data providers and core logic",
                            "Metadata-driven customization inspired by enterprise CRMs",
                            "AI-assisted insights layered on top of trusted data sources"
                        ]
                    }
                ]
            }
        ]
    }
];
