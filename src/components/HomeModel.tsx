'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

interface Row {
  f: TranslationKey;
  us: TranslationKey;
  usSub: TranslationKey;
  yes: TranslationKey;
  yesSub: TranslationKey;
}

/**
 * v7 — The Model. The comparison ledger: "Sent from the US" vs "The YES
 * model" across six factors, carved into the espresso like a ledger book.
 * The YES column is warmed with gold. Semantic table; scrolls horizontally
 * inside its own container on small screens.
 */
export default function HomeModel({ base: _base }: Props) {
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

  const rows: Row[] = [
    { f: 'home_model_r1_f', us: 'home_model_r1_us', usSub: 'home_model_r1_us_sub', yes: 'home_model_r1_yes', yesSub: 'home_model_r1_yes_sub' },
    { f: 'home_model_r2_f', us: 'home_model_r2_us', usSub: 'home_model_r2_us_sub', yes: 'home_model_r2_yes', yesSub: 'home_model_r2_yes_sub' },
    { f: 'home_model_r3_f', us: 'home_model_r3_us', usSub: 'home_model_r3_us_sub', yes: 'home_model_r3_yes', yesSub: 'home_model_r3_yes_sub' },
    { f: 'home_model_r4_f', us: 'home_model_r4_us', usSub: 'home_model_r4_us_sub', yes: 'home_model_r4_yes', yesSub: 'home_model_r4_yes_sub' },
    { f: 'home_model_r5_f', us: 'home_model_r5_us', usSub: 'home_model_r5_us_sub', yes: 'home_model_r5_yes', yesSub: 'home_model_r5_yes_sub' },
    { f: 'home_model_r6_f', us: 'home_model_r6_us', usSub: 'home_model_r6_us_sub', yes: 'home_model_r6_yes', yesSub: 'home_model_r6_yes_sub' },
  ];

  return (
    <section
      ref={ref}
      className="relative green-gradient text-[var(--color-cream)] py-12 md:py-18 overflow-hidden"
    >
      <GreenAtmos variant={4} />
      <div aria-hidden="true" className="absolute top-0 right-[14%] float-line h-56 hidden md:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-gold)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-gold)]/60" />
            {t('home_model_label')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.12] mb-7"
          >
            {t('home_model_headline')}
          </h2>
          <p
            data-reveal="fade"
            className="font-heading italic text-[var(--color-cream)]/80 text-lg md:text-xl leading-[1.7] border-l-[3px] border-[var(--color-accent)] pl-6"
          >
            {t('home_model_intro')}
          </p>
        </div>

        <div
          data-reveal="fade"
          className="overflow-x-auto rounded-2xl ring-1 ring-[var(--color-cream)]/10 bg-[var(--color-primary-deep)]/45 backdrop-blur-[2px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        >
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">{t('home_model_headline')}</caption>
            <thead>
              <tr className="border-b border-[var(--color-cream)]/12">
                <th scope="col" className="px-6 py-5 text-[11px] tracking-[0.24em] uppercase font-medium text-[var(--color-cream)]/50">
                  {t('home_model_col_factor')}
                </th>
                <th scope="col" className="px-6 py-5 text-[11px] tracking-[0.24em] uppercase font-medium text-[var(--color-cream)]/50">
                  {t('home_model_col_us')}
                </th>
                <th scope="col" className="px-6 py-5 text-[11px] tracking-[0.24em] uppercase font-medium text-[var(--color-gold)] bg-[var(--color-gold)]/[0.07] border-l border-[var(--color-gold)]/25">
                  {t('home_model_col_yes')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.f} className="border-b border-[var(--color-cream)]/[0.07] last:border-b-0">
                  <th scope="row" className="px-6 py-5 align-top font-heading font-medium text-[var(--color-cream)]/90 text-base md:text-lg whitespace-nowrap">
                    {t(r.f)}
                  </th>
                  <td className="px-6 py-5 align-top">
                    <span className="block text-[var(--color-cream)]/60 text-[15px] leading-snug">{t(r.us)}</span>
                    <span className="block mt-1 text-[var(--color-cream)]/35 text-[13px] leading-snug">{t(r.usSub)}</span>
                  </td>
                  <td className="px-6 py-5 align-top bg-[var(--color-gold)]/[0.07] border-l border-[var(--color-gold)]/25">
                    <span className="block font-semibold text-[var(--color-gold-light)] text-[15px] leading-snug">{t(r.yes)}</span>
                    <span className="block mt-1 text-[var(--color-cream)]/60 text-[13px] leading-snug">{t(r.yesSub)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
