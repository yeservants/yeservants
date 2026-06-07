'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface PlaceholderCard {
  slot: string;
}

const PLACEHOLDER_CARDS: PlaceholderCard[] = [
  { slot: 'A' },
  { slot: 'B' },
  { slot: 'C' },
  { slot: 'D' },
];

interface Props {
  base: string;
}

export default function AboutPeople({ base: _base }: Props) {
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
      <div aria-hidden="true" className="absolute inset-0 atmos-glow-center pointer-events-none" />
      <div aria-hidden="true" className="float-line h-40 absolute top-[6%] right-[8%] hidden lg:block" />
      <div aria-hidden="true" className="float-cross absolute bottom-[8%] left-[5%]" />

      <GreenAtmos variant={5} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('about_people_eyebrow')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-cream)] max-w-3xl"
          >
            {t('about_people_headline')}
          </h2>
          <p
            data-reveal="fade"
            className="mt-6 text-lg leading-relaxed text-[var(--color-cream)]/70 max-w-2xl"
          >
            {t('about_people_body')}
          </p>
        </div>

        {/* Placeholder leadership grid */}
        {/* CLIENT: provide leadership bios + headshots to replace these placeholder cards */}
        <div
          data-reveal-stagger
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          aria-label="Leadership team"
        >
          {PLACEHOLDER_CARDS.map((card, i) => (
            <article
              key={card.slot}
              className="relative bg-white/5 border border-[var(--color-cream)]/12 rounded-2xl overflow-hidden"
              style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
            >
              {/* Headshot placeholder */}
              {/* CLIENT: replace with actual headshot <img> */}
              <div
                className="w-full aspect-[3/4] bg-[var(--color-primary-deep)]/60 flex items-center justify-center"
                aria-hidden="true"
              >
                {/* Placeholder silhouette */}
                <svg
                  width="56"
                  height="72"
                  viewBox="0 0 56 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="opacity-20"
                >
                  <circle cx="28" cy="20" r="16" fill="currentColor" className="text-[var(--color-cream)]" />
                  <path
                    d="M0 68C0 52.536 12.536 40 28 40C43.464 40 56 52.536 56 68"
                    fill="currentColor"
                    className="text-[var(--color-cream)]"
                  />
                </svg>
              </div>

              {/* Bio details */}
              <div className="p-5">
                {/* CLIENT: replace with real name */}
                <p className="text-[var(--color-cream)]/35 text-xs tracking-wide uppercase mb-1">
                  [ Name to be provided ]
                </p>
                {/* CLIENT: replace with real role */}
                <p className="text-[var(--color-accent-light)] text-xs tracking-wide uppercase">
                  {t('about_people_card_role')}
                </p>
                {/* CLIENT: replace with real bio (2–3 sentences) */}
                <p className="mt-3 text-[var(--color-cream)]/40 text-sm leading-relaxed italic">
                  {t('about_people_placeholder')}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Note to client */}
        {/* CLIENT: provide leadership bios + headshots — remove this note once populated */}
        <p className="mt-8 text-center text-[var(--color-cream)]/30 text-xs tracking-wide">
          Leadership profiles will be added upon receipt of bios and photos.
        </p>
      </div>
    </section>
  );
}
