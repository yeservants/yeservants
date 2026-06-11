'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

const ITEMS: TranslationKey[] = ['mt_church_i1', 'mt_church_i2', 'mt_church_i3'];

interface Props {
  base: string;
}

/**
 * Mission Teams Block 3 — For Churches. Three partnership points and the
 * [Inquire About a Mission Trip] CTA → /contact/.
 */
export default function MtChurches({ base }: Props) {
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[var(--color-surface)] overflow-hidden"
      aria-labelledby="mt-church-heading"
    >
      <div aria-hidden="true" className="absolute inset-0 atmos-glow-center pointer-events-none" />
      <div aria-hidden="true" className="float-line h-[25vh] top-[10%] right-[7%] hidden lg:block" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p
          data-reveal="fade"
          className="flex items-center justify-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
        >
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
          {t('mt_church_label')}
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
        </p>

        <h2
          id="mt-church-heading"
          data-reveal="mask"
          className="font-heading font-medium leading-[1.12] text-[clamp(1.8rem,3.8vw,2.9rem)] text-[var(--color-text)] mb-6"
        >
          {t('mt_church_headline')}
        </h2>

        <p data-reveal="fade" className="text-lg leading-[1.8] text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10">
          {t('mt_church_intro')}
        </p>

        <ul data-reveal-stagger className="max-w-2xl mx-auto text-left mb-12" aria-label={t('mt_church_label')}>
          {ITEMS.map((key, i) => (
            <li
              key={key}
              className="flex items-start gap-4 py-4 border-b border-[var(--color-primary)]/10 last:border-b-0"
              style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
            >
              <span aria-hidden="true" className="text-[var(--color-accent-deep)] font-semibold shrink-0 translate-y-1">→</span>
              <p className="text-[var(--color-text)]/85 text-base md:text-lg leading-relaxed">{t(key)}</p>
            </li>
          ))}
        </ul>

        <div data-reveal="fade">
          <a
            href={`${base}contact/`}
            className="w-full sm:w-auto inline-flex justify-center px-9 py-4 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_20px_rgba(168,79,10,0.4)]"
          >
            {t('cta_inquireTrip')}
          </a>
        </div>
      </div>
    </section>
  );
}
