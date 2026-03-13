import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [react(), sitemap()],
  output: 'static',
  site: 'https://fpsjago.github.io',
  base: '/yesservant-proposal',
  compressHTML: true,
  build: { assets: '_assets' },
  vite: { plugins: [tailwindcss()] },
});
