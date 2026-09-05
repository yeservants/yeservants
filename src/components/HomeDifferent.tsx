'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface Props {
  base: string;
}

/**
 * v7 — What Makes YES Different. "Four things no one else is doing."
 * Editorial numbered rows (01–04) on warm off-white: ghost Playfair numeral
 * left, title + body right, thin rules between. Asymmetric — even rows are
 * indented; deliberately NOT a symmetric card grid.
 */
export default function HomeDifferent({ base: _base }: Props) {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const points: { num: string; title: TranslationKey; body: TranslationKey }[] = [
    { num: '01', title: 'home_diff_1_title', body: 'home_diff_1_body' },
    { num: '02', title: 'home_diff_2_title', body: 'home_diff_2_body' },
    { num: '03', title: 'home_diff_3_title', body: 'home_diff_3_body' },
    { num: '04', title: 'home_diff_4_title', body: 'home_diff_4_body' },
  ];

  return (
    <section ref={ref} id="yes-different" className="relative bg-[var(--color-bg)] py-12 md:py-18 overflow-hidden scroll-mt-24">
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-[0.35] pointer-events-none" />
      <div aria-hidden="true" className="absolute top-24 right-[6%] float-line h-64 hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
          >
            {t('home_diff_label')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium text-[var(--color-text)] text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.12]"
          >
            {t('home_diff_headline')}
          </h2>
        </div>

        <div>
          {points.map((p, i) => (
            <article
              key={p.num}
              data-reveal="fade"
              className={`group grid md:grid-cols-[7rem_1fr] gap-4 md:gap-10 py-10 md:py-14 border-t border-[var(--color-primary)]/12 ${
                i % 2 === 1 ? 'md:pl-14' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="font-heading font-bold text-[3.4rem] md:text-[4.6rem] leading-[0.9] text-transparent [-webkit-text-stroke:1.5px_var(--color-gold)] opacity-70 group-hover:opacity-100 transition-opacity duration-500 select-none"
              >
                {p.num}
              </span>
              <div className="max-w-2xl">
                <h3 className="font-heading font-medium text-[var(--color-text)] text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.3] mb-4">
                  {t(p.title)}
                </h3>
                <p className="text-lg leading-[1.75] text-[var(--color-text-muted)]">{t(p.body)}</p>
              </div>
            </article>
          ))}
          <div aria-hidden="true" className="border-t border-[var(--color-primary)]/12" />
        </div>
      </div>
    </section>
  );
}
