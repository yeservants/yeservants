'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../i18n/useLang';
import type { Lang } from '../i18n/translations';

interface Props { base: string; }

let initialized = false; // Nav uses transition:persist → does NOT remount; guard is correct here.

export default function Nav({ base }: Props) {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const [currentPath, setCurrentPath]   = useState('');

  const menuRef      = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  const { lang, changeLang, t } = useLang();

  /* ── persistent listeners (run once) ─────────────────────── */
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    setCurrentPath(window.location.pathname);

    document.addEventListener('astro:page-load', () => {
      setCurrentPath(window.location.pathname);
      setMenuOpen(false);
    });
    document.addEventListener('astro:before-preparation', () => {
      setMenuOpen(false);
      document.body.classList.remove('overflow-hidden');
    });
  }, []);

  /* ── mount overlay when opening ───────────────────────────── */
  useEffect(() => { if (menuOpen) setMenuRendered(true); }, [menuOpen]);

  /* ── animate overlay once in the DOM ──────────────────────── */
  useEffect(() => {
    const menu  = menuRef.current;
    const links = menuLinksRef.current;
    if (!menu || !menuRendered) return;

    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
      gsap.fromTo(menu,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)',   opacity: 1, duration: 0.55, ease: 'power4.inOut' }
      );
      if (links) {
        gsap.fromTo(Array.from(links.children),
          { opacity: 0, x: 48 },
          { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out', stagger: 0.06, delay: 0.25 }
        );
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      gsap.to(menu, {
        clipPath: 'inset(0 0 100% 0)', opacity: 0,
        duration: 0.4, ease: 'power4.inOut',
        onComplete: () => setMenuRendered(false),
      });
    }
  }, [menuOpen, menuRendered]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) => {
    const slug = href.replace(base, '').replace(/\/$/, '');
    if (!slug) return currentPath === '/' || currentPath === base || currentPath === base.replace(/\/$/, '');
    return currentPath.includes(slug);
  };

  /* ── V3 primary navigation ────────────────────────────────── */
  const links = [
    { href: `${base}about/`,          label: t('nav_aboutYes') },
    { href: `${base}our-work/`,       label: t('nav_ourWork') },
    { href: `${base}gospel-workers/`, label: t('nav_gospelWorkers') },
    { href: `${base}how-it-works/`,   label: t('nav_howItWorks') },
  ];
  const mobileLinks = [
    { href: base,                     label: t('nav_home') },
    ...links,
    { href: `${base}give/`,           label: t('nav_give') },
  ];

  const LangToggle = ({ light = false }: { light?: boolean }) => (
    <div className="flex items-center gap-0.5">
      {(['en', 'es'] as Lang[]).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span className={`mx-1 text-[10px] ${light ? 'text-[var(--color-cream)]/25' : 'text-[var(--color-primary)]/25'}`}>·</span>
          )}
          <button
            onClick={() => changeLang(l)}
            aria-label={l === 'en' ? 'English' : 'Español'}
            aria-pressed={lang === l}
            className={`inline-flex items-center px-2 py-1.5 text-[12px] tracking-[0.12em] uppercase font-medium transition-colors duration-200 ${
              lang === l
                ? light
                  ? 'text-[var(--color-accent-light)] font-semibold'
                  : 'text-[var(--color-accent-deep)] font-semibold'
                : light
                  ? 'text-[var(--color-cream)]/45 hover:text-[var(--color-cream)]/80'
                  : 'text-[var(--color-primary)]/45 hover:text-[var(--color-primary)]'
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );

  const linkCls = (href: string) =>
    `relative text-[13px] tracking-[0.14em] uppercase font-medium transition-colors duration-300 group ${
      isActive(href) ? 'text-[var(--color-accent-deep)]' : 'text-[var(--color-primary)] hover:text-[var(--color-accent-deep)]'
    }`;

  return (
    <>
      {/* ── Desktop / Tablet nav ───────────────────────────── */}
      <nav
        className={`fixed z-50 left-0 right-0 top-3 mx-5 md:mx-12 lg:mx-20 rounded-2xl ring-1 ring-[var(--color-primary)]/[0.08] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[var(--color-bg)]/95 backdrop-blur-md ${
          scrolled ? 'shadow-[0_8px_32px_rgba(31,58,38,0.16)]' : 'shadow-[0_4px_24px_rgba(31,58,38,0.10)]'
        }`}
      >
        <div className={`mx-auto flex items-center justify-between transition-all duration-500 ${scrolled ? 'px-5 h-20' : 'px-6 h-24'}`}>
          <a href={base} aria-label="Yielded Evangelical Servants — Home" className="flex-shrink-0 flex items-center">
            <img
              src={`${base}yes_logo-04.webp`}
              alt="Yielded Evangelical Servants"
              width={200} height={68}
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}
            />
          </a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a key={link.href} href={link.href} className={linkCls(link.href)}>
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--color-accent)] transition-transform duration-300 origin-left ${
                  isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </a>
            ))}

            <div aria-hidden="true" className="w-px h-3.5 bg-[var(--color-primary)]/15 rounded-full" />
            <LangToggle />

            <a
              href={`${base}give/`}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[var(--color-accent-deep)] text-white text-[12px] tracking-[0.16em] uppercase font-semibold hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_2px_10px_rgba(232,117,26,0.30)]"
            >
              <span aria-hidden="true" className="text-[10px] leading-none">✛</span>
              {t('nav_give')}
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 -mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className={`block h-px bg-[var(--color-primary)] transition-all duration-300 ${menuOpen ? 'w-5 rotate-45 translate-y-[5px]' : 'w-5'}`} />
            <span className={`block h-px bg-[var(--color-primary)] transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-3.5'}`} />
            <span className={`block h-px bg-[var(--color-primary)] transition-all duration-300 ${menuOpen ? 'w-5 -rotate-45 -translate-y-[5px]' : 'w-5'}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay (top-level sibling, not nested under backdrop-blur) ─ */}
      {menuRendered && (
        <div
          ref={menuRef}
          id="mobile-nav"
          className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-gradient-to-br from-[#234029] via-[var(--color-primary)] to-[#14271a]"
        >
          <div aria-hidden="true" className="absolute inset-0 dot-grid-light opacity-[0.08]" />
          <div aria-hidden="true" className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-[var(--color-accent)]/[0.07] blur-[80px] pointer-events-none" />
          <div aria-hidden="true" className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-[#1a5c3a]/40 blur-[100px] pointer-events-none" />
          <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 font-heading font-bold text-[clamp(5rem,28vw,18rem)] leading-none pointer-events-none select-none text-[var(--color-cream)]/[0.04] whitespace-nowrap overflow-hidden">
            SERVE
          </div>

          <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-6 border-b border-[var(--color-cream)]/[0.08]">
            <img src={`${base}yes_logo_white.webp`} alt="YES" width={140} height={48} className="h-14 w-auto object-contain" />
            <button onClick={closeMenu} aria-label="Close menu" className="w-10 h-10 flex items-center justify-center text-[var(--color-cream)]/55 hover:text-[var(--color-cream)] transition-colors duration-200">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={menuLinksRef} className="relative z-10 flex flex-col px-7 pt-8 gap-0 flex-1 overflow-y-auto">
            {mobileLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="group flex items-baseline gap-4 py-4 border-b border-[var(--color-cream)]/[0.07] text-[var(--color-cream)]/75 hover:text-[var(--color-cream)] transition-colors duration-300"
              >
                <span aria-hidden="true" className="text-[var(--color-accent)]/50 group-hover:text-[var(--color-accent)] transition-colors duration-300 text-xs shrink-0 translate-y-[-2px]">✛</span>
                <span className="font-heading text-[clamp(1.8rem,6vw,2.5rem)] font-normal leading-tight">{link.label}</span>
              </a>
            ))}

            <a
              href={`${base}give/`}
              onClick={closeMenu}
              className="mt-8 self-stretch flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[var(--color-accent-deep)] text-white text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-[var(--color-accent-hover)] transition-colors duration-300"
            >
              <span aria-hidden="true" className="text-[9px] leading-none">✛</span>
              {t('nav_give')}
            </a>

            <div className="mt-8 pt-5 border-t border-[var(--color-cream)]/[0.08]">
              <LangToggle light />
            </div>
          </div>

          <div className="relative z-10 px-7 pb-8 pt-4">
            <p className="font-heading text-[var(--color-cream)]/[0.22] text-base italic leading-relaxed">
              &ldquo;{t('brand_thematic')}&rdquo;
            </p>
          </div>
        </div>
      )}
    </>
  );
}
