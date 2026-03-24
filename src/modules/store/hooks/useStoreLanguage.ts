import { useEffect } from "preact/hooks";
import { type Language, rawSetLanguage } from "@/modules/language";

export const useStoreLanguage = (lang: Language): void => {
  useEffect(() => {
    rawSetLanguage(lang);
  }, [lang]);
};
