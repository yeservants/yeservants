import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * Relax the CSP `style-src` to `'self' 'unsafe-inline'` after the build.
 *
 * Astro's CSP is hash-based for BOTH script-src and style-src, which is perfect
 * for scripts but breaks runtime styling: GSAP SplitText / ScrollTrigger inject
 * inline `style` attributes the hashes can't cover, so the strict style-src
 * blocks them (broken hero headline on load + nav). We keep Astro's strict,
 * per-page SCRIPT hashing (what Lighthouse's XSS audit actually grades) and only
 * loosen style-src. Lighthouse does not penalize `style-src 'unsafe-inline'`.
 */
function relaxCspStyleSrc() {
  return {
    name: 'relax-csp-style-src',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const root = fileURLToPath(dir);
        const walk = async (d) => {
          const entries = await readdir(d, { withFileTypes: true });
          const files = [];
          for (const e of entries) {
            const p = `${d}/${e.name}`;
            if (e.isDirectory()) files.push(...(await walk(p)));
            else if (e.name.endsWith('.html')) files.push(p);
          }
          return files;
        };
        const files = await walk(root);
        for (const f of files) {
          const html = await readFile(f, 'utf8');
          if (!html.includes('content-security-policy')) continue;
          const next = html.replace(/style-src[^;"]*/g, "style-src 'self' 'unsafe-inline'");
          if (next !== html) await writeFile(f, next);
        }
      },
    },
  };
}

export default defineConfig({
  integrations: [
    react(),
    sitemap({
      // Hidden pages (client directive 2026-08-19): reachable by direct URL
      // only — out of the sitemap, noindex'd, and nothing links to them.
      filter: (page) =>
        !['/privacy', '/404', '/about', '/give', '/how-it-works', '/mission-teams', '/join']
          .some((hidden) => page.includes(hidden)),
    }),
    relaxCspStyleSrc(),
  ],
  output: 'static',
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://api.web3forms.com",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      // style-src is rewritten to 'self' 'unsafe-inline' by relaxCspStyleSrc()
      // (see above). Hashes here are ignored after that rewrite.
      styleDirective: {
        resources: ["'self'"],
      },
      scriptDirective: {
        resources: ["'self'"],
        // Astro auto-hashes the scripts it processes, but NOT `is:inline` ones.
        // These two live in BaseLayout (lang sync + the reveal observer, which
        // must stay is:inline for data-astro-rerun). Re-run
        // `node scripts/csp-hashes.mjs` after a build if you edit them.
        hashes: [
          'sha256-y1vvS3OV14F/kdCPfpMS9LZaFd/p9FANP6tycSBEjoc=', // lang sync
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
