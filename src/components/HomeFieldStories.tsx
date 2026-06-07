'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';

interface StoryImage {
  src: string;
  alt: string;
}

interface Props {
  base: string;
  story1Img: StoryImage;
  story2Img: StoryImage;
  story3Img: StoryImage;
}

export default function HomeFieldStories({ base: _base, story1Img, story2Img, story3Img }: Props) {
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const stories = [
    {
      location: t('home_witness_story1_location'),
      body: t('home_witness_story1_body'),
      img: story1Img,
      /* CLIENT: replace with verified Bajo Rodríguez, Costa Rica photo */
      reverse: false,
    },
    {
      location: t('home_witness_story2_location'),
      body: t('home_witness_story2_body'),
      img: story2Img,
      /* CLIENT: replace with verified Mata Hambre, Honduras photo */
      reverse: true,
    },
    {
      location: t('home_witness_story3_location'),
      body: t('home_witness_story3_body'),
      img: story3Img,
      /* CLIENT: replace with verified Ozamiz, Philippines photo */
      reverse: false,
    },
  ] as const;

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-bg)] pb-24 md:pb-32 overflow-hidden"
    >
      {/* Subtle cross-grid comes from body background — no override needed */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Headline + founding paragraph */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] mb-8"
          >
            {t('home_witness_headline')}
          </h2>
          <p data-reveal="fade" className="text-lg leading-relaxed text-[var(--color-text-muted)]">
            {t('home_witness_founding')}
          </p>
        </div>

        {/* Three distinct alternating story rows */}
        <div className="space-y-20 md:space-y-28">
          {stories.map((story, i) => (
            <article
              key={story.location}
              data-reveal="mask"
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                story.reverse ? 'md:[direction:rtl]' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${story.reverse ? 'md:[direction:ltr]' : ''}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(31,58,38,0.30)] aspect-[4/3]">
                  {/* CLIENT: replace with verified [location] photo */}
                  <img
                    src={story.img.src}
                    alt={story.img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={720}
                    height={540}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/30 via-transparent to-transparent"
                  />
                </div>
                {/* Location badge */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[var(--color-primary)]/10 rounded-full px-4 py-2 shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className="text-[var(--color-accent-deep)] text-xs"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    ✛
                  </span>
                  <span className="text-[var(--color-text)] text-xs tracking-wide font-medium uppercase">
                    {story.location}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className={`${story.reverse ? 'md:[direction:ltr]' : ''}`}>
                <p className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs tracking-[0.3em] uppercase font-medium mb-5">
                  <span aria-hidden="true" className="w-6 h-px bg-[var(--color-accent)]/60" />
                  {`0${i + 1}`}
                </p>
                <h3 className="font-heading text-xl md:text-2xl text-[var(--color-text)] mb-5 leading-snug">
                  {story.location}
                </h3>
                <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
                  {story.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
