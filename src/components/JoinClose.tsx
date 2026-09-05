'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
}

/**
 * Join — closing CTA. Light band right before the footer: the "stands with
 * them" thread lands on a partner CTA (→ /give/) with a quiet contact option.
 */
export default function JoinClose({ base }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[var(--color-surface)] overflow-hidden"
      aria-labelledby="join-close-heading"
    >
      <div aria-hidden="true" className="absolute inset-0 atmos-glow-center pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">
        <p
          data-reveal="fade"
          className="flex items-center justify-center gap-3 text-[var(--color-accent-deep)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
        >
          {t('join_close_label')}
        </p>

        <h2
          id="join-close-heading"
          data-reveal="mask"
          className="font-heading font-medium leading-[1.12] text-[clamp(1.9rem,4.2vw,3.1rem)] text-[var(--color-text)] mb-6"
        >
          {t('join_close_headline')}
        </h2>
        <p data-reveal="fade" className="text-lg md:text-xl leading-[1.8] text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10">
          {t('join_close_body')}
        </p>

        <div data-reveal="fade" className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={`${base}give/`}
            className="inline-flex justify-center px-9 py-4 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_20px_rgba(168,79,10,0.4)]"
          >
            {t('cta_donateNow')}
          </a>
          <a
            href={`${base}contact/`}
            className="inline-flex justify-center px-9 py-4 border border-[var(--color-primary)]/25 text-[var(--color-text)] text-sm font-semibold tracking-wide rounded-full hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent-deep)] transition-colors duration-300"
          >
            {t('join_close_cta_secondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
