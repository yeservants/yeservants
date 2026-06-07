'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
}

const APLOS_URL =
  'https://www.aplos.com/aws/give/YieldedEvangelicalServantsInc/YesDonations';

export default function HomeFinalCta({ base }: Props) {
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
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-bg)] text-[var(--color-text)] py-28 md:py-40 overflow-hidden"
    >
      {/* Subtle atmospheric warmth */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(232,117,26,0.05)_0%,transparent_70%)]" />
      <div aria-hidden="true" className="absolute top-6 left-1/2 -translate-x-1/2 float-line h-16" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">

        {/* Headline */}
        <h2
          data-reveal="mask"
          className="font-heading font-medium leading-[1.08] text-[clamp(2rem,4.5vw,3.8rem)] text-[var(--color-text)] max-w-3xl mx-auto mb-12"
        >
          {t('home_cta_headline')}
        </h2>

        {/* Subhead paragraphs */}
        <div
          data-reveal="fade"
          className="space-y-5 text-lg leading-relaxed text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8"
        >
          <p>{t('home_cta_p1')}</p>
          <p>{t('home_cta_p2')}</p>
          <p>{t('home_cta_p3')}</p>
        </div>

        {/* "They need you." — isolated impact line */}
        <p
          data-reveal="mask"
          className="font-heading italic text-[var(--color-accent-deep)] text-2xl md:text-3xl mb-8"
        >
          {t('home_cta_emphasis')}
        </p>

        {/* Continuation */}
        <p
          data-reveal="fade"
          className="text-lg leading-relaxed text-[var(--color-text-muted)] max-w-2xl mx-auto mb-12"
        >
          {t('home_cta_sub')}
        </p>

        {/* CTA buttons */}
        <div
          data-reveal="fade"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <a
            href={APLOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex justify-center px-8 py-4 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_24px_rgba(232,117,26,0.35)]"
          >
            {t('cta_giveMonthly')}
          </a>
          <a
            href={`${base}our-work/`}
            className="w-full sm:w-auto inline-flex justify-center px-8 py-4 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-primary)]/5 transition-colors duration-300"
          >
            {t('cta_exploreOurWork')}
          </a>
        </div>

        {/* Legal line */}
        <p
          data-reveal="fade"
          className="text-[var(--color-text-muted)]/80 text-xs leading-relaxed max-w-xl mx-auto"
        >
          {t('home_cta_legal')}
        </p>
      </div>
    </section>
  );
}
