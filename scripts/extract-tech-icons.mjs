import * as si from 'simple-icons';
import { writeFileSync } from 'node:fs';

const extractPath = async (url) => {
  const t = await (await fetch(url)).text();
  const m = t.match(/path d="([^"]+)"/);
  if (!m) throw new Error(`No path in ${url}`);
  return m[1];
};

const openai = await extractPath(
  'https://raw.githubusercontent.com/simple-icons/simple-icons/11.14.0/icons/openai.svg',
);
const aws = await extractPath(
  'https://raw.githubusercontent.com/simple-icons/simple-icons/11.14.0/icons/amazonaws.svg',
);
const azure = await extractPath(
  'https://raw.githubusercontent.com/simple-icons/simple-icons/11.14.0/icons/microsoftazure.svg',
);

/** @type {Record<string, { title: string; path: string }>} */
const icons = {
  openai: { title: 'OpenAI', path: openai },
  anthropic: { title: si.siAnthropic.title, path: si.siAnthropic.path },
  langchain: { title: si.siLangchain.title, path: si.siLangchain.path },
  // No public Simple Icons mark — clean N monogram for NetSuite label pairing
  netsuite: {
    title: 'NetSuite',
    path: 'M4.5 3.75h4.35l5.4 10.35V3.75H18.5v16.5h-4.35l-5.4-10.35v10.35H4.5V3.75z',
  },
  shopify: { title: si.siShopify.title, path: si.siShopify.path },
  bigcommerce: { title: si.siBigcommerce.title, path: si.siBigcommerce.path },
  aws: { title: 'AWS', path: aws },
  azure: { title: 'Azure', path: azure },
  cloudflare: { title: si.siCloudflare.title, path: si.siCloudflare.path },
  docker: { title: si.siDocker.title, path: si.siDocker.path },
  terraform: { title: si.siTerraform.title, path: si.siTerraform.path },
  typescript: { title: si.siTypescript.title, path: si.siTypescript.path },
  react: { title: si.siReact.title, path: si.siReact.path },
  nextjs: { title: si.siNextdotjs.title, path: si.siNextdotjs.path },
  nodejs: { title: si.siNodedotjs.title, path: si.siNodedotjs.path },
  python: { title: si.siPython.title, path: si.siPython.path },
  nestjs: { title: si.siNestjs.title, path: si.siNestjs.path },
  rust: { title: si.siRust.title, path: si.siRust.path },
  postgresql: { title: si.siPostgresql.title, path: si.siPostgresql.path },
};

const lines = [
  '/** Auto-generated brand SVG paths (Simple Icons + curated fallbacks). */',
  'export type TechIconDef = { title: string; path: string };',
  '',
  'export const techIconPaths = {',
  ...Object.entries(icons).map(
    ([key, value]) =>
      `  ${key}: { title: ${JSON.stringify(value.title)}, path: ${JSON.stringify(value.path)} },`,
  ),
  '} as const satisfies Record<string, TechIconDef>;',
  '',
  'export type TechIconId = keyof typeof techIconPaths;',
  '',
];

writeFileSync(new URL('../src/data/techIconPaths.ts', import.meta.url), lines.join('\n'));
console.log('wrote techIconPaths.ts', Object.keys(icons).length);
