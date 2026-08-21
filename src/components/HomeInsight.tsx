'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

/**
 * Block 2 — The Insight. A single bordered card in the center of the page
 * (mapa: "Una sola tarjeta en el centro"). Names the central problem: what
 * the missionaries lack is capital and infrastructure. Mixed italic + bold
 * per the FINAL v2 webmaster note.
 */
export default function HomeInsight({ base: _base }: Props) {
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
      className="relative green-gradient text-[var(--color-cream)] py-12 md:py-16 overflow-hidden"
    >
      <GreenAtmos variant={1} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
        <div
          data-reveal="mask"
          className="relative border border-[var(--color-gold)]/35 rounded-2xl bg-[var(--color-primary-deep)]/40 backdrop-blur-[2px] px-8 py-12 md:px-16 md:py-16 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        >
          {/* corner accents */}
          <span aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-transparent text-[var(--color-gold)] text-base leading-none">✛</span>

          <p className="font-heading italic text-[var(--color-cream)]/90 text-[clamp(1.3rem,2.6vw,1.9rem)] leading-[1.6]">
            {t('home_insight_part1')}
          </p>
          <p className="mt-6 font-heading font-semibold text-[var(--color-gold-light)] text-[clamp(1.4rem,2.9vw,2.1rem)] leading-[1.5]">
            {t('home_insight_part2')}
          </p>
          <p className="mt-6 text-[var(--color-cream)]/70 text-lg md:text-xl leading-relaxed">
            {t('home_insight_part3')}
          </p>
        </div>
      </div>
    </section>
  );
}
