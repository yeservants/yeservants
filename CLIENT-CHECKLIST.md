# YES Website — Client Action Checklist (FINAL v2 build)

The site now implements the **FINAL v2 copy + sitemap** (`YES_Website_FINAL_v2.pdf` + `YES_Mapa_Website.pdf`): the personal-letter homepage from Andrés, the 7-page structure (Home · About · The Missionaries · How It Works · Mission Teams · Give · Contact), the dark-coffee/gold design direction, and the four-scripture theology placement. A few items still need **real data from YES** — each has a tasteful placeholder and an inline `<!-- CLIENT: ... -->` comment in the code. Nothing is fabricated.

## 1. Numbers & facts to confirm
- [ ] **Stats** (Home "Why It Works" + About stats band): exact number of **nations** and **active missionaries** — both currently `20+` per the copy doc.
- [x] **EIN number** — now `54-1558343` everywhere (footer + Contact card), per the Contact page doc.
- [ ] Confirm the **Aplos fund designations** match the form options (Where Most Needed — Worker Support Fund · Specific Field or Worker · Mission Teams · Leadership Development).

### Pending confirmations from the page-update docs (June 2026)
- [ ] **Worker Profiles — full active roster (URGENT).** Bernie & Jean LaTour (Bernie deceased; their story now lives in About "Our Beginning") and Clive & Kathryn Gray (no longer with YES) have been removed. The doc warns other names in the gallery may also no longer apply — **confirm the complete current list before launch** so Worker Profiles isn't corrected twice.
- [ ] **Accounting email** — confirm `accounting@yeservants.org` is active and monitored before launch (a listed-but-unwatched inbox is worse than none). It's on the Contact card and the form's Subject dropdown ("Accounting / records request").
- [ ] **"In Their Words" quotes (Missionaries)** — the original script had a worker-quotes section. Andrés to decide whether to include it and with which (unedited) quotes; not built yet.

## 2. Content to provide
- [ ] **Annual reports / financials links** — two buttons point to `#`: footer "Annual Reports" and How It Works "View Our Financials".
- [ ] **Worker profile rewrites** — FINAL v2 wants each profile to *start with a moment, not a summary*: `[Name] | [Role] | [Country] | [Years]` + 2–3 sentences with one specific, true detail. Current bios are the long-form legacy ones; provide the "moment" versions (and confirm which workers need last names withheld for security).
- [x] **Photo of Andrés** — in place on the About "The Person Behind YES" section and the Home Final CTA (`src/assets/images/andres.jpeg`). It's a real field portrait; a more candid *in-ministry* photo of Andrés can replace it if available (marked `<!-- CLIENT: ... -->` in both spots).

## 3. Photography (dignity-first — no stock, no poverty spectacle)
- [x] **Home letter — Costa Rica · Honduras · Philippines** — now real field photos (`costa-rica-bajo-rodriguez.jpg` / `honduras-mata-hambre.jpg` / `philippines-ozamiz.jpg`).
- [ ] **The Missionaries page — three stories** still use stand-ins (`<!-- CLIENT: replace ... -->`); the real location photos from the Home letter can be reused here.
- [ ] **Mission team in the field** (Mission Teams page) — stand-in.
- [ ] **Founders / early field work** (About "Our Beginning") — stand-in; a LaTour-era archive photo would suit the new founder story.
- [ ] **Hero carousel** field photos (Home) — swap if stronger lead images exist.

## 4. Contact form
The Contact form now submits through **Web3Forms** (your access key is wired into the site build), so messages land directly in the inbox tied to that Web3Forms account — no email app needed. Confirm the destination email in your Web3Forms dashboard is the one you want monitored. If the key is ever revoked, the form gracefully falls back to opening the visitor's email app addressed to info@yeservants.org.

## 5. Removed pages / redirects
This build removed `/our-work/` and `/for-donors/` (their content was redistributed per the new sitemap: major-donor content → Give; mission teams → its own page; transparency → How It Works) and renamed `/gospel-workers/` → `/missionaries/`. **When deploying to the production domain**, add base-correct redirect stubs for any indexed old URLs (`/our-work → /`, `/for-donors → /give`, `/gospel-workers → /missionaries`, `/gospel-workers/[slug] → /missionaries/[slug]`).

## 6. Bilingual review
Every page ships **English + Spanish**. The English is verbatim from FINAL v2; the Spanish uses the mapa's own wording wherever provided ("Ser Socio Hoy", "Donar Ahora", section titles) and a faithful translation elsewhere. A native-speaker pass over `src/i18n/pages/*.ts` + `src/i18n/common.ts` is recommended before launch.

## 7. Optional polish (not blocking)
- The Give form is a visual selector that hands off to Aplos (static, no backend). If Aplos supports amount/designation query params we can wire the selections through.
- `<html lang>` is static `en` while the EN/ES toggle is client-side — wiring `document.documentElement.lang` on toggle is a small future enhancement.
