'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

export default function GwQuotes() {
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
      {/* Atmosphere */}
      <div aria-hidden="true" className="float-line h-[30vh] top-[15%] right-[6%]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <p
          data-reveal="fade"
          className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
        >
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
          {t('gw_quotes_label')}
        </p>
        <h2
          data-reveal="mask"
          className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] max-w-3xl mb-12"
        >
          {t('gw_quotes_headline')}
        </h2>

        {/* CLIENT: provide unedited worker quotes — replace placeholder below */}
        <div
          data-reveal="fade"
          className="relative max-w-3xl overflow-hidden rounded-2xl border border-[var(--color-primary)]/10 bg-white/50 px-8 py-12 md:px-14 md:py-14 shadow-[0_18px_40px_-24px_rgba(31,58,38,0.18)]"
        >
          {/* Watermark quotation mark — sits behind the quote, no reserved gap */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 left-5 font-heading text-[11rem] leading-none text-[var(--color-accent)]/[0.09] select-none"
          >
            &ldquo;
          </span>

          <div className="relative">
            <p className="font-heading italic text-[var(--color-text)]/85 text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl">
              {t('gw_quotes_placeholder')}
            </p>

            <div className="flex items-center gap-4">
              {/* Avatar slot — where the worker's portrait will live */}
              <span
                aria-hidden="true"
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/8 ring-1 ring-[var(--color-primary)]/15"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[var(--color-primary)]/45">
                  <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 19.5c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="font-heading text-[var(--color-text)] text-base leading-tight">[Worker name]</span>
                <span className="text-[var(--color-text-muted)] text-xs tracking-[0.18em] uppercase mt-0.5">[Region of service]</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
