const iifeScript = (): void => {
  if (typeof window !== "undefined") {
    const root = window.document.documentElement;
    root.classList.add("js");

    // Safety net: if any uncaught JS error occurs after the `.js` class is
    // added, reveal content that would otherwise stay hidden by animations.
    // Note: keep handlers anonymous — named functions are wrapped in
    // esbuild's `__name` helper when serialized via toString().
    window.addEventListener("error", (): void => {
      root.classList.add("js-error");
    });
    window.addEventListener("unhandledrejection", (): void => {
      root.classList.add("js-error");
    });

    if (window.localStorage) {
      const ct = window.localStorage.getItem("color-theme");
      if (ct) {
        root.classList.add(ct);
      }

      const fs = window.localStorage.getItem("font-size");
      if (fs === "large") {
        root.classList.add("font-large");
      }

      // Mirror getInitialAnimations() so content revealed by scroll animations
      // is visible from the first paint instead of waiting for hydration.
      const an = window.localStorage.getItem("animations");
      if (
        an === "false" ||
        (an !== "true" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      ) {
        root.classList.add("animations-off");
      }
    }
  }
};

export const strScript = (store: PageStore = {}): string =>
  `window.STORE=${JSON.stringify(store)};(${iifeScript})()`;
