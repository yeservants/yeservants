'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  base: string;
}

export default function DonateCTA({ base }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const content = section.querySelector('.cta-content');
    if (content) {
      gsap.set(content, { opacity: 0, y: 30 });
      gsap.to(content, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[var(--color-primary)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(194,125,65,0.08)]" aria-hidden="true" />
      <div className="float-cross top-[15%] left-[10%] opacity-20" aria-hidden="true" />
      <div className="float-ring w-20 h-20 bottom-[10%] right-[8%] border-white/10" aria-hidden="true" />
      <div className="float-line h-[25vh] top-[5%] right-[15%] opacity-15" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center cta-content">
        <h2 className="font-heading text-3xl md:text-5xl font-light italic text-[#FAF8F4] mb-6 leading-tight">
          Support The Mission
        </h2>
        <p className="text-[#FAF8F4]/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Your generosity enables missionaries to focus on their calling. Every gift, no matter the size, makes an eternal difference.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.aplos.com/aws/give/YieldedEvangelicalServantsInc/YesDonations"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-[var(--color-accent)] text-white font-medium rounded transition-opacity duration-300 hover:opacity-90"
          >
            Donate Online
          </a>
          <a
            href={`${base}donate/`}
            className="px-8 py-3.5 border border-[#FAF8F4]/30 text-[#FAF8F4] font-medium rounded transition-all duration-300 hover:bg-[#FAF8F4]/10"
          >
            Give By Mail
          </a>
        </div>
      </div>
    </section>
  );
}
