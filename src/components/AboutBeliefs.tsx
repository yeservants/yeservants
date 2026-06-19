'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface Conviction {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  number: string;
}

const CONVICTIONS: Conviction[] = [
  { number: '01', titleKey: 'about_beliefs_1_title', bodyKey: 'about_beliefs_1_body' },
  { number: '02', titleKey: 'about_beliefs_2_title', bodyKey: 'about_beliefs_2_body' },
  { number: '03', titleKey: 'about_beliefs_3_title', bodyKey: 'about_beliefs_3_body' },
  { number: '04', titleKey: 'about_beliefs_4_title', bodyKey: 'about_beliefs_4_body' },
  { number: '05', titleKey: 'about_beliefs_5_title', bodyKey: 'about_beliefs_5_body' },
];

interface Props {
  base: string;
}

export default function AboutBeliefs({ base: _base }: Props) {
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
      className="relative py-24 md:py-32 overflow-hidden bg-[var(--color-bg)]"
    >
      {/* Dot grid texture */}
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div aria-hidden="true" className="float-cross absolute bottom-[12%] right-[4%] opacity-25" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('about_beliefs_eyebrow')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] max-w-3xl"
          >
            {t('about_beliefs_headline')}
          </h2>
        </div>

        {/* Conviction definition list — vertical stepper layout */}
        <ol
          data-reveal-stagger
          className="relative"
          aria-label="Five core convictions"
        >
          {/* Vertical connector line */}
          <div
            aria-hidden="true"
            className="absolute left-[2.75rem] top-6 bottom-6 w-px bg-[var(--color-accent)]/15 hidden md:block"
          />

          {CONVICTIONS.map((c) => (
            <li
              key={c.number}
              className="relative flex gap-8 md:gap-12 items-start py-8 border-b border-[var(--color-text)]/8 last:border-b-0"
            >
              {/* Big Playfair number */}
              <span
                aria-hidden="true"
                className="flex-shrink-0 font-heading font-medium text-[clamp(2.5rem,5vw,3.5rem)] text-[var(--color-accent)]/25 leading-none w-14 pt-1 text-right hidden md:block"
              >
                {c.number}
              </span>
              {/* Dot on the line */}
              <span
                aria-hidden="true"
                className="absolute left-[2.375rem] mt-3 w-3 h-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)] hidden md:block"
              />

              {/* Content */}
              <div className="flex-1 md:pl-4">
                <h3 className="font-heading font-medium text-xl md:text-2xl text-[var(--color-text)] mb-3 leading-snug">
                  {t(c.titleKey)}
                </h3>
                <p className="text-[var(--color-text-muted)] text-lg leading-relaxed max-w-2xl">
                  {t(c.bodyKey)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
