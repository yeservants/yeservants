'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
}

/**
 * WorkThirtyFiveYears — Section 7 of /our-work/.
 * Dark section. Full editorial layout — no photo.
 * Two prose paragraphs with generous whitespace, then the
 * isolated closing line given visual separation and scale.
 * Closes with dual CTAs into How It Works and Give.
 * Runs its own IntersectionObserver per kit rules.
 */
export default function WorkThirtyFiveYears({ base }: Props) {
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
      className="relative overflow-hidden bg-[var(--color-bg)] py-24 md:py-32"
    >
      {/* Large ghost number — atmospheric */}
      <div
        aria-hidden="true"
        className="ghosttype absolute -left-[4%] top-1/2 -translate-y-1/2 text-[clamp(10rem,30vw,24rem)] leading-none pointer-events-none hidden lg:block text-[var(--color-primary)] opacity-[0.04]"
      >
        35
      </div>
      <div aria-hidden="true" className="absolute inset-0 atmos-glow pointer-events-none" />
      {/* Float line accent */}
      <div aria-hidden="true" className="float-line absolute top-[15%] right-[12%] h-48 hidden md:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* Centered editorial layout — max-w-3xl for reading comfort */}
        <div className="max-w-3xl mx-auto">

          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('work_s7_label')}
          </p>

          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--color-text)]"
          >
            {t('work_s7_headline')}
          </h2>

          <div
            data-reveal="fade"
            className="prose-yes mt-8 text-lg leading-relaxed text-[var(--color-text-muted)]"
          >
            <p>{t('work_s7_body1')}</p>
          </div>

          <div
            data-reveal="fade"
            className="prose-yes mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]"
          >
            <p>{t('work_s7_body2')}</p>
          </div>

          {/* Accent divider — visual breath */}
          <div
            data-reveal="fade"
            aria-hidden="true"
            className="my-14 flex items-center gap-6"
          >
            <span className="flex-1 h-px bg-[var(--color-primary)]/10" />
            <span className="text-[var(--color-accent)]/50 text-sm">✛</span>
            <span className="flex-1 h-px bg-[var(--color-primary)]/10" />
          </div>

          {/* ── Isolated closing line — the most weighted moment on the page ── */}
          <p
            data-reveal="mask"
            className="font-heading font-medium italic text-[clamp(1.5rem,3.5vw,2.6rem)] leading-[1.15] text-[var(--color-text)] max-w-2xl"
          >
            {t('work_s7_closing')}
          </p>

          {/* ── Dual CTA ── */}
          <div
            data-reveal="fade"
            className="mt-14 flex flex-col sm:flex-row gap-4"
          >
            <a
              href={`${base}give/`}
              className="w-full sm:w-auto inline-flex justify-center px-7 py-3.5 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_18px_rgba(232,117,26,0.3)]"
            >
              {t('work_cta_primary')}
            </a>
            <a
              href={`${base}how-it-works/`}
              className="w-full sm:w-auto inline-flex justify-center px-7 py-3.5 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-primary)]/5 transition-colors duration-300"
            >
              {t('work_cta_secondary')}
            </a>
          </div>

          {/* Candid / accountability note — subtle */}
          <p
            data-reveal="fade"
            className="mt-8 text-[var(--color-text-muted)]/60 text-xs leading-relaxed max-w-lg"
          >
            YES is a registered 501(c)(3) nonprofit ministry. 100% of designated gifts go directly to the field.
          </p>

        </div>
      </div>
    </section>
  );
}
