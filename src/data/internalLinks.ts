/**
 * Typed internal-link relationships for SEO topic clusters.
 * Prefer semantic relevance over volume. Cap consumers at 2–4 links per group.
 */

import { isNonIndexableContentSlug } from '../lib/blog-utils';

export type RelationGroupTitle =
  | 'Related Services'
  | 'Relevant Industries'
  | 'Related Technologies'
  | 'Case Studies'
  | 'Further Reading'
  | 'Related Pages';

export interface RelatedLink {
  href: string;
  label: string;
  description?: string;
}

export interface RelatedGroup {
  title: RelationGroupTitle;
  links: RelatedLink[];
}

/** Slug-keyed relations (services, industries, technologies, case studies, blog). */
export interface PageRelations {
  services?: string[];
  industries?: string[];
  technologies?: string[];
  caseStudies?: string[];
  articles?: string[];
  pages?: RelatedLink[];
}

const SERVICE_LABELS: Record<string, string> = {
  'ai-automation-systems': 'AI Automation Systems',
  'web-app-saas-development': 'Web App & SaaS Development',
  'aws-devops': 'AWS & DevOps',
  'netsuite-erp-automation': 'NetSuite ERP Automation',
  'business-process-automation': 'Business Process Automation',
  'trading-technology-systems': 'Trading Technology Systems',
  'technical-video-product-enablement': 'Technical Video Enablement',
  'project-rescue': 'Project Rescue',
  'technical-audit': 'Technical Audit',
  'ai-agent-development': 'AI Agent Development',
  'ai-chatbot-development': 'AI Chatbot Development',
  'ai-workflow-automation': 'AI Workflow Automation',
  'llm-app-development': 'LLM App Development',
  'saas-mvp-development': 'SaaS MVP Development',
  'b2b-saas-development': 'B2B SaaS Development',
  'backend-engineering': 'Backend Engineering',
  'aws-cloud-engineering': 'AWS Cloud Engineering',
  'devops-consulting': 'DevOps Consulting',
  'cloud-migration': 'Cloud Migration',
  'platform-engineering': 'Platform Engineering',
  'api-integration': 'API Integration',
  'crm-integration': 'CRM Integration',
  'netsuite-integration': 'NetSuite Integration',
};

const INDUSTRY_LABELS: Record<string, string> = {
  'saas-startups': 'SaaS Startups',
  'ecommerce-wholesale': 'Ecommerce & Wholesale',
  'healthtech-clinics': 'Clinics & Healthtech',
  'trading-businesses': 'Trading Businesses',
  'netsuite-users': 'NetSuite Users',
  agencies: 'Agencies',
  startups: 'Startups',
  'b2b-saas': 'B2B SaaS',
  'operations-teams': 'Operations Teams',
  healthtech: 'Healthtech',
  fintech: 'Fintech',
  'ecommerce-operations': 'Ecommerce Operations',
  logistics: 'Logistics',
  'professional-services': 'Professional Services',
};

const TECH_LABELS: Record<string, string> = {
  'nodejs-development': 'Node.js',
  'python-development': 'Python',
  'react-development': 'React',
  'nextjs-development': 'Next.js',
  'nestjs-development': 'NestJS',
  'fastapi-development': 'FastAPI',
  aws: 'AWS',
  postgresql: 'PostgreSQL',
  supabase: 'Supabase',
  openai: 'OpenAI',
  langchain: 'LangChain',
  stripe: 'Stripe',
  twilio: 'Twilio',
};

const CASE_LABELS: Record<string, string> = {
  '1archiver-compliance-platform': '1Archiver Compliance Platform',
  'investorsgonewild-investment-platform': 'InvestorsGoneWild Investment Platform',
  'propertymatchmaker-real-estate-saas': 'PropertyMatchmaker Real Estate SaaS',
  'modernizing-multi-language-code-checking-tool': 'Multi-Language Code Checking Tool',
  'designing-multi-tenant-crm-architecture': 'Multi-Tenant CRM Architecture',
};

