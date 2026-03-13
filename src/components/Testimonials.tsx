'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    quote: 'YES has been instrumental in our journey as missionaries. Their support, guidance, and unwavering commitment to the Gospel has enabled us to reach communities we never thought possible. We are forever grateful.',
    name: 'Sarah & John Martinez',
    role: 'Missionaries in Ecuador',
  },
  {
    quote: "Partnering with YES has transformed our church's approach to missions. They provided the training, resources, and structure we needed to effectively send and support our missionary families. It's been a game-changer.",
    name: 'Pastor Michael Chen',
    role: 'Grace Community Church',
  },
  {
    quote: 'Our short-term mission trip with YES changed our lives. The organization, care, and spiritual depth of the experience exceeded our expectations. We witnessed God\'s work firsthand and came back with a renewed passion for missions.',
    name: 'Emily Rodriguez',
    role: 'Mission Trip Participant',
  },
  {
    quote: "Thanks to YES, we were able to completely rebuild the roof of our church — an effort that not only improved our facilities, but strengthened the faith and unity of our entire community. Your financial support, constant follow-up, and the manpower provided were a direct answer from God at a crucial moment for us.",
    name: 'Rev. Alexander Céspedes Salas',
    role: 'Obispo',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    const card = cardRef.current;
    if (!card) { setCurrent(idx); return; }
    gsap.to(card, {
      opacity: 0, y: -12, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setCurrent(idx);
        gsap.fromTo(card,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
      },
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const t = testimonials[current]!;

  return (
    <section className="relative py-20 md:py-28 bg-[var(--color-surface)] overflow-hidden">
      <div
        className="absolute font-heading font-bold text-[clamp(4rem,14vw,14rem)] top-[1%] left-1/2 -translate-x-1/2 pointer-events-none select-none leading-none whitespace-nowrap"
        style={{ color: 'rgba(44,74,62,0.04)' }}
        aria-hidden="true"
      >
        TESTIMONIALS
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-5xl font-light text-[var(--color-primary)] mb-4">
            What People Are Saying
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
            Hear from those whose lives have been transformed through our ministry.
          </p>
        </div>

        <div ref={cardRef} className="bg-white rounded-2xl shadow-lg px-8 py-10 md:px-12 md:py-14 text-center">
          {/* Quote mark */}
          <svg className="mx-auto mb-6 text-[var(--color-accent)]" width="36" height="36" fill="currentColor" viewBox="0 0 32 32">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
          </svg>

          <p className="text-[var(--color-text)] md:text-lg leading-relaxed italic mb-8 max-w-2xl mx-auto">
            &ldquo;{t.quote}&rdquo;
          </p>

          <div>
            <p className="font-heading font-semibold text-[var(--color-primary)] text-base">{t.name}</p>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">{t.role}</p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                goTo(i);
              }}
              aria-label={`Testimonial ${i + 1}`}
              className={`rounded-full border-2 transition-all duration-300 ${
                i === current
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] w-4 h-4'
                  : 'bg-transparent border-[var(--color-primary)]/30 w-3 h-3'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
