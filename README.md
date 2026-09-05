# YES — Yielded Evangelical Servants

Bilingual (EN / ES) marketing site for **Yielded Evangelical Servants (YES)**, a missionary-founded 501(c)(3) missions ministry. The site is written as a personal letter from Andrés, President of YES, not as a corporate NGO brochure.

> *YES finds the faithful workers nobody is standing with, and stands with them.*

- **Production:** https://yeservants.org (repo `yeservants/yeservants`, branch `new-site`)
- **Staging:** https://fpsjago.github.io/yesservant-proposal/ (repo `fpsjago/yesservant-proposal`, branch `master`)
- **Stack:** Astro 6 · React 19 islands · TypeScript strict · Tailwind v4 · GSAP 3 + Lenis · static output on GitHub Pages

---

## Pages

The site was reduced to three visible pages plus utilities on client instruction (2026-08-19). The home page copy is the client's published "v7 landing", reproduced verbatim in EN and ES.

### Visible pages

| Route | Purpose | Sections (in order) |
| :-- | :-- | :-- |
| `/` | **Home.** The letter from Andrés and the full case for partnership. | Hero letter with arch photo carousel · stats strip · "Investment" quote · The 4 Differences · Model comparison table · Partnership areas · Special Projects · The Body of Christ · Why Trust YES · Final CTA (signed, closes on John 13:35) · Missionaries procession carousel |
| `/missionaries/` | **The Missionaries.** Directory of every supported worker. | Opener · profile grid (31 workers, 4 anonymous) · closing CTA |
| `/missionaries/[slug]/` | **Missionary detail.** One page per worker from the content collection. | Photo, bio, sending church, ministry start, duration, contact block, optional gallery |
| `/contact/` | **Contact.** Form plus direct contact details. Closes on John 13:35. | Page hero · form (Web3Forms) · details |
| `/privacy/` | Privacy policy. `noindex`, out of the sitemap, linked from the footer only. | — |
| `/404` | Not-found page. `noindex`. | — |

### Hidden pages

These exist at their URLs but are `noindex`, excluded from the sitemap, and **nothing on the site may link to them** (client directive 2026-08-19). They are kept so the content survives if the client reinstates them.

| Route | Former purpose |
| :-- | :-- |
| `/about/` | Founder story, beliefs, workers, stats, Andrés profile |
| `/how-it-works/` | Partnership steps, what support covers, funds |
| `/mission-teams/` | Short-term teams: how, churches, what gets done |
| `/give/` | Giving options, major partners, trust, theological close |
| `/join/` | Calling, ways to join, close |

### Navigation

Three links plus one button, on every page: **Home · The Missionaries · Contact · [Give Now]**. Give Now is orange, always visible (including mobile), and links straight to the external Aplos donation form because `/give/` is hidden.

### Language switch

EN / ES toggle in the header. The choice is stored in `localStorage` (`yes_lang`) and broadcast to every island via a `yes:langchange` event, so the whole page swaps without a reload. The client's ES file was published without diacritics; this repo restores correct Spanish orthography on the same wording.

---

## Brand

| Token | Value | Use |
| :-- | :-- | :-- |
| Display font | **Playfair Display** | Headlines, quotes |
| Body font | **Lora** | Everything else (global `html { font-size: 90% }`, so body is about 16.2px / 1.75) |
| `--color-primary` | `#33241A` | Dominant dark coffee / espresso |
| `--color-gold` | `#C9952C` | Eyebrows, rules, display accents on dark |
| `--color-accent` | `#E8751A` | Orange, large display and borders only |
| `--color-accent-deep` | `#A84F0A` | Small orange text on light, all button backgrounds (AA contrast) |
| `--color-accent-light` | `#F6A862` | Small orange text on dark |
| `--color-cream` | `#F0EDE6` | Off-white on dark |

Dignity-first, real field photography. No stock imagery on the visible pages.

---

## Commands

```sh
npm install
npm run dev        # dev server at http://localhost:4321/yesservant-proposal/
npm run build      # production build to ./dist/
npm run preview    # serve the build at http://localhost:4322 (verify against this, not dev)
npx astro check    # type gate: TS strict, no `any`
```

Requires Node 22.12 or newer. There is no linter or test runner; `astro check` plus a visual pass on the preview build is the gate.

### Environment

| Variable | Where | Purpose |
| :-- | :-- | :-- |
| `PUBLIC_WEB3FORMS_KEY` | `.env` locally, workflow env on CI | Web3Forms access key for the contact form. Public by design. |

---

## Architecture

**Astro islands.** `.astro` files are pages and layouts only. Every component is a React `.tsx` island. The page `.astro` is the data layer: it runs `getCollection`, optimises images to WebP with `getImage`, and passes plain serialisable props (including `base`) into islands. Components never import `astro:*`. Sections hydrate with `client:visible`; the hero and page openers use `client:load`; only the persistent Nav uses `client:only`.

