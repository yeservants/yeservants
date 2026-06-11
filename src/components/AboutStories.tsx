'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

/**
 * About Block 2 — "What We Saw That We Couldn't Unsee". The three field
 * stories in their short form (the full versions live on The Missionaries
 * page), closing with the italic line that names what was missing.
 * Dark espresso block — these stories carry the page's emotional weight.
 */
export default function AboutStories({ base: _base }: Props) {
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

  const stories: { label: TranslationKey; body: TranslationKey }[] = [
    { label: 'about_saw_s1_label', body: 'about_saw_s1_body' },
    { label: 'about_saw_s2_label', body: 'about_saw_s2_body' },
    { label: 'about_saw_s3_label', body: 'about_saw_s3_body' },
  ];

  return (
    <section
      ref={ref}
      className="relative green-gradient text-[var(--color-cream)] py-24 md:py-32 overflow-hidden"
    >
      <GreenAtmos variant={2} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-gold-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-gold)]/50" />
            {t('about_saw_eyebrow')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-cream)]"
          >
            {t('about_saw_headline')}
          </h2>
        </div>

        {/* Three stories */}
        <div data-reveal-stagger className="grid md:grid-cols-3 gap-6 md:gap-8">
          {stories.map((s, i) => (
            <article
              key={s.label}
              className="relative rounded-2xl border border-[var(--color-gold)]/20 bg-[var(--color-primary-deep)]/45 px-7 py-9"
              style={{ '--reveal-delay': `${i * 0.09}s` } as React.CSSProperties}
            >
              <p className="text-[var(--color-gold-light)] text-xs tracking-[0.24em] uppercase font-semibold mb-5">
                {t(s.label)}
              </p>
              <p className="text-[var(--color-cream)]/80 text-base md:text-lg leading-[1.75]">
                {t(s.body)}
              </p>
            </article>
          ))}
        </div>

        {/* Closing line — isolated, italic */}
        <div data-reveal="mask" className="mt-16 pt-12 border-t border-[var(--color-cream)]/10 text-center">
          <p className="font-heading italic text-[var(--color-gold-light)] text-[clamp(1.3rem,2.8vw,2rem)] leading-snug max-w-3xl mx-auto">
            {t('about_saw_closing')}
          </p>
        </div>
      </div>
    </section>
  );
}
