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
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://api.web3forms.com",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      styleDirective: {
        resources: ["'self'", 'https://fonts.googleapis.com'],
      },
      scriptDirective: {
        resources: ["'self'"],
        // Astro auto-hashes the scripts it processes, but NOT `is:inline` ones.
        // These three live in BaseLayout (lang sync, font preload→stylesheet
        // swap, and the reveal observer, which must stay is:inline for
        // data-astro-rerun). Re-run `node scripts/csp-hashes.mjs` if you edit them.
        hashes: [
          'sha256-y1vvS3OV14F/kdCPfpMS9LZaFd/p9FANP6tycSBEjoc=', // lang sync
          'sha256-triAtjjgeMv8UUaNRrKvbJv3IyNHgJLOAwPAZuP4gXg=', // font preload swap
          'sha256-RRpOGPXWu+u+OnWOywt7DblMpGMlUXUd8cZqXsXxcp4=', // reveal observer
        ],
      },
    },
  },
  site: 'https://fpsjago.github.io',
  base: '/yesservant-proposal',
  compressHTML: true,
  build: { assets: '_assets' },
  vite: { plugins: [tailwindcss()] },
});