const ARTICLE_LABELS: Record<string, string> = {
  'ai-automation-workflows-for-operations-teams': 'AI Automation Workflows for Operations',
  'netsuite-shopify-integration-pitfalls': 'NetSuite–Shopify Integration Pitfalls',
  'building-production-ready-saas-mvp': 'Building a Production-Ready SaaS MVP',
  'identify-workflows-worth-automating-with-ai': 'Workflows Worth Automating with AI',
  'ai-agent-vs-chatbot-for-business': 'AI Agent vs Chatbot for Business',
  'how-much-does-ai-automation-cost': 'How Much Does AI Automation Cost',
  'rescue-a-half-built-saas-product': 'Rescue a Half-Built SaaS Product',
  'when-to-move-from-vercel-to-aws': 'When to Move from Vercel to AWS',
  'cicd-checklist-early-stage-saas': 'CI/CD Checklist for Early-Stage SaaS',
  'netsuite-integration-mistakes-growing-operations': 'NetSuite Integration Mistakes',
};

function mapSlugs(
  slugs: string[] | undefined,
  prefix: string,
  labels: Record<string, string>,
  limit = 4,
): RelatedLink[] {
  if (!slugs?.length) return [];
  const filtered =
    prefix === '/blog' ? slugs.filter((slug) => !isNonIndexableContentSlug(slug)) : slugs;
  return filtered.slice(0, limit).map((slug) => ({
    href: `${prefix}/${slug}`,
    label: labels[slug] ?? slug,
  }));
}

