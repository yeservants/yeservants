'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

/**
 * About — closing stats band: "35 Years of Field-Proven Partnership".
 * Founded 1990 · 20+ nations · 20+ active missionaries · Platinum (Candid)
 * · 501(c)(3), closing with the "We don't parachute in" quote.
 */
export default function AboutStats({ base: _base }: Props) {
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

  const stats: { label: TranslationKey; value: TranslationKey }[] = [
    { label: 'about_stats_1_label', value: 'about_stats_1_value' },
    { label: 'about_stats_2_label', value: 'about_stats_2_value' },
    { label: 'about_stats_3_label', value: 'about_stats_3_value' },
    { label: 'about_stats_4_label', value: 'about_stats_4_value' },
    { label: 'about_stats_5_label', value: 'about_stats_5_value' },
  ];

  return (
    <section
      ref={ref}
      className="relative green-gradient text-[var(--color-cream)] py-24 md:py-32 overflow-hidden"
    >
      <GreenAtmos variant={5} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
        <h2
          data-reveal="mask"
          className="font-heading font-medium leading-[1.1] text-[clamp(1.8rem,3.8vw,3rem)] text-[var(--color-cream)] mb-14"
        >
          {t('about_stats_headline')}
        </h2>

        {/* Stat list */}
        <dl
          data-reveal-stagger
          className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-10 border-y border-[var(--color-cream)]/10 py-12 mb-14"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dd className="font-heading font-medium text-[clamp(1.5rem,3.2vw,2.4rem)] leading-tight text-[var(--color-gold-light)] mb-2 order-1">
                {t(s.value)}
              </dd>
              <dt className="text-[var(--color-cream)]/55 text-[11px] tracking-[0.18em] uppercase">
                {t(s.label)}
              </dt>
            </div>
          ))}
        </dl>

        {/* Parachute quote */}
        <blockquote
          data-reveal="fade"
          className="font-heading italic text-[var(--color-cream)]/85 text-xl md:text-2xl leading-[1.55] max-w-3xl mx-auto"
        >
          &ldquo;{t('about_stats_quote')}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
