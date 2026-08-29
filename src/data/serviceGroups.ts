import { servicePages, type SeoPage } from './seoPages';

export type ServiceGroupId = 'ai' | 'product' | 'erp' | 'cloud';

export interface ServiceGroup {
  id: ServiceGroupId;
  n: string;
  title: string;
  lede: string;
  slugs: string[];
}

/** Human-facing capability groups — all granular SEO service URLs remain linked. */
export const serviceGroups: ServiceGroup[] = [
  {
    id: 'ai',
    n: '01',
    title: 'AI & Automation',
    lede: 'Agents, workflows, and decision systems wired to the tools your team already uses.',
    slugs: [
      'ai-automation-systems',
      'ai-agent-development',
      'ai-chatbot-development',
      'ai-workflow-automation',
      'llm-app-development',
      'business-process-automation',
    ],
  },
  {
    id: 'product',
    n: '02',
    title: 'Product / SaaS Engineering',
    lede: 'MVPs and production platforms — auth, APIs, billing, and the product surface users hit.',
    slugs: [
      'web-app-saas-development',
      'saas-mvp-development',
      'b2b-saas-development',
      'backend-engineering',
      'platform-engineering',
      'project-rescue',
      'technical-audit',
      'technical-video-product-enablement',
      'trading-technology-systems',
    ],
  },
  {
    id: 'erp',
    n: '03',
    title: 'ERP & Integrations',
    lede: 'NetSuite, CRM, and system-of-record work so data stops living in five places.',
    slugs: [
      'netsuite-erp-automation',
      'netsuite-integration',
      'api-integration',
      'crm-integration',
    ],
  },
  {
    id: 'cloud',
    n: '04',
    title: 'Cloud & Production Engineering',
    lede: 'AWS environments, CI/CD, and observability so shipping stays safe after launch.',
    slugs: [
      'aws-devops',
      'aws-cloud-engineering',
      'devops-consulting',
      'cloud-migration',
    ],
  },
];

const bySlug = new Map(servicePages.map((page) => [page.slug, page]));

export function servicesForGroup(group: ServiceGroup): SeoPage[] {
  return group.slugs
    .map((slug) => bySlug.get(slug))
    .filter((page): page is SeoPage => Boolean(page));
}

export function ungroupedServices(): SeoPage[] {
  const grouped = new Set(serviceGroups.flatMap((g) => g.slugs));
  return servicePages.filter((page) => !grouped.has(page.slug));
}
