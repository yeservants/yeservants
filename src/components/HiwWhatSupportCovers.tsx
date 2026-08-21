'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

/**
 * HIW Block 2 — What Support Actually Covers. Intro ("not a salary… Paul wrote
 * about it") + two arrow-bullet lists: Financial (#financial) and Logistical
 * (#logistical). The footer links "Financial Support" / "Logistical Support"
 * land on these anchors.
 */
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

  const lists: { id: string; title: TranslationKey; items: TranslationKey[] }[] = [
    {
      id: 'financial',
      title: 'hiw_support_fin_title',
      items: [
        'hiw_support_fin_i1',
        'hiw_support_fin_i2',
        'hiw_support_fin_i3',
        'hiw_support_fin_i4',
        'hiw_support_fin_i5',
      ],
    },
    {
      id: 'logistical',
      title: 'hiw_support_log_title',
      items: [
        'hiw_support_log_i1',
        'hiw_support_log_i2',
        'hiw_support_log_i6',
        'hiw_support_log_i3',
        'hiw_support_log_i4',
        'hiw_support_log_i5',
      ],
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[var(--color-bg)] overflow-hidden"
      aria-labelledby="hiw-support-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_40%_at_95%_10%,rgba(232,117,26,0.06)_0%,transparent_60%)]"
      />
      <div aria-hidden="true" className="float-cross top-[8%] left-[4%]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header — prose block left, headline right for asymmetry */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
          <div className="lg:col-span-5">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-deep)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
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
            <p
              data-reveal="fade"
              className="text-lg leading-[1.8] text-[var(--color-text)]/85 max-w-prose"
            >
              {t('hiw_support_intro')}
            </p>
          </div>
        </div>

        {/* Two arrow-bullet lists — financial / logistical (footer anchor targets) */}
        <div data-reveal-stagger className="grid md:grid-cols-2 gap-6 md:gap-8">
          {lists.map((list) => (
            <article
              key={list.id}
              id={list.id}
              className="relative bg-white/60 border-t-2 border-[var(--color-accent)] rounded-xl p-7 md:p-10 shadow-[0_18px_40px_-24px_rgba(33,23,16,0.35)] scroll-mt-32"
            >
              <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-text)] mb-7">
                {t(list.title)}
              </h3>
              <ul className="space-y-3.5">
                {list.items.map((key) => (
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
