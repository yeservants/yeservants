'use client';
import { useLang } from '../i18n/useLang';
import PageHero from './PageHero';

/**
 * The Missionaries opener — shared PageHero plus the FINAL v2 opening body:
 * "They already speak the language… They are already there."
 */
export default function GwOpener() {
  const { t } = useLang();
  return (
    <PageHero eyebrowKey="gw_opener_label" headlineKey="gw_opener_headline">
      <p
        data-reveal="fade"
        className="mt-8 text-lg md:text-xl leading-[1.8] text-[var(--color-cream)]/80 max-w-2xl mx-auto"
      >
        {t('gw_opener_body')}
      </p>
    </PageHero>
  );
}