**Base path.** Staging is served under `/yesservant-proposal`; production at `/`. Pages compute `base` from `import.meta.env.BASE_URL` and thread it into every island. All internal links and image paths are built from `base`, never from a leading `/`.

**i18n.** `src/i18n/translations.ts` merges `common.ts` with one module per page in `src/i18n/pages/` into a single dictionary. Keys are globally unique and namespaced by page (`home_`, `gw_` for missionaries, `contact_`, and so on). EN and ES must have matching keys. `useLang()` returns the current language and `t(key)`.

**Content collection.** Missionaries live as Markdown in `src/content/missionaries/`, validated by `src/content.config.ts`. Routing keys on the `url` field. `picture: none.jpg` marks an anonymous worker with no photo and no detail page.

**Motion.** Lenis smooth scroll and GSAP ScrollTrigger are wired in `BaseLayout.astro` and torn down and re-initialised across view transitions. The hero headline uses GSAP SplitText. Each section island runs its own IntersectionObserver to add `.visible` for scroll reveals, with a `prefers-reduced-motion` branch that reveals immediately.

**Security.** A strict Content Security Policy is emitted as a `<meta>` tag (GitHub Pages cannot set headers). Scripts and styles are hash-allowlisted; there is no `unsafe-inline`. The three inline scripts in `BaseLayout` are hashed manually. After editing any of them, run:

```sh
npm run build && node scripts/csp-hashes.mjs
```

and paste the new hashes into `astro.config.mjs`.

---

## Project layout

```text
src/
  pages/                 routes (index, missionaries, contact, privacy, 404, hidden pages)
  layouts/BaseLayout.astro   head, meta, JSON-LD, CSP, Lenis/GSAP lifecycle
  components/            React islands, one per section (Home*, Gw*, About*, ...)
  i18n/
    common.ts            nav, footer, brand lines shared by every page
    pages/*.ts           one translation module per page
    translations.ts      registry that merges them
    useLang.ts           language hook + event bus
  content/missionaries/  one Markdown file per worker
  content.config.ts      collection schema
  styles/global.css      Tailwind theme tokens, utilities, reveal keyframes
public/                  static assets (photos, favicons)
scripts/csp-hashes.mjs   regenerates CSP hashes for inline scripts
docs/                    client directives, marketing assets, tech report
CLIENT-CHECKLIST.md      placeholders the client still has to fill
```

---

## Deployment

One branch, two repos, one workflow (`.github/workflows/deploy.yml`). The Astro config reads `GITHUB_REPOSITORY` and picks the target:

| Repo | Branch | Builds for | URL |
| :-- | :-- | :-- | :-- |
| `fpsjago/yesservant-proposal` (private) | `master` | staging, base `/yesservant-proposal` | https://fpsjago.github.io/yesservant-proposal/ |
| `yeservants/yeservants` (public, the org's production repo) | `new-site` | production, root path, custom domain | https://yeservants.org |

Ship a change by pushing the same commit to both:

```sh
git push origin master
git push production master:new-site   # remote "production" = yeservants/yeservants
```

Production Pages is set to build from GitHub Actions and the `github-pages` environment allows `new-site`. The old site remains untouched on that repo's `master` branch (`/docs` folder) as the rollback: switch Pages back to legacy `master` + `/docs` to restore it.

**The production repo must stay public.** The `yeservants` org is on GitHub Free, where Pages only serves public repos. Making it private unpublishes yeservants.org immediately (this happened on 2026-09-04 and was reverted).

Production builds also emit meta-refresh redirects for the old site's URLs (`/missionary/<slug>/`, `/donate/`, `/download/`, `/thanks/`), defined in `astro.config.mjs`. To test a production build locally: `SITE_ENV=production npm run build`.

**Backups.** Before deploying a significant change, tag the currently live commit (`live-backup-YYYY-MM-DD`) and push the tag so the previous version is one checkout away. The first such tag is `live-backup-2026-09-04` on the staging repo.

---

## Conventions and gotchas

- TypeScript strict, no `any`. Path alias `@/*` maps to `./src/*`.
- No `style={{}}` attributes or `<style>` tags in `.tsx`. The CSP blocks inline styles, so use Tailwind arbitrary classes or rules in `global.css`.
- Never put `data-reveal` on the element an island observes as its root, or the section never reveals.
- Apostrophes inside single-quoted strings and non-ASCII punctuation in `.astro` attribute values break the compiler with a misleading error. Use double quotes and keep attributes ASCII-clean.
- Custom class names must not collide with Tailwind prefixes.
- Scroll-reveal sections are invisible to naive screenshot scripts under Lenis. Emulate `prefers-reduced-motion: reduce` to capture real content.

See `CLAUDE.md` for the full working notes.
