'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

export interface CarouselMissionary {
  name: string;
  url: string;
  location: string;
  pictureUrl: string;
}

interface Props {
  base: string;
  missionaries: CarouselMissionary[];
}

/**
 * The Missionaries procession — bottom-of-the-letter carousel (client
 * directive 2026-08-19: "un carrusel de los misioneros abajo, a lo último").
 *
 * A slow, infinite drift of arch-framed portraits — the chapel-window motif
 * from the hero, now a procession of the faces you stand with. The drift
 * reacts to scroll velocity (faster scroll → faster procession), calms to
 * near-still on hover/focus, and every arch links to the worker's profile.
 * Reduced motion: the track becomes a static, horizontally scrollable row.
 */
export default function HomeMissionaries({ base, missionaries }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Section reveal observer (header only — the track animates itself) */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) =>
        el.classList.add('visible')
      );
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* The procession — infinite drift, velocity-reactive, calm on hover */
  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!marquee || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    let calmed = false;

    const ctx = gsap.context(() => {
      const drift = gsap.to(track, {
        xPercent: -50, // exactly the duplicated half → seamless loop
        repeat: -1,
        duration: Math.max(40, missionaries.length * 3),
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: marquee,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (calmed) return;
          const velocity = Math.abs(self.getVelocity());
          gsap.to(drift, {
            timeScale: Math.min(1 + velocity / 900, 3.5),
            duration: 0.4,
            overwrite: true,
          });
        },
      });

      const calm = () => {
        calmed = true;
        gsap.to(drift, { timeScale: 0.12, duration: 0.7, overwrite: true });
      };
      const resume = () => {
        calmed = false;
        gsap.to(drift, { timeScale: 1, duration: 0.7, overwrite: true });
      };
      marquee.addEventListener('pointerenter', calm);
      marquee.addEventListener('pointerleave', resume);
      marquee.addEventListener('focusin', calm);
      marquee.addEventListener('focusout', resume);
      return () => {
        marquee.removeEventListener('pointerenter', calm);
        marquee.removeEventListener('pointerleave', resume);
        marquee.removeEventListener('focusin', calm);
        marquee.removeEventListener('focusout', resume);
      };
    }, marquee);

    return () => ctx.revert();
  }, [missionaries.length]);

  const cards = (clone: boolean) =>
    missionaries.map((m, i) => (
      <a
        key={`${clone ? 'c-' : ''}${m.url}`}
        href={`${base}missionaries/${m.url}/`}
        tabIndex={clone ? -1 : undefined}
        className={`group block w-40 md:w-52 shrink-0 ${i % 2 === 1 ? 'md:translate-y-9' : ''}`}
      >
        {/* chapel-window arch — the hero motif in procession */}
        <span className="relative block overflow-hidden rounded-t-full rounded-b-[1rem] ring-1 ring-[var(--color-gold-light)]/25 aspect-[4/5.2] shadow-[0_28px_60px_-24px_rgba(0,0,0,0.65)]">
          <img
            src={m.pictureUrl}
            alt={m.name}
            width={416}
            height={540}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          {/* warm foot vignette keeps the name legible against any photo */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#150D07]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </span>
        <span className="block mt-4 text-center">
          <span className="block font-heading text-[var(--color-cream)]/90 group-hover:text-[var(--color-cream)] text-base md:text-lg leading-snug transition-colors duration-300">
            {m.name}
          </span>
          <span className="block mt-1 text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold-light)]/75">
            {m.location}
          </span>
        </span>
      </a>
    ));

  return (
    <section
      ref={ref}
      className="relative green-gradient text-[var(--color-cream)] pt-12 md:pt-16 pb-10 md:pb-14 overflow-hidden"
    >
      <GreenAtmos variant={3} />

      {/* header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center mb-14 md:mb-20">
        <p
          data-reveal="fade"
          className="inline-flex items-center gap-3 text-[var(--color-gold)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
        >
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-gold)]/60" />
          {t('home_mis_label')}
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-gold)]/60" />
        </p>
        <h2
          data-reveal="mask"
          className="font-heading font-medium text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.12] mb-5"
        >
          {t('home_mis_headline')}
        </h2>
        <p data-reveal="fade" className="max-w-2xl mx-auto text-lg leading-[1.75] text-[var(--color-cream)]/70">
          {t('home_mis_sub')}
        </p>
      </div>

      {/* the procession */}
      <div
        ref={marqueeRef}
        className="relative z-10 motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] motion-reduce:[mask-image:none]"
      >
        <div ref={trackRef} className="flex w-max items-start gap-6 md:gap-9 px-6 pb-14 pt-2">
          {cards(false)}
          <div aria-hidden="true" className="contents motion-reduce:hidden">
            {cards(true)}
          </div>
        </div>
      </div>

      {/* meet them all */}
      <div data-reveal="fade" className="relative z-10 text-center mt-2">
        <a
          href={`${base}missionaries/`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[var(--color-cream)]/30 text-[var(--color-cream)] text-sm font-semibold tracking-wide hover:bg-[var(--color-cream)]/10 transition-colors duration-300"
        >
          {t('home_mis_cta')}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
