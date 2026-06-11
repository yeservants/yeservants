'use client';
import { useEffect, useRef } from 'react';
import type { Missionary } from '../types';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  missionaries: (Missionary & { pictureUrl?: string })[];
  base: string;
}

// Inline SVG placeholder for anonymous entries
function ShieldIcon() {
  return (
    <svg
      className="w-10 h-10 text-[var(--color-cream)]/40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function isAnonymous(m: Missionary): boolean {
  return m.picture === 'none.jpg';
}

export default function GwProfiles({ missionaries, base }: Props) {
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden green-gradient py-24 md:py-32"
    >
      {/* Atmospheric decorations */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none dot-grid-light opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 80% 20%, rgba(232,117,26,0.06) 0%, transparent 65%)',
        }}
      />

      <GreenAtmos variant={2} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="max-w-3xl mb-14">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('gw_profiles_label')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-cream)]"
          >
            {t('gw_profiles_headline')}
          </h2>
        </div>

        {/* Worker card grid — circular portrait style */}
        <div
          data-reveal-stagger
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12"
        >
          {missionaries.map((m, i) => {
            const anon = isAnonymous(m);
            const href = anon ? undefined : `${base}missionaries/${m.url}/`;

            const inner = (
              <>
                {/* Portrait circle */}
                <div
                  className={`relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden mb-4 flex-shrink-0 flex items-center justify-center transition-all duration-400 ${
                    anon
                      ? 'bg-[var(--color-primary-deep)] ring-2 ring-[var(--color-cream)]/15 ring-offset-4 ring-offset-transparent'
                      : 'ring-2 ring-[var(--color-accent)]/25 ring-offset-4 ring-offset-transparent group-hover:ring-[var(--color-accent)]/60'
                  }`}
                >
                  {anon ? (
                    <ShieldIcon />
                  ) : (
                    <>
                      <img
                        src={m.pictureUrl ?? `${base}images/${m.picture}`}
                        alt={m.name}
                        width={144}
                        height={144}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.08]"
                      />
                      <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/15 transition-colors duration-400 rounded-full" />
                    </>
                  )}
                </div>

                {/* Name / identifier */}
                <h3
                  className={`font-heading text-sm md:text-base font-medium leading-snug mb-1.5 text-center transition-colors duration-300 ${
                    anon
                      ? 'text-[var(--color-cream)]/50'
                      : 'text-[var(--color-cream)] group-hover:text-[var(--color-accent)]'
                  }`}
                >
                  {anon ? t('gw_profiles_anon_region') : m.name}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-[var(--color-cream)]/50 text-[10px] tracking-[0.12em] uppercase mb-2.5 text-center justify-center">
                  {anon ? (
                    <span>{t('gw_profiles_anon_note')}</span>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3 text-[var(--color-accent)]/60 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      {m.region ?? m.location}
                    </>
                  )}
                </div>

                {/* Role badge if available */}
                {!anon && m.role && (
                  <p className="text-[var(--color-accent-light)] text-[9px] tracking-[0.18em] uppercase font-medium mb-2 text-center">
                    {m.role}
                  </p>
                )}

                {/* View profile on hover — non-anonymous only */}
                {!anon && (
                  <div className="flex items-center gap-1.5 text-[var(--color-accent-light)] text-[10px] tracking-[0.15em] uppercase font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <span aria-hidden="true" className="text-[8px] leading-none">✛</span>
                    {t('gw_profiles_viewProfile')}
                  </div>
                )}
              </>
            );

            return href ? (
              <a
                key={m.url ?? `worker-${i}`}
                href={href}
                className="group flex flex-col items-center text-center"
                style={{ '--reveal-delay': `${i * 0.04}s` } as React.CSSProperties}
              >
                {inner}
              </a>
            ) : (
              <div
                key={`anon-${i}`}
                className="flex flex-col items-center text-center"
                style={{ '--reveal-delay': `${i * 0.04}s` } as React.CSSProperties}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
