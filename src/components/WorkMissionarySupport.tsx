'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  fieldPhoto: string; // WebP src from getImage()
}

/**
 * WorkMissionarySupport — Section 2 of /our-work/.
 * Light section, image-left / text-right asymmetric layout (5+7 col).
 * Runs its own IntersectionObserver per kit rules.
 */
export default function WorkMissionarySupport({ fieldPhoto }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

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
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-bg)] py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle dot grid atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── Photo column (5/12) — left ── */}
          <div data-reveal="mask" className="lg:col-span-5">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 w-full h-full border border-[var(--color-primary)]/10 rounded-[1.1rem] pointer-events-none hidden sm:block"
              />
              <div className="relative overflow-hidden rounded-[1rem] shadow-[0_18px_48px_-16px_rgba(31,58,38,0.3)] aspect-[3/4]">
                {/* CLIENT: replace with verified cross-cultural missionary photo */}
                <img
                  src={fieldPhoto}
                  alt="A cross-cultural missionary supported by YES, serving in the field"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={560}
                  height={747}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-primary-deep)]/25"
                />
              </div>
            </div>
          </div>

          {/* ── Text column (7/12) — right ── */}
          <div className="lg:col-span-7">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
            >
              <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
              {t('work_s2_label')}
            </p>

            <h2
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] max-w-3xl text-[var(--color-text)]"
            >
              {t('work_s2_headline')}
            </h2>

            <div
              data-reveal="fade"
              className="prose-yes mt-6 text-lg leading-relaxed text-[var(--color-text-muted)] max-w-3xl"
            >
              <p>{t('work_s2_body')}</p>
            </div>

            {/* Pull distinction — isolated accent line */}
            <blockquote
              data-reveal="fade"
              className="my-10 border-l-2 border-[var(--color-accent)]/50 pl-6 font-heading italic text-[var(--color-accent-deep)] text-xl md:text-2xl leading-snug max-w-2xl"
            >
              &ldquo;It is the work the Great Commission requires. And it produces the deepest, most lasting fruit.&rdquo;
            </blockquote>

            {/* Accent cross motif */}
            <p
              data-reveal="fade"
              aria-hidden="true"
              className="text-[var(--color-accent)]/30 font-heading text-3xl"
            >
              ✛
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
