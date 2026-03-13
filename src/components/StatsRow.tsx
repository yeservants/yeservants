'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix: string;
  labelKey: 'stats_years' | 'stats_missionaries' | 'stats_nations' | 'stats_gospel';
  display?: string;
}

const stats: StatItem[] = [
  { value: 35, suffix: '+', labelKey: 'stats_years' },
  { value: 20, suffix: '+', labelKey: 'stats_missionaries' },
  { value: 20, suffix: '+', labelKey: 'stats_nations' },
  { value: 0, suffix: '', labelKey: 'stats_gospel', display: '1000s' },
];

export default function StatsRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const { t } = useLang();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          stats.forEach((stat, i) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts((prev) => {
                  const next = [...prev];
                  next[i] = Math.round(obj.val);
                  return next;
                });
              },
            });
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative green-gradient py-16 md:py-20 overflow-hidden">
      {/* Accent glow */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[45%] h-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at 100% 50%, rgba(194,125,65,0.12) 0%, transparent 65%)' }} />
      <div
        className="absolute font-heading font-bold text-[clamp(5rem,16vw,16rem)] top-[1%] left-1/2 -translate-x-1/2 pointer-events-none select-none leading-none whitespace-nowrap"
        style={{ color: 'rgba(255,255,255,0.06)' }}
        aria-hidden="true"
      >
        IMPACT
      </div>
      {/* Real SVG crosses */}
      <svg aria-hidden="true" className="absolute top-[10%] left-[6%] opacity-[0.12] text-[var(--color-accent)]" width="32" height="48" viewBox="0 0 40 60" fill="currentColor"><rect x="16" y="0" width="8" height="60" rx="3"/><rect x="0" y="18" width="40" height="8" rx="3"/></svg>
      <svg aria-hidden="true" className="absolute bottom-[10%] right-[8%] opacity-[0.08] text-white" width="20" height="30" viewBox="0 0 40 60" fill="currentColor"><rect x="16" y="0" width="8" height="60" rx="3"/><rect x="0" y="18" width="40" height="8" rx="3"/></svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={stat.labelKey} className="text-center">
            <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-accent)] mb-2">
              {stat.display ?? `${counts[i]}${stat.suffix}`}
            </div>
            <div className="text-[#FAF8F4]/60 text-sm tracking-[0.1em] uppercase">
              {t(stat.labelKey)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
