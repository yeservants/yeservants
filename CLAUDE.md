# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bilingual (EN/ES) marketing site for **Yielded Evangelical Servants (YES)**, a missionary-founded 501(c)(3) missions ministry. Static Astro site deployed to **GitHub Pages** under base `/yesservant-proposal`. The authoritative content + structure sources are the client's **FINAL v2 docs** (`~/Desktop/YES_Website_FINAL_v2.pdf` — full EN copy + ES webmaster instructions — and `~/Desktop/YES_Mapa_Website.pdf` — the 7-page sitemap); they supersede the old V3 guide. The on-repo design direction lives in `.design-brief.md`.

**The site is a personal letter from Andrés, President of YES** — not a corporate NGO site. Brand: **Playfair Display** (display) + **Lora** (body; `html{font-size:90%}` global 10% type reduction per Jago 2026-08-20, so body ≈16.2px/1.75 — the old "min 18px" FINAL v2 rule is superseded) · **dark coffee/espresso** `#33241A` dominant, gold `#C9952C` warmth, orange `#E8751A` CTAs, off-white `#F0EDE6` on dark ("el diseño de Sergio: café oscuro, serif grande, dorado") · dignity-first, real field photography. Tagline: *YES finds the faithful workers nobody is standing with — and stands with them.* NOTE: `.green-gradient` / `GreenAtmos` class+file names survive from the V3 green era — their **values** are espresso/gold now.

## Commands

```sh
npm run dev              # dev server (localhost:4321)
npm run build            # production build → ./dist/
npm run preview          # serve the production build (localhost:4322) — verify against THIS, not dev
npx astro check          # type gate (TS strict, no `any`); @astrojs/check is installed
```

No linter/test runner. `astro check` + verifying against `npm run preview` is the gate.

**Visual verification trick:** scroll-reveal sections are React islands using IntersectionObserver, which Lenis smooth-scroll defeats under synthetic `window.scrollBy` (false "blank section" reports). To screenshot true content, emulate `prefers-reduced-motion: reduce` (Lenis off → reveals add `.visible` immediately). Use `playwright-core` + `{ channel: 'chrome' }` (system Chrome; no browser download).

## Architecture

**Astro islands.** `.astro` = pages/layouts only; every component is a React `.tsx` island. The page `.astro` is the data layer (`getCollection`, `getImage`→WebP) and passes plain serializable props (incl. `base`) into islands. Components never import `astro:*`. `client:visible` for sections; `client:only` only for the persistent Nav.

**`base` threading.** Site runs under a base path. Compute `const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')` in the `.astro` page and thread it into islands. Build links as `` `${base}give/` `` — never a leading `/`. (Raw `/images/...` in a component 404s on deploy — always `${base}images/...`.)

**i18n (bilingual, conflict-free).** `src/i18n/translations.ts` is a **registry** that merges `common.ts` + one module per page under `src/i18n/pages/<page>.ts` into a single `ui` dict. Each page owns its own module file (so parallel work never collides); keys are globally unique and namespaced (`home_`, `about_`, `gw_` (missionaries.ts — prefix kept from the Gospel-Workers era), `hiw_`, `mt_`, `give_`, `contact_`). EN + ES must have matching keys; EN is verbatim FINAL v2, ES uses the mapa's own Spanish where provided. `useLang()` (`src/i18n/useLang.ts`) reads `localStorage` (`yes_lang`) and broadcasts `yes:langchange`; `t(key)` returns the string. `TranslationKey = keyof typeof ui.en`.

