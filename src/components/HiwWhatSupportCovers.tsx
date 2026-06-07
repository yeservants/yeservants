'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface Bullet {
  title: TranslationKey;
  body: TranslationKey;
  icon: string;
}

const BULLETS: Bullet[] = [
  {
    title: 'hiw_support_b1_title',
    body: 'hiw_support_b1_body',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707',
  },
  {
    title: 'hiw_support_b2_title',
    body: 'hiw_support_b2_body',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4',
  },
  {
    title: 'hiw_support_b3_title',
    body: 'hiw_support_b3_body',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'hiw_support_b4_title',
    body: 'hiw_support_b4_body',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
  },
];

export default function HiwWhatSupportCovers() {
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
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) =>
      io.observe(el)
    );
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[var(--color-bg)] overflow-hidden"
      aria-labelledby="hiw-support-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 95% 10%, rgba(232,117,26,0.06) 0%, transparent 60%)',
        }}
      />
      <div aria-hidden="true" className="float-cross top-[8%] left-[4%]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header — prose block left, headline right for asymmetry */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
          <div className="lg:col-span-5">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
            >
              <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
              {t('hiw_support_label')}
            </p>
            <h2
              id="hiw-support-heading"
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)]"
            >
              {t('hiw_support_headline')}
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-10">
            <div
              data-reveal="fade"
              className="prose-yes text-lg leading-relaxed text-[var(--color-text-muted)] max-w-prose"
            >
              <p>{t('hiw_support_intro')}</p>
              <p className="mt-5 font-medium text-[var(--color-text)]">{t('hiw_support_sub')}</p>
            </div>
          </div>
        </div>

        {/* Bullet grid — 2×2 */}
        <div
          data-reveal-stagger
          className="grid sm:grid-cols-2 gap-6 md:gap-8"
          role="list"
          aria-label={t('hiw_support_headline')}
        >
          {BULLETS.map((b, i) => (
            <article
              key={b.title}
              role="listitem"
              className="relative bg-white/60 border-t-2 border-[var(--color-accent)] rounded-xl p-7 md:p-8 shadow-[0_18px_40px_-24px_rgba(31,58,38,0.35)]"
              style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
            >
              <div
                className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-5"
                aria-hidden="true"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                </svg>
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-[var(--color-text)] mb-2">
                {t(b.title)}
              </h3>
              <p className="prose-yes text-[var(--color-text-muted)] leading-relaxed">
                {t(b.body)}
              </p>
            </article>
          ))}
        </div>

        {/* 1 Cor 9 reference pull-quote */}
        <blockquote
          data-reveal="fade"
          className="mt-16 border-l-2 border-[var(--color-accent)]/50 pl-6 font-heading italic text-[var(--color-accent-deep)] text-2xl md:text-3xl leading-snug max-w-2xl"
        >
          &ldquo;{t('brand_thematic')}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