/** Extra relations beyond existing relatedSlugs on SeoPage (industries, tech, proof, reading). */
export const serviceClusterExtras: Record<string, PageRelations> = {
  'ai-automation-systems': {
    industries: ['operations-teams', 'b2b-saas', 'saas-startups'],
    technologies: ['openai', 'langchain', 'python-development'],
    caseStudies: ['designing-multi-tenant-crm-architecture'],
    articles: ['ai-automation-workflows-for-operations-teams', 'identify-workflows-worth-automating-with-ai'],
    pages: [{ href: '/ai-systems-sprint', label: 'AI Systems Sprint' }],
  },
  'ai-workflow-automation': {
    industries: ['operations-teams', 'ecommerce-operations'],
    technologies: ['openai', 'langchain'],
    articles: ['identify-workflows-worth-automating-with-ai', 'how-much-does-ai-automation-cost'],
    pages: [{ href: '/ai-systems-sprint', label: 'AI Systems Sprint' }],
  },
  'ai-agent-development': {
    industries: ['b2b-saas', 'operations-teams'],
    technologies: ['openai', 'langchain', 'python-development'],
    caseStudies: ['designing-multi-tenant-crm-architecture'],
    articles: ['ai-agent-vs-chatbot-for-business'],
  },
  'ai-chatbot-development': {
    industries: ['b2b-saas', 'healthtech'],
    technologies: ['openai', 'twilio'],
    articles: ['ai-agent-vs-chatbot-for-business'],
  },
  'llm-app-development': {
    industries: ['saas-startups', 'b2b-saas'],
    technologies: ['openai', 'langchain', 'python-development'],
    articles: ['building-production-ready-saas-mvp'],
  },
  'web-app-saas-development': {
    industries: ['saas-startups', 'b2b-saas', 'startups'],
    technologies: ['react-development', 'nextjs-development', 'nodejs-development'],
    caseStudies: ['propertymatchmaker-real-estate-saas', 'designing-multi-tenant-crm-architecture'],
    articles: ['building-production-ready-saas-mvp', 'cicd-checklist-early-stage-saas'],
  },
  'saas-mvp-development': {
    industries: ['startups', 'saas-startups'],
    technologies: ['nextjs-development', 'supabase', 'stripe'],
    caseStudies: ['propertymatchmaker-real-estate-saas'],
    articles: ['building-production-ready-saas-mvp', 'rescue-a-half-built-saas-product'],
  },
  'b2b-saas-development': {
    industries: ['b2b-saas', 'saas-startups'],
    technologies: ['nestjs-development', 'postgresql', 'react-development'],
    caseStudies: ['designing-multi-tenant-crm-architecture', 'investorsgonewild-investment-platform'],
  },
  'backend-engineering': {
    industries: ['b2b-saas', 'fintech'],
    technologies: ['nodejs-development', 'nestjs-development', 'postgresql'],
    caseStudies: ['modernizing-multi-language-code-checking-tool'],
  },
  'aws-devops': {
    industries: ['saas-startups', 'b2b-saas'],
    technologies: ['aws', 'postgresql'],
    caseStudies: ['1archiver-compliance-platform'],
    articles: ['when-to-move-from-vercel-to-aws', 'cicd-checklist-early-stage-saas'],
  },
  'aws-cloud-engineering': {
    industries: ['saas-startups', 'fintech'],
    technologies: ['aws'],
    articles: ['when-to-move-from-vercel-to-aws'],
  },
  'devops-consulting': {
    industries: ['saas-startups', 'b2b-saas'],
    technologies: ['aws'],
    articles: ['cicd-checklist-early-stage-saas'],
  },
  'cloud-migration': {
    industries: ['saas-startups', 'operations-teams'],
    technologies: ['aws'],
    articles: ['when-to-move-from-vercel-to-aws'],
  },
  'platform-engineering': {
    industries: ['b2b-saas', 'saas-startups'],
    technologies: ['aws'],
    caseStudies: ['1archiver-compliance-platform'],
  },
  'business-process-automation': {
    industries: ['operations-teams', 'ecommerce-operations', 'netsuite-users'],
    technologies: ['openai', 'python-development'],
    articles: ['ai-automation-workflows-for-operations-teams'],
    pages: [{ href: '/ai-systems-sprint', label: 'AI Systems Sprint' }],
  },
  'netsuite-erp-automation': {
    industries: ['netsuite-users', 'ecommerce-wholesale', 'ecommerce-operations'],
    technologies: ['nodejs-development', 'python-development'],
    articles: ['netsuite-shopify-integration-pitfalls', 'netsuite-integration-mistakes-growing-operations'],
  },
  'netsuite-integration': {
    industries: ['netsuite-users', 'ecommerce-wholesale'],
    services: ['api-integration', 'crm-integration'],
    articles: ['netsuite-shopify-integration-pitfalls', 'netsuite-integration-mistakes-growing-operations'],
  },
  'api-integration': {
    industries: ['ecommerce-operations', 'operations-teams'],
    technologies: ['nodejs-development', 'python-development'],
    articles: ['netsuite-shopify-integration-pitfalls'],
  },
  'crm-integration': {
    industries: ['b2b-saas', 'operations-teams'],
    caseStudies: ['designing-multi-tenant-crm-architecture'],
    technologies: ['nodejs-development'],
  },
  'project-rescue': {
    industries: ['saas-startups', 'startups'],
    articles: ['rescue-a-half-built-saas-product'],
    pages: [{ href: '/engagement-models', label: 'Engagement Models' }],
  },
  'technical-audit': {
    industries: ['saas-startups', 'b2b-saas'],
    articles: ['rescue-a-half-built-saas-product', 'when-to-move-from-vercel-to-aws'],
  },
  'trading-technology-systems': {
    industries: ['trading-businesses', 'fintech'],
    technologies: ['python-development', 'react-development'],
    caseStudies: ['investorsgonewild-investment-platform'],
  },
  'technical-video-product-enablement': {
    industries: ['saas-startups', 'b2b-saas'],
    services: ['web-app-saas-development', 'saas-mvp-development'],
  },
};

