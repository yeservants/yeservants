'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface Props {
  base: string;
  storyImage: string;
}

export default function AboutStory({ storyImage }: Props) {
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
      className="relative py-24 md:py-32 overflow-hidden bg-[var(--color-bg)]"
    >
      {/* Subtle dot grid */}
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div aria-hidden="true" className="float-cross absolute top-[10%] right-[5%] opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t('about_story_eyebrow')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] max-w-3xl"
          >
            {t('about_story_headline')}
          </h2>
        </div>

        {/* Two-column: prose left, image right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Prose */}
          <div className="lg:col-span-7">
            <div className="prose-yes space-y-6 text-lg leading-[1.8] text-[var(--color-text)]/85 max-w-3xl">
              <p data-reveal="fade">{t('about_story_para1')}</p>
              <p data-reveal="fade">{t('about_story_para1b')}</p>
              <p data-reveal="fade" className="font-semibold text-[var(--color-text)]">
                {t('about_story_emph1')}
              </p>
              <p data-reveal="fade">{t('about_story_para1c')}</p>
              <p data-reveal="fade" className="font-semibold text-[var(--color-text)]">
                {t('about_story_emph2')}
              </p>
              <p data-reveal="fade">{t('about_story_para1d')}</p>
              <p data-reveal="fade">{t('about_story_para2')}</p>
            </div>

            {/* Pull-quote — "the gap YES was built to fill" */}
            <blockquote
              data-reveal="fade"
              className="my-12 border-l-[3px] border-[var(--color-accent)] pl-6 font-heading italic text-[var(--color-accent-deep)] text-2xl md:text-3xl leading-snug max-w-2xl"
            >
              {t('about_story_quote')}
            </blockquote>
          </div>

          {/* Image column */}
          <div className="lg:col-span-5">
            <figure data-reveal="mask" className="relative">
              {/* Decorative border offset */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 border border-[var(--color-accent)]/20 rounded-[1.4rem] pointer-events-none hidden sm:block"
              />
              <div className="relative overflow-hidden rounded-[1.2rem] shadow-[0_30px_70px_-20px_rgba(33,23,16,0.28)] aspect-[4/5]">
                {/* CLIENT: replace with a real photo of the YES founders / early field work */}
                <img
                  src={storyImage}
                  alt={t('about_story_photo_alt')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={640}
                  height={800}
                />
                {/* Gradient overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/40 via-transparent to-transparent"
                />
              </div>
              <figcaption className="mt-3 text-[var(--color-text-muted)] text-xs tracking-wide text-center">
                {t('about_story_photo_caption')}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
