'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

export default function AboutDifferent({ base: _base }: Props) {
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
      className="relative py-24 md:py-32 overflow-hidden green-gradient text-[var(--color-cream)]"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 atmos-glow pointer-events-none" />
      {/* Orange cross accents */}
      <svg
        aria-hidden="true"
        className="absolute top-[8%] right-[5%] text-[var(--color-accent)] opacity-10"
        width="36"
        height="54"
        viewBox="0 0 40 60"
        fill="currentColor"
      >
        <rect x="16" y="0" width="8" height="60" rx="3" />
        <rect x="0" y="18" width="40" height="8" rx="3" />
      </svg>
      <div aria-hidden="true" className="float-line h-56 absolute bottom-[8%] left-[3%] hidden lg:block" />

      <GreenAtmos variant={4} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Two-column asymmetric layout: label+headline left, prose right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left — eyebrow + large headline */}
          <div className="lg:col-span-5">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
            >
              <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
              {t('about_diff_eyebrow')}
            </p>
            <h2
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-cream)] max-w-3xl"
            >
              {t('about_diff_headline')}
            </h2>

            {/* Accent divider */}
            <div data-reveal="fade" className="mt-10 flex items-center gap-4">
              <span aria-hidden="true" className="w-12 h-px bg-[var(--color-accent)]/60" />
              <span aria-hidden="true" className="text-[var(--color-accent)] text-xl">✛</span>
            </div>
          </div>

          {/* Right — prose paragraphs */}
          <div className="lg:col-span-7 lg:pt-2">
            <div className="prose-yes space-y-6 text-lg leading-relaxed text-[var(--color-cream)]/75 max-w-2xl">
              <p data-reveal="fade">{t('about_diff_para1')}</p>
              <p
                data-reveal="fade"
                style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}
              >
                {t('about_diff_para2')}
              </p>
            </div>

            {/* Standalone conviction statement */}
            <blockquote
              data-reveal="fade"
              className="mt-12 border-l-2 border-[var(--color-accent)]/50 pl-6 font-heading italic text-[var(--color-accent)] text-2xl md:text-3xl leading-snug max-w-2xl"
            >
              &ldquo;That experience belongs to every Gospel worker who partners with YES.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
