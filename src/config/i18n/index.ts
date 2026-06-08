export type Translation = Record<string, string>;

export const languageLoaders: Record<string, () => Promise<{ default: Translation }>> = {
  en: () => import("./en"),
  pt: () => import("./pt"),
};
