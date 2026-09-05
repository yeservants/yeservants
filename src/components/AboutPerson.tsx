'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
  andresImage: string;
}

/**
 * About — The Person Behind YES. New FINAL v2 section (P2 §6): Andrés González,
 * President. Photo left / text right on desktop; photo on top on mobile. Light
 * background, same editorial register as "Our Beginning". Closes the About page
 * just before the footer with a partner CTA.
 */
export default function AboutPerson({ base, andresImage }: Props) {
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
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[var(--color-bg)]">
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div aria-hidden="true" className="float-cross absolute bottom-[10%] left-[5%] opacity-25" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Photo — left on desktop, top on mobile */}
          <div className="lg:col-span-5">
            <figure data-reveal="mask" className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 border border-[var(--color-accent)]/20 rounded-[1.4rem] pointer-events-none hidden sm:block"
              />
              <div className="relative overflow-hidden rounded-[1.2rem] shadow-[0_30px_70px_-20px_rgba(33,23,16,0.28)] aspect-[4/5]">
                {/* CLIENT: this is Andrés' current field photo; an in-action ministry shot may replace it if available */}
                <img
                  src={andresImage}
                  alt={t('about_person_photo_alt')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={640}
                  height={800}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/35 via-transparent to-transparent"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-heading text-xl text-[var(--color-text)]">{t('about_person_name')}</p>
                <p className="mt-1 text-[var(--color-text-muted)] text-sm tracking-wide">{t('about_person_title')}</p>
              </figcaption>
            </figure>
          </div>

          {/* Text — right on desktop */}
          <div className="lg:col-span-7">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-deep)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
            >
              {t('about_person_label')}
            </p>

            <p
              data-reveal="mask"
              className="font-heading italic text-[var(--color-text)] text-[clamp(1.5rem,3vw,2.2rem)] leading-snug mb-8"
            >
              {t('about_person_lead')}
            </p>

            <div className="prose-yes space-y-6 text-lg leading-[1.8] text-[var(--color-text)]/85 max-w-2xl">
              <p data-reveal="fade">{t('about_person_p1')}</p>
              <p data-reveal="fade">{t('about_person_p2')}</p>
              <p data-reveal="fade" className="font-semibold text-[var(--color-text)]">
                {t('about_person_emph1')}
              </p>
              <p data-reveal="fade" className="font-semibold text-[var(--color-text)]">
                {t('about_person_emph2')}
              </p>
              <p data-reveal="fade">{t('about_person_p3')}</p>
            </div>

            <div data-reveal="fade" className="mt-10">
              <a
                href={`${base}join/`}
                className="w-full sm:w-auto inline-flex justify-center px-9 py-4 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_20px_rgba(168,79,10,0.4)]"
              >
                {t('cta_becomePartner')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
