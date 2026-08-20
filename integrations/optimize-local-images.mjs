/**
 * Build-time local image optimizer for Cloudflare Workers.
 * Runtime /_image is a passthrough (no sharp on Workers).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS_DIR = path.join(ROOT, 'src', 'assets');
const OUT_DIR = path.join(ROOT, 'public', 'optimized');

const IMAGE_PLAN = {
  'codechecker-casestudy-cover.png': [640, 960, 1200, 1536],
  'igw-casestudy-cover.png': [640, 960, 1200, 1600],
  '1archiver-casestudy-cover.png': [640, 960, 1200, 1600],
  '1archiver-bg-dashboard-1.png': [800, 1200, 1600],
  '1archiver-bg-dashboard-2.png': [800, 1200, 1600],
  'propertymatchmaker-casestudy-cover.png': [640, 960, 1024],
  'propertymatchmaker-bg-buyer-management.png': [800, 1200],
  'propertymatchmaker-bg-property-search.png': [800, 1200],
  'igw-bg-dashboard-1.png': [800, 1200],
  'igw-bg-dashboard-2.png': [800, 1200],
  'salesangel-casestudy-cover.png': [640, 960, 1024],
  'salesangel-architecture-diagram.png': [800, 1200],
  'salesangel-dashboard.png': [800, 1200],
  'salesangel-ai-agents.png': [800, 1200],
  'salesangel-crm-contacts.png': [800, 1200],
  'salesangel-live-dialer.png': [800, 1200],
};

/** @returns {import('astro').AstroIntegration} */
export default function optimizeLocalImages() {
  return {
    name: 'optimize-local-images',
    hooks: {
      'astro:build:start': async () => {
        await fs.mkdir(OUT_DIR, { recursive: true });
        for (const [file, widths] of Object.entries(IMAGE_PLAN)) {
          const input = path.join(ASSETS_DIR, file);
          try {
            await fs.access(input);
          } catch {
            console.warn(`[optimize-local-images] Missing asset: ${file}`);
            continue;
          }
          const base = file.replace(/\.(png|jpe?g|webp)$/i, '');
          for (const width of widths) {
            const out = path.join(OUT_DIR, `${base}-w${width}.webp`);
            await sharp(input)
              .rotate()
              .resize({ width, withoutEnlargement: true })
              .webp({ quality: 72, effort: 4 })
              .toFile(out);
          }
          const primary = Math.min(1200, Math.max(...widths));
          await sharp(input)
            .rotate()
            .resize({ width: primary, withoutEnlargement: true })
            .webp({ quality: 72, effort: 4 })
            .toFile(path.join(OUT_DIR, `${base}.webp`));
        }
        console.log(`[optimize-local-images] Wrote WebP derivatives to public/optimized/`);
      },
    },
  };
}
