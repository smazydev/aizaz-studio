export type TechItem = {
  name: string;
  hint: string;
  href?: string;
};

export type TechGroup = {
  id: string;
  label: string;
  items: TechItem[];
};

/**
 * Compact homepage credibility strip.
 * Links only to existing /technologies/[slug] routes.
 */
export const selectedTechGroups: TechGroup[] = [
  {
    id: 'product',
    label: 'Product',
    items: [
      { name: 'TypeScript', hint: 'Typed application code' },
      { name: 'React', hint: 'Product UI', href: '/technologies/react-development' },
      { name: 'Next.js', hint: 'App delivery', href: '/technologies/nextjs-development' },
      { name: 'Astro', hint: 'Content & marketing sites' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & systems',
    items: [
      { name: 'Node.js', hint: 'APIs & services', href: '/technologies/nodejs-development' },
      { name: 'Python', hint: 'Services & automation', href: '/technologies/python-development' },
      { name: 'NestJS', hint: 'API frameworks', href: '/technologies/nestjs-development' },
      { name: 'Rust', hint: 'Backend & systems' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & automation',
    items: [
      { name: 'OpenAI', hint: 'Model APIs', href: '/technologies/openai' },
      { name: 'Anthropic', hint: 'Model APIs' },
      { name: 'LangChain', hint: 'Agent orchestration', href: '/technologies/langchain' },
    ],
  },
  {
    id: 'erp',
    label: 'ERP & commerce',
    items: [
      { name: 'NetSuite', hint: 'ERP & commerce integrations' },
      { name: 'Shopify', hint: 'Commerce integrations' },
      { name: 'BigCommerce', hint: 'Commerce integrations' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & infra',
    items: [
      { name: 'AWS', hint: 'Cloud infrastructure', href: '/technologies/aws' },
      { name: 'Azure', hint: 'Cloud infrastructure' },
      { name: 'Cloudflare', hint: 'Edge / delivery infrastructure' },
      { name: 'Terraform', hint: 'Infrastructure as code' },
      { name: 'Docker', hint: 'Container delivery' },
    ],
  },
];
