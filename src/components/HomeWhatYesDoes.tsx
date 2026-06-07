'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
}

export default function HomeWhatYesDoes({ base }: Props) {
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

  const cards = [
    {
      title: t('home_does_card1_title'),
      sub: t('home_does_card1_sub'),
      body: t('home_does_card1_body'),
    },
    {
      title: t('home_does_card2_title'),
      sub: t('home_does_card2_sub'),
      body: t('home_does_card2_body'),
    },
    {
      title: t('home_does_card3_title'),
      sub: t('home_does_card3_sub'),
      body: t('home_does_card3_body'),
    },
  ] as const;

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-bg)] py-24 md:py-32"
    >
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

          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] mb-6"
          >
            {t('home_does_headline')}
          </h2>

          <p data-reveal="fade" className="text-lg leading-relaxed text-[var(--color-text-muted)]">
            {t('home_does_intro')}
          </p>
        </div>

        {/* Cards — orange top-border per kit recipe */}
        <div
          data-reveal-stagger
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {cards.map((card, i) => (
            <article
              key={card.title}
              className="relative bg-white/60 border-t-2 border-[var(--color-accent)] rounded-xl p-7 md:p-8 shadow-[0_18px_40px_-24px_rgba(31,58,38,0.35)]"
              style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
            >
              <h3 className="font-heading text-xl md:text-2xl text-[var(--color-text)] mb-2">
                {card.title}
              </h3>
              <p className="text-[var(--color-accent-deep)] text-xs tracking-wide uppercase mb-4">
                {card.sub}
              </p>
              <p className="prose-yes text-[var(--color-text-muted)] text-base leading-relaxed">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        {/* Closing line + CTA */}
        <div data-reveal="fade" className="border-t border-[var(--color-primary)]/10 pt-12 flex flex-col md:flex-row md:items-end gap-8 justify-between">
          <p className="font-heading text-xl md:text-2xl text-[var(--color-text)] leading-snug max-w-2xl italic">
            {t('home_does_closing')}
          </p>
          <a
            href={`${base}how-it-works/`}
            className="shrink-0 w-full sm:w-auto inline-flex justify-center px-7 py-3.5 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-primary)]/5 transition-colors duration-300"
          >
            {t('home_does_cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