export const industryClusterExtras: Record<string, PageRelations> = {
  'saas-startups': {
    services: ['saas-mvp-development', 'web-app-saas-development', 'ai-automation-systems'],
    technologies: ['nextjs-development', 'aws', 'stripe'],
    caseStudies: ['propertymatchmaker-real-estate-saas'],
    articles: ['building-production-ready-saas-mvp'],
    pages: [{ href: '/ai-systems-sprint', label: 'AI Systems Sprint' }],
  },
  'b2b-saas': {
    services: ['b2b-saas-development', 'web-app-saas-development', 'crm-integration'],
    caseStudies: ['designing-multi-tenant-crm-architecture'],
    technologies: ['nestjs-development', 'postgresql'],
  },
  startups: {
    services: ['saas-mvp-development', 'web-app-saas-development', 'technical-audit'],
    articles: ['building-production-ready-saas-mvp', 'rescue-a-half-built-saas-product'],
  },
  'operations-teams': {
    services: ['business-process-automation', 'ai-automation-systems', 'ai-workflow-automation'],
    articles: ['ai-automation-workflows-for-operations-teams', 'identify-workflows-worth-automating-with-ai'],
    pages: [{ href: '/ai-systems-sprint', label: 'AI Systems Sprint' }],
  },
  'ecommerce-wholesale': {
    services: ['netsuite-integration', 'api-integration', 'business-process-automation'],
    industries: ['netsuite-users', 'ecommerce-operations'],
    articles: ['netsuite-shopify-integration-pitfalls'],
  },
  'ecommerce-operations': {
    services: ['business-process-automation', 'netsuite-integration', 'api-integration'],
    articles: ['netsuite-shopify-integration-pitfalls'],
  },
  'netsuite-users': {
    services: ['netsuite-integration', 'netsuite-erp-automation', 'api-integration'],
    articles: ['netsuite-shopify-integration-pitfalls', 'netsuite-integration-mistakes-growing-operations'],
  },
  'healthtech-clinics': {
    services: ['ai-automation-systems', 'business-process-automation', 'web-app-saas-development'],
    pages: [{ href: '/ai-systems-sprint', label: 'AI Systems Sprint' }],
  },
  healthtech: {
    services: ['ai-automation-systems', 'web-app-saas-development', 'aws-devops'],
  },
  fintech: {
    services: ['web-app-saas-development', 'backend-engineering', 'aws-cloud-engineering'],
    caseStudies: ['investorsgonewild-investment-platform'],
    technologies: ['python-development', 'postgresql'],
  },
  'trading-businesses': {
    services: ['trading-technology-systems', 'web-app-saas-development'],
    caseStudies: ['investorsgonewild-investment-platform'],
  },
  agencies: {
    services: ['web-app-saas-development', 'ai-automation-systems', 'technical-video-product-enablement'],
  },
  logistics: {
    services: ['business-process-automation', 'api-integration', 'netsuite-integration'],
  },
  'professional-services': {
    services: ['business-process-automation', 'ai-automation-systems', 'web-app-saas-development'],
    caseStudies: ['1archiver-compliance-platform'],
  },
};

export const technologyClusterExtras: Record<string, PageRelations> = {
  openai: {
    services: ['ai-automation-systems', 'ai-agent-development', 'llm-app-development'],
    industries: ['operations-teams', 'b2b-saas'],
    pages: [{ href: '/ai-systems-sprint', label: 'AI Systems Sprint' }],
    articles: ['ai-agent-vs-chatbot-for-business'],
  },
  langchain: {
    services: ['llm-app-development', 'ai-agent-development', 'ai-automation-systems'],
    technologies: ['openai', 'python-development'],
  },
  'python-development': {
    services: ['ai-automation-systems', 'backend-engineering', 'llm-app-development'],
    caseStudies: ['investorsgonewild-investment-platform'],
  },
  'nodejs-development': {
    services: ['backend-engineering', 'api-integration', 'web-app-saas-development'],
  },
  'react-development': {
    services: ['web-app-saas-development', 'saas-mvp-development'],
    caseStudies: ['propertymatchmaker-real-estate-saas'],
  },
  'nextjs-development': {
    services: ['saas-mvp-development', 'web-app-saas-development'],
    articles: ['building-production-ready-saas-mvp'],
  },
  'nestjs-development': {
    services: ['b2b-saas-development', 'backend-engineering'],
    caseStudies: ['designing-multi-tenant-crm-architecture'],
  },
  'fastapi-development': {
    services: ['backend-engineering', 'llm-app-development', 'ai-automation-systems'],
  },
  aws: {
    services: ['aws-devops', 'aws-cloud-engineering', 'cloud-migration'],
    caseStudies: ['1archiver-compliance-platform'],
    articles: ['when-to-move-from-vercel-to-aws'],
  },
  postgresql: {
    services: ['backend-engineering', 'b2b-saas-development'],
  },
  supabase: {
    services: ['saas-mvp-development', 'web-app-saas-development'],
  },
  stripe: {
    services: ['saas-mvp-development', 'b2b-saas-development'],
  },
  twilio: {
    services: ['ai-chatbot-development', 'crm-integration', 'ai-automation-systems'],
  },
};

