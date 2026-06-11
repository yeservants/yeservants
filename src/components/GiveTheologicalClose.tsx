'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

/**
 * Give — theological close. John 17:21 at the very END of the page (FINAL v2
 * webmaster note: "Esta cita va al FINAL de la página de donación. No al
 * inicio. El donante acaba de tomar una decisión y esta frase le dice qué
 * acaba de hacer.")
 */
export default function GiveTheologicalClose({ base: _base }: Props) {
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
      className="relative green-gradient text-[var(--color-cream)] py-24 md:py-32 overflow-hidden"
    >
      <GreenAtmos variant={0} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">
        <blockquote data-reveal="mask" className="mb-5">
          <p className="font-heading italic text-[var(--color-gold-light)] text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.4]">
            &ldquo;{t('give_close_quote')}&rdquo;
          </p>
        </blockquote>
        <p data-reveal="fade" className="text-[var(--color-cream)]/60 text-sm tracking-[0.22em] uppercase mb-12">
          &mdash; {t('give_close_ref')}
        </p>

        <div aria-hidden="true" className="mx-auto mb-12 w-16 h-px bg-[var(--color-cream)]/15" />

        <p data-reveal="fade" className="text-lg leading-[1.8] text-[var(--color-cream)]/80">
          {t('give_close_body')}
        </p>
      </div>
    </section>
  );
}
