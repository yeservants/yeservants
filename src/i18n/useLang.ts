'use client';
import { useState, useEffect, useCallback } from 'react';
import { ui, type Lang, type TranslationKey } from './translations';

const LANG_KEY = 'yes_lang';
export const LANG_EVENT = 'yes:langchange';

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem(LANG_KEY) as Lang) ?? 'en';
}

export function setLang(lang: Lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: lang }));
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    // Read initial value on client
    setLangState(getLang());

    const handler = (e: Event) => {
      setLangState((e as CustomEvent<Lang>).detail);
    };
    window.addEventListener(LANG_EVENT, handler);
    return () => window.removeEventListener(LANG_EVENT, handler);
  }, []);

  const changeLang = useCallback((l: Lang) => setLang(l), []);

  const t = useCallback(
    (key: TranslationKey): string => ui[lang][key] as string,
    [lang]
  );

  return { lang, changeLang, t };
}
