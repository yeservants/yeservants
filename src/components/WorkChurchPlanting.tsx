'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  fieldPhoto: string; // WebP src from getImage()
}

/**
 * WorkChurchPlanting — Section 3 of /our-work/.
 * Dark section. Text-left / photo-right layout (7+5 col).
 * Full-width pull quote below the two-col grid for visual impact.
 * Runs its own IntersectionObserver per kit rules.
 */
export default function WorkChurchPlanting({ fieldPhoto }: Props) {
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
      className="relative overflow-hidden green-gradient text-[var(--color-cream)] py-24 md:py-32"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 atmos-glow pointer-events-none" />
      <div aria-hidden="true" className="dot-grid-light absolute inset-0 pointer-events-none opacity-40" />

      <GreenAtmos variant={1} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Text column (7/12) — left ── */}
          <div className="lg:col-span-7">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
            >
              <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
              {t('work_s3_label')}
            </p>

            <h2
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] max-w-3xl text-[var(--color-cream)]"
            >
              {t('work_s3_headline')}
            </h2>

            <div
              data-reveal="fade"
              className="prose-yes mt-6 text-lg leading-relaxed text-[var(--color-cream)]/75 max-w-2xl"
            >
              <p>{t('work_s3_body')}</p>
            </div>

            {/* 3 impact indicators — staggered */}
            <ul
              data-reveal-stagger
              className="mt-10 space-y-4"
            >
              {[t('work_s3_b1'), t('work_s3_b2'), t('work_s3_b3')].map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-4"
                  style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 w-5 h-px flex-shrink-0 bg-[var(--color-accent)]/60"
                  />
                  <span className="text-[var(--color-cream)]/70 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Photo column (5/12) — right ── */}
          <div data-reveal="mask" className="lg:col-span-5 lg:pt-8">
            <div className="relative overflow-hidden rounded-[1rem] shadow-[0_24px_56px_-16px_rgba(0,0,0,0.5)] aspect-[3/4]">
              {/* CLIENT: replace with verified church planting / congregation photo */}
              <img
                src={fieldPhoto}
                alt="A YES-supported church planting congregation gathering for worship"
                className="w-full h-full object-cover"
                loading="lazy"
                width={520}
                height={693}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/60 via-transparent to-transparent"
              />
              {/* Floating location chip */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                <span aria-hidden="true" className="text-[var(--color-accent-light)] text-xs">✛</span>
                <span className="text-[var(--color-cream)]/60 text-xs tracking-wide uppercase">
                  Gospel Communities Formed
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
