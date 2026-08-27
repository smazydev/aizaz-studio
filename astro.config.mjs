import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://aizaz.studio',
  trailingSlash: 'never',
  output: 'static',
  integrations: [react(), tailwind()],
  adapter: cloudflare(),
});