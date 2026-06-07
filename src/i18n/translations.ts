/**
 * i18n registry. Merges shared (common) + per-page modules into a single `ui`
 * dictionary. Each page module lives in ./pages/<page>.ts so parallel work
 * never edits the same file. Keys must be globally unique across modules;
 * `legacy` is merged first and overridden by V3 modules on any collision.
 */
import { common } from './common';
import { home } from './pages/home';
import { about } from './pages/about';
import { ourWork } from './pages/ourWork';
import { howItWorks } from './pages/howItWorks';
import { gospelWorkers } from './pages/gospelWorkers';
import { give } from './pages/give';
import { forDonors } from './pages/forDonors';

export type Lang = 'en' | 'es';

export const ui = {
  en: {
    ...common.en,
    ...home.en,
    ...about.en,
    ...ourWork.en,
    ...howItWorks.en,
    ...gospelWorkers.en,
    ...give.en,
    ...forDonors.en,
  },
  es: {
    ...common.es,
    ...home.es,
    ...about.es,
    ...ourWork.es,
    ...howItWorks.es,
    ...gospelWorkers.es,
    ...give.es,
    ...forDonors.es,
  },
} as const;

export type TranslationKey = keyof typeof ui.en;
