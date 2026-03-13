'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../i18n/useLang';

interface Props { base: string; heroImages?: [string, string, string]; }

const ADVANCE = 7; // seconds per slide

export default function Hero({ base, heroImages }: Props) {
  const { t } = useLang();
  const [current, setCurrent]   = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);

  const contentRef    = useRef<HTMLDivElement>(null);
  const incomingRef   = useRef<HTMLDivElement>(null);
  const imgInRef      = useRef<HTMLImageElement>(null);
  const progressRef   = useRef<HTMLSpanElement>(null);
  const progressTween = useRef<gsap.core.Tween | null>(null);
  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const busy          = useRef(false);
  const currentRef    = useRef(0);

  const slides = [
    {
      image: heroImages?.[0] ?? `${base}Yespic/1.jpg`,
      heading: t('hero_s1_heading'),
      sub:     t('hero_s1_sub'),
      cta1: { label: t('hero_s1_cta1'), href: `${base}donate/` },
      cta2: { label: t('hero_s1_cta2'), href: `${base}join/` },
    },
    {
      image: heroImages?.[1] ?? `${base}Yespic/9.jpg`,
      heading: t('hero_s2_heading'),
      sub:     t('hero_s2_sub'),
      cta1: { label: t('hero_s2_cta1'), href: `${base}donate/` },
      cta2: { label: t('hero_s2_cta2'), href: `${base}missionaries/` },
    },
    {
      image: heroImages?.[2] ?? `${base}Yespic/IMG-20240810-WA0010.jpg`,
      heading: t('hero_s3_heading'),
      sub:     t('hero_s3_sub'),
      cta1: { label: t('hero_s3_cta1'), href: `${base}join/` },
      cta2: { label: t('hero_s3_cta2'), href: `${base}missionaries/` },
    },
  ];

  const padded = (n: number) => String(n + 1).padStart(2, '0');

  /* ── Progress bar ──────────────────────────────── */
  const startProgress = useCallback(() => {
    const bar = progressRef.current;
    if (!bar) return;
    if (progressTween.current) progressTween.current.kill();
    gsap.set(bar, { scaleX: 0 });
    progressTween.current = gsap.to(bar, { scaleX: 1, duration: ADVANCE, ease: 'none' });
  }, []);

  /* ── Auto-advance ──────────────────────────────── */
  const scheduleNext = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % slides.length);
    }, ADVANCE * 1000);
  }, []); // eslint-disable-line

  /* ── Navigate to slide ─────────────────────────── */
  const goTo = useCallback((idx: number) => {
    if (busy.current || idx === currentRef.current) return;
    busy.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIncoming(idx);
  }, []);

  /* ── Reveal content + restart progress ────────── */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const lines = el.querySelectorAll('.h-line');
    gsap.fromTo(
      lines,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1, clearProps: 'transform' }
    );
    startProgress();
    scheduleNext();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [current]); // eslint-disable-line

  /* ── Animate incoming slide ────────────────────── */
  useEffect(() => {
    if (incoming === null) return;
    const div = incomingRef.current;
    if (!div) return;

    // Fade-up out the current content
    const content = contentRef.current;
    if (content) {
      gsap.to(content.querySelectorAll('.h-line'), {
        opacity: 0, y: -14, duration: 0.25, ease: 'power2.in',
      });
    }

    // Clip-path wipe: right side reveals first
    gsap.set(div, { clipPath: 'inset(0 100% 0 0)' });
    // Subtle parallax: incoming image starts slightly right
    if (imgInRef.current) gsap.set(imgInRef.current, { x: 50 });

    gsap.to(div, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      onComplete: () => {
        currentRef.current = incoming;
        setCurrent(incoming);
        setIncoming(null);
        busy.current = false;
      },
    });
    if (imgInRef.current) {
      gsap.to(imgInRef.current, { x: 0, duration: 1.6, ease: 'power3.out' });
    }
  }, [incoming]);

  const slide         = slides[current]!;
  const incomingSlide = incoming !== null ? slides[incoming]! : null;
  const headingLines  = slide.heading.split('\n');

  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--color-primary)]"
      style={{ height: '100dvh', minHeight: '620px' }}
    >
      {/* ── Current background image ─────────────── */}
      <div className="absolute inset-0">
        <img src={slide.image} alt="" className="w-full h-full object-cover" loading="eager" />
        {/* Gradient: heavy left (content legibility) + vignette bottom + soft top */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
      </div>

      {/* ── Incoming image (clip-path wipe) ──────── */}
      {incomingSlide && (
        <div
          ref={incomingRef}
          className="absolute inset-0 z-10"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <img
            ref={imgInRef}
            src={incomingSlide.image}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
        </div>
      )}

      {/* ── Atmosphere: warm accent radial glow ──── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[55vw] h-[65vh] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(194,125,65,0.14) 0%, transparent 65%)',
        }}
      />
      {/* Bottom atmospheric glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[40vw] h-[40vh] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(44,74,62,0.5) 0%, transparent 70%)',
        }}
      />

      {/* ── Decorative vertical lines ────────────── */}
      <div aria-hidden="true" className="absolute top-0 left-[12%] md:left-[20%] w-px h-full bg-white/[0.05] pointer-events-none z-10" />
      <div aria-hidden="true" className="absolute top-0 right-[30%] w-px h-[35%] bg-white/[0.03] pointer-events-none z-10" />

      {/* ── Ghost slide number ───────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-0.5rem] right-[-0.5rem] font-heading font-bold text-white/[0.04] pointer-events-none select-none leading-none z-10 tabular-nums"
        style={{ fontSize: 'clamp(8rem, 28vw, 24rem)' }}
      >
        {padded(current)}
      </div>

      {/* ── Cross motif ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-[22%] right-[7%] pointer-events-none select-none z-20 text-[var(--color-accent)]"
        style={{ opacity: 0.18, fontSize: '1.75rem' }}
      >
        ✛
      </div>
      {/* Small secondary cross */}
      <div
        aria-hidden="true"
        className="absolute top-[55%] right-[18%] pointer-events-none select-none z-20 text-white"
        style={{ opacity: 0.06, fontSize: '0.875rem' }}
      >
        ✛
      </div>

      {/* ── Content: bottom-left editorial ──────── */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-28 md:pb-32"
      >
        {/* Eyebrow */}
        <p className="h-line text-[var(--color-accent)] text-[10px] tracking-[0.32em] uppercase font-medium mb-5">
          Yielded Evangelical Servants — since 1990
        </p>

        {/* Heading — each line animates independently */}
        <h1 className="mb-6 max-w-4xl">
          {headingLines.map((line, i) => (
            <span
              key={i}
              className="h-line block font-heading font-light leading-[1.02]"
              style={{
                fontSize: 'clamp(2.1rem, 5.8vw, 5.2rem)',
                color: i === 1 ? 'var(--color-accent)' : 'white',
              }}
            >
              {line}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p className="h-line text-white/50 text-sm md:text-[0.9375rem] leading-relaxed max-w-[420px] mb-9">
          {slide.sub}
        </p>

        {/* CTAs */}
        <div className="h-line flex flex-col sm:flex-row items-start gap-3">
          <a
            href={slide.cta1.href}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent)] text-white text-[11px] tracking-[0.18em] uppercase font-semibold hover:opacity-90 transition-opacity duration-300"
          >
            <span aria-hidden="true" className="text-[9px] leading-none">✛</span>
            {slide.cta1.label}
          </a>
          <a
            href={slide.cta2.href}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-white text-[11px] tracking-[0.18em] uppercase font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            {slide.cta2.label}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Bottom bar: progress · counter · nav ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center gap-5 px-6 md:px-16 lg:px-24 pb-8">

        {/* Progress bar */}
        <div className="w-32 md:w-44 h-px bg-white/[0.12] relative overflow-hidden flex-shrink-0">
          <span
            ref={progressRef}
            className="absolute inset-0 bg-[var(--color-accent)] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Slide counter */}
        <span className="font-heading text-white/30 text-[11px] tracking-[0.18em] tabular-nums flex-shrink-0">
          {padded(current)}
          <span className="mx-2 text-white/15">—</span>
          {padded(slides.length - 1)}
        </span>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Pill dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-400 rounded-full ${
                i === current
                  ? 'w-6 h-[3px] bg-[var(--color-accent)]'
                  : 'w-[5px] h-[3px] bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => goTo((current - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="group flex items-center gap-1.5 text-white/30 hover:text-white/80 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-[9px] tracking-[0.25em] uppercase hidden sm:block">Prev</span>
          </button>

          <div className="w-px h-3 bg-white/15" />

          <button
            onClick={() => goTo((current + 1) % slides.length)}
            aria-label="Next slide"
            className="group flex items-center gap-1.5 text-white/30 hover:text-white/80 transition-colors duration-200"
          >
            <span className="text-[9px] tracking-[0.25em] uppercase hidden sm:block">Next</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
