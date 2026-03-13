'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Props {
  base: string;
}

const images = [
  { src: 'kids.jpg', alt: 'Children in the mission field' },
  { src: 'BocaTrip.png', alt: 'Mission trip to Boca' },
  { src: 'homepage-children.jpg', alt: 'Children served by missionaries' },
];

export default function MissionCarousel({ base }: Props) {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    const slide = slideRef.current;
    if (!slide) return;

    gsap.to(slide, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrent(index);
        gsap.to(slide, { opacity: 1, duration: 0.4, ease: 'power2.inOut' });
      },
    });
  };

  const next = () => goTo((current + 1) % images.length);
  const prev = () => goTo((current - 1 + images.length) % images.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current]);

  const image = images[current];

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div ref={slideRef} className="relative aspect-[16/9]">
        {image && (
          <img
            src={`${base}images/${image.src}`}
            alt={image.alt}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
        aria-label="Previous slide"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 12L6 8l4-4" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
        aria-label="Next slide"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 4l4 4-4 4" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-110' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
