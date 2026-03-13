'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang, type Lang } from '../i18n/useLang';

interface Props {
  base: string;
}

let initialized = false;

export default function Nav({ base }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lang, changeLang, t } = useLang();

  useEffect(() => {
    if (initialized) return;
    initialized = true;

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    document.addEventListener('astro:before-preparation', () => {
      setMenuOpen(false);
      setDropdownOpen(false);
      document.body.classList.remove('overflow-hidden');
    });
  }, []);

  const openDropdown = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (next) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  const linkCls = 'text-sm font-medium tracking-wide text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors duration-300';

  const LangToggle = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-0.5 text-xs font-medium ${className}`}>
      {(['en', 'es'] as Lang[]).map((l, i) => (
        <>
          {i > 0 && <span key={`sep-${l}`} className="text-[var(--color-primary)]/30 mx-0.5">|</span>}
          <button
            key={l}
            onClick={() => changeLang(l)}
            className={`px-1.5 py-0.5 rounded transition-colors duration-200 uppercase tracking-wider ${
              lang === l
                ? 'text-[var(--color-accent)] font-semibold'
                : 'text-[var(--color-primary)]/50 hover:text-[var(--color-primary)]'
            }`}
          >
            {l}
          </button>
        </>
      ))}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-[var(--color-primary)]/10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20 md:h-24">
        <a href={base} className="flex items-center flex-shrink-0">
          <img
            src={`${base}yes_logo-04.png`}
            alt="Yielded Evangelical Servants"
            width={200}
            height={68}
            className="h-16 w-auto object-contain"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href={`${base}about/`} className={linkCls}>{t('nav_about')}</a>
          <a href={`${base}missionaries/`} className={linkCls}>{t('nav_missionaries')}</a>

          {/* Get Involved dropdown */}
          <div className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <button
              className={`${linkCls} flex items-center gap-1`}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {t('nav_getInvolved')}
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-52"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-[var(--color-primary)]/5">
                  {[
                    { href: `${base}join/`, label: t('nav_becomeMissionary') },
                    { href: `${base}send-a-team/`, label: t('nav_sendTeam') },
                    { href: `${base}donate/`, label: t('nav_donate') },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-5 py-3 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)] transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href={`${base}contact/`} className={linkCls}>{t('nav_contact')}</a>

          {/* Language toggle */}
          <LangToggle />

          <a
            href={`${base}donate/`}
            className="px-5 py-2 bg-[var(--color-accent)] text-white text-sm font-medium rounded transition-opacity duration-300 hover:opacity-90"
          >
            {t('nav_donate')}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-primary)] px-6 py-8 flex flex-col gap-4">
          {[
            { href: `${base}about/`, label: t('nav_about') },
            { href: `${base}missionaries/`, label: t('nav_missionaries') },
            { href: `${base}join/`, label: t('nav_becomeMissionary') },
            { href: `${base}send-a-team/`, label: t('nav_sendTeam') },
            { href: `${base}contact/`, label: t('nav_contact') },
          ].map((l) => (
            <a key={l.href} href={l.href} className="text-[#FAF8F4] text-lg font-medium hover:text-[var(--color-accent)] transition-colors duration-300" onClick={closeMenu}>
              {l.label}
            </a>
          ))}
          <a
            href={`${base}donate/`}
            className="mt-2 inline-block px-6 py-3 bg-[var(--color-accent)] text-white font-medium rounded text-center"
            onClick={closeMenu}
          >
            {t('nav_donate')}
          </a>
          {/* Mobile lang toggle */}
          <div className="pt-2 border-t border-white/10">
            <LangToggle className="[&_button]:text-white/60 [&_button.font-semibold]:text-[var(--color-accent)] [&_span]:text-white/20" />
          </div>
        </div>
      )}
    </nav>
  );
}
