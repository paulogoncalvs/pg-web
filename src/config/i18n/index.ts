import en from "./en";
import pt from "./pt";

export type Translation = Record<string, string>;

export type Translations = Record<string, Translation>;

export const translations: Translations = {
  en,
  pt,
};
