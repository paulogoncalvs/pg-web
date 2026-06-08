import type { VNode } from "preact";

import { useContext, useEffect, useMemo, useRef, useState } from "preact/hooks";

import { languageLoaders, type Translation } from "@/config/i18n";
import { LANGUAGE_DEFAULT, type Language } from "@/modules/language";
import { StoreContext } from "@/modules/store";

type TranslateParam = VNode | string;
type TranslationParams = Record<string, TranslateParam>;

const cache: Record<string, Translation | undefined> = {};

export const setTranslations = (entries: Record<string, Translation>): void => {
  for (const [lang, tr] of Object.entries(entries)) {
    cache[lang] = tr;
  }
};

export const preloadTranslation = async (lang: string): Promise<void> => {
  if (cache[lang]) {
    return;
  }
  const loader = languageLoaders[lang];
  if (!loader) {
    return;
  }
  const mod = await loader();
  cache[lang] = mod.default;
};

export const getAvailableLanguages = (): Language[] => Object.keys(languageLoaders) as Language[];

const getTranslation = (
  tr: Translation | undefined,
  key: string,
  params?: TranslationParams,
  convertToString?: boolean,
): TranslateParam | TranslateParam[] => {
  const text = tr?.[key] || cache[LANGUAGE_DEFAULT]?.[key] || key;

  if (params) {
    const transf = text
      .split(/(%\w+?%)/g)
      .map((value) => params[value.slice(1, -1)] || value)
      .filter(Boolean);

    return convertToString ? transf.join("") : transf;
  }

  return text;
};

export const useTranslate = () => {
  const { lang } = useContext(StoreContext);
  const [translation, setTranslation] = useState<Translation | undefined>(() => cache[lang]);
  const prevLang = useRef(lang);

  useEffect(() => {
    if (prevLang.current === lang) {
      return;
    }
    prevLang.current = lang;

    if (cache[lang]) {
      setTranslation(cache[lang]);
      return;
    }

    let current = true;
    preloadTranslation(lang).then(() => {
      if (current) {
        setTranslation(cache[lang]);
      }
    });
    return () => {
      current = false;
    };
  }, [lang]);

  return useMemo(
    () => ({
      l: lang,
      t: (key: string, params?: TranslationParams, convertToString = true) =>
        getTranslation(translation, key, params, convertToString) as string,
    }),
    [lang, translation],
  );
};
