'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

/**
 * v7 — Section 8: The Body of Christ. "This is not charity. This is the Body
 * functioning as one." One paragraph, then the two scriptures the source
 * document carries here (1 Cor 12:26-27 · Luke 6:38).
 */
export default function HomeBiblical({ base: _base }: Props) {
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scriptures: { ref: TranslationKey; quote: TranslationKey }[] = [
    { ref: 'home_biblical_card1_ref', quote: 'home_biblical_card1_quote' },
    { ref: 'home_biblical_card2_ref', quote: 'home_biblical_card2_quote' },
  ];

  return (
    <section
      ref={ref}
      className="relative green-gradient text-[var(--color-cream)] py-14 md:py-20 overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 atmos-glow-center pointer-events-none" />
      <div aria-hidden="true" className="absolute top-0 left-[8%] float-line h-64 hidden md:block" />
      <div aria-hidden="true" className="absolute bottom-0 right-[8%] float-line h-64 hidden md:block" />

      <GreenAtmos variant={3} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
        <p
          data-reveal="fade"
          className="flex items-center gap-3 text-[var(--color-gold-light)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
        >
          <span aria-hidden="true" className="w-9 h-px bg-[var(--color-gold)]/50" />
          {t('home_biblical_label')}
        </p>

        <h2
          data-reveal="mask"
          className="font-heading font-medium text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.15] mb-8"
        >
          {t('home_biblical_headline')}
        </h2>

        <p
          data-reveal="fade"
          className="text-lg leading-[1.8] text-[var(--color-cream)]/80"
        >
          {t('home_biblical_p1')}
        </p>

        <div data-reveal-stagger className="mt-12 space-y-6">
          {scriptures.map((s) => (
            <blockquote
              key={s.ref}
              className="rounded-r-2xl border-l-[3px] border-[var(--color-gold)] bg-[var(--color-primary-deep)]/45 px-7 py-8 md:px-10"
            >
              <p className="font-heading italic text-[var(--color-cream)] text-lg md:text-xl leading-[1.65]">
                &ldquo;{t(s.quote)}&rdquo;
              </p>
              <footer className="mt-5 text-[var(--color-gold-light)] text-xs tracking-[0.24em] uppercase font-semibold">
                {t(s.ref)}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
