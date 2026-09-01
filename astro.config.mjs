import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';
import optimizeLocalImages from './integrations/optimize-local-images.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://aizaz.studio',
  output: 'server',
  // Canonical/sitemap policy: no trailing slash. Cloudflare assets must match via
  // wrangler assets.html_handling = "drop-trailing-slash".
  trailingSlash: 'never',
  integrations: [react(), tailwind(), optimizeLocalImages()],
  env: {
    schema: {
      SANITY_PROJECT_ID: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        default: 'bmcdpga9',
      }),
      SANITY_DATASET: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        default: 'production',
      }),
      REVALIDATE_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      TURNSTILE_PREVIEW_HOST: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_GOOGLE_ADS_SEND_TO: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      CLOUDFLARE_ZONE_ID: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      CLOUDFLARE_API_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
  adapter: cloudflare({
    // Build-time sharp for prerendered pages; SSR must not rely on /_image (passthrough).
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
});
