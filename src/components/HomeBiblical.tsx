'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

/**
 * Block 5 — The Biblical Foundation. Two intro paragraphs and FOUR scripture
 * cards (1 Cor 12:27 · Rom 10:15 · John 17:21 · John 13:35). The two Johns are
 * the theological core of why YES exists — unity of the Body as witness
 * (FINAL v2 webmaster note: "MUY IMPORTANTE"). Closes with the standalone
 * line "The hands and feet need the whole body."
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

  const cards: { ref: TranslationKey; quote: TranslationKey; gloss: TranslationKey }[] = [
    { ref: 'home_biblical_card1_ref', quote: 'home_biblical_card1_quote', gloss: 'home_biblical_card1_gloss' },
    { ref: 'home_biblical_card2_ref', quote: 'home_biblical_card2_quote', gloss: 'home_biblical_card2_gloss' },
    { ref: 'home_biblical_card3_ref', quote: 'home_biblical_card3_quote', gloss: 'home_biblical_card3_gloss' },
    { ref: 'home_biblical_card4_ref', quote: 'home_biblical_card4_quote', gloss: 'home_biblical_card4_gloss' },
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Eyebrow + intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p
            data-reveal="fade"
            className="flex items-center justify-center gap-3 text-[var(--color-gold-light)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-8"
          >
            <span aria-hidden="true" className="w-9 h-px bg-[var(--color-gold)]/50" />
            {t('home_biblical_label')}
            <span aria-hidden="true" className="w-9 h-px bg-[var(--color-gold)]/50" />
          </p>

          <div data-reveal="fade" className="space-y-6 text-lg leading-[1.8] text-[var(--color-cream)]/80 text-left md:text-center">
            <p>{t('home_biblical_p1')}</p>
            <p>{t('home_biblical_p2')}</p>
          </div>
        </div>

        {/* Four scripture cards */}
        <div data-reveal-stagger className="grid md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card) => (
            <article
              key={card.ref}
              className="relative rounded-2xl border border-[var(--color-gold)]/25 bg-[var(--color-primary-deep)]/45 px-7 py-9 md:px-10 md:py-10"
            >
              <p className="text-[var(--color-gold-light)] text-xs tracking-[0.24em] uppercase font-semibold mb-5">
                {t(card.ref)}
              </p>
              <blockquote className="font-heading italic text-[var(--color-cream)] text-xl md:text-2xl leading-[1.45] mb-5">
                &ldquo;{t(card.quote)}&rdquo;
              </blockquote>
              <p className="text-[var(--color-cream)]/65 text-base leading-relaxed">
                {t(card.gloss)}
              </p>
            </article>
          ))}
        </div>

        {/* Closing line — isolated */}
        <div data-reveal="mask" className="mt-16 pt-12 border-t border-[var(--color-cream)]/10 text-center">
          <p className="font-heading italic text-[var(--color-gold-light)] text-[clamp(1.4rem,3vw,2.2rem)] leading-snug max-w-3xl mx-auto">
            {t('home_biblical_close')}
          </p>
        </div>
      </div>
    </section>
  );
}
