'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const blocks = section.querySelectorAll('.about-block');
    gsap.set(blocks, { opacity: 0, y: 40 });
    gsap.to(blocks, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%', once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[var(--color-surface)] overflow-hidden atmos-glow">
      <div className="float-line h-[30vh] top-[8%] right-[10%]" aria-hidden="true" />
      <div className="float-ring w-20 h-20 bottom-[15%] left-[5%]" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16">
        <div className="about-block">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[var(--color-primary)] mb-6 leading-tight">
            Our History
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
            <span className="font-heading text-5xl float-left mr-3 mt-1 leading-none text-[var(--color-primary)]">H</span>
            istory of Y.E.S. begins with Bernie LaTour, who was trained as a New Tribes missionary in 1970. After years of service in Venezuela, Bernie accepted a position as Director of Missions at Christian Fellowship Church in Virginia. When missionaries needed financial accountability that the church could not provide, Bernie began the process of starting a non-profit organization. With the Lord's guidance, Y.E.S. became a reality in 1990.
          </p>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Since then, Y.E.S. has grown to support over 80 missionaries serving across 15+ countries on 6 continents, providing financial accountability and administrative services so missionaries can focus on their calling.
          </p>
        </div>

        <div className="about-block">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[var(--color-primary)] mb-6 leading-tight">
            Financial Accountability
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
            Y.E.S. is registered under Section 501(c)(3) of the Internal Revenue Code as a not-for-profit corporation in the State of Florida. All donations to Y.E.S. are tax-deductible to the extent allowed by law.
          </p>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            We maintain the highest standards of financial integrity, ensuring that every dollar donated reaches the missionaries and projects it was intended for. Our transparent processes give donors confidence that their generosity is being stewarded faithfully.
          </p>
        </div>
      </div>
    </section>
  );
}
