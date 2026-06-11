/**
 * i18n registry. Merges shared (common) + per-page modules into a single `ui`
 * dictionary. Each page module lives in ./pages/<page>.ts so parallel work
 * never edits the same file. Keys must be globally unique across modules.
 * FINAL v2 IA: home · about · missionaries · howItWorks · missionTeams ·
 * give · contact.
 */
import { common } from './common';
import { home } from './pages/home';
import { about } from './pages/about';
import { missionaries } from './pages/missionaries';
import { howItWorks } from './pages/howItWorks';
import { missionTeams } from './pages/missionTeams';
import { give } from './pages/give';
import { contact } from './pages/contact';

export type Lang = 'en' | 'es';

export const ui = {
  en: {
    ...common.en,
    ...home.en,
    ...about.en,
    ...missionaries.en,
    ...howItWorks.en,
    ...missionTeams.en,
    ...give.en,
    ...contact.en,
  },
  es: {
    ...common.es,
    ...home.es,
    ...about.es,
    ...missionaries.es,
    ...howItWorks.es,
    ...missionTeams.es,
    ...give.es,
    ...contact.es,
  },
} as const;

export type TranslationKey = keyof typeof ui.en;
