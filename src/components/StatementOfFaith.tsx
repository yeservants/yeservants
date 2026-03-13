'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger);

export default function StatementOfFaith() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const quote = section.querySelector('.faith-quote');
    if (quote) {
      gsap.set(quote, { opacity: 0, y: 30 });
      gsap.to(quote, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) trigger.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 green-gradient overflow-hidden">
      {/* Accent glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(194,125,65,0.10) 0%, transparent 60%)' }} />
      <div
        className="absolute font-heading font-bold text-[clamp(5rem,18vw,18rem)] top-[42%] left-1/2 -translate-x-1/2 pointer-events-none select-none leading-none whitespace-nowrap"
        style={{ color: 'rgba(255,255,255,0.06)' }}
        aria-hidden="true"
      >
        FAITH
      </div>
      {/* Real SVG crosses */}
      <svg aria-hidden="true" className="absolute top-8 left-1/2 -translate-x-1/2 text-[var(--color-accent)] opacity-20" width="40" height="60" viewBox="0 0 40 60" fill="currentColor"><rect x="16" y="0" width="8" height="60" rx="3"/><rect x="0" y="18" width="40" height="8" rx="3"/></svg>
      <svg aria-hidden="true" className="absolute top-[12%] right-[8%] text-[var(--color-accent)] opacity-[0.10]" width="24" height="36" viewBox="0 0 40 60" fill="currentColor"><rect x="16" y="0" width="8" height="60" rx="3"/><rect x="0" y="18" width="40" height="8" rx="3"/></svg>
      <svg aria-hidden="true" className="absolute bottom-[10%] left-[6%] text-white opacity-[0.06]" width="18" height="27" viewBox="0 0 40 60" fill="currentColor"><rect x="16" y="0" width="8" height="60" rx="3"/><rect x="0" y="18" width="40" height="8" rx="3"/></svg>
      <div className="float-line h-[20vh] bottom-[10%] left-[8%] opacity-10" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-[var(--color-accent)] text-sm tracking-[0.2em] uppercase font-medium mb-8">
          {t('faith_label')}
        </p>

        <blockquote className="faith-quote font-heading italic text-xl md:text-2xl lg:text-3xl text-[#FAF8F4]/90 leading-relaxed">
          {t('faith_creed')}
        </blockquote>

        <p className="mt-8 text-[#FAF8F4]/40 text-sm tracking-wide">
          {t('faith_source')}
        </p>
      </div>
    </section>
  );
}
