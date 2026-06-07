'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  fieldPhoto: string; // WebP src from getImage()
}

/**
 * WorkEvangelism — Section 4 of /our-work/.
 * Light section. Wide full-bleed pull-quote above, then asymmetric
 * photo-right / text-left layout for visual variety.
 * Mata Hambre, Honduras detail embedded.
 * Runs its own IntersectionObserver per kit rules.
 */
export default function WorkEvangelism({ fieldPhoto }: Props) {
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Eyebrow + Headline ── */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('work_s4_label')}
          </p>

          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)]"
          >
            {t('work_s4_headline')}
          </h2>
        </div>

        {/* ── Two-col: text left / photo right ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Text column (7/12) */}
          <div className="lg:col-span-7 lg:order-1">
            <div
              data-reveal="fade"
              className="prose-yes text-lg leading-relaxed text-[var(--color-text-muted)] max-w-3xl"
            >
              <p>{t('work_s4_body')}</p>
            </div>

            {/* Mata Hambre field note — isolated, editorial */}
            <div
              data-reveal="fade"
              className="mt-10 border-l-2 border-[var(--color-primary)]/20 pl-6"
            >
              <p className="text-xs tracking-[0.25em] uppercase text-[var(--color-accent-deep)] font-medium mb-2">
                {t('work_s4_detail')}
              </p>
              <p className="text-[var(--color-text-muted)] text-base leading-relaxed">
                The pastor works long hours at a warehouse job to support his family. On his days off, he walks
                mountain paths with a megaphone, preaching to communities that have no other access to the Gospel.
                Women from the church walk with him. Praying. Accompanying. Bearing witness. No vehicle.
                No salary from the church. Just a calling that will not be quieted.
              </p>
            </div>
          </div>

          {/* Photo column (5/12) */}
          <div data-reveal="mask" className="lg:col-span-5 lg:order-2">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[1rem] shadow-[0_18px_48px_-16px_rgba(31,58,38,0.28)] aspect-[4/5]">
                {/* CLIENT: replace with verified evangelism / outreach field photo */}
                <img
                  src={fieldPhoto}
                  alt="A Gospel worker going into the field to reach isolated communities"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={520}
                  height={650}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-primary-deep)]/30"
                />
              </div>
              {/* Orange accent block bottom-right */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-16 h-16 bg-[var(--color-accent)]/10 rounded-lg border border-[var(--color-accent)]/20 hidden sm:block"
              />
            </div>
          </div>

        </div>

        {/* ── Pull quote — full width, isolated ── */}
        <blockquote
          data-reveal="fade"
          className="mt-16 md:mt-20 border-l-2 border-[var(--color-accent)]/50 pl-6 font-heading italic text-[var(--color-accent-deep)] text-2xl md:text-3xl leading-snug max-w-2xl"
        >
          &ldquo;Only a calling and the willingness to go where that calling leads.&rdquo;
        </blockquote>

      </div>
    </section>
  );
}
