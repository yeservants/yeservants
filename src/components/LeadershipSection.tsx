'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  base: string;
}

const leaders = [
  { name: 'Andres Gonzalez', role: 'President', picture: 'andres.jpeg' },
  { name: 'Bernie LaTour', role: 'Vice President', picture: 'bernie.png' },
  { name: 'Clarette Bernaez', role: 'Secretary', picture: 'none.jpg' },
  { name: 'Jessica Ale', role: 'Treasurer', picture: 'jessica.png' },
];

export default function LeadershipSection({ base }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.leader-card');
    gsap.set(cards, { opacity: 0, y: 40, filter: 'blur(4px)' });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.1,
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
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[var(--color-surface)] overflow-hidden atmos-glow-center">
      <div className="float-cross top-[10%] right-[12%]" aria-hidden="true" />
      <div className="float-ring w-16 h-16 bottom-[15%] left-[8%]" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[var(--color-accent)] text-sm tracking-[0.2em] uppercase font-medium mb-3">
            Board of Directors
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[var(--color-primary)] leading-tight">
            Leadership
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <div key={leader.name} className="leader-card text-center group">
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden bg-[var(--color-bg)] transition-all duration-500 group-hover:shadow-lg group-hover:scale-[1.03]">
                <img
                  src={`${base}images/${leader.picture}`}
                  alt={leader.name}
                  width={128}
                  height={128}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading text-base md:text-lg font-medium text-[var(--color-primary)]">
                {leader.name}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm">{leader.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
