# YES Website — Client Action Checklist (FINAL v2 build)

The site now implements the **FINAL v2 copy + sitemap** (`YES_Website_FINAL_v2.pdf` + `YES_Mapa_Website.pdf`): the personal-letter homepage from Andrés, the 7-page structure (Home · About · The Missionaries · How It Works · Mission Teams · Give · Contact), the dark-coffee/gold design direction, and the four-scripture theology placement. A few items still need **real data from YES** — each has a tasteful placeholder and an inline `<!-- CLIENT: ... -->` comment in the code. Nothing is fabricated.

## 1. Numbers & facts to confirm
- [ ] **Stats** (Home "Why It Works" + About stats band): exact number of **nations** and **active missionaries** — both currently `20+` per the copy doc.
- [ ] **EIN number** — placeholders in the footer (`EIN: [to be provided]`) and on the Contact page (`501(c)(3) — EIN: [number]`).
- [ ] Confirm the **Aplos fund designations** match the form options (Where Most Needed — Worker Support Fund · Specific Field or Worker · Mission Teams · Leadership Development).

## 2. Content to provide
- [ ] **Annual reports / financials links** — two buttons point to `#`: footer "Annual Reports" and How It Works "View Our Financials".
- [ ] **Worker profile rewrites** — FINAL v2 wants each profile to *start with a moment, not a summary*: `[Name] | [Role] | [Country] | [Years]` + 2–3 sentences with one specific, true detail. Current bios are the long-form legacy ones; provide the "moment" versions (and confirm which workers need last names withheld for security).
- [ ] **Photo of Andrés** (About page) — FINAL v2 explicitly: real photo, not stock.

## 3. Photography (dignity-first — no stock, no poverty spectacle)
Stand-ins are in place wherever a specific location is named (each carries a `<!-- CLIENT: replace ... -->` comment):
- [ ] **Bajo Rodríguez, Costa Rica** (zinc-sheets story — Home letter, The Missionaries)
- [ ] **Mata Hambre, Honduras** (megaphone pastor — Home letter, The Missionaries)
- [ ] **Ozamiz, Philippines** (school/feeding ministry — Home letter, The Missionaries)
- [ ] **Mission team in the field** (Mission Teams page)
- [ ] **Founders / early field work** (About "Our Beginning")
- [ ] **Hero carousel** field photos (Home) — swap if stronger lead images exist.

## 4. Contact form
The Contact form is static-site friendly: submitting opens the visitor's email app addressed to info@yeservants.org with the subject + message pre-filled. If you prefer messages to land directly in an inbox/dashboard, we can wire a form service (e.g. Formspree) — say the word.

## 5. Removed pages / redirects
This build removed `/our-work/` and `/for-donors/` (their content was redistributed per the new sitemap: major-donor content → Give; mission teams → its own page; transparency → How It Works) and renamed `/gospel-workers/` → `/missionaries/`. **When deploying to the production domain**, add base-correct redirect stubs for any indexed old URLs (`/our-work → /`, `/for-donors → /give`, `/gospel-workers → /missionaries`, `/gospel-workers/[slug] → /missionaries/[slug]`).

## 6. Bilingual review
Every page ships **English + Spanish**. The English is verbatim from FINAL v2; the Spanish uses the mapa's own wording wherever provided ("Ser Socio Hoy", "Donar Ahora", section titles) and a faithful translation elsewhere. A native-speaker pass over `src/i18n/pages/*.ts` + `src/i18n/common.ts` is recommended before launch.

## 7. Optional polish (not blocking)
- The Give form is a visual selector that hands off to Aplos (static, no backend). If Aplos supports amount/designation query params we can wire the selections through.
- `<html lang>` is static `en` while the EN/ES toggle is client-side — wiring `document.documentElement.lang` on toggle is a small future enhancement.
