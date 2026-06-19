import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    react(),
    sitemap({ filter: (page) => !page.includes('/privacy') && !page.includes('/404') }),
  ],
  output: 'static',
  site: 'https://fpsjago.github.io',
  base: '/yesservant-proposal',
  compressHTML: true,
  build: { assets: '_assets' },
  vite: { plugins: [tailwindcss()] },
});