export const caseStudyCluster: Record<string, PageRelations> = {
  '1archiver-compliance-platform': {
    services: ['aws-devops', 'backend-engineering', 'platform-engineering'],
    industries: ['professional-services'],
    technologies: ['aws', 'nodejs-development'],
  },
  'investorsgonewild-investment-platform': {
    services: ['web-app-saas-development', 'backend-engineering', 'trading-technology-systems'],
    industries: ['fintech', 'trading-businesses'],
    technologies: ['python-development', 'react-development', 'postgresql'],
  },
  'propertymatchmaker-real-estate-saas': {
    services: ['saas-mvp-development', 'web-app-saas-development', 'b2b-saas-development'],
    industries: ['saas-startups', 'b2b-saas'],
    technologies: ['react-development', 'nextjs-development'],
  },
  'modernizing-multi-language-code-checking-tool': {
    services: ['backend-engineering', 'devops-consulting', 'technical-audit'],
    industries: ['saas-startups'],
    technologies: ['nodejs-development', 'aws'],
  },
  'designing-multi-tenant-crm-architecture': {
    services: ['b2b-saas-development', 'crm-integration', 'ai-agent-development'],
    industries: ['b2b-saas', 'saas-startups'],
    technologies: ['nestjs-development', 'postgresql', 'react-development'],
  },
};

export const articleCluster: Record<string, PageRelations> = {
  'ai-automation-workflows-for-operations-teams': {
    services: ['ai-automation-systems', 'business-process-automation', 'ai-workflow-automation'],
    industries: ['operations-teams'],
    pages: [{ href: '/ai-systems-sprint', label: 'AI Systems Sprint' }],
  },
  'identify-workflows-worth-automating-with-ai': {
    services: ['ai-workflow-automation', 'ai-automation-systems'],
    pages: [{ href: '/ai-systems-sprint', label: 'AI Systems Sprint' }],
  },
  'ai-agent-vs-chatbot-for-business': {
    services: ['ai-agent-development', 'ai-chatbot-development'],
    technologies: ['openai'],
  },
  'how-much-does-ai-automation-cost': {
    services: ['ai-automation-systems'],
    pages: [
      { href: '/ai-systems-sprint', label: 'AI Systems Sprint' },
      { href: '/engagement-models', label: 'Engagement Models' },
    ],
  },
  'building-production-ready-saas-mvp': {
    services: ['saas-mvp-development', 'web-app-saas-development'],
    industries: ['saas-startups', 'startups'],
    caseStudies: ['propertymatchmaker-real-estate-saas'],
  },
  'rescue-a-half-built-saas-product': {
    services: ['project-rescue', 'technical-audit'],
    industries: ['saas-startups'],
  },
  'when-to-move-from-vercel-to-aws': {
    services: ['aws-cloud-engineering', 'cloud-migration', 'aws-devops'],
    technologies: ['aws'],
  },
  'cicd-checklist-early-stage-saas': {
    services: ['devops-consulting', 'aws-devops'],
    industries: ['saas-startups'],
  },
  'netsuite-shopify-integration-pitfalls': {
    services: ['netsuite-integration', 'api-integration'],
    industries: ['netsuite-users', 'ecommerce-wholesale'],
  },
  'netsuite-integration-mistakes-growing-operations': {
    services: ['netsuite-integration', 'netsuite-erp-automation'],
    industries: ['netsuite-users', 'operations-teams'],
  },
};

