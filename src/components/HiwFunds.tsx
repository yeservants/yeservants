'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface Fund {
  title: TranslationKey;
  body: TranslationKey;
}

const FUNDS: Fund[] = [
  { title: 'hiw_fund1_title', body: 'hiw_fund1_body' },
  { title: 'hiw_fund2_title', body: 'hiw_fund2_body' },
  { title: 'hiw_fund3_title', body: 'hiw_fund3_body' },
];

interface Props {
  base: string;
}

export default function HiwFunds({ base }: Props) {
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
      aria-labelledby="hiw-funds-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 10% 85%, rgba(45,82,51,0.06) 0%, transparent 60%)',
        }}
      />
      <div aria-hidden="true" className="float-ring w-48 h-48 bottom-[5%] right-[3%] hidden lg:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="mb-14 max-w-3xl">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('hiw_funds_label')}
          </p>
          <h2
            id="hiw-funds-heading"
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)]"
          >
            {t('hiw_funds_headline')}
          </h2>
        </div>

        {/* Three fund cards */}
        <div
          data-reveal-stagger
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label={t('hiw_funds_headline')}
        >
          {FUNDS.map((fund, i) => (
            <article
              key={fund.title}
              role="listitem"
              className="relative overflow-hidden bg-white/60 border-t-2 border-[var(--color-accent)] rounded-xl p-7 md:p-8 shadow-[0_18px_40px_-24px_rgba(33,23,16,0.35)]"
              style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
            >
              {/* Ghost fund number — large faint watermark behind the content */}
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-6 font-heading font-bold text-[6rem] leading-none text-[var(--color-accent)] opacity-[0.10] select-none pointer-events-none z-0"
              >
                {String(i + 1)}
              </span>
              <div className="relative z-10">
                <h3 className="font-heading text-xl md:text-2xl text-[var(--color-text)] mb-4">
                  {t(fund.title)}
                </h3>
                <p className="prose-yes text-[var(--color-text-muted)] leading-relaxed text-base">
                  {t(fund.body)}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* 100% line + Platinum — given weight (FINAL v2 bolds it) */}
        <div data-reveal="fade" className="mt-12 max-w-3xl border-l-[3px] border-[var(--color-accent)] pl-6">
          <p className="font-heading text-[var(--color-text)] text-xl md:text-2xl leading-snug mb-2">
            {t('hiw_funds_disclaimer')}
          </p>
          <p className="text-[var(--color-text-muted)] text-base leading-relaxed">
            {t('hiw_funds_platinum')}
          </p>
        </div>

        {/* CTAs */}
        <div data-reveal="fade" className="mt-10 flex flex-col sm:flex-row gap-4">
          {/* <!-- CLIENT: financials link — replace href="#" with actual annual-report/financials URL --> */}
          <a
            href="#"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm font-semibold tracking-wide rounded-full px-7 py-3.5 hover:bg-[var(--color-primary)]/5 transition-colors duration-300"
            aria-label={t('cta_viewFinancials')}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t('cta_viewFinancials')}
          </a>

          <a
            href={`${base}join/`}
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full px-7 py-3.5 hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_18px_rgba(232,117,26,0.3)]"
          >
            {t('cta_becomePartnerShort')}
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
