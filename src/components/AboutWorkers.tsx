'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface WorkerType {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  /* Simple inline SVG path for a contextual icon */
  iconPath: string;
}

const WORKER_TYPES: WorkerType[] = [
  {
    titleKey: 'about_workers_type1_title',
    bodyKey: 'about_workers_type1_body',
    /* Globe / cross-cultural */
    iconPath:
      'M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0c-2.5 2.7-4 6.2-4 10s1.5 7.3 4 10m0-20c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10M2 12h20',
  },
  {
    titleKey: 'about_workers_type2_title',
    bodyKey: 'about_workers_type2_body',
    /* Church building */
    iconPath:
      'M3 21h18M9 21V9m6 12V9M3 9l9-7 9 7M12 3v3',
  },
  {
    titleKey: 'about_workers_type3_title',
    bodyKey: 'about_workers_type3_body',
    /* Shepherd / people */
    iconPath:
      'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm8 4v6m3-3h-6',
  },
  {
    titleKey: 'about_workers_type4_title',
    bodyKey: 'about_workers_type4_body',
    /* Path / walking */
    iconPath:
      'M13 5l7 7-7 7M5 12h15',
  },
  {
    titleKey: 'about_workers_type5_title',
    bodyKey: 'about_workers_type5_body',
    /* Heart / community */
    iconPath:
      'M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z',
  },
];

interface Props {
  base: string;
}

export default function AboutWorkers({ base }: Props) {
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
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[var(--color-bg)]"
    >
      {/* Dot grid texture */}
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div aria-hidden="true" className="float-cross absolute top-[8%] left-[4%] opacity-20" />
      {/* Ghost type */}
      <div
        aria-hidden="true"
        className="ghosttype absolute bottom-[2%] right-[-2%] text-[clamp(5rem,14vw,12rem)] hidden md:block"
      >
        WORKERS
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('about_workers_eyebrow')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] max-w-3xl"
          >
            {t('about_workers_headline')}
          </h2>
          <p
            data-reveal="fade"
            className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)] max-w-2xl"
          >
            {t('about_workers_intro')}
          </p>
        </div>

        {/* Worker types — card grid, 2-col on md, staggered */}
        <div
          data-reveal-stagger
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14"
        >
          {WORKER_TYPES.map((wt, i) => (
            <article
              key={wt.titleKey}
              className="relative bg-white/60 border-t-2 border-[var(--color-accent)] rounded-xl p-7 md:p-8 shadow-[0_18px_40px_-24px_rgba(31,58,38,0.35)]"
              style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-5">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d={wt.iconPath} />
                </svg>
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-[var(--color-text)] mb-3">
                {t(wt.titleKey)}
              </h3>
              <p className="prose-yes text-[var(--color-text-muted)] leading-relaxed">
                {t(wt.bodyKey)}
              </p>
            </article>
          ))}
        </div>

        {/* Closing statement */}
        <p
          data-reveal="fade"
          className="text-lg leading-relaxed text-[var(--color-text-muted)] max-w-3xl mb-12"
        >
          {t('about_workers_closing')}
        </p>

        {/* CTA */}
        <div data-reveal="fade">
          <a
            href={`${base}gospel-workers/`}
            className="w-full sm:w-auto inline-flex justify-center px-7 py-3.5 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_18px_rgba(232,117,26,0.3)]"
          >
            {t('about_workers_cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
