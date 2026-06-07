# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bilingual (EN/ES) marketing site for **Yielded Evangelical Servants (YES)**, a missionary-founded 501(c)(3) missions ministry. Static Astro site deployed to **GitHub Pages** under base `/yesservant-proposal`. The authoritative content + design source is the client's **V3 copy guide** (`~/Desktop/YES_Website_Copy_V3.pdf`); the on-repo design direction lives in `.design-brief.md`.

Brand: **Playfair Display** (display) + **Lora** (body) · deep forest-green `#2D5233` dominant, orange `#E8751A` accent, off-white `#F0EDE6` on dark · "Reverent Editorial Authority", dignity-first, real field photography. Tagline: *Strengthening Gospel Workers. Sustaining Kingdom Impact.*

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

**i18n (bilingual, conflict-free).** `src/i18n/translations.ts` is a **registry** that merges `legacy.ts` + `common.ts` + one module per page under `src/i18n/pages/<page>.ts` into a single `ui` dict (later modules override on key collision). Each page owns its own module file (so parallel work never collides); keys are globally unique and namespaced (`home_`, `about_`, `work_`, `hiw_`, `gw_`, `give_`, `fd_`). EN + ES must have matching keys. `useLang()` (`src/i18n/useLang.ts`) reads `localStorage` (`yes_lang`) and broadcasts `yes:langchange`; `t(key)` returns the string. `TranslationKey = keyof typeof ui.en`.

**Reveal system.** BaseLayout runs a global IntersectionObserver for `[data-reveal]`/`[data-reveal-stagger]` but **skips island descendants** (avoids React #418). So **each section island runs its own `useEffect` IntersectionObserver** that adds `.visible` (with a `prefers-reduced-motion` branch that reveals immediately). Reveal CSS classes (`data-reveal="mask"|"fade"|"clip"`, stagger) live in `global.css`. Never put `data-reveal` on the same element you observe as the IO root (self-observe → section never reveals).

**Motion lifecycle.** `BaseLayout.astro` wires Lenis + GSAP ScrollTrigger into the ticker and tears it down on `astro:before-preparation` / re-inits on `astro:page-load` (because `<ClientRouter>` view transitions are on). The Hero uses GSAP `SplitText` (free in gsap 3.13+) for the headline mask-up — wait on `document.fonts.ready`, guard the async callback against unmount, and `gsap.context(...).revert()` on cleanup.

**Content collection.** Missionaries live as Markdown in `src/content/missionaries/` (id kept as `missionaries`; presented as "Gospel Workers" in the UI), validated by `src/content.config.ts` (optional V3 fields: `role`, `region`, `yearsOfService`, `quote`). Routing keys on `m.data.url`; `picture: 'none.jpg'` = anonymous worker (no photo/link).

**Routing.** Nav (6): Home · About YES · Our Work · Gospel Workers · How It Works · Give. Off-nav: `/for-donors/` (footer + CTAs), `/gospel-workers/[slug]/` profiles, footer utilities `/contact/ /privacy/`, plus `/404`. The project was trimmed to V3-only: the legacy pages (`/join`, `/send-a-team`, `/thanks`, the old `/donate`, `/missionaries`, `/missionary/[slug]`) and their 15 dead components + the `legacy.ts` i18n module were removed. If deploying to the production domain where old URLs are indexed, re-add base-correct **meta-refresh stub pages** (Astro's `redirects` config strips the base from targets and 404s on a base path — don't use it).

## Conventions & gotchas

- TS strict, no `any`. Path alias `@/*` → `./src/*`. Shared interfaces in `src/types/`.
- Tailwind v4 `@theme` tokens in `global.css`, consumed as `bg-[var(--color-primary)]`. Custom utilities + keyframes in `global.css` only — no `<style>`/`style={{}}` in `.tsx` (CSS-var/JS-driven values excepted).
- **Accent tiers for AA contrast:** `--color-accent` `#E8751A` for large display/graphics/borders only; `--color-accent-deep` `#A84F0A` for small text/links on light + all button backgrounds; `--color-accent-light` `#F6A862` for small text on dark green.
- **Astro build gotchas (esbuild, not caught by `astro check`):** apostrophes inside single-quoted strings, and certain non-ASCII punctuation (em-dash `—`, smart quotes) in `.astro` HTML attribute values, break the compiler with a misleading "Syntax error" pointing at the wrong line. Use double quotes for apostrophe strings; keep attribute values ASCII-clean.
- Custom CSS class names must not collide with Tailwind utility prefixes (`.bg-text` → `background-color`); ghost typography uses `.ghosttype`.
- SEO/meta + `NonprofitOrganization` JSON-LD live in `BaseLayout`; pass `title`/`description` per page. Sitemap via `@astrojs/sitemap`.

## Deliverables / status

`CLIENT-CHECKLIST.md` (placeholders the client must fill) and `docs/marketing-assets.md` (email subject lines, SEO key phrases) are handoff docs. Placeholders in-code are marked `<!-- CLIENT: ... -->`.
