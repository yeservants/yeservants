'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';
import GreenAtmos from './GreenAtmos';

interface Props {
  eyebrowKey?: TranslationKey;
  headlineKey: TranslationKey;
  introKey?: TranslationKey;
  scriptureKey?: TranslationKey;
  children?: ReactNode;
}

/**
 * Shared page hero — the consistent opener for every inner page (About, Our Work,
 * Gospel Workers, How It Works, Give, For Donors). Deep forest-green, the same
 * atmosphere language as the home hero (god-rays, motes, ghost cross), eyebrow +
 * Playfair headline + intro. Home keeps its richer flagship Hero.
 */
export default function PageHero({ eyebrowKey, headlineKey, introKey, scriptureKey, children }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden green-gradient text-[var(--color-cream)] pt-36 pb-20 md:pt-44 md:pb-28"
    >
      {/* Shared green-block atmosphere (god-rays, ghost logo, ghost crosses, motes) */}
      <GreenAtmos />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
        {eyebrowKey && (
          <p data-reveal="fade" className="flex items-center justify-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-7">
            <span aria-hidden="true" className="w-9 h-px bg-[var(--color-accent-light)]/50" />
            {t(eyebrowKey)}
            <span aria-hidden="true" className="w-9 h-px bg-[var(--color-accent-light)]/50" />
          </p>
        )}

        <h1 data-reveal="mask" className="font-heading font-medium leading-[1.06] text-[clamp(2.1rem,4.6vw,3.9rem)] text-[var(--color-cream)] max-w-3xl mx-auto">
          {t(headlineKey)}
        </h1>

        {scriptureKey && (
          <p data-reveal="fade" className="mt-5 text-[var(--color-accent-light)] text-xs tracking-[0.22em] uppercase font-medium">
            {t(scriptureKey)}
          </p>
        )}

        {introKey && (
          <p data-reveal="fade" className="mt-8 text-[var(--color-cream)]/75 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            {t(introKey)}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
