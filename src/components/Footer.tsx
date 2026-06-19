'use client';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props { base: string; }

export default function Footer({ base }: Props) {
  const { t } = useLang();

  /* FINAL v2 footer links: Financial Support · Logistical Support · Partnership
     · Annual Reports · Privacy · Contact */
  const links = [
    { href: `${base}join/`,                     label: t('footer_join') },
    { href: `${base}how-it-works/#financial`,   label: t('footer_financialSupport') },
    { href: `${base}how-it-works/#logistical`,  label: t('footer_logisticalSupport') },
    { href: `${base}give/`,                     label: t('footer_partnership') },
    { href: '#', label: t('footer_annualReports') }, /* CLIENT: annual reports link */
    { href: `${base}privacy/`,                  label: t('footer_utility_privacy') },
    { href: `${base}contact/`,                  label: t('footer_utility_contact') },
  ];

  const linkCls = 'inline-block py-1 text-[var(--color-cream)]/70 text-sm hover:text-[var(--color-accent-light)] transition-colors duration-300';

  return (
    <footer className="relative green-gradient overflow-hidden text-[var(--color-cream)]">
      <GreenAtmos variant={3} />

      {/* ── Footer body ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a href={base} className="inline-block mb-4" aria-label="Yielded Evangelical Servants — Home">
              <img src={`${base}yes_logo_white.webp`} alt="Yielded Evangelical Servants" width={200} height={68} className="h-24 w-auto object-contain" />
            </a>
            <p className="font-heading text-[var(--color-cream)]/85 text-lg italic leading-snug max-w-xs mb-4">{t('brand_tagline')}</p>
            <p className="text-[var(--color-cream)]/65 text-sm leading-relaxed max-w-sm">{t('brand_founded')}</p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h2 className="text-[var(--color-cream)]/80 text-xs font-semibold tracking-[0.16em] uppercase mb-4">{t('footer_links')}</h2>
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <a key={l.label} href={l.href} className={linkCls}>{l.label}</a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h2 className="text-[var(--color-cream)]/80 text-xs font-semibold tracking-[0.16em] uppercase mb-4">{t('footer_connect')}</h2>
            <address className="not-italic text-[var(--color-cream)]/70 text-sm leading-relaxed mb-4">
              PO Box 770308<br />Orlando, FL 32837<br />
              <a href="mailto:info@yeservants.org" className="inline-block py-1 hover:text-[var(--color-accent-light)] transition-colors duration-300">info@yeservants.org</a>
            </address>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/profile.php?id=100080058171515" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded bg-[var(--color-cream)]/5 text-[var(--color-cream)]/60 hover:text-white hover:bg-[var(--color-accent-deep)] transition-all duration-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.025 10.125 11.928v-8.437H7.078v-3.49h3.047V9.43c0-3.006 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.491h-2.796v8.437C19.612 23.098 24 18.1 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/yeservants" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded bg-[var(--color-cream)]/5 text-[var(--color-cream)]/60 hover:text-white hover:bg-[var(--color-accent-deep)] transition-all duration-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <img src={`${base}images/candid-seal-platinum-2025.png`} alt="Candid Platinum Transparency Seal 2025" width={64} height={64} className="h-14 w-auto opacity-90 ml-1" />
            </div>
          </div>
        </div>

        {/* Central thematic statement (mapa: "Frase central en itálica") */}
        <p className="font-heading italic text-center text-[var(--color-cream)]/70 text-lg md:text-xl leading-snug max-w-2xl mx-auto mb-10">
          &ldquo;{t('brand_thematic')}&rdquo;
        </p>

        <div className="border-t border-[var(--color-cream)]/10 pt-6 flex flex-col gap-3">
          <p className="text-[var(--color-cream)]/65 text-xs leading-relaxed max-w-3xl">
            {t('footer_legal')} <span className="text-[var(--color-cream)]/60">{t('footer_ein')}</span>
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-[var(--color-cream)]/60 text-xs">{t('footer_copyright')}</p>
            <p className="text-[var(--color-cream)]/60 text-xs">
              Designed by{' '}
              <a href="https://www.fullstackevolved.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-cream)]/75 hover:text-[var(--color-accent-light)] transition-colors duration-300">FSEVO</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
