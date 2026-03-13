'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../i18n/useLang';

interface Props { base: string; }

export default function Hero({ base }: Props) {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const getSlides = () => [
    {
      image: `${base}Yespic/1.jpg`,
      heading: t('hero_s1_heading'),
      sub: t('hero_s1_sub'),
      cta1: { label: t('hero_s1_cta1'), href: `${base}donate/` },
      cta2: { label: t('hero_s1_cta2'), href: `${base}join/` },
    },
    {
      image: `${base}Yespic/9.jpg`,
      heading: t('hero_s2_heading'),
      sub: t('hero_s2_sub'),
      cta1: { label: t('hero_s2_cta1'), href: `${base}donate/` },
      cta2: { label: t('hero_s2_cta2'), href: `${base}missionaries/` },
    },
    {
      image: `${base}Yespic/IMG-20240810-WA0010.jpg`,
      heading: t('hero_s3_heading'),
      sub: t('hero_s3_sub'),
      cta1: { label: t('hero_s3_cta1'), href: `${base}join/` },
      cta2: { label: t('hero_s3_cta2'), href: `${base}missionaries/` },
    },
  ];

  const slides = getSlides();

  const goTo = (idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    const content = contentRef.current;
    if (content) {
      gsap.to(content, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in', onComplete: () => {
        setCurrent(idx);
        setTransitioning(false);
      }});
    } else {
      setCurrent(idx);
      setTransitioning(false);
    }
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [current]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    gsap.fromTo(content,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
  }, [current]);

  const slide = slides[current]!;

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '80vh', minHeight: '520px' }}>
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={s.image} alt="" className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto"
        style={{ margin: '0 auto', left: 0, right: 0, position: 'absolute', top: 0, bottom: 0, width: '100%', maxWidth: '64rem' }}
      >
        <h1 className="font-heading text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 whitespace-pre-line">
          {slide.heading}
        </h1>
        <p className="text-white/80 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
          {slide.sub}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={slide.cta1.href} className="px-8 py-3.5 bg-[var(--color-accent)] text-white font-bold rounded transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-lg">
            {slide.cta1.label}
          </a>
          <a href={slide.cta2.href} className="px-8 py-3.5 border-2 border-white text-white font-bold rounded transition-all duration-300 hover:bg-white hover:text-[var(--color-primary)]">
            {slide.cta2.label}
          </a>
        </div>
      </div>

      <button onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); prev(); }} aria-label="Previous slide" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); next(); }} aria-label="Next slide" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); goTo(i); }} aria-label={`Go to slide ${i + 1}`} className={`transition-all duration-300 rounded-full border-2 border-white/60 ${i === current ? 'bg-white w-4 h-4 scale-110' : 'bg-transparent w-3 h-3'}`} />
        ))}
      </div>
    </section>
  );
}
