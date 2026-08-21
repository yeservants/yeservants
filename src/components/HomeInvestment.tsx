'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

/**
 * v7 — The Investment. An isolated, breathing pull-quote on espresso:
 * "The highest-return investment you will ever make is not on Wall Street."
 * Closes with Matthew 6:19-20. (Webmaster rule #4: impact phrases sit alone.)
 */
export default function HomeInvestment({ base: _base }: Props) {
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
      className="relative green-gradient text-[var(--color-cream)] py-14 md:py-20 overflow-hidden"
    >
      <GreenAtmos variant={2} />
      <div aria-hidden="true" className="absolute top-0 left-[12%] float-line h-52 hidden md:block" />
      <div aria-hidden="true" className="absolute bottom-0 right-[10%] float-line h-52 hidden md:block" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
        <h2
          data-reveal="mask"
          className="font-heading font-medium text-[clamp(1.7rem,4.2vw,3.1rem)] leading-[1.25]"
        >
          {t('home_inv_line1')}
        </h2>
        <p
          data-reveal="mask"
          className="mt-5 font-heading italic text-[var(--color-gold-light)] text-[clamp(1.7rem,4.2vw,3.1rem)] leading-[1.25]"
        >
          {t('home_inv_line2')}
        </p>

        <div data-reveal="fade" className="mt-14 max-w-2xl mx-auto">
          <span aria-hidden="true" className="block w-10 h-px bg-[var(--color-gold)]/60 mx-auto mb-7" />
          <blockquote className="font-heading italic text-[var(--color-cream)]/70 text-lg md:text-xl leading-[1.7]">
            &ldquo;{t('home_inv_verse')}&rdquo;
          </blockquote>
          <p className="mt-4 text-[var(--color-gold)] text-xs tracking-[0.28em] uppercase">
            {t('home_inv_ref')}
          </p>
        </div>
      </div>
    </section>
  );
}
