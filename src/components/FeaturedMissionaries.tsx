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

export default function FeaturedMissionaries({ missionaries, base }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('.feat-heading');
    if (heading) {
      gsap.fromTo(heading,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 88%', once: true } }
      );
    }

    const cards = section.querySelectorAll('.feat-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.14,
        scrollTrigger: { trigger: section.querySelector('.feat-grid'), start: 'top 82%', once: true },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Element)) trigger.kill();
      });
    };
  }, []);

  const featured = missionaries.slice(0, 3);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden bg-[var(--color-bg)]">
      <div
        className="absolute font-heading font-bold text-[clamp(4rem,16vw,14rem)] top-[8%] left-1/2 -translate-x-1/2 leading-none pointer-events-none select-none text-[rgba(44,74,62,0.045)] whitespace-nowrap"
        aria-hidden="true"
      >
        SERVANTS
      </div>
      <div className="float-line h-[30vh] top-[10%] left-[3%]" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="feat-heading flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <p className="text-[var(--color-accent)] text-[10px] tracking-[0.28em] uppercase font-medium mb-3">
              {t('feat_label')}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-light text-[var(--color-primary)] leading-[1.05]">
              {t('feat_heading_line1')}{' '}
              <em className="not-italic text-[var(--color-accent)]">{t('feat_heading_line2')}</em>
            </h2>
          </div>
          <a
            href={`${base}missionaries/`}
            className="group flex items-center gap-2 text-[var(--color-text-muted)] text-sm tracking-wide hover:text-[var(--color-accent)] transition-colors duration-300 self-start md:self-auto"
          >
            {t('feat_viewAll')}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Circular cards — 3 per row */}
        <div className="feat-grid grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          {featured.map((m, i) => (
            <a
              key={m.url}
              href={`${base}missionary/${m.url}/`}
              className="feat-card group flex flex-col items-center text-center"
            >
              {/* Circle image */}
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden ring-2 ring-[var(--color-accent)]/25 ring-offset-4 ring-offset-[var(--color-bg)] group-hover:ring-[var(--color-accent)]/70 transition-all duration-400 mb-5 flex-shrink-0">
                <img
                  src={`${base}images/${m.picture}`}
                  alt={m.name}
                  width={208}
                  height={208}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-600 group-hover:scale-[1.08]"
                />
                {/* Subtle hover tint */}
                <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/15 transition-colors duration-400 rounded-full" />
              </div>

              {/* Index */}
              <span className="text-[var(--color-accent)]/40 text-[10px] tracking-[0.25em] uppercase font-medium mb-1.5">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Name */}
              <h3 className="font-heading text-[var(--color-primary)] text-lg font-medium leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-1.5">
                {m.name}
              </h3>

              {/* Location */}
              <p className="text-[var(--color-text-muted)] text-[10px] tracking-[0.18em] uppercase mb-3">
                {m.location}
              </p>

              {/* View profile — appears on hover */}
              <div className="flex items-center gap-1.5 text-[var(--color-accent)] text-[10px] tracking-[0.15em] uppercase font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <span aria-hidden="true" className="text-[8px] leading-none">✛</span>
                {t('grid_viewProfile')}
              </div>
            </a>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-7 border-t border-[var(--color-primary)]/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-sm">
            {t('feat_strip')}
          </p>
          <a
            href={`${base}donate/`}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--color-accent)] text-white text-[11px] tracking-[0.18em] uppercase font-semibold hover:opacity-90 transition-opacity duration-300"
          >
            <span aria-hidden="true" className="text-[8px] leading-none">✛</span>
            {t('feat_support')}
          </a>
        </div>
      </div>
    </section>
  );
}
