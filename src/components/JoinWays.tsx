'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface Props {
  base: string;
}

interface Way {
  num: string;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  ctaKey: TranslationKey;
  href: string;
  icon: ReactNode;
}

/**
 * Join — Block 1. The four ways to partner: give monthly, send a team, go &
 * serve, pray. Each card links into the existing flow (give · mission-teams ·
 * contact). 2×2 editorial grid, espresso ink on the light field.
 */
export default function JoinWays({ base }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const ways: Way[] = [
    {
      num: '01',
      titleKey: 'join_way1_title',
      bodyKey: 'join_way1_body',
      ctaKey: 'join_way1_cta',
      href: `${base}give/`,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      ),
    },
    {
      num: '02',
      titleKey: 'join_way2_title',
      bodyKey: 'join_way2_body',
      ctaKey: 'join_way2_cta',
      href: `${base}mission-teams/`,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      ),
    },
    {
      num: '03',
      titleKey: 'join_way3_title',
      bodyKey: 'join_way3_body',
      ctaKey: 'join_way3_cta',
      href: `${base}contact/`,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
      ),
    },
    {
      num: '04',
      titleKey: 'join_way4_title',
      bodyKey: 'join_way4_body',
      ctaKey: 'join_way4_cta',
      href: `${base}contact/`,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z M12 6.984v13.516" />
      ),
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[var(--color-bg)] overflow-hidden"
      aria-labelledby="join-ways-heading"
    >
      <div aria-hidden="true" className="float-line h-[22vh] top-[12%] left-[6%] hidden lg:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('join_ways_label')}
          </p>
          <h2
            id="join-ways-heading"
            data-reveal="mask"
            className="font-heading font-medium leading-[1.12] text-[clamp(1.9rem,4vw,3rem)] text-[var(--color-text)] mb-6"
          >
            {t('join_ways_headline')}
          </h2>
          <p data-reveal="fade" className="text-lg leading-[1.8] text-[var(--color-text-muted)]">
            {t('join_ways_intro')}
          </p>
        </div>

        <div data-reveal-stagger className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {ways.map((w) => (
            <a
              key={w.num}
              href={w.href}
              className="group relative flex flex-col rounded-2xl bg-[var(--color-surface)] ring-1 ring-[var(--color-primary)]/[0.08] p-8 md:p-9 transition-all duration-300 hover:ring-[var(--color-accent)]/40 hover:shadow-[0_14px_40px_rgba(33,23,16,0.10)] hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent-deep)]">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" aria-hidden="true">
                    {w.icon}
                  </svg>
                </span>
                <span aria-hidden="true" className="font-heading text-[var(--color-primary)]/12 text-4xl leading-none select-none">
                  {w.num}
                </span>
              </div>

              <h3 className="font-heading text-[var(--color-text)] text-xl md:text-2xl mb-3">{t(w.titleKey)}</h3>
              <p className="text-[var(--color-text-muted)] text-base leading-[1.75] mb-6 flex-1">{t(w.bodyKey)}</p>

              <span className="inline-flex items-center gap-2 text-[var(--color-accent-deep)] text-sm font-semibold tracking-wide">
                {t(w.ctaKey)}
                <svg
                  width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
