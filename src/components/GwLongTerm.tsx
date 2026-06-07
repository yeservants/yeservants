'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

export default function GwLongTerm() {
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
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 85% 50%, rgba(45,82,51,0.05) 0%, transparent 65%)',
        }}
      />
      <div aria-hidden="true" className="float-line h-[40vh] top-[5%] left-[3%]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Asymmetric layout: narrow eyebrow + headline left, prose right */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: label + headline */}
          <div className="lg:col-span-5">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
            >
              <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
              {t('gw_longterm_label')}
            </p>
            <h2
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] max-w-lg"
            >
              {t('gw_longterm_headline')}
            </h2>

            {/* Decorative vertical rule accent */}
            <div
              aria-hidden="true"
              className="mt-10 hidden lg:block w-px h-24 bg-gradient-to-b from-[var(--color-accent)]/40 to-transparent"
            />
          </div>

          {/* Right: prose */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="prose-yes text-lg leading-relaxed text-[var(--color-text-muted)] max-w-3xl">
              <p data-reveal="fade">{t('gw_longterm_p1')}</p>
              <p data-reveal="fade" className="mt-6">{t('gw_longterm_p2')}</p>
            </div>

            {/* Pull-quote emphasis */}
            <blockquote
              data-reveal="fade"
              className="my-10 border-l-2 border-[var(--color-accent)]/50 pl-6 font-heading italic text-[var(--color-accent-deep)] text-2xl md:text-3xl leading-snug max-w-2xl"
            >
              &ldquo;The Gospel advances through workers who stay. YES advances the workers.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
