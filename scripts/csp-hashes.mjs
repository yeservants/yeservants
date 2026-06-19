// Recompute the CSP hashes for the `is:inline` scripts in BaseLayout.
//
// Astro's built-in CSP (security.csp) auto-hashes every script it *processes*,
// but NOT `is:inline` scripts — those must be hashed by hand and listed under
// `security.csp.scriptDirective.hashes` in astro.config.mjs.
//
// Usage:  npm run build  &&  node scripts/csp-hashes.mjs
// Then paste the printed values into astro.config.mjs if they changed.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
// inline <script> tags, excluding external (src=) and non-exec JSON-LD
const re = /<script(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g;

const labels = [
  { startsWith: '\n    try {', label: 'lang sync' },
  { startsWith: "\n    (function () {\n      var l = document.getElementById('yes-fonts')", label: 'font preload swap' },
  { startsWith: '\n  (function() {', label: 'reveal observer' },
];

let m;
const found = [];
while ((m = re.exec(html))) {
  const content = m[1];
  const hit = labels.find((l) => content.startsWith(l.startsWith));
  if (hit) {
    const hash = createHash('sha256').update(content, 'utf8').digest('base64');
    found.push(`  'sha256-${hash}', // ${hit.label}`);
  }
}

if (found.length !== labels.length) {
  console.error(`Expected ${labels.length} is:inline scripts, found ${found.length}. Did BaseLayout change?`);
  process.exit(1);
}
console.log('scriptDirective.hashes:\n' + found.join('\n'));
