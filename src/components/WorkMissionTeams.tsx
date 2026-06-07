'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  fieldPhoto: string; // WebP src from getImage()
  base: string;
}

/**
 * WorkMissionTeams — Section 5 of /our-work/.
 * Dark section. Photo spans left, 4-point bullet list right.
 * Staggered bullet reveals for visual rhythm.
 * Runs its own IntersectionObserver per kit rules.
 */
export default function WorkMissionTeams({ fieldPhoto, base }: Props) {
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

  const teamPoints = [
    'Complete specific projects that long-term workers have identified as priorities for their ministry.',
    'Provide skilled labor, medical care, construction support, or other practical help that strengthens the local work.',
    'Build genuine relationships between sending churches and field partners that continue long after the team returns home.',
    'Return home with firsthand knowledge of the global mission that changes the way they pray, give, and talk about what God is doing in the world.',
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden green-gradient text-[var(--color-cream)] py-24 md:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 atmos-glow-center pointer-events-none" />

      <GreenAtmos variant={3} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Photo column (5/12) — left ── */}
          <div data-reveal="mask" className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[1rem] shadow-[0_24px_60px_-16px_rgba(0,0,0,0.5)] aspect-[4/5]">
              {/* CLIENT: replace with verified mission team field photo (e.g. BocaTrip) */}
              <img
                src={fieldPhoto}
                alt="A YES mission team serving alongside local workers in the field"
                className="w-full h-full object-cover"
                loading="lazy"
                width={560}
                height={700}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/55 via-transparent to-transparent"
              />
              {/* "35+ years" overlay text */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[var(--color-accent-light)] text-xs tracking-[0.25em] uppercase font-medium">
                  ✛ Organized & Deployed
                </p>
                <p className="text-[var(--color-cream)]/70 text-sm mt-1">
                  Mission teams for more than 30 years
                </p>
              </div>
            </div>
          </div>

          {/* ── Text column (7/12) — right ── */}
          <div className="lg:col-span-7">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
            >
              <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
              {t('work_s5_label')}
            </p>

            <h2
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] max-w-3xl text-[var(--color-cream)]"
            >
              {t('work_s5_headline')}
            </h2>

            <div
              data-reveal="fade"
              className="prose-yes mt-6 text-lg leading-relaxed text-[var(--color-cream)]/75 max-w-2xl"
            >
              <p>{t('work_s5_body')}</p>
            </div>

            {/* Staggered team point list */}
            <p
              data-reveal="fade"
              className="mt-8 text-[var(--color-accent-light)] text-xs tracking-[0.25em] uppercase font-medium"
            >
              Teams Travel To
            </p>
            <ul data-reveal-stagger className="mt-4 space-y-4">
              {teamPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4"
                  style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/60 flex-shrink-0"
                  />
                  <span className="text-[var(--color-cream)]/70 text-base leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA — mission teams live under How It Works */}
            <div data-reveal="fade" className="mt-10">
              <a
                href={`${base}how-it-works/`}
                className="inline-flex items-center gap-3 border border-[var(--color-cream)]/35 text-[var(--color-cream)] text-sm font-semibold tracking-wide rounded-full px-6 py-3 hover:bg-[var(--color-cream)]/10 transition-colors duration-300"
              >
                Explore Mission Teams
                <span aria-hidden="true" className="w-4 h-px bg-[var(--color-cream)]/50" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
