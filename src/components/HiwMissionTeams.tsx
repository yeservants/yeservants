'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';
import type { TranslationKey } from '../i18n/translations';

interface TeamBullet {
  key: TranslationKey;
}

const BULLETS: TeamBullet[] = [
  { key: 'hiw_teams_b1' },
  { key: 'hiw_teams_b2' },
  { key: 'hiw_teams_b3' },
  { key: 'hiw_teams_b4' },
];

interface Props {
  base: string;
  fieldImage: string;
}

export default function HiwMissionTeams({ base, fieldImage }: Props) {
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
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) =>
      io.observe(el)
    );
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 green-gradient overflow-hidden text-[var(--color-cream)]"
      aria-labelledby="hiw-teams-heading"
    >
      <div aria-hidden="true" className="absolute inset-0 atmos-glow pointer-events-none" />
      <div aria-hidden="true" className="float-line h-56 top-[8%] right-[4%] hidden lg:block" />

      <GreenAtmos variant={4} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Asymmetric two-column: image left, content right */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Field photo */}
          <div className="lg:col-span-5 order-last lg:order-first">
            <div data-reveal="mask" className="relative">
              {/* CLIENT: replace with verified field/team photo */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 border border-[var(--color-accent)]/20 rounded-[1.4rem] pointer-events-none hidden sm:block"
              />
              <div className="relative overflow-hidden rounded-[1.2rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] aspect-[4/5]">
                <img
                  src={fieldImage}
                  alt="A YES mission team serving alongside long-term field workers"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={640}
                  height={800}
                />
                {/* <!-- CLIENT: replace with verified mission-team photo --> */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/50 via-transparent to-transparent"
                />
              </div>
              {/* Years badge */}
              <div className="absolute -bottom-5 -right-2 sm:right-4 bg-[var(--color-accent-deep)] text-white rounded-xl px-5 py-3 shadow-[0_8px_24px_rgba(232,117,26,0.5)]">
                <p className="font-heading text-2xl font-bold leading-none">35+</p>
                <p className="text-[10px] tracking-widest uppercase mt-0.5 opacity-90">Years</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
            >
              <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
              {t('hiw_teams_label')}
            </p>
            <h2
              id="hiw-teams-heading"
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-cream)] mb-6"
            >
              {t('hiw_teams_headline')}
            </h2>

            <p
              data-reveal="fade"
              className="text-[var(--color-cream)]/75 text-lg leading-relaxed mb-8 max-w-xl"
            >
              {t('hiw_teams_intro')}
            </p>

            <p
              data-reveal="fade"
              className="text-[var(--color-cream)]/60 text-sm uppercase tracking-[0.15em] font-medium mb-4"
            >
              {t('hiw_teams_sub')}
            </p>

            <ul
              data-reveal-stagger
              className="flex flex-col gap-4"
              aria-label={t('hiw_teams_headline')}
            >
              {BULLETS.map((b, i) => (
                <li
                  key={b.key}
                  className="flex items-start gap-4"
                  style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
                >
                  <span
                    className="flex-shrink-0 mt-1.5 w-5 h-5 rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/40 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-[var(--color-accent)] text-[9px] font-bold">✛</span>
                  </span>
                  <p className="text-[var(--color-cream)]/75 text-base md:text-lg leading-relaxed">
                    {t(b.key)}
                  </p>
                </li>
              ))}
            </ul>

            <div data-reveal="fade" className="mt-10">
              <a
                href={`${base}our-work/`}
                className="inline-flex items-center gap-2 border border-[var(--color-cream)]/35 text-[var(--color-cream)] text-sm font-semibold tracking-wide rounded-full px-7 py-3.5 hover:bg-[var(--color-cream)]/10 transition-colors duration-300"
              >
                {t('cta_exploreOurWork')}
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
