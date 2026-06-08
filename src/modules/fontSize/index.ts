export enum FontSize {
  Normal = "normal",
  Large = "large",
}

const FONT_SIZE_KEY = "font-size";

export const getSavedFontSize = (): FontSize => {
  if (typeof window === "undefined") {
    return FontSize.Normal;
  }
  return (localStorage.getItem(FONT_SIZE_KEY) as FontSize) || FontSize.Normal;
};

export const saveFontSize = (fontSize: FontSize): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(FONT_SIZE_KEY, fontSize);
};

export const rawSetFontSize = (fontSize: FontSize): void => {
  if (typeof window === "undefined") {
    return;
  }
  document.documentElement.classList.toggle("font-large", fontSize === FontSize.Large);
  saveFontSize(fontSize);
};
