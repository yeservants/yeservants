# YES Website — Client Action Checklist

The V3 rework is built and faithful to the copy guide. A few items need **real data from YES** before the site goes fully live. Everywhere one of these is missing, the page already has a tasteful placeholder and an inline `<!-- CLIENT: ... -->` comment in the code — nothing is fabricated.

## 1. Numbers & facts to confirm
- [ ] **Track-record stats** (Home → "Who We Are"): exact number of **nations**, **workers currently supported**, **mission teams deployed**. Only "35+ years" is confirmed; the others show `20+` / placeholders.
- [ ] **EIN number** (footer + structured data) — currently `EIN: [to be provided]`.
- [ ] Confirm whether to surface **"Founded 1990"** anywhere (the copy says "35+ years"; ~1990 is consistent and used in the structured data `foundingDate`).
- [ ] Confirm the **three Aplos fund designations** exist (Worker Support · Mission/Ministry Operations · Leadership Development) so the Give/How-It-Works copy matches the real giving options.

## 2. Content to provide
- [ ] **Leadership bios + headshots** (About → "The People Behind YES") — placeholder cards are in place; no names/bios invented.
- [ ] **Worker quotes** (Gospel Workers → "In Their Own Words") — real, unedited quotes; placeholder block in place.
- [ ] **Financials / annual-report links** — three buttons currently point to `#`: Home "View Financials", How It Works "See Our Financials", For Donors "View Our Annual Report" + "Download Financials".

## 3. Photography (dignity-first — no stock, no spectacle)
Real field photos already on the site are dignified stand-ins. Replace where a specific place is named (each has a `<!-- CLIENT: replace with verified [location] photo -->` comment):
- [ ] **Bajo Rodríguez, Costa Rica** (the zinc-roof story — Home, Gospel Workers)
- [ ] **Mata Hambre, Honduras** (the megaphone pastor — Home, Gospel Workers, Our Work)
- [ ] **Ozamiz, Philippines** (school/feeding ministry)
- [ ] **Yanomàmö, Venezuela** (the founding story — About, Our Work)
- [ ] **Hero** field photo (Home) — swap if a stronger lead image exists.

## 4. Legacy pages — REMOVED in cleanup
The project was trimmed to V3-only. These legacy routes were **removed**: `/join` (Become a Missionary), `/send-a-team`, `/thanks`, and the old `/donate`, `/missionaries`, `/missionary/[slug]`. Their unique assets are still on disk and unlinked — decide whether to migrate any of them:
- [ ] The Become-a-Missionary **application** + **member handbook** `.docx` files (`public/download/`) are no longer linked. Migrate into How It Works / For Donors, or retire.
- [ ] Mission-team **trip destinations/types** content (old `/send-a-team`) is gone — How It Works covers mission teams generally; re-add specifics if wanted.
- [ ] `/contact/` and `/privacy/` are **kept** as footer utility pages (V3 shell). Their body copy is still legacy-styled — review/restyle.

**Old URLs:** no redirects ship (clean V3-only build). When moving to the production domain, add base-correct redirect stubs for any indexed old URLs (`/donate → /give`, `/missionaries → /gospel-workers`, etc.).

## 5. Bilingual review
Every new page ships **English + Spanish**. The Spanish is a faithful translation of the approved English copy (the copy guide was English-only). A native-speaker review of the new Spanish strings (`src/i18n/pages/*.ts`, `src/i18n/common.ts`) is recommended before launch.

## 6. Optional polish (noted by the review, not blocking)
- The **Give page giving form** is a visual selector that hands off to Aplos (per the agreed static, no-backend approach). Selections are informational; the button always opens Aplos. If Aplos supports amount/designation query params, we can wire them through.
- `<html lang>` is static `en` while the EN/ES toggle is client-side — wiring `document.documentElement.lang` on toggle is a small future enhancement.
