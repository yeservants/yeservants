'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface Props {
  base: string;
}

/**
 * v7 — Where Your Partnership Goes. "God makes the connection. We stay."
 * A central Playfair quote ("You partner with YES...") followed by the four
 * support areas in an offset two-column rhythm — the right column drops,
 * so the section never reads as a symmetric card grid.
 */
export default function HomeSupport({ base: _base }: Props) {
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

  const areas: { title: TranslationKey; body: TranslationKey }[] = [
    { title: 'home_sup_1_title', body: 'home_sup_1_body' },
    { title: 'home_sup_2_title', body: 'home_sup_2_body' },
    { title: 'home_sup_3_title', body: 'home_sup_3_body' },
    { title: 'home_sup_4_title', body: 'home_sup_4_body' },
  ];

  return (
    <section ref={ref} className="relative bg-[var(--color-bg)] py-12 md:py-18 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-[0.3] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-16 left-[5%] float-line h-56 hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
          >
            {t('home_sup_label')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium text-[var(--color-text)] text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.12]"
          >
            {t('home_sup_headline')}
          </h2>
        </div>

        {/* The partnership chain quote */}
        <blockquote
          data-reveal="mask"
          className="max-w-2xl mb-16 md:mb-24 font-heading italic text-[var(--color-primary)] text-[clamp(1.3rem,2.6vw,1.9rem)] leading-[1.55] border-l-[3px] border-[var(--color-accent)] pl-6 md:pl-8"
        >
          &ldquo;{t('home_sup_quote')}&rdquo;
        </blockquote>

        {/* Four areas — offset columns */}
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-12 md:gap-y-16">
          {areas.map((a, i) => (
            <article
              key={a.title}
              data-reveal="fade"
              className={i % 2 === 1 ? 'md:translate-y-10' : ''}
            >
              <span aria-hidden="true" className="block w-9 h-[2px] bg-[var(--color-gold)] mb-6" />
              <h3 className="font-heading font-medium text-[var(--color-text)] text-xl md:text-2xl leading-[1.3] mb-4">
                {t(a.title)}
              </h3>
              <p className="text-lg leading-[1.75] text-[var(--color-text-muted)]">{t(a.body)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