**Reveal system.** BaseLayout runs a global IntersectionObserver for `[data-reveal]`/`[data-reveal-stagger]` but **skips island descendants** (avoids React #418). So **each section island runs its own `useEffect` IntersectionObserver** that adds `.visible` (with a `prefers-reduced-motion` branch that reveals immediately). Reveal CSS classes (`data-reveal="mask"|"fade"|"clip"`, stagger) live in `global.css`. Never put `data-reveal` on the same element you observe as the IO root (self-observe → section never reveals).

**Motion lifecycle.** `BaseLayout.astro` wires Lenis + GSAP ScrollTrigger into the ticker and tears it down on `astro:before-preparation` / re-inits on `astro:page-load` (because `<ClientRouter>` view transitions are on). The Hero uses GSAP `SplitText` (free in gsap 3.13+) for the headline mask-up — wait on `document.fonts.ready`, guard the async callback against unmount, and `gsap.context(...).revert()` on cleanup.

**Content collection.** Missionaries live as Markdown in `src/content/missionaries/` (presented as "The Missionaries" in the UI), validated by `src/content.config.ts` (optional fields: `role`, `region`, `yearsOfService`, `quote`). Routing keys on `m.data.url`; `picture: 'none.jpg'` = anonymous worker (no photo/link).

**Routing (v7 rework, 2026-08-20 — supersedes FINAL v2).** Nav (3 + button): Home · The Missionaries · Contact · **[Give Now]** (orange, always visible incl. mobile — links straight to the external **Aplos** donation form, since `/give/` is hidden). Visible pages: `/` (the v7 landing, section order verbatim from the client's v7 HTML — hero letter w/ arch carousel → stats strip → Investment quote → 4 Differences → Model comparison table → Partnership areas → Special Projects → Body of Christ → Why Trust YES → Final CTA → **missionaries procession carousel**) · `/missionaries/` + `/missionaries/[slug]/` · `/contact/` (John 13:35 closes) · `/privacy/` · `/404`. **Hidden pages** (client directive 2026-08-19: exist at their URLs but are `noindex`, out of the sitemap, and NOTHING may link to them): `/about/` · `/how-it-works/` · `/mission-teams/` · `/give/` · `/join/`. Authoritative content source for the home: the client's published v7 landing —
[EN](https://andresgonzalez-beep.github.io/yes-partner/YES_Landing_v7.html) ·
[ES](https://andresgonzalez-beep.github.io/yes-partner/YES_Landing_v7_ES.html) — copied verbatim into
`src/i18n/pages/home.ts` in the source document's own order (2026-09-01: the "What I've Seen" field-story
section and "The Insight" were removed on client instruction, and the stock street photo `yespic/9.jpg`
was dropped from the hero carousel). The client's ES file was published without diacritics; the repo
restores correct Spanish orthography on the same wording. Directive audios: `docs/client-directives-2026-08-19.md`. If deploying to the production domain where old URLs are indexed, add base-correct **meta-refresh stub pages** (Astro's `redirects` config strips the base from targets and 404s on a base path — don't use it).

## Conventions & gotchas

- TS strict, no `any`. Path alias `@/*` → `./src/*`. Shared interfaces in `src/types/`.
- Tailwind v4 `@theme` tokens in `global.css`, consumed as `bg-[var(--color-primary)]`. Custom utilities + keyframes in `global.css` only — **no `style={{}}` inline-style attributes in `.tsx`** (the strict CSP `style-src` is hash-based, so SSR'd inline styles are *blocked* at load). Express per-element values as Tailwind arbitrary classes (`[animation-delay:1.3s]`, `bg-[radial-gradient(...)]`) or nth-child rules instead; only JS-set CSSOM (GSAP, `el.style.x=…` post-hydration) is exempt.
- **CSP (`security.csp` in `astro.config.mjs`).** Strict, enforced via `<meta>` (GitHub Pages can't set headers): hash-based `script-src`/`style-src`, no `unsafe-inline`, `object-src 'none'`, `base-uri 'self'`. Astro auto-hashes the scripts/styles it processes but **NOT `is:inline` scripts** — the three in `BaseLayout` (lang sync, font preload→stylesheet swap, reveal observer) are hashed manually under `scriptDirective.hashes`. If you edit any of them, run `node scripts/csp-hashes.mjs` after a build and paste the new hashes. External hosts allowed: Google Fonts (`fonts.googleapis.com`/`gstatic.com`), Web3Forms (`connect-src`). `strict-dynamic` is intentionally OFF — it breaks Astro's `import()`-based island hydration.
- **Accent tiers for AA contrast:** `--color-accent` `#E8751A` for large display/graphics/borders only; `--color-accent-deep` `#A84F0A` for small text/links on light + all button backgrounds; `--color-accent-light` `#F6A862` for small text on the dark espresso; `--color-gold` `#C9952C` / `--color-gold-light` `#E2B25C` for eyebrows/rules/display accents on dark.
- **Astro build gotchas (esbuild, not caught by `astro check`):** apostrophes inside single-quoted strings, and certain non-ASCII punctuation (em-dash `—`, smart quotes) in `.astro` HTML attribute values, break the compiler with a misleading "Syntax error" pointing at the wrong line. Use double quotes for apostrophe strings; keep attribute values ASCII-clean.
- Custom CSS class names must not collide with Tailwind utility prefixes (`.bg-text` → `background-color`); ghost typography uses `.ghosttype`.
- SEO/meta + `NonprofitOrganization` JSON-LD live in `BaseLayout`; pass `title`/`description` per page. Sitemap via `@astrojs/sitemap`.

## Deliverables / status

`CLIENT-CHECKLIST.md` (placeholders the client must fill) and `docs/marketing-assets.md` (email subject lines, SEO key phrases) are handoff docs. Placeholders in-code are marked `<!-- CLIENT: ... -->`.
