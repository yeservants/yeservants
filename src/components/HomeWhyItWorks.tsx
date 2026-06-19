'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
  sealSrc: string;
}

/**
 * Block 4 — Why It Works. A short paragraph and a row of statistics
 * (mapa: "Un párrafo corto y una fila de estadísticas").
 * 35+ Years · 20+ Nations · 20+ Active Missionaries · Platinum on Candid.
 */
export default function HomeWhyItWorks({ base: _base, sealSrc }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) =>
        el.classList.add('visible')
      );
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const stats = [
    { value: t('home_why_stat1_value'), label: t('home_why_stat1_label') },
    { value: t('home_why_stat2_value'), label: t('home_why_stat2_label') },
    { value: t('home_why_stat3_value'), label: t('home_why_stat3_label') },
    { value: t('home_why_stat4_value'), label: t('home_why_stat4_label') },
  ] as const;

  return (
    <section ref={ref} className="relative bg-[var(--color-surface)] py-24 md:py-32 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 atmos-glow-center pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <p
          data-reveal="fade"
          className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-8"
        >
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
          {t('home_why_label')}
        </p>

        {/* Short paragraph + Candid seal */}
        <div data-reveal="fade" className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center mb-14">
          <p className="text-lg md:text-xl leading-[1.8] text-[var(--color-text)]/85 max-w-3xl">
            {t('home_why_body')}
          </p>
          <img
            src={sealSrc}
            alt="Candid Platinum Transparency Seal 2025"
            width={120}
            height={120}
            loading="lazy"
            className="w-24 md:w-28 justify-self-center md:justify-self-end"
          />
        </div>

        {/* Stat row */}
        <div
          data-reveal-stagger
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 border-y border-[var(--color-primary)]/10 py-12"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <p className="font-heading font-medium text-[clamp(2.2rem,5.5vw,4rem)] leading-none mb-2 text-[var(--color-primary)]">
                {stat.value}
              </p>
              <p className="text-[var(--color-text-muted)] text-xs tracking-[0.2em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
