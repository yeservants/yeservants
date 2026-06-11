'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface Props {
  base: string;
}

/**
 * Block 3 — What YES Does. Intro paragraph + two cards side by side
 * (Financial Support / Logistical Support) with arrow bullets, per the
 * FINAL v2 webmaster note ("dos tarjetas lado a lado. Flechas como bullets").
 */
export default function HomeWhatYesDoes({ base: _base }: Props) {
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

  const cards: { title: string; sub: string; items: TranslationKey[] }[] = [
    {
      title: t('home_does_card1_title'),
      sub: t('home_does_card1_sub'),
      items: [
        'home_does_card1_item1',
        'home_does_card1_item2',
        'home_does_card1_item3',
        'home_does_card1_item4',
        'home_does_card1_item5',
      ],
    },
    {
      title: t('home_does_card2_title'),
      sub: t('home_does_card2_sub'),
      items: [
        'home_does_card2_item1',
        'home_does_card2_item2',
        'home_does_card2_item3',
        'home_does_card2_item4',
        'home_does_card2_item5',
      ],
    },
  ];

  return (
    <section ref={ref} className="relative bg-[var(--color-bg)] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header row */}
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('home_does_label')}
          </p>

          <p data-reveal="fade" className="text-lg md:text-xl leading-[1.8] text-[var(--color-text)]/85">
            {t('home_does_intro')}
          </p>
        </div>

        {/* Two cards — orange top border, arrow bullets */}
        <div data-reveal-stagger className="grid md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <article
              key={card.title}
              className="relative bg-white/60 border-t-2 border-[var(--color-accent)] rounded-xl p-7 md:p-10 shadow-[0_18px_40px_-24px_rgba(33,23,16,0.35)]"
              style={{ '--reveal-delay': `${i * 0.1}s` } as React.CSSProperties}
            >
              <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-text)] mb-2">
                {card.title}
              </h3>
              <p className="text-[var(--color-accent-deep)] text-xs tracking-[0.18em] uppercase font-semibold mb-7">
                {card.sub}
              </p>
              <ul className="space-y-3.5">
                {card.items.map((key) => (
                  <li key={key} className="flex items-start gap-3 text-[var(--color-text-muted)] text-base leading-relaxed">
                    <span aria-hidden="true" className="text-[var(--color-accent-deep)] font-semibold shrink-0 translate-y-px">→</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
