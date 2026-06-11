'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface StoryImg {
  src: string;
  alt: string;
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
    <p className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.28em] uppercase font-semibold mb-6">
      <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
      {text}
    </p>
  );

  return (
    <section ref={ref} className="relative bg-[var(--color-bg)] py-24 md:py-32 overflow-hidden">
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
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-10"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('home_letter_label')}
          </p>

          <div data-reveal="fade" className="space-y-6 text-lg md:text-xl leading-[1.8] text-[var(--color-text)]/85">
            <p>{t('home_letter_p1')}</p>
            <p>{t('home_letter_p2')}</p>
            <p className="font-semibold text-[var(--color-text)]">{t('home_letter_p3')}</p>
          </div>
        </div>

        {/* ── Story 1 — Costa Rica ── */}
        <div className="mt-20 md:mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div data-reveal="fade" className="lg:col-span-7 order-2 lg:order-1">
            {locationLabel(t('home_letter_cr_label'))}
            <div className="space-y-6 text-lg leading-[1.8] text-[var(--color-text)]/85">
              <p>{t('home_letter_cr_p1')}</p>
            </div>

            {/* isolated impact line — given its own silence */}
            <p
              data-reveal="mask"
              className="font-heading italic text-[var(--color-text)] text-[clamp(1.4rem,2.8vw,2rem)] leading-snug text-center py-10 md:py-12"
            >
              {t('home_letter_cr_iso')}
            </p>

            <div className="space-y-6 text-lg leading-[1.8] text-[var(--color-text)]/85">
              <p>{t('home_letter_cr_p2')}</p>
              <p>{t('home_letter_cr_p3')}</p>
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
                {/* CLIENT: replace stand-in with verified Bajo Rodriguez photo */}
                <img src={crImg.src} alt={crImg.alt} loading="lazy" width={720} height={540} className="w-full h-full object-cover" />
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
                {/* CLIENT: replace stand-in with verified Mata Hambre photo */}
                <img src={hnImg.src} alt={hnImg.alt} loading="lazy" width={720} height={540} className="w-full h-full object-cover" />
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

            <p
              data-reveal="mask"
              className="font-heading italic text-[var(--color-accent-deep)] text-[clamp(1.4rem,2.8vw,2rem)] leading-snug text-center py-10 md:py-12"
            >
              {t('home_letter_ph_iso')}
            </p>
          </div>

          <div data-reveal="mask" className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-32">
            <figure className="relative">
              <div aria-hidden="true" className="absolute -inset-2.5 rounded-[1.2rem] border border-[var(--color-accent)]/20 translate-x-3 -translate-y-3 pointer-events-none" />
              <div className="relative overflow-hidden rounded-[1rem] shadow-[0_24px_60px_-20px_rgba(33,23,16,0.35)] aspect-[4/3]">
                {/* CLIENT: replace stand-in with verified Ozamiz photo */}
                <img src={phImg.src} alt={phImg.alt} loading="lazy" width={720} height={540} className="w-full h-full object-cover" />
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
