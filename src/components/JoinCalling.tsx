'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

/**
 * Join — Block 2. The Romans 10:15 anchor (the missionary AND the sender held in
 * one verse), on the espresso band, with the two missionary-doc downloads for
 * those weighing a call to the field.
 */
export default function JoinCalling({ base }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const docs = [
    { href: `${base}download/YES_Application_for_Associate_Missionary_Sept2018.docx`, labelKey: 'join_calling_dl1' as const },
    { href: `${base}download/YES_Member_Handbook_Aug2021.docx`, labelKey: 'join_calling_dl2' as const },
  ];

  return (
    <section
      ref={ref}
      className="relative green-gradient text-[var(--color-cream)] py-24 md:py-32 overflow-hidden"
      aria-labelledby="join-calling-heading"
    >
      <GreenAtmos variant={2} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">
        <p
          data-reveal="fade"
          className="flex items-center justify-center gap-3 text-[var(--color-accent-light)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-8"
        >
          <span aria-hidden="true" className="w-9 h-px bg-[var(--color-accent-light)]/50" />
          {t('join_calling_label')}
          <span aria-hidden="true" className="w-9 h-px bg-[var(--color-accent-light)]/50" />
        </p>

        <blockquote data-reveal="mask" className="mb-5">
          <p
            id="join-calling-heading"
            className="font-heading italic text-[var(--color-gold-light)] text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.4]"
          >
            &ldquo;{t('join_calling_quote')}&rdquo;
          </p>
        </blockquote>
        <p data-reveal="fade" className="text-[var(--color-cream)]/60 text-sm tracking-[0.22em] uppercase mb-12">
          &mdash; {t('join_calling_ref')}
        </p>

        <div aria-hidden="true" className="mx-auto mb-12 w-16 h-px bg-[var(--color-cream)]/15" />

        <p data-reveal="fade" className="text-lg leading-[1.8] text-[var(--color-cream)]/80 mb-12">
          {t('join_calling_body')}
        </p>

        <div data-reveal="fade">
          <p className="text-[var(--color-cream)]/50 text-xs tracking-[0.22em] uppercase font-medium mb-5">
            {t('join_calling_downloads_label')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {docs.map((d) => (
              <a
                key={d.labelKey}
                href={d.href}
                download
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_18px_rgba(232,117,26,0.3)]"
              >
                <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {t(d.labelKey)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
