import { Language } from "@/modules/language";

export type Translation = Record<string, string>;

export const languageLoaders: Record<Language, () => Promise<{ default: Translation }>> = {
  [Language.en]: () => import("./en"),
  [Language.pt]: () => import("./pt"),
};
