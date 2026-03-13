'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ICFCSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const blocks = section.querySelectorAll('.icfc-block');
    gsap.set(blocks, { opacity: 0, y: 30 });
    gsap.to(blocks, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%', once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden atmos-glow">
      <div className="float-cross top-[10%] left-[12%]" aria-hidden="true" />
      <div className="float-line h-[20vh] bottom-[8%] right-[6%]" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div className="icfc-block">
          <p className="text-[var(--color-accent)] text-sm tracking-[0.2em] uppercase font-medium mb-3">
            Ministry Arm
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[var(--color-primary)] mb-6 leading-tight">
            International Christian Fellowship of Churches
          </h2>
        </div>
        <div className="icfc-block">
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
            ICFC is a ministry to promote unity and fellowship among churches and pastors worldwide. Founded as an arm of Y.E.S., ICFC brings together congregations from different nations under the shared mission of advancing the Gospel.
          </p>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Through conferences, pastoral training, and cooperative mission projects, ICFC strengthens the global church body and equips leaders for effective ministry in their communities.
          </p>
        </div>
      </div>
    </section>
  );
}
