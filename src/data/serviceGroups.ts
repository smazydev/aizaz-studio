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
    lede: 'Reduce repetitive work and response times with AI systems that use your data, follow your rules, and connect to the tools your team already relies on.',
    slugs: [
      'ai-automation-systems',
      'ai-integration',
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
    lede: 'Launch a new product or strengthen an existing one with senior engineers who own the architecture, user experience, backend, and path to production.',
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
    lede: 'Keep orders, inventory, customers, and finance in sync by connecting NetSuite, CRMs, commerce platforms, warehouses, and custom software.',
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
    lede: 'Replace fragile deployments and production guesswork with secure cloud infrastructure, reliable delivery pipelines, and visibility when something goes wrong.',
    slugs: [
      'aws-devops',
      'aws-cloud-engineering',
      'devops-consulting',
      'cloud-migration',
    ],
  },
];

export function servicesForGroup(group: ServiceGroup, pages: SeoPage[] = servicePages): SeoPage[] {
  const bySlug = new Map(pages.map((page) => [page.slug, page]));
  return group.slugs
    .map((slug) => bySlug.get(slug))
    .filter((page): page is SeoPage => Boolean(page));
}

export function ungroupedServices(pages: SeoPage[] = servicePages): SeoPage[] {
  const grouped = new Set(serviceGroups.flatMap((g) => g.slugs));
  return pages.filter((page) => !grouped.has(page.slug));
}
