'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';
import GreenAtmos from './GreenAtmos';

const ITEMS: TranslationKey[] = ['mt_how_i1', 'mt_how_i2', 'mt_how_i3', 'mt_how_i4'];

interface Props {
  base: string;
  fieldImage: string;
}

/**
 * Mission Teams Block 1 — How Our Teams Work. Dark espresso, field photo with
 * 35+ years badge, four points: serve under field workers' direction,
 * purposeful work, lasting relationships, return home changed.
 */
export default function MtHow({ base: _base, fieldImage }: Props) {
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
      className="relative py-24 md:py-32 green-gradient overflow-hidden text-[var(--color-cream)]"
      aria-labelledby="mt-how-heading"
    >
      <div aria-hidden="true" className="absolute inset-0 atmos-glow pointer-events-none" />
      <div aria-hidden="true" className="float-line h-56 top-[8%] right-[4%] hidden lg:block" />

      <GreenAtmos variant={4} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Field photo */}
          <div className="lg:col-span-5 order-last lg:order-first">
            <div data-reveal="mask" className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 border border-[var(--color-accent)]/20 rounded-[1.4rem] pointer-events-none hidden sm:block"
              />
              <div className="relative overflow-hidden rounded-[1.2rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] aspect-[4/5]">
                {/* CLIENT: replace with a real photo of a YES team in the field */}
                <img
                  src={fieldImage}
                  alt="A YES mission team serving alongside long-term field workers"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={640}
                  height={800}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/50 via-transparent to-transparent"
                />
              </div>
              {/* Years badge */}
              <div className="absolute -bottom-5 -right-2 sm:right-4 bg-[var(--color-accent-deep)] text-white rounded-xl px-5 py-3 shadow-[0_8px_24px_rgba(232,117,26,0.5)]">
                <p className="font-heading text-2xl font-bold leading-none">35+</p>
                <p className="text-[10px] tracking-widest uppercase mt-0.5 opacity-90">{t('mt_how_stat_label')}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-gold-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
            >
              <span aria-hidden="true" className="w-8 h-px bg-[var(--color-gold)]/50" />
              {t('mt_how_label')}
            </p>
            <h2
              id="mt-how-heading"
              data-reveal="mask"
              className="font-heading font-medium leading-[1.1] text-[clamp(1.8rem,3.8vw,3rem)] text-[var(--color-cream)] mb-9"
            >
              {t('mt_how_headline')}
            </h2>

            <ul data-reveal-stagger className="flex flex-col gap-5" aria-label={t('mt_how_label')}>
              {ITEMS.map((key, i) => (
                <li
                  key={key}
                  className="flex items-start gap-4"
                  style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
                >
                  <span aria-hidden="true" className="text-[var(--color-gold-light)] font-semibold shrink-0 translate-y-1">→</span>
                  <p className="text-[var(--color-cream)]/80 text-base md:text-lg leading-[1.75]">
                    {t(key)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
