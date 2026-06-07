'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  fieldPhoto: string; // WebP src from getImage()
}

/**
 * WorkLeadership — Section 6 of /our-work/.
 * Light section. Full-width editorial layout — wide text block
 * with a large indented pull-quote, photo sits in a framed card
 * on the right at a deliberate offset. Yanomàmö philosophy foregrounded.
 * Runs its own IntersectionObserver per kit rules.
 */
export default function WorkLeadership({ fieldPhoto }: Props) {
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
      {/* Accent ghost cross */}
      <div
        aria-hidden="true"
        className="float-cross absolute top-1/3 right-[5%] w-20 h-20 opacity-[0.04] pointer-events-none hidden lg:block"
        style={{ transform: 'scale(6)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Eyebrow ── */}
        <p
          data-reveal="fade"
          className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
        >
          <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
          {t('work_s6_label')}
        </p>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Text block (8/12) ── */}
          <div className="lg:col-span-8">
            <h2
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] max-w-3xl text-[var(--color-text)]"
            >
              {t('work_s6_headline')}
            </h2>

            <div
              data-reveal="fade"
              className="prose-yes mt-6 text-lg leading-relaxed text-[var(--color-text-muted)] max-w-2xl"
            >
              <p>{t('work_s6_body')}</p>
            </div>

            {/* Yanomàmö discipleship philosophy — isolated editorial pull */}
            <blockquote
              data-reveal="fade"
              className="mt-10 border-l-2 border-[var(--color-accent)]/50 pl-6 font-heading italic text-[var(--color-accent-deep)] text-xl md:text-2xl leading-snug max-w-xl"
            >
              &ldquo;The most sustainable Gospel advance always flows through local leaders.&rdquo;
            </blockquote>

            {/* 3-col mini-stat indicators */}
            <div
              data-reveal-stagger
              className="mt-12 grid sm:grid-cols-3 gap-6"
            >
              {[
                { stat: 'Local', label: 'Leaders developed in-context' },
                { stat: '3+', label: 'Generations of discipleship' },
                { stat: 'Field', label: 'Rooted philosophy since founding' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="border-t-2 border-[var(--color-accent)]/30 pt-4"
                  style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
                >
                  <p className="font-heading text-[clamp(1.6rem,4vw,2.4rem)] text-[var(--color-primary)] font-semibold leading-none">
                    {item.stat}
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)] text-sm leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Photo column (4/12) ── */}
          <div data-reveal="mask" className="lg:col-span-4 lg:pt-16">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -top-4 -left-4 w-full h-full border border-[var(--color-primary)]/10 rounded-[1.1rem] pointer-events-none hidden sm:block"
              />
              <div className="relative overflow-hidden rounded-[1rem] shadow-[0_16px_44px_-12px_rgba(31,58,38,0.3)] aspect-[3/4]">
                {/* CLIENT: replace with verified leadership development / discipleship photo */}
                <img
                  src={fieldPhoto}
                  alt="Local Gospel leaders being equipped through YES partnership"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={420}
                  height={560}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-primary-deep)]/25"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
