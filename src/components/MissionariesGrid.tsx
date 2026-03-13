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
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.05, delay: 0.1 }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={gridRef} className="relative pt-8 pb-16 md:pt-10 md:pb-20 bg-[var(--color-bg)]">
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* 4-per-row circular grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {missionaries.map((m) => (
            <a
              key={m.url}
              href={`${base}missionary/${m.url}/`}
              className="m-card group flex flex-col items-center text-center"
            >
              {/* Circle image */}
              <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-[var(--color-accent)]/25 ring-offset-4 ring-offset-[var(--color-bg)] group-hover:ring-[var(--color-accent)]/70 transition-all duration-400 mb-4 flex-shrink-0">
                <img
                  src={`${base}images/${m.picture}`}
                  alt={m.name}
                  width={160}
                  height={160}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/15 transition-colors duration-400 rounded-full" />
              </div>

              {/* Name */}
              <h3 className="font-heading text-[var(--color-primary)] text-sm md:text-base font-medium leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-1.5">
                {m.name}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1 text-[var(--color-text-muted)] text-[10px] tracking-[0.12em] uppercase mb-2.5">
                <svg className="w-3 h-3 text-[var(--color-accent)]/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
                {m.location}
              </div>

              {/* View profile on hover */}
              <div className="flex items-center gap-1.5 text-[var(--color-accent)] text-[10px] tracking-[0.15em] uppercase font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <span aria-hidden="true" className="text-[8px] leading-none">✛</span>
                {t('grid_viewProfile')}
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--color-accent)] text-white text-[11px] tracking-[0.18em] uppercase font-semibold hover:opacity-90 transition-opacity duration-300"
          >
            <span aria-hidden="true" className="text-[9px] leading-none">✛</span>
            Give Now
          </a>
        </div>
      </div>
    </section>
  );
}
