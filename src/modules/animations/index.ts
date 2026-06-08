const ANIMATIONS_KEY = "animations";

export const getSavedAnimations = (): boolean | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const val = localStorage.getItem(ANIMATIONS_KEY);
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  return null;
};

export const saveAnimations = (enabled: boolean): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(ANIMATIONS_KEY, String(enabled));
};

export const getInitialAnimations = (): boolean => {
  const saved = getSavedAnimations();
  if (saved !== null) {
    return saved;
  }
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return false;
  }
  return true;
};

export const rawSetAnimations = (enabled: boolean): void => {
  if (typeof window === "undefined") {
    return;
  }
  document.documentElement.classList.toggle("animations-off", !enabled);
  saveAnimations(enabled);
};