export const commercialPageCluster: Record<string, PageRelations> = {
  'ai-systems-sprint': {
    services: ['ai-automation-systems', 'ai-workflow-automation', 'business-process-automation'],
    industries: ['operations-teams', 'saas-startups'],
    articles: ['identify-workflows-worth-automating-with-ai', 'how-much-does-ai-automation-cost'],
    pages: [
      { href: '/compare/ai-systems-sprint-vs-traditional-automation', label: 'Sprint vs Traditional Automation' },
      { href: '/engagement-models', label: 'Engagement Models' },
    ],
  },
};

function relationsToGroups(rel: PageRelations, opts?: { excludeHref?: string }): RelatedGroup[] {
  const exclude = opts?.excludeHref;
  const groups: RelatedGroup[] = [];

  const push = (title: RelationGroupTitle, links: RelatedLink[]) => {
    const filtered = links.filter((l) => l.href !== exclude).slice(0, 4);
    if (filtered.length) groups.push({ title, links: filtered });
  };

  push('Related Services', mapSlugs(rel.services, '/services', SERVICE_LABELS));
  push('Relevant Industries', mapSlugs(rel.industries, '/for', INDUSTRY_LABELS));
  push('Related Technologies', mapSlugs(rel.technologies, '/technologies', TECH_LABELS));
  push('Case Studies', mapSlugs(rel.caseStudies, '/case-studies', CASE_LABELS));

  const further = [
    ...mapSlugs(rel.articles, '/blog', ARTICLE_LABELS),
    ...(rel.pages ?? []),
  ].filter((link) => {
    if (!link.href.startsWith('/blog/')) return true;
    const slug = link.href.slice('/blog/'.length);
    return !isNonIndexableContentSlug(slug);
  });
  push('Further Reading', further);

  return groups.slice(0, 3);
}

export function getServiceRelatedGroups(slug: string, existingServiceSlugs: string[] = []): RelatedGroup[] {
  const extras = serviceClusterExtras[slug] ?? {};
  // Prefer SeoPage.relatedSlugs for services; extras fill other clusters.
  const fromExisting = mapSlugs(existingServiceSlugs, '/services', SERVICE_LABELS);
  const groups = relationsToGroups(extras, { excludeHref: `/services/${slug}` });
  if (fromExisting.length) {
    return [{ title: 'Related Services', links: fromExisting }, ...groups.filter((g) => g.title !== 'Related Services')].slice(0, 3);
  }
  return groups;
}

export function getIndustryRelatedGroups(slug: string, existingServiceSlugs: string[] = []): RelatedGroup[] {
  const mapped = industryClusterExtras[slug] ?? {};
  const merged: PageRelations = {
    ...mapped,
    services: existingServiceSlugs.length ? existingServiceSlugs : mapped.services,
  };
  return relationsToGroups(merged, { excludeHref: `/for/${slug}` });
}

export function getTechnologyRelatedGroups(slug: string): RelatedGroup[] {
  return relationsToGroups(technologyClusterExtras[slug] ?? {}, { excludeHref: `/technologies/${slug}` });
}

export function getCaseStudyRelatedGroups(slug: string): RelatedGroup[] {
  return relationsToGroups(caseStudyCluster[slug] ?? {}, { excludeHref: `/case-studies/${slug}` });
}

export function getArticleRelatedGroups(slug: string): RelatedGroup[] {
  return relationsToGroups(articleCluster[slug] ?? {}, { excludeHref: `/blog/${slug}` });
}

export function getCommercialRelatedGroups(key: string): RelatedGroup[] {
  return relationsToGroups(commercialPageCluster[key] ?? {});
}
