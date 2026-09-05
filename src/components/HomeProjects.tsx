'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

interface Priority {
  num: TranslationKey;
  title: TranslationKey;
  body: TranslationKey;
  verse: TranslationKey;
  refKey: TranslationKey;
}

/**
 * v7 — Special Projects. Two priorities on espresso: the pastor's home,
 * then the congregation's gathering place — deliberately unequal columns
 * (priority 01 leads), each closing with its scripture in italic gold.
 */
export default function HomeProjects({ base: _base }: Props) {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const priorities: Priority[] = [
    {
      num: 'home_proj_1_num',
      title: 'home_proj_1_title',
      body: 'home_proj_1_body',
      verse: 'home_proj_1_verse',
      refKey: 'home_proj_1_ref',
    },
    {
      num: 'home_proj_2_num',
      title: 'home_proj_2_title',
      body: 'home_proj_2_body',
      verse: 'home_proj_2_verse',
      refKey: 'home_proj_2_ref',
    },
  ];

  return (
    <section
      ref={ref}
      className="relative green-gradient text-[var(--color-cream)] py-12 md:py-18 overflow-hidden"
    >
      <GreenAtmos variant={5} />
      <div aria-hidden="true" className="absolute top-0 left-[8%] float-line h-52 hidden md:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-gold)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
          >
            {t('home_proj_label')}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.12] mb-7"
          >
            {t('home_proj_headline')}
          </h2>
          <p data-reveal="fade" className="text-lg md:text-xl leading-[1.8] text-[var(--color-cream)]/75">
            {t('home_proj_intro')}
          </p>
        </div>

        <div className="grid md:grid-cols-[1.15fr_1fr] gap-8 md:gap-12 items-start">
          {priorities.map((p, i) => (
            <article
              key={p.num}
              data-reveal="fade"
              className={`relative rounded-2xl border border-[var(--color-gold)]/25 bg-[var(--color-primary-deep)]/40 backdrop-blur-[2px] p-8 md:p-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ${
                i === 1 ? 'md:mt-14' : ''
              }`}
            >
              <p className="text-[var(--color-gold)] text-[11px] tracking-[0.28em] uppercase font-medium mb-5">
                {t(p.num)}
              </p>
              <h3 className="font-heading font-medium text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.25] mb-5">
                {t(p.title)}
              </h3>
              <p className="text-lg leading-[1.75] text-[var(--color-cream)]/75 mb-8">{t(p.body)}</p>
              <blockquote className="font-heading italic text-[var(--color-gold-light)] text-lg leading-[1.6] border-l-[3px] border-[var(--color-accent)] pl-5">
                &ldquo;{t(p.verse)}&rdquo;
                <cite className="block not-italic mt-2 text-[var(--color-cream)]/55 text-xs tracking-[0.24em] uppercase">
                  {t(p.refKey)}
                </cite>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
