'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

export default function HomeDifference({ base: _base }: Props) {
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
      className="relative green-gradient text-[var(--color-cream)] py-24 md:py-32 overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 atmos-glow-center pointer-events-none" />

      {/* Ghost typography atmosphere */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 right-[-2rem] ghosttype ghosttype-light text-[clamp(6rem,18vw,15rem)] hidden lg:block"
      >
        YES
      </div>

      <GreenAtmos variant={1} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* Eyebrow */}
        <p
          data-reveal="fade"
          className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-8"
        >
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
          {t('home_diff_label')}
        </p>

        {/* Two-column: headline left, prose right */}
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-start mb-20">
          <div>
            <h2
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-cream)]"
            >
              {t('home_diff_headline')}
            </h2>
          </div>

          <div data-reveal="fade" className="space-y-5 text-lg leading-relaxed text-[var(--color-cream)]/75 max-w-2xl">
            <p>{t('home_diff_p1')}</p>
            <p>{t('home_diff_p2')}</p>
            <p>{t('home_diff_p3')}</p>
          </div>
        </div>

        {/* Key statement — isolated, given space */}
        <div data-reveal="fade" className="border-t border-[var(--color-cream)]/10 pt-14">
          <blockquote className="font-heading italic text-[var(--color-accent)] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-snug max-w-3xl mx-auto text-center">
            &ldquo;{t('home_diff_quote')}&rdquo;
          </blockquote>
          <div
            aria-hidden="true"
            className="mt-8 mx-auto w-8 h-px bg-[var(--color-accent)]/40"
          />
        </div>
      </div>
    </section>
  );
}
