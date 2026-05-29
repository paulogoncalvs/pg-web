import type { VNode } from "preact";

import { useContext, useMemo } from "preact/hooks";

import { translations } from "@/config/i18n";
import { LANGUAGE_DEFAULT, type Language } from "@/modules/language";
import { StoreContext } from "@/modules/store";

type TranslateParam = VNode | string;
type TranslationParams = Record<string, TranslateParam>;

const getTranslation = (
  lang: Language,
  key: string,
  params?: TranslationParams,
  convertToString?: boolean,
): TranslateParam | TranslateParam[] => {
  const translation = translations[lang]?.[key] || translations[LANGUAGE_DEFAULT]?.[key] || key;

  if (params) {
    const transf = translation
      .split(/(%\w+?%)/g)
      .map((value) => params[value.slice(1, -1)] || value)
      .filter(Boolean);

    return convertToString ? transf.join("") : transf;
  }

  return translation;
};

export const useTranslate = () => {
  const { lang } = useContext(StoreContext);

  return useMemo(
    () => ({
      l: lang,
      t: (key: string, params?: TranslationParams, convertToString = true) =>
        getTranslation(lang, key, params, convertToString) as string,
    }),
    [lang],
  );
};

export { translations };
