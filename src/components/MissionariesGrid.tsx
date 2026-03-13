'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Missionary } from '../types';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  missionaries: Missionary[];
  base: string;
}

export default function MissionariesGrid({ missionaries, base }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.m-card'));

    gsap.fromTo(
      cards,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.04, delay: 0.1 }
    );

    cards.forEach((card) => {
      const img = card.querySelector('.m-card-img');
      if (img) {
        gsap.to(img, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={gridRef} className="relative py-16 md:py-24 bg-[var(--color-bg)]">
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {missionaries.map((m) => (
            <a
              key={m.url}
              href={`${base}missionary/${m.url}/`}
              className="m-card group block"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl bg-[var(--color-surface)] mb-4">
                <img
                  src={`${base}images/${m.picture}`}
                  alt={m.name}
                  width={400}
                  height={480}
                  loading="lazy"
                  className="m-card-img w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/30 transition-all duration-500 flex items-end p-5">
                  <span className="translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 text-white text-sm font-medium tracking-wide flex items-center gap-1.5">
                    {t('grid_viewProfile')}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
                {/* Accent border on hover */}
                <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-[var(--color-accent)] transition-all duration-300 pointer-events-none" />
              </div>

              {/* Text */}
              <h3 className="font-heading text-base font-medium text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-snug mb-1">
                {m.name}
              </h3>
              <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] text-sm">
                <svg className="w-3.5 h-3.5 text-[var(--color-accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
                {m.location}
              </div>
            </a>
          ))}
        </div>

        {/* Donate CTA */}
        <div className="mt-20 text-center">
          <p className="text-[var(--color-text-muted)] text-sm mb-4">Want to support a missionary?</p>
          <a
            href="https://www.aplos.com/aws/give/YieldedEvangelicalServantsInc/YesDonations"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 bg-[var(--color-accent)] text-white font-medium rounded transition-opacity hover:opacity-90"
          >
            Give Now →
          </a>
        </div>
      </div>
    </section>
  );
}
