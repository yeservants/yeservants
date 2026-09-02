'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
  sealSrc: string;
}

/**
 * v7 — Section 2: the proof strip that sits directly under the hero.
 * 35+ years · 20+ nations · Platinum (Candid) · 501(c)(3) EIN 54-1558343,
 * with the Candid seal anchoring the row.
 */
export default function HomeStats({ base: _base, sealSrc }: Props) {
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
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const stats = [
    { value: t('home_stat1_value'), label: t('home_stat1_label') },
    { value: t('home_stat2_value'), label: t('home_stat2_label') },
    { value: t('home_stat3_value'), label: t('home_stat3_label') },
    { value: t('home_stat4_value'), label: t('home_stat4_label') },
  ] as const;

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-surface)] border-b border-[var(--color-primary)]/10 overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 atmos-glow-center pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
          <div
            data-reveal-stagger
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 flex-1 divide-y-0 md:divide-x md:divide-[var(--color-primary)]/10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:px-4">
                <p className="font-heading font-medium text-[clamp(1.7rem,4vw,2.8rem)] leading-none mb-2 text-[var(--color-accent-deep)]">
                  {stat.value}
                </p>
                <p className="text-[var(--color-text-muted)] text-[11px] md:text-xs tracking-[0.2em] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <img
            data-reveal="fade"
            src={sealSrc}
            alt="Candid Platinum Transparency Seal 2025"
            width={112}
            height={112}
            loading="lazy"
            className="w-20 md:w-24 self-center shrink-0"
          />
        </div>
      </div>
    </section>
  );
}
