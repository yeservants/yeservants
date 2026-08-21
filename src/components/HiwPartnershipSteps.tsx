'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface Step {
  num: TranslationKey;
  title: TranslationKey;
  body: TranslationKey;
}

const STEPS: Step[] = [
  { num: 'hiw_step1_num', title: 'hiw_step1_title', body: 'hiw_step1_body' },
  { num: 'hiw_step2_num', title: 'hiw_step2_title', body: 'hiw_step2_body' },
  { num: 'hiw_step3_num', title: 'hiw_step3_title', body: 'hiw_step3_body' },
  { num: 'hiw_step4_num', title: 'hiw_step4_title', body: 'hiw_step4_body' },
  { num: 'hiw_step5_num', title: 'hiw_step5_title', body: 'hiw_step5_body' },
];

export default function HiwPartnershipSteps() {
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
      aria-labelledby="hiw-steps-heading"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 atmos-glow pointer-events-none" />
      <div aria-hidden="true" className="float-line h-72 bottom-[5%] left-[3%] hidden lg:block" />
      {/* Decorative cross motif */}
      <svg
        aria-hidden="true"
        className="absolute top-[6%] right-[5%] text-[var(--color-accent)] opacity-[0.13]"
        width="32"
        height="48"
        viewBox="0 0 40 60"
        fill="currentColor"
      >
        <rect x="16" y="0" width="8" height="60" rx="3" />
        <rect x="0" y="18" width="40" height="8" rx="3" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="mb-16 max-w-3xl">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('hiw_steps_label')}
          </p>
          <h2
            id="hiw-steps-heading"
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)]"
          >
            {t('hiw_steps_headline')}
          </h2>
        </div>

        {/* Numbered vertical stepper */}
        <ol className="relative flex flex-col gap-0" aria-label={t('hiw_steps_headline')}>
          {/* Vertical connector line — hidden on mobile */}
          <span
            aria-hidden="true"
            className="absolute left-[2.35rem] top-[3.5rem] bottom-[3.5rem] w-px bg-[var(--color-accent)]/15 hidden md:block"
          />

          {STEPS.map((step) => (
            <li
              key={step.num}
              data-reveal="mask"
              className="relative flex gap-6 md:gap-10 items-start pb-12 last:pb-0"
            >
              {/* Big Playfair orange number */}
              <div
                className="flex-shrink-0 w-[4.7rem] text-right"
                aria-hidden="true"
              >
                <span className="font-heading font-bold leading-none text-[var(--color-accent)]/30 text-5xl select-none">
                  {t(step.num)}
                </span>
              </div>

              {/* Connector dot */}
              <div
                className="flex-shrink-0 hidden md:flex items-start pt-3"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)] mt-0.5" />
              </div>

              {/* Text content */}
              <div className="flex-1 pt-1">
                <h3 className="font-heading text-xl md:text-2xl font-medium text-[var(--color-text)] mb-3 leading-snug">
                  {t(step.title)}
                </h3>
                <p className="text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed max-w-2xl">
                  {t(step.body)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
