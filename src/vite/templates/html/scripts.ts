const iifeScript = (): void => {
  if (typeof window !== "undefined") {
    window.document.documentElement.classList.add("js");

    if (window.localStorage) {
      const ct = window.localStorage.getItem("color-theme");
      if (ct) {
        window.document.documentElement.classList.add(ct);
      }

      const fs = window.localStorage.getItem("font-size");
      if (fs === "large") {
        window.document.documentElement.classList.add("font-large");
      }
    }
  }
};

export const strScript = (store: PageStore = {}): string =>
  `window.STORE=${JSON.stringify(store)};(${iifeScript})()`;
