'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  base: string;
}

export default function SponsorsSection({ base }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const content = section.querySelector('.sponsor-content');
    if (content) {
      gsap.set(content, { opacity: 0, y: 20 });
      gsap.to(content, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 bg-[var(--color-surface)] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center sponsor-content">
        <p className="text-[var(--color-text-muted)] text-sm tracking-[0.15em] uppercase mb-6">
          Partner Organization
        </p>
        <img
          src={`${base}images/MissionaryFlightsInternationalLogo.png`}
          alt="Missionary Flights International"
          width={280}
          height={80}
          loading="lazy"
          className="mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </section>
  );
}
