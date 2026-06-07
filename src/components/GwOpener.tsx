'use client';
import { useLang } from '../i18n/useLang';
import PageHero from './PageHero';

/**
 * Gospel Workers opener — the shared PageHero plus the page-specific worker-type
 * paragraphs and closing tagline (V3 Section 1 content) rendered as children.
 */
export default function GwOpener() {
  const { t } = useLang();
  return (
    <PageHero eyebrowKey="gw_opener_label" headlineKey="gw_opener_headline">
      <div data-reveal="fade" className="prose-yes mt-8 text-left text-lg leading-relaxed text-[var(--color-cream)]/75 max-w-2xl mx-auto">
        <p>{t('gw_opener_p1')}</p>
        <p className="mt-5">{t('gw_opener_p2')}</p>
        <p className="mt-5">{t('gw_opener_p3')}</p>
        <p className="mt-5">{t('gw_opener_p4')}</p>
      </div>
      <div data-reveal="fade" className="mt-10 max-w-2xl mx-auto">
        <span aria-hidden="true" className="block w-12 h-px mx-auto bg-[var(--color-accent-light)]/40 mb-5" />
        <p className="font-heading italic text-[var(--color-cream)] text-xl md:text-2xl leading-snug mb-1">{t('gw_opener_tagline1')}</p>
        <p className="font-heading italic text-[var(--color-accent-light)] text-xl md:text-2xl leading-snug">{t('gw_opener_tagline2')}</p>
      </div>
    </PageHero>
  );
}
