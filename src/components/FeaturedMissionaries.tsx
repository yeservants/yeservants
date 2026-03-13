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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 85%', once: true } }
      );
    }

    const cards = section.querySelectorAll('.feat-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.14,
        scrollTrigger: { trigger: section.querySelector('.feat-grid'), start: 'top 78%', once: true },
      }
    );

    section.querySelectorAll('.feat-img').forEach((img) => {
      gsap.to(img, {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Element)) trigger.kill();
      });
    };
  }, []);

  const featured = missionaries.slice(0, 3);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden bg-[var(--color-bg)]">
      <div className="absolute font-heading font-bold text-[clamp(4rem,16vw,14rem)] top-[11%] right-[2%] leading-none pointer-events-none select-none text-[rgba(44,74,62,0.06)] whitespace-nowrap" aria-hidden="true">SERVANTS</div>
      <div className="float-line h-[30vh] top-[10%] left-[3%]" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="feat-heading flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-[var(--color-accent)] text-xs tracking-[0.25em] uppercase font-medium mb-3">
              {t('feat_label')}
            </p>
            <h2 className="font-heading text-4xl md:text-6xl font-light text-[var(--color-primary)] leading-[1.05]">
              {t('feat_heading_line1')}<br />
              <em className="not-italic text-[var(--color-accent)]">{t('feat_heading_line2')}</em>
            </h2>
          </div>
          <a
            href={`${base}missionaries/`}
            className="group flex items-center gap-2 text-[var(--color-primary)] font-medium text-sm tracking-wide border-b border-[var(--color-primary)]/30 pb-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 self-start md:self-auto"
          >
            {t('feat_viewAll')}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div className="feat-grid grid md:grid-cols-3 gap-5 md:gap-6 items-start">
          {featured.map((m, i) => (
            <a
              key={m.url}
              href={`${base}missionary/${m.url}/`}
              className={`feat-card group block relative ${i === 1 ? 'md:-translate-y-10' : ''}`}
            >
              <div className="relative overflow-hidden bg-[var(--color-surface)]">
                <span className="absolute top-4 left-4 z-20 font-heading text-white/40 text-xs tracking-[0.2em] font-light">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <img
                  src={`${base}images/${m.picture}`}
                  alt={m.name}
                  width={500}
                  height={667}
                  loading="lazy"
                  className="feat-img w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="font-heading text-white text-lg font-medium leading-tight mb-0.5 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {m.name}
                  </h3>
                  <p className="text-white/60 text-xs tracking-wide uppercase">{m.location}</p>
                </div>
                <div className="absolute inset-0 border-2 border-[var(--color-accent)]/0 group-hover:border-[var(--color-accent)]/60 transition-all duration-500" />
              </div>
              {i === 1 && (
                <div className="h-px w-12 bg-[var(--color-accent)] mx-auto mt-5 opacity-60" />
              )}
            </a>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-8 border-t border-[var(--color-primary)]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-sm">
            {t('feat_strip')}
          </p>
          <a
            href={`${base}donate/`}
            className="px-6 py-2.5 bg-[var(--color-accent)] text-white text-sm font-medium rounded transition-opacity duration-300 hover:opacity-90"
          >
            {t('feat_support')}
          </a>
        </div>
      </div>
    </section>
  );
}
