'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
  sealSrc: string;
}

export default function HomeWhoWeAre({ base: _base, sealSrc }: Props) {
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

  // Stats array — stat1 is confirmed. stat2 value is a conservative stand-in.
  // stat3 and stat4 are explicit placeholders per Decision C.
  const stats = [
    {
      value: t('home_who_stat1_value'),
      label: t('home_who_stat1_label'),
      confirmed: true,
    },
    {
      value: t('home_who_stat2_value'),
      label: t('home_who_stat2_label'),
      confirmed: false, // CLIENT: provide exact # of nations
    },
    {
      value: t('home_who_stat3_value'),
      label: t('home_who_stat3_label'),
      confirmed: false, // CLIENT: provide exact # of workers currently supported
    },
    {
      value: t('home_who_stat4_value'),
      label: t('home_who_stat4_label'),
      confirmed: false, // CLIENT: provide exact # of teams deployed
    },
  ] as const;

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-bg)] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Eyebrow */}
        <p
          data-reveal="fade"
          className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-8"
        >
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
          {t('home_who_label')}
        </p>

        {/* Stat row */}
        <div
          data-reveal-stagger
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mb-16 border-y border-[var(--color-primary)]/10 py-12"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ '--reveal-delay': `${i * 0.09}s` } as React.CSSProperties}
            >
              {/* <!-- CLIENT: provide exact # --> */}
              <p
                className={`font-heading font-medium text-[clamp(2.5rem,6vw,4.5rem)] leading-none mb-2 ${
                  stat.confirmed
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)]'
                }`}
              >
                {stat.value}
              </p>
              <p className="text-[var(--color-text-muted)] text-xs tracking-[0.2em] uppercase">
                {stat.label}
              </p>
              {!stat.confirmed && (
                <p className="mt-1 text-[var(--color-accent-deep)] text-[10px] tracking-wide">
                  (to be confirmed)
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Transparency seal + body */}
        <div
          data-reveal="mask"
          className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start"
        >
          {/* Seal */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={sealSrc}
              alt="Candid Platinum Transparency Seal 2025"
              width={120}
              height={120}
              loading="lazy"
              className="w-24 md:w-28"
            />
            <p className="text-[var(--color-text-muted)] text-xs tracking-wide text-center max-w-[10rem]">
              {t('home_who_seal')}
            </p>
          </div>

          {/* Prose + CTA */}
          <div>
            <p className="text-lg leading-relaxed text-[var(--color-text-muted)] max-w-2xl mb-8">
              {t('home_who_body')}
            </p>
            {/* <!-- CLIENT: link to actual financials / annual reports page --> */}
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-primary)]/5 transition-colors duration-300"
            >
              {t('home_who_cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
