import { techIconPaths, type TechIconId } from './techIconPaths';

export type TechLogoItem = {
  id: TechIconId;
  name: string;
  href?: string;
};

/**
 * Homepage logo strip — tools we work with (not partnerships).
 * Links only to existing /technologies/[slug] routes.
 */
export const techLogoItems: TechLogoItem[] = [
  { id: 'openai', name: 'OpenAI', href: '/technologies/openai' },
  { id: 'anthropic', name: 'Anthropic' },
  { id: 'langchain', name: 'LangChain', href: '/technologies/langchain' },
  { id: 'netsuite', name: 'NetSuite' },
  { id: 'shopify', name: 'Shopify' },
  { id: 'bigcommerce', name: 'BigCommerce' },
  { id: 'aws', name: 'AWS', href: '/technologies/aws' },
  { id: 'azure', name: 'Azure' },
  { id: 'cloudflare', name: 'Cloudflare' },
  { id: 'docker', name: 'Docker' },
  { id: 'terraform', name: 'Terraform' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'react', name: 'React', href: '/technologies/react-development' },
  { id: 'nextjs', name: 'Next.js', href: '/technologies/nextjs-development' },
  { id: 'nodejs', name: 'Node.js', href: '/technologies/nodejs-development' },
  { id: 'python', name: 'Python', href: '/technologies/python-development' },
  { id: 'nestjs', name: 'NestJS', href: '/technologies/nestjs-development' },
  { id: 'rust', name: 'Rust' },
  { id: 'postgresql', name: 'PostgreSQL', href: '/technologies/postgresql' },
];

/** Split into two marquee rows for opposite scroll. */
export const techLogoRows: [TechLogoItem[], TechLogoItem[]] = [
  techLogoItems.slice(0, 10),
  techLogoItems.slice(10),
];

export function getTechIcon(id: TechIconId) {
  return techIconPaths[id];
}
