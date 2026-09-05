'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface Props {
  base: string;
}

/**
 * v7 — Section 9: Why Trust YES. "35 years. Platinum-rated. Founded by
 * missionaries, for missionaries." One paragraph, then the five credential
 * pills from the source document.
 */
export default function HomeTrust({ base: _base }: Props) {
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

  const pills: TranslationKey[] = [
    'home_trust_i1',
    'home_trust_i2',
    'home_trust_i3',
    'home_trust_i4',
    'home_trust_i5',
  ];

  return (
    <section ref={ref} className="relative bg-[var(--color-surface)] py-12 md:py-18 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 atmos-glow-center pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <p
          data-reveal="fade"
          className="flex items-center gap-3 text-[var(--color-accent-deep)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
        >
          {t('home_trust_label')}
        </p>

        <h2
          data-reveal="mask"
          className="font-heading font-medium text-[var(--color-text)] text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.15] mb-8 max-w-4xl"
        >
          {t('home_trust_headline')}
        </h2>

        <p
          data-reveal="fade"
          className="text-lg md:text-xl leading-[1.8] text-[var(--color-text)]/85 max-w-3xl"
        >
          {t('home_trust_body')}
        </p>

        <ul data-reveal-stagger className="mt-10 flex flex-wrap gap-3">
          {pills.map((key) => (
            <li
              key={key}
              className="rounded-full border border-[var(--color-primary)]/15 bg-[var(--color-bg)] px-5 py-2 text-sm text-[var(--color-text-muted)]"
            >
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
