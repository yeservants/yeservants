'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

export default function HomeWhyYes({ base: _base }: Props) {
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const points = [
    {
      num: '01',
      title: t('home_why_pt1_title'),
      body: t('home_why_pt1_body'),
    },
    {
      num: '02',
      title: t('home_why_pt2_title'),
      body: t('home_why_pt2_body'),
    },
    {
      num: '03',
      title: t('home_why_pt3_title'),
      body: t('home_why_pt3_body'),
    },
    {
      num: '04',
      title: t('home_why_pt4_title'),
      body: t('home_why_pt4_body'),
    },
  ] as const;

  return (
    <section
      ref={ref}
      className="relative green-gradient text-[var(--color-cream)] py-24 md:py-32 overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 atmos-glow pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-96 h-96 float-ring opacity-[0.06]"
      />

      <GreenAtmos variant={2} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('home_why_label')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-cream)]"
          >
            {t('home_why_headline')}
          </h2>
        </div>

        {/* Four points — 2-column grid on desktop, stacked on mobile */}
        <div
          data-reveal-stagger
          className="grid md:grid-cols-2 gap-8 md:gap-10 mb-16"
        >
          {points.map((pt, i) => (
            <div
              key={pt.num}
              className="relative pl-6 border-l border-[var(--color-accent)]/25"
              style={{ '--reveal-delay': `${i * 0.1}s` } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--color-accent)]/50"
              />
              <p className="text-[var(--color-accent)]/50 font-heading text-5xl font-bold leading-none mb-3 select-none">
                {pt.num}
              </p>
              <h3 className="font-heading text-xl md:text-2xl text-[var(--color-cream)] mb-3">
                {pt.title}
              </h3>
              <p className="text-[var(--color-cream)]/70 text-base leading-relaxed">
                {pt.body}
              </p>
            </div>
          ))}
        </div>

        {/* Summary line */}
        <div
          data-reveal="fade"
          className="border-t border-[var(--color-cream)]/10 pt-10 max-w-3xl"
        >
          <p className="text-lg text-[var(--color-cream)]/80 leading-relaxed italic font-heading">
            {t('home_why_summary')}
          </p>
        </div>
      </div>
    </section>
  );
}
