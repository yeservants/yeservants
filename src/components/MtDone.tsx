'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

const ITEMS: TranslationKey[] = [
  'mt_done_i1',
  'mt_done_i2',
  'mt_done_i3',
  'mt_done_i4',
  'mt_done_i5',
];

interface Props {
  base: string;
}

/**
 * Mission Teams Block 2 — What Our Teams Have Done. Five generalized work types
 * (church roofs/buildings, home restoration, medical outreach, schools,
 * evangelism with local pastors) — not tied to single countries — plus a
 * closing line on the pattern and how the change runs both directions.
 */
export default function MtDone({ base: _base }: Props) {
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
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[var(--color-bg)] overflow-hidden"
      aria-labelledby="mt-done-heading"
    >
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div aria-hidden="true" className="float-cross absolute top-[10%] right-[5%] opacity-25" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
          >
            {t('mt_done_label')}
          </p>
          <h2
            id="mt-done-heading"
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)]"
          >
            {t('mt_done_headline')}
          </h2>
        </div>

        {/* Arrow list — one item per line, generous space */}
        <ul data-reveal-stagger className="max-w-3xl" aria-label={t('mt_done_label')}>
          {ITEMS.map((key) => (
            <li
              key={key}
              className="flex items-start gap-4 py-5 border-b border-[var(--color-primary)]/10 last:border-b-0"
            >
              <span aria-hidden="true" className="text-[var(--color-accent-deep)] font-semibold shrink-0 translate-y-1">→</span>
              <p className="text-[var(--color-text)]/85 text-lg md:text-xl leading-relaxed">{t(key)}</p>
            </li>
          ))}
        </ul>

        {/* Closing line — the pattern, both directions */}
        <p
          data-reveal="fade"
          className="mt-12 max-w-3xl font-heading italic text-[var(--color-accent-deep)] text-[clamp(1.2rem,2.4vw,1.7rem)] leading-snug"
        >
          {t('mt_done_closing')}
        </p>
      </div>
    </section>
  );
}
