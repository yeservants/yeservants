'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Play the hero intro once per tab session. On ClientRouter back/forward returns
// to Home, skip the re-animation (and the SplitText re-split) — just show it.
let introPlayed = false;

const SLIDE_MS = 3500;

interface Props {
  base: string;
  heroImages: string[];
}

export default function Hero({ base, heroImages }: Props) {
  const { t } = useLang();
  const rootRef     = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const photoRef    = useRef<HTMLDivElement>(null);
  const bloomRef    = useRef<HTMLDivElement>(null);

  // ── Carousel state ──
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  // Progressive loading: only fetch a slide once it's reached (plus the next one,
  // preloaded for a smooth crossfade). Keeps the initial load to the LCP image only.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    setLoaded((prev) => {
      const next = (current + 1) % heroImages.length;
      if (prev.has(current) && prev.has(next)) return prev;
      const s = new Set(prev);
      s.add(current);
      s.add(next);
      return s;
    });
  }, [current, heroImages.length]);

  // Auto-advance crossfade (paused on hover / reduced-motion / single image).
  useEffect(() => {
    if (heroImages.length <= 1 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setCurrent((c) => (c + 1) % heroImages.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, heroImages.length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;
    let revealed = false;
    let split: SplitText | null = null;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wasSwapped = (window as Window & { __yesSwapped?: boolean }).__yesSwapped === true;

    const ctx = gsap.context(() => {
      const fadeUp = root.querySelectorAll('[data-hero-fade]');

      const forceVisible = () => {
        revealed = true;
        gsap.set(fadeUp, { opacity: 1, y: 0 });
        gsap.set(photoRef.current, { opacity: 1 });
        gsap.set(bloomRef.current, { opacity: 1, scale: 1 });
        if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
      };

      // Reverent intro — runs only on a genuine first load (not SPA / reduced motion).
      if (reduce || introPlayed || wasSwapped) { forceVisible(); }
      else {
        introPlayed = true;

        let started = false;
        const play = () => {
          if (cancelled || started) return;
          started = true;
          try {
            // Hide only at the moment we animate — the SSR-painted hero text/photo
            // stay visible until GSAP is ready, so the text LCP isn't held back
            // through React hydration.
            gsap.set(fadeUp, { opacity: 0, y: 24 });
            gsap.set(photoRef.current, { opacity: 0 });
            gsap.set(bloomRef.current, { opacity: 0, scale: 0.82 });
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { revealed = true; } });
            tl.to(bloomRef.current, { opacity: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, 0);
            if (headlineRef.current) {
              split = new SplitText(headlineRef.current, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
              gsap.set(split.lines, { yPercent: 110 });
              tl.to(split.lines, { yPercent: 0, duration: 1.25, stagger: 0.16 }, 0.25);
            }
            tl.to(photoRef.current, { opacity: 1, duration: 1.8, ease: 'power2.out' }, 0.35)
              .to(fadeUp, { opacity: 1, y: 0, duration: 1.1, stagger: 0.14 }, 0.7);
          } catch {
            forceVisible();
          }
        };

        const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
        if (fonts?.ready) fonts.ready.then(() => { if (!cancelled) play(); });
        timers.push(setTimeout(play, 200));
        timers.push(setTimeout(() => { if (!cancelled && !revealed) forceVisible(); }, 1900));
      }

      // Scroll dissolve — content lifts + fades, photo gentle parallax.
      gsap.to(contentRef.current, {
        opacity: 0, y: -40, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(photoRef.current, {
        yPercent: 10, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);

    const cleanupSplit = () => { if (split) { split.revert(); split = null; } };
    document.addEventListener('astro:before-swap', cleanupSplit);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      document.removeEventListener('astro:before-swap', cleanupSplit);
      cleanupSplit();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-svh overflow-hidden green-gradient text-[var(--color-cream)]"
    >
      {/* ── Atmosphere: sacred light, depth, drifting motes, celestial life ── */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_120%,rgba(23,14,8,0.6),transparent_60%)]" />
        {/* slow-drifting aurora glows */}
        <div className="aurora w-[46vw] h-[46vw] -top-[12%] -right-[6%] bg-[radial-gradient(circle,rgba(246,205,148,0.22),transparent_68%)] [animation-delay:0s]" />
        <div className="aurora w-[40vw] h-[40vw] -bottom-[18%] -left-[10%] bg-[radial-gradient(circle,rgba(201,149,44,0.45),transparent_66%)] [animation-delay:-11s] [animation-duration:28s]" />
        {/* breathing god-rays pouring from the upper-right */}
        <div className="god-rays absolute -top-1/3 right-0 w-[88%] h-[170%] rotate-[15deg] blur-[1.5px] bg-[repeating-linear-gradient(96deg,transparent_0px,transparent_52px,rgba(246,222,180,0.45)_58px,transparent_68px)] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_68%)]" />
        {/* haloed ghost cross */}
        <div className="cross-halo w-[42vh] h-[42vh] top-1/2 left-[34%] hidden md:block" />
        <div className="ghost-cross text-[var(--color-cream)] top-1/2 left-[34%] -translate-x-1/2 -translate-y-1/2 w-[46vh] h-[66vh]" />
        {/* twinkling starfield */}
        <span className="star left-[20%] top-[18%] [animation-delay:0s]" />
        <span className="star star-lg left-[44%] top-[12%] [animation-delay:1.5s]" />
        <span className="star left-[62%] top-[20%] [animation-delay:3s]" />
        <span className="star left-[84%] top-[14%] star-lg [animation-delay:2.2s]" />
        <span className="star left-[31%] top-[30%] [animation-delay:4.4s]" />
        <span className="star left-[88%] top-[40%] [animation-delay:5.1s]" />
        <span className="star left-[14%] top-[52%] [animation-delay:3.7s]" />
        {/* drifting embers */}
        <span className="ember left-[70%] top-[6%] [animation-delay:-3s]" />
        <span className="ember left-[40%] top-[10%] [animation-delay:-10s]" />
        {/* dust motes in the light */}
        <span className="mote w-1.5 h-1.5 left-[57%] top-[56%] [animation-delay:0s]" />
        <span className="mote w-1 h-1 left-[66%] top-[40%] [animation-delay:1.6s]" />
        <span className="mote w-2 h-2 left-[72%] top-[63%] [animation-delay:3.1s]" />
        <span className="mote w-1 h-1 left-[81%] top-[47%] [animation-delay:4.7s]" />
        <span className="mote w-1.5 h-1.5 left-[51%] top-[71%] [animation-delay:6.2s]" />
        <span className="mote w-1 h-1 left-[63%] top-[27%] [animation-delay:2.3s]" />
        <span className="mote w-1.5 h-1.5 left-[78%] top-[33%] [animation-delay:5.4s]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-36 pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── Text column ── */}
          <div ref={contentRef} className="lg:col-span-6">
            <p data-hero-fade className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.32em] uppercase font-medium mb-8">
              <span aria-hidden="true" className="w-10 h-px bg-[var(--color-accent-light)]/50" />
              {t('home_hero_eyebrow')}
            </p>

            <h1 ref={headlineRef} className="font-heading font-medium leading-[1.06] text-[clamp(2rem,4.1vw,3.6rem)] max-w-3xl">
              {t('home_hero_headline')}
            </h1>

            {/* Block quote — orange left border (FINAL v2 webmaster note) */}
            <blockquote
              data-hero-fade
              className="mt-8 max-w-xl border-l-[3px] border-[var(--color-accent)] pl-6 font-heading italic text-[var(--color-cream)]/85 text-lg md:text-xl leading-[1.6]"
            >
              &ldquo;{t('home_hero_quote')}&rdquo;
            </blockquote>

            <div data-hero-fade className="mt-9 flex flex-col sm:flex-row gap-4">
              <a href={`${base}give/`}
                className="px-8 py-3.5 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full text-center hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_20px_rgba(168,79,10,0.4)]">
                {t('cta_becomePartner')}
              </a>
              <a href={`${base}how-it-works/`}
                className="px-8 py-3.5 border border-[var(--color-cream)]/35 text-[var(--color-cream)] text-sm font-semibold tracking-wide rounded-full text-center hover:bg-[var(--color-cream)]/10 transition-colors duration-300">
                {t('cta_howItWorks')}
              </a>
            </div>
          </div>

          {/* ── Arched photo carousel — chapel window with light breaking through ── */}
          <div className="lg:col-span-6">
            <div className="relative w-full max-w-[34rem] mx-auto lg:ml-auto lg:mr-0">
              {/* warm light bloom behind the arch */}
              <div
                ref={bloomRef}
                aria-hidden="true"
                className="absolute -inset-x-12 -top-20 bottom-6 bg-[radial-gradient(ellipse_55%_60%_at_50%_22%,rgba(246,205,148,0.5),rgba(246,205,148,0.12)_45%,transparent_72%)] blur-2xl pointer-events-none"
              />
              <div
                ref={photoRef}
                className="relative"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* outer keyline echo of the arch (window frame) */}
                <div aria-hidden="true" className="absolute -inset-2.5 rounded-t-full rounded-b-[1.4rem] border border-[var(--color-accent-light)]/25 pointer-events-none" />
                <div className="relative overflow-hidden rounded-t-full rounded-b-[1.4rem] ring-1 ring-[var(--color-accent-light)]/25 shadow-[0_44px_90px_-32px_rgba(0,0,0,0.7)] aspect-[4/5.4]">
                  {/* crossfading slides */}
                  {heroImages.map((src, i) => (
                    <img
                      key={i}
                      src={loaded.has(i) ? src : undefined}
                      alt={i === current ? 'A YES-supported Gospel worker serving in the field' : ''}
                      aria-hidden={i !== current}
                      className={`hero-slide absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : undefined}
                      width={760}
                      height={1026}
                    />
                  ))}
                  {/* light pouring in from the top of the window */}
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,242,214,0.22),transparent_38%)]" />
                  {/* grounding vignette */}
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--color-primary-deep)]/60 via-transparent to-transparent" />
                  {/* chapel-window mullions */}
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <span className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[var(--color-accent-light)]/20" />
                    <span className="absolute left-[8%] right-[8%] top-[20%] h-px bg-[var(--color-accent-light)]/18" />
                    <span className="absolute left-0 right-0 top-[64%] h-px bg-[var(--color-accent-light)]/12" />
                  </div>

                  {/* carousel indicator — segmented progress at the foot of the arch */}
                  {heroImages.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center">
                      {heroImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCurrent(i)}
                          aria-label={`Show field photo ${i + 1} of ${heroImages.length}`}
                          aria-current={i === current}
                          className="group/dot flex h-6 items-center justify-center px-2"
                        >
                          <span
                            className={`block h-1 rounded-full overflow-hidden transition-all duration-500 ${i === current ? 'w-8 bg-[var(--color-cream)]/25' : 'w-2.5 bg-[var(--color-cream)]/35 group-hover/dot:bg-[var(--color-cream)]/60'}`}
                          >
                            {i === current && (
                              <span
                                key={current}
                                className={`block h-full bg-[var(--color-accent-light)] [animation:carousel-progress_3500ms_linear_forwards] ${paused ? '[animation-play-state:paused]' : ''}`}
                              />
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* layered proof chip — overlaps the arch (depth + substance) */}
                <div className="absolute -left-4 sm:-left-6 bottom-12 z-20 bg-[var(--color-primary-deep)]/90 backdrop-blur-sm ring-1 ring-[var(--color-accent-light)]/30 rounded-xl px-5 py-3.5 shadow-[0_18px_44px_-16px_rgba(0,0,0,0.75)]">
                  <p className="font-heading text-[var(--color-cream)] text-3xl leading-none">35<span className="text-[var(--color-accent-light)]">+</span></p>
                  <p className="text-[var(--color-cream)]/60 text-[10px] tracking-[0.2em] uppercase mt-1.5">{t('home_hero_stat_label')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div aria-hidden="true" className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-cream)]/40">
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-[var(--color-cream)]/40 to-transparent" />
      </div>
    </section>
  );
}
