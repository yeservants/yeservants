'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface StoryPhoto {
  src: string;
  locationKey?: string; // used in HTML comment for client
}

interface Props {
  photos: StoryPhoto[];
}

// Inline SVG pin icon — avoids emoji
function PinIcon() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0 text-[var(--color-accent)]"
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
  );
}

export default function GwStories({ photos }: Props) {
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

  const stories = [
    {
      label: t('gw_cost_cr_label'),
      body: t('gw_cost_cr_body'),
      photoIndex: 0,
      locationComment: 'Bajo Rodríguez, Costa Rica',
    },
    {
      label: t('gw_cost_hn_label'),
      body: t('gw_cost_hn_body'),
      photoIndex: 1,
      locationComment: 'Mata Hambre, Honduras',
    },
    {
      label: t('gw_cost_ph_label'),
      body: t('gw_cost_ph_body'),
      photoIndex: 2,
      locationComment: 'Ozamiz, Philippines',
    },
  ] as const;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-bg)] py-24 md:py-32"
    >
      {/* Atmospheric decorations */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 15% 60%, rgba(232,117,26,0.07) 0%, transparent 65%)',
        }}
      />
      <div aria-hidden="true" className="float-line h-[28vh] top-[12%] right-[8%]" />
      <svg
        aria-hidden="true"
        className="absolute top-[10%] left-[5%] text-[var(--color-accent)] opacity-[0.10]"
        width="28"
        height="44"
        viewBox="0 0 40 60"
        fill="currentColor"
      >
        <rect x="16" y="0" width="8" height="60" rx="3" />
        <rect x="0" y="18" width="40" height="8" rx="3" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('gw_cost_label')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)]"
          >
            {t('gw_cost_headline')}
          </h2>
          <p
            data-reveal="fade"
            className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)] max-w-2xl"
          >
            {t('gw_cost_intro')}
          </p>
        </div>

        {/* Three field stories */}
        <div className="space-y-16 md:space-y-20">
          {stories.map((story, i) => (
            <article
              key={story.label}
              data-reveal="mask"
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Alternating photo side */}
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                {/* CLIENT: replace with verified [location] photo */}
                <div className="relative overflow-hidden rounded-2xl border border-[var(--color-primary)]/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] aspect-[3/2]">
                  <img
                    src={photos[story.photoIndex]?.src ?? ''}
                    alt={`Field photograph — ${story.locationComment}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={720}
                    height={480}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/50 via-transparent to-transparent"
                  />
                  {/* Location badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[var(--color-primary-deep)]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <PinIcon />
                    <span className="text-[var(--color-cream)] text-[10px] tracking-[0.18em] uppercase font-medium">
                      {story.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Story text */}
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    aria-hidden="true"
                    className="w-6 h-px bg-[var(--color-accent)]/60"
                  />
                  <p className="text-[var(--color-accent-deep)] text-xs tracking-[0.25em] uppercase font-medium">
                    {story.label}
                  </p>
                </div>
                <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                  {story.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
