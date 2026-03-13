'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  base: string;
}

export default function VisionSection({ base }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const blocks = section.querySelectorAll('.vision-block');
    gsap.set(blocks, { opacity: 0, y: 40 });
    gsap.to(blocks, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%', once: true },
    });

    const img = section.querySelector('.vision-img');
    if (img) {
      gsap.to(img, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden atmos-glow">
      <div className="float-cross top-[12%] left-[8%]" aria-hidden="true" />
      <div className="float-line h-[25vh] bottom-[5%] right-[8%]" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2 vision-block">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={`${base}images/BocaTrip.png`}
              alt="Mission field trip"
              width={600}
              height={400}
              loading="lazy"
              className="vision-img w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-3 vision-block">
          <p className="text-[var(--color-accent)] text-sm tracking-[0.2em] uppercase font-medium mb-3">
            Our Vision
          </p>
          <blockquote className="font-heading italic text-2xl md:text-3xl text-[var(--color-primary)] leading-relaxed mb-8">
            &ldquo;To see every missionary fully supported, fully equipped, and fully focused on the work God has called them to do.&rdquo;
          </blockquote>

          <h3 className="font-heading text-xl font-medium text-[var(--color-primary)] mb-4">
            Ministry Services
          </h3>
          <ul className="space-y-3">
            {[
              'Financial processing and tax-deductible receipts',
              'Short-term mission trip coordination',
              'Vacation Bible School materials distribution',
              'Speaking engagements nationally and internationally',
              'Missionary administrative support',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[var(--color-text-muted)]">
                <span className="text-[var(--color-accent)] mt-1.5 flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 0L7.41 4.59L12 6L7.41 7.41L6 12L4.59 7.41L0 6L4.59 4.59L6 0Z" /></svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
