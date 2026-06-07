'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

export default function HomeBiblical({ base: _base }: Props) {
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
      className="relative green-gradient text-[var(--color-cream)] py-28 md:py-40 overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 atmos-glow-center pointer-events-none" />

      {/* Vertical float line — decorative */}
      <div aria-hidden="true" className="absolute top-0 left-[8%] float-line h-64 hidden md:block" />
      <div aria-hidden="true" className="absolute bottom-0 right-[8%] float-line h-64 hidden md:block" />

      <GreenAtmos variant={3} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">

        {/* Headline */}
        <h2
          data-reveal="mask"
          className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-cream)] mb-14"
        >
          {t('home_biblical_headline')}
        </h2>

        {/* Scripture — orange Playfair, breathing room */}
        <div data-reveal="fade" className="mb-14">
          <blockquote className="font-heading italic text-[var(--color-accent)] text-[clamp(1.5rem,3.2vw,2.6rem)] leading-snug mb-4">
            &ldquo;{t('home_biblical_scripture')}&rdquo;
          </blockquote>
          <p className="text-[var(--color-accent-light)] text-sm tracking-[0.2em] uppercase">
            &mdash; {t('home_biblical_ref')}
          </p>
        </div>

        {/* Divider */}
        <div aria-hidden="true" className="mx-auto mb-12 w-16 h-px bg-[var(--color-cream)]/15" />

        {/* Body paragraphs */}
        <div data-reveal="fade" className="space-y-6 text-lg leading-relaxed text-[var(--color-cream)]/75">
          <p>{t('home_biblical_p1')}</p>
          <p>{t('home_biblical_p2')}</p>
        </div>

        {/* Thematic statement — closing, given isolation */}
        <div data-reveal="fade" className="mt-16 pt-12 border-t border-[var(--color-cream)]/10">
          <p className="font-heading italic text-[var(--color-accent-light)] text-xl md:text-2xl leading-snug border-l-2 border-[var(--color-accent)]/40 pl-5 text-left mx-auto max-w-lg">
            &ldquo;{t('brand_thematic')}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
