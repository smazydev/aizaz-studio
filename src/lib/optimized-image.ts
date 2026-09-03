import type { ImageMetadata } from 'astro';

const WIDTH_PLAN: Record<string, number[]> = {
  'codechecker-casestudy-cover.png': [640, 960, 1200, 1536],
  'igw-casestudy-cover.png': [640, 960, 1200, 1600],
  '1archiver-enterprise-email-archiving-cover.jpg': [640, 960, 1200, 1600],
  '1archiver-bg-dashboard-1.png': [800, 1200, 1600],
  '1archiver-bg-dashboard-2.png': [800, 1200, 1600],
  'propertymatch-property-matching-saas-cover.jpg': [640, 960, 1200, 1600],
  'propertymatchmaker-bg-buyer-management.png': [800, 1200],
  'propertymatchmaker-bg-property-search.png': [800, 1200],
  'igw-bg-dashboard-1.png': [800, 1200],
  'igw-bg-dashboard-2.png': [800, 1200],
  'salesangel-ai-sales-platform-cover.jpg': [640, 960, 1200, 1600],
  'salesangel-architecture-diagram.png': [800, 1200],
  'salesangel-dashboard.png': [800, 1200],
  'salesangel-ai-agents.png': [800, 1200],
  'salesangel-crm-contacts.png': [800, 1200],
  'salesangel-live-dialer.png': [800, 1200],
};

/** Resolve Astro hashed asset path / ImageMetadata back to original basename. */
export function assetBasename(src: ImageMetadata | string | undefined): string | undefined {
  if (!src) return undefined;
  const pathPart = typeof src === 'string' ? src : src.src;
  const file = pathPart.split('/').pop() ?? '';
  const known = Object.keys(WIDTH_PLAN).find((name) => {
    const stem = name.replace(/\.(png|jpe?g|webp)$/i, '');
    return file === name || file.startsWith(`${stem}.`);
  });
  return known;
}

export function optimizedSrc(basename: string, width?: number): string {
  const base = basename.replace(/\.(png|jpe?g|webp)$/i, '');
  const plan = WIDTH_PLAN[basename];
  if (!width || !plan?.length) return `/optimized/${base}.webp`;
  const closest = plan.reduce((best, w) => (Math.abs(w - width) < Math.abs(best - width) ? w : best), plan[0]);
  return `/optimized/${base}-w${closest}.webp`;
}

export function optimizedSrcSet(basename: string, widths?: number[]): string {
  const plan = widths ?? WIDTH_PLAN[basename] ?? [640, 960, 1200];
  const base = basename.replace(/\.(png|jpe?g|webp)$/i, '');
  return plan.map((w) => `/optimized/${base}-w${w}.webp ${w}w`).join(', ');
}

export function defaultSizes(kind: 'card' | 'hero' | 'content' = 'content'): string {
  if (kind === 'card') return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px';
  if (kind === 'hero') return '(max-width: 768px) 100vw, 1200px';
  return '(max-width: 1024px) 100vw, 900px';
}
