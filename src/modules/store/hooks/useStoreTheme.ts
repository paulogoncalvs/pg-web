import { useEffect } from "preact/hooks";
import type { StoreContextAction } from "@/modules/store";
import { COLOR_SCHEME_QUERY, type Theme, getPrefersScheme, rawSetTheme } from "@/modules/theme";

export const useStoreTheme = (
  theme: Theme,
  dispatch: (action: StoreContextAction) => void,
): void => {
  useEffect(() => {
    const handler = (): void => {
      dispatch({
        payload: { theme: getPrefersScheme() },
        type: "SET_THEME",
      });
    };
    const matchMedia = window.matchMedia(COLOR_SCHEME_QUERY);

    matchMedia.addEventListener("change", handler);

    return (): void => {
      matchMedia.removeEventListener("change", handler);
    };
  }, [dispatch]);

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);
};
