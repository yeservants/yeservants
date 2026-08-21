'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface StoryImg {
  src: string;
}

// Inline pin icon + location badge — matches the Missionaries story photos.
function LocationBadge({ label }: { label: string }) {
  return (
    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[var(--color-primary-deep)]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
      <svg className="w-4 h-4 flex-shrink-0 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
      <span className="text-[var(--color-cream)] text-[10px] tracking-[0.18em] uppercase font-medium">{label}</span>
    </div>
  );
}

interface Props {
  base: string;
  crImg: StoryImg;
  hnImg: StoryImg;
  phImg: StoryImg;
}

/**
 * Block 1 (continuation) — "What I've Seen": the body of Andrés' letter.
 * Editorial letter on warm paper: large serif measure, the three field stories
 * (Costa Rica · Mata Hambre · Ozamiz) with photos, isolated impact lines given
 * their own space (webmaster rule: "las frases cortas de impacto van solas").
 */
export default function HomeLetter({ base: _base, crImg, hnImg, phImg }: Props) {
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

  const locationLabel = (text: string) => (
    <p className="flex items-center gap-3 text-[var(--color-accent-deep)] text-sm md:text-lg tracking-[0.28em] uppercase font-semibold mb-6">
      <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
      {text}
    </p>
  );

  return (
    <section ref={ref} className="relative bg-[var(--color-bg)] py-12 md:py-16 overflow-hidden">
      {/* faint ghost typography — letter atmosphere */}
      <div
        aria-hidden="true"
        className="ghosttype top-16 right-[-3rem] text-[clamp(5rem,14vw,11rem)] hidden lg:block"
      >
        1990
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* ── Letter opening ── */}
        <div className="max-w-3xl">
          {/* Opening paragraphs (p1–p3) moved into the Hero (v7 hero sequence,
              2026-08-20) — the letter opens on its chapter title, then the
              field stories. */}
          <h2
            data-reveal="mask"
            className="flex items-center gap-5 font-heading font-medium text-[var(--color-text)] text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.12]"
          >
            <span aria-hidden="true" className="w-12 h-[2px] bg-[var(--color-accent)]/70 shrink-0" />
            {t('home_letter_label')}
          </h2>
        </div>

        {/* ── Story 1 — Costa Rica ── */}
        <div className="mt-20 md:mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div data-reveal="fade" className="lg:col-span-7 order-2 lg:order-1">
            {locationLabel(t('home_letter_cr_label'))}
            <div className="space-y-6 text-lg leading-[1.8] text-[var(--color-text)]/85">
              <p>
                {t('home_letter_cr_p1')} {t('home_letter_cr_iso')}{' '}
                {t('home_letter_cr_p2')} {t('home_letter_cr_p3')}
              </p>
            </div>

            <blockquote
              data-reveal="fade"
              className="mt-10 border-l-[3px] border-[var(--color-accent)] pl-6 font-heading italic text-[var(--color-accent-deep)] text-xl md:text-2xl leading-[1.5]"
            >
              &ldquo;{t('home_letter_cr_quote')}&rdquo;
            </blockquote>
          </div>

          <div data-reveal="mask" className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-32">
            <figure className="relative">
              <div aria-hidden="true" className="absolute -inset-2.5 rounded-[1.2rem] border border-[var(--color-accent)]/20 translate-x-3 translate-y-3 pointer-events-none" />
              <div className="relative overflow-hidden rounded-[1rem] shadow-[0_24px_60px_-20px_rgba(33,23,16,0.35)] aspect-[4/3]">
                <img src={crImg.src} alt={t('home_letter_cr_alt')} loading="lazy" width={720} height={540} className="w-full h-full object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/50 via-transparent to-transparent" />
                <LocationBadge label={t('home_letter_cr_loc')} />
              </div>
            </figure>
          </div>
        </div>

        {/* ── Story 2 — Mata Hambre, Honduras ── */}
        <div className="mt-20 md:mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div data-reveal="mask" className="lg:col-span-5 lg:sticky lg:top-32">
            <figure className="relative">
              <div aria-hidden="true" className="absolute -inset-2.5 rounded-[1.2rem] border border-[var(--color-accent)]/20 -translate-x-3 translate-y-3 pointer-events-none" />
              <div className="relative overflow-hidden rounded-[1rem] shadow-[0_24px_60px_-20px_rgba(33,23,16,0.35)] aspect-[4/3]">
                <img src={hnImg.src} alt={t('home_letter_hn_alt')} loading="lazy" width={720} height={540} className="w-full h-full object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/50 via-transparent to-transparent" />
                <LocationBadge label={t('home_letter_hn_loc')} />
              </div>
            </figure>
          </div>

          <div data-reveal="fade" className="lg:col-span-7">
            {locationLabel(t('home_letter_hn_label'))}
            <div className="space-y-6 text-lg leading-[1.8] text-[var(--color-text)]/85">
              <p>{t('home_letter_hn_p1')}</p>
              <p className="font-semibold text-[var(--color-text)]">{t('home_letter_hn_p2')}</p>
            </div>
          </div>
        </div>

        {/* ── Story 3 — Ozamiz, Philippines ── */}
        <div className="mt-20 md:mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div data-reveal="fade" className="lg:col-span-7 order-2 lg:order-1">
            {locationLabel(t('home_letter_ph_label'))}
            <div className="space-y-6 text-lg leading-[1.8] text-[var(--color-text)]/85">
              <p>{t('home_letter_ph_p1')}</p>
            </div>
          </div>

          <div data-reveal="mask" className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-32">
            <figure className="relative">
              <div aria-hidden="true" className="absolute -inset-2.5 rounded-[1.2rem] border border-[var(--color-accent)]/20 translate-x-3 -translate-y-3 pointer-events-none" />
              <div className="relative overflow-hidden rounded-[1rem] shadow-[0_24px_60px_-20px_rgba(33,23,16,0.35)] aspect-[4/3]">
                <img src={phImg.src} alt={t('home_letter_ph_alt')} loading="lazy" width={720} height={540} className="w-full h-full object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/50 via-transparent to-transparent" />
                <LocationBadge label={t('home_letter_ph_loc')} />
              </div>
            </figure>
          </div>
        </div>

        {/* ── Letter close ── */}
        <div data-reveal="fade" className="mt-20 md:mt-24 border-t border-[var(--color-primary)]/10 pt-14 max-w-3xl mx-auto">
          <p className="font-heading text-[var(--color-text)] text-xl md:text-2xl leading-[1.65] text-center">
            {t('home_letter_close')}
          </p>
        </div>
      </div>
    </section>
  );
}
