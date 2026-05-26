import { useContext } from "preact/hooks";

import { StoreContext } from "@/modules/store";
import { isClient } from "@/utils/client";

export enum Language {
  pt = "pt",
  en = "en",
}

export const isValidLanguage = (lang: string): boolean => lang in Language;

export const LANGUAGE_DEFAULT = Language.en;

export const rawSetLanguage = (language: Language): void => {
  if (!isClient()) {
    return;
  }

  window.document.documentElement.setAttribute("lang", language);
};

export const useLanguage = (): {
  lang: Language;
  setLanguage(lang: Language): void;
} => {
  const { lang, dispatch } = useContext(StoreContext);

  return {
    lang,
    setLanguage: (language): void => {
      dispatch({
        payload: { lang: language },
        type: "SET_LANGUAGE",
      });

      rawSetLanguage(language);
    },
  };
};
