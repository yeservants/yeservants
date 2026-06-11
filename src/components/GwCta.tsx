'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
}

export default function GwCta({ base }: Props) {
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
      className="relative overflow-hidden bg-[var(--color-bg)] py-24 md:py-32 text-center"
    >
      {/* Atmospheric decorations */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(232,117,26,0.07) 0%, transparent 65%)',
        }}
      />
      <div aria-hidden="true" className="float-line h-[35vh] top-[8%] left-[5%]" />
      <div aria-hidden="true" className="float-line h-[25vh] bottom-[10%] right-[7%]" />
      <svg
        aria-hidden="true"
        className="absolute top-[12%] right-[6%] text-[var(--color-accent)] opacity-[0.12]"
        width="24"
        height="38"
        viewBox="0 0 40 60"
        fill="currentColor"
      >
        <rect x="16" y="0" width="8" height="60" rx="3" />
        <rect x="0" y="18" width="40" height="8" rx="3" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute bottom-[14%] left-[7%] text-[var(--color-primary)] opacity-[0.05]"
        width="18"
        height="28"
        viewBox="0 0 40 60"
        fill="currentColor"
      >
        <rect x="16" y="0" width="8" height="60" rx="3" />
        <rect x="0" y="18" width="40" height="8" rx="3" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10">
        <p
          data-reveal="fade"
          className="flex items-center justify-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
        >
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
          {t('gw_cta_label')}
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
        </p>

        <h2
          data-reveal="mask"
          className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] mb-8"
        >
          {t('gw_cta_headline')}
        </h2>

        <div className="prose-yes text-lg leading-relaxed text-[var(--color-text-muted)] max-w-2xl mx-auto">
          <p data-reveal="fade">{t('gw_cta_p1')}</p>
        </div>

        <div data-reveal="fade" className="mt-12">
          <a
            href={`${base}give/`}
            className="w-full sm:w-auto inline-flex justify-center px-7 py-3.5 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_18px_rgba(232,117,26,0.3)]"
          >
            {t('cta_standWithWorker')} →
          </a>
        </div>

        {/* Thematic statement */}
        <p
          data-reveal="fade"
          className="mt-14 font-heading italic text-[var(--color-text-muted)]/70 text-lg leading-snug max-w-xl mx-auto"
        >
          &ldquo;{t('brand_thematic')}&rdquo;
        </p>
      </div>
    </section>
  );
}
