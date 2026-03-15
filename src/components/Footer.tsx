'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  base: string;
}

export default function Footer({ base }: Props) {
  const year = 2026;
  const { t } = useLang();
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 28 });
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 78%', once: true },
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, []);

  const links = [
    { href: `${base}`, label: t('footer_home') },
    { href: `${base}missionaries/`, label: t('footer_missionaries') },
    { href: `${base}join/`, label: t('footer_getInvolved') },
    { href: `${base}donate/`, label: t('footer_donate') },
    { href: `${base}contact/`, label: t('footer_contact') },
  ];

  return (
    <footer className="relative green-gradient overflow-hidden">
      {/* Shared accent glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 75% 20%, rgba(194,125,65,0.13) 0%, transparent 55%)' }} />
      {/* Decorative SVG crosses */}
      <svg aria-hidden="true" className="absolute top-[4%] left-[6%] text-[var(--color-accent)] opacity-[0.13]" width="36" height="54" viewBox="0 0 40 60" fill="currentColor"><rect x="16" y="0" width="8" height="60" rx="3"/><rect x="0" y="18" width="40" height="8" rx="3"/></svg>
      <svg aria-hidden="true" className="absolute top-[12%] right-[8%] text-[var(--color-accent)] opacity-[0.10]" width="24" height="36" viewBox="0 0 40 60" fill="currentColor"><rect x="16" y="0" width="8" height="60" rx="3"/><rect x="0" y="18" width="40" height="8" rx="3"/></svg>
      <svg aria-hidden="true" className="absolute top-[38%] left-[50%] -translate-x-1/2 text-white opacity-[0.025]" width="110" height="165" viewBox="0 0 40 60" fill="currentColor"><rect x="16" y="0" width="8" height="60" rx="2"/><rect x="0" y="18" width="40" height="8" rx="2"/></svg>
      <svg aria-hidden="true" className="absolute bottom-[12%] left-[4%] text-white opacity-[0.05]" width="18" height="27" viewBox="0 0 40 60" fill="currentColor"><rect x="16" y="0" width="8" height="60" rx="3"/><rect x="0" y="18" width="40" height="8" rx="3"/></svg>
      <svg aria-hidden="true" className="absolute top-[6%] right-[30%] text-white opacity-[0.04]" width="14" height="21" viewBox="0 0 40 60" fill="currentColor"><rect x="16" y="0" width="8" height="60" rx="3"/><rect x="0" y="18" width="40" height="8" rx="3"/></svg>

      {/* ── CTA ── */}
      <div className="relative z-10 border-b border-[#FAF8F4]/10 py-20 md:py-28 px-6">
        <div ref={ctaRef} className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--color-accent)] text-xs tracking-[0.25em] uppercase font-medium mb-5">
            2 Corinthians 9:7
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light italic text-[#FAF8F4] mb-6 leading-tight">
            Support The Mission
          </h2>
          <p className="text-[#FAF8F4]/65 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Your generosity enables missionaries to focus on their calling. Every gift, no matter the size, makes an eternal difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.aplos.com/aws/give/YieldedEvangelicalServantsInc/YesDonations"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[var(--color-accent)] text-white font-medium rounded transition-opacity duration-300 hover:opacity-90"
            >
              Donate Online
            </a>
            <a
              href={`${base}donate/`}
              className="px-8 py-3.5 border border-[#FAF8F4]/30 text-[#FAF8F4] font-medium rounded transition-all duration-300 hover:bg-[#FAF8F4]/10"
            >
              Give By Mail
            </a>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href={base} className="inline-block mb-4">
              <img
                src={`${base}yes_logo_white.png`}
                alt="Yielded Evangelical Servants"
                width={160}
                height={54}
                className="h-16 w-auto object-contain"
              />
            </a>
            <p className="text-[#FAF8F4]/50 text-sm leading-relaxed max-w-sm whitespace-pre-line">
              Yielded Evangelical Servants, Inc.{'\n'}{t('footer_tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#FAF8F4]/80 text-sm font-medium tracking-[0.1em] uppercase mb-4">
              {t('footer_nav')}
            </h4>
            <nav className="flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[#FAF8F4]/50 text-sm hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact + Socials + Seal */}
          <div>
            <h4 className="text-[#FAF8F4]/80 text-sm font-medium tracking-[0.1em] uppercase mb-4">
              {t('footer_contact')}
            </h4>
            <address className="not-italic text-[#FAF8F4]/50 text-sm leading-relaxed mb-4">
              PO Box 770308<br />
              Orlando, FL 32837<br />
              <a href="mailto:info@yeservants.org" className="hover:text-[var(--color-accent)] transition-colors duration-300">
                info@yeservants.org
              </a>
            </address>

            <div className="flex gap-3 mb-6">
              <a href="https://www.facebook.com/profile.php?id=100080058171515" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded bg-white/5 text-[#FAF8F4]/60 hover:text-[var(--color-accent)] hover:bg-white/10 transition-all duration-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.025 10.125 11.928v-8.437H7.078v-3.49h3.047V9.43c0-3.006 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.491h-2.796v8.437C19.612 23.098 24 18.1 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/yeservants" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded bg-white/5 text-[#FAF8F4]/60 hover:text-[var(--color-accent)] hover:bg-white/10 transition-all duration-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>

            <img src={`${base}images/candid-seal-platinum-2025.png`} alt="Candid Platinum Seal 2025" width={80} height={80} className="h-16 w-auto opacity-90" />
          </div>
        </div>

        <div className="border-t border-[#FAF8F4]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#FAF8F4]/30 text-xs leading-relaxed">
            {t('footer_copyright')}
          </p>
          <p className="text-[#FAF8F4]/20 text-xs">
            Designed by{' '}
            <a
              href="https://www.fullstackevolved.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FAF8F4]/40 hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              FSEVO
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
