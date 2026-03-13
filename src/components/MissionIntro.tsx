'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger);

export default function MissionIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cols = section.querySelectorAll('.intro-col');
    gsap.set(cols, { opacity: 0, y: 40, filter: 'blur(4px)' });
    gsap.to(cols, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden atmos-glow bg-[var(--color-bg)]">
      <div className="absolute font-heading font-bold text-[clamp(4rem,14vw,14rem)] top-[24%] left-1/2 -translate-x-1/2 leading-none pointer-events-none select-none text-[rgba(44,74,62,0.06)] whitespace-nowrap" aria-hidden="true">MISSION</div>
      <div className="float-cross top-[10%] right-[15%]" aria-hidden="true" />
      <div className="float-line h-[25vh] bottom-[10%] left-[5%]" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16">
        <div className="intro-col">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[var(--color-primary)] mb-6 leading-tight whitespace-pre-line">
            {t('mission_h1')}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {t('mission_p1')}
          </p>
        </div>

        <div className="intro-col">
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
            {t('mission_p2')}
          </p>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {t('mission_p3')}
          </p>
        </div>
      </div>
    </section>
  );
}
