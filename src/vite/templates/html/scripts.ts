const iifeScript = (): void => {
  if (typeof window !== "undefined") {
    window.document.documentElement.classList.add("js");

    if (window.localStorage) {
      const ct = window.localStorage.getItem("color-theme");
      if (ct) {
        window.document.documentElement.classList.add(ct);
      }
    }
  }
};

export const strScript = (store: PageStore = {}): string =>
  `window.STORE=${JSON.stringify(store)};(${iifeScript})()`;
