'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface AndresImg {
  src: string;
}

interface Props {
  base: string;
  andresImg: AndresImg;
}

/**
 * Block 6 — Final CTA. Orange/gold box, different from the rest of the page
 * (mapa: "Fondo naranja o dorado"), signed by Andrés, President. Big centered
 * button, contact info underneath.
 */
export default function HomeFinalCta({ base, andresImg }: Props) {
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
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-[var(--color-bg)] py-20 md:py-28 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <div
          data-reveal="mask"
          className="relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#E8751A_0%,#D88322_55%,#C9952C_100%)] px-7 py-14 md:px-16 md:py-20 text-center text-[var(--color-primary-deep)] shadow-[0_40px_90px_-30px_rgba(168,79,10,0.55)]"
        >
          {/* texture: faint rays + grain-friendly glow */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(255,236,200,0.35),transparent_65%)]" />
          <div aria-hidden="true" className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full bg-[rgba(255,236,200,0.18)] blur-3xl pointer-events-none" />

          {/* Desktop: photo left, text right · Mobile: photo top, text below */}
          <div className="relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center text-center lg:text-left">
            {/* Andrés photo */}
            <figure className="lg:col-span-5">
              <div className="relative mx-auto max-w-[18rem] sm:max-w-xs lg:max-w-none">
                <div aria-hidden="true" className="absolute -inset-2.5 rounded-[1.3rem] border border-[var(--color-primary-deep)]/20 translate-x-3 translate-y-3 pointer-events-none" />
                <div className="relative overflow-hidden rounded-[1.2rem] shadow-[0_28px_70px_-24px_rgba(33,23,16,0.55)] aspect-[4/5]">
                  {/* CLIENT: this is Andrés' current field photo; an in-action ministry shot may replace it if available */}
                  <img src={andresImg.src} alt={t('home_cta_andres_alt')} loading="lazy" width={560} height={700} className="w-full h-full object-cover" />
                </div>
              </div>
            </figure>

            {/* Text */}
            <div className="lg:col-span-7">
              {/* Signature eyebrow */}
              <p className="text-[var(--color-primary-deep)]/80 text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-7">
                {t('home_cta_signature')}
              </p>

              {/* Headline */}
              <h2 className="font-heading font-medium leading-[1.1] text-[clamp(1.9rem,4.2vw,3.2rem)] mb-8">
                {t('home_cta_headline')}
              </h2>

              {/* Italic body (PDF: "Texto en itálica explicando el impacto") */}
              <div className="space-y-5 italic text-lg md:text-xl leading-[1.7] text-[var(--color-primary-deep)]/85 mb-10">
                <p>{t('home_cta_p1')}</p>
                <p>{t('home_cta_p2')}</p>
              </div>

              {/* Big button — full width on mobile (webmaster rule #5) */}
              <a
                href={`${base}join/`}
                className="inline-flex w-full sm:w-auto justify-center px-12 py-5 bg-[var(--color-primary-deep)] text-[var(--color-cream)] text-base font-semibold tracking-wide rounded-full hover:bg-[var(--color-primary)] transition-colors duration-300 shadow-[0_14px_36px_-10px_rgba(33,23,16,0.6)]"
              >
                {t('cta_becomePartner')}
              </a>

              {/* Contact line under the button */}
              <p className="mt-8 text-[var(--color-primary-deep)]/70 text-sm tracking-wide">
                {t('home_cta_contact')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
