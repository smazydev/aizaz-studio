import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://aizaz.studio',
  output: 'server',
  // Canonical/sitemap policy: no trailing slash. Cloudflare assets must match via
  // wrangler assets.html_handling = "drop-trailing-slash".
  trailingSlash: 'never',
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
  integrations: [react(), tailwind()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
