'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
}

export default function HomeReality({ base: _base }: Props) {
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
      className="relative bg-[var(--color-bg)] py-24 md:py-32 overflow-hidden"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 atmos-glow pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-72 h-72 float-ring opacity-[0.07]"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">

        {/* Eyebrow — centered */}
        <p
          data-reveal="fade"
          className="flex items-center justify-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-8"
        >
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/50" />
          {t('home_reality_label')}
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/50" />
        </p>

        {/* Headline — centered statement */}
        <h2
          data-reveal="mask"
          className="font-heading font-medium leading-[1.1] text-[clamp(2rem,4.4vw,3.4rem)] text-[var(--color-text)] text-center max-w-3xl mx-auto"
        >
          {t('home_reality_headline')}
        </h2>

        {/* Lead — centered, lifted */}
        <p data-reveal="fade" className="mt-9 text-center font-heading italic text-[var(--color-text-muted)] text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
          {t('home_reality_p1')}
        </p>

        {/* Narrative — centered reading measure */}
        <div data-reveal="mask" className="mt-12 space-y-5 text-lg leading-relaxed text-[var(--color-text-muted)] max-w-2xl mx-auto">
          <p>{t('home_reality_p2')}</p>
          <p>{t('home_reality_p3')}</p>
        </div>

        {/* The pivot — full-width dramatic moment, given air */}
        <div data-reveal="fade" className="my-16 md:my-20 text-center">
          <span aria-hidden="true" className="block w-px h-12 mx-auto bg-gradient-to-b from-transparent to-[var(--color-accent)]/40" />
          <p className="mt-8 text-[var(--color-text-muted)] text-lg italic">{t('home_reality_aside1')}</p>
          <p className="mt-3 font-heading text-[var(--color-text)] text-[clamp(1.8rem,4vw,3rem)] leading-tight">{t('home_reality_aside2')}</p>
          <p className="mt-3 text-[var(--color-text-muted)] text-lg md:text-xl italic max-w-xl mx-auto">{t('home_reality_aside3')}</p>
          <span aria-hidden="true" className="mt-8 block w-px h-12 mx-auto bg-gradient-to-b from-[var(--color-accent)]/40 to-transparent" />
        </div>

        {/* Narrative continues — centered measure */}
        <div data-reveal="mask" className="space-y-5 text-lg leading-relaxed text-[var(--color-text-muted)] max-w-2xl mx-auto">
          <p>{t('home_reality_p4')}</p>
          <p className="font-heading text-[var(--color-text)] text-2xl md:text-3xl leading-snug text-center py-3">{t('home_reality_p5')}</p>
          <p>{t('home_reality_p6')}</p>
          <p>{t('home_reality_p7')}</p>
        </div>

        {/* Closing pull quote — full-width, in silence */}
        <blockquote data-reveal="fade" className="mt-16 md:mt-20 mx-auto max-w-3xl text-center font-heading italic text-[var(--color-accent-deep)] text-2xl md:text-[2.1rem] leading-[1.35]">
          &ldquo;{t('home_reality_quote')}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
