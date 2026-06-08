import { type FunctionalComponent } from "preact";
import { useEffect, useMemo, useReducer, useRef } from "preact/hooks";

import { useIsFirstRender } from "@/hooks/useIsFirstRender";
import { getInitialAnimations, rawSetAnimations } from "@/modules/animations";
import { getCookieConsent, setCookieConsent } from "@/modules/cookieConsent";
import { FontSize, getSavedFontSize, rawSetFontSize } from "@/modules/fontSize";
import { LANGUAGE_DEFAULT } from "@/modules/language";
import { THEME_DEFAULT, getInitialTheme } from "@/modules/theme";
import { updateConsent } from "@/modules/tracking/ga4";

import { StoreContext, type StoreContextAction, type StoreContextState } from "./context";
import debug from "./debug";
import { useStoreLanguage } from "./hooks/useStoreLanguage";
import { useStoreTheme } from "./hooks/useStoreTheme";

export { StoreContext, type StoreContextAction, type StorePayload } from "./context";

const getInitialState = (store: PageStore): StoreContextState => {
  const savedConsent = getCookieConsent();

  return {
    dispatch: (action: StoreContextAction): void => console.warn("INVALID DISPATCH:", action),
    isOffline: typeof window !== "undefined" && !navigator?.onLine,
    theme: store.theme || getInitialTheme(),
    fontSize: store.fontSize || getSavedFontSize(),
    animationsEnabled: getInitialAnimations(),
    cookiesEnabled: savedConsent === null ? false : savedConsent === "granted",
    ...store,
  };
};

export const StoreReducer = (
  StoreContextState: StoreContextState,
  { type, payload }: StoreContextAction,
): StoreContextState => {
  let newState: StoreContextState;

  switch (type) {
    case "SET_ROUTE": {
      const url = payload.url || "/";
      if (StoreContextState.url === url) {
        return StoreContextState;
      }
      newState = { ...StoreContextState, url };
      break;
    }
    case "SET_LANGUAGE": {
      const lang = payload.lang || LANGUAGE_DEFAULT;
      if (StoreContextState.lang === lang) {
        return StoreContextState;
      }
      newState = { ...StoreContextState, lang };
      break;
    }
    case "SET_SIDE_DRAWER": {
      if (StoreContextState.isSideDrawerOpen === payload.isSideDrawerOpen) {
        return StoreContextState;
      }
      newState = { ...StoreContextState, isSideDrawerOpen: payload.isSideDrawerOpen };
      break;
    }
    case "SET_ANIMATIONS": {
      newState = { ...StoreContextState, animationsEnabled: payload.animationsEnabled };
      break;
    }
    case "SET_FONT_SIZE": {
      newState = { ...StoreContextState, fontSize: payload.fontSize };
      break;
    }
    case "SET_COOKIES": {
      newState = { ...StoreContextState, cookiesEnabled: payload.cookiesEnabled };
      break;
    }
    case "SET_THEME": {
      const theme = payload.theme || THEME_DEFAULT;
      if (StoreContextState.theme === theme) {
        return StoreContextState;
      }
      newState = { ...StoreContextState, theme };
      break;
    }
    case "UPDATE": {
      newState = { ...StoreContextState, ...payload };
      break;
    }
    default: {
      newState = StoreContextState;
    }
  }

  if (import.meta.env.DEV) {
    debug(type, newState);
  }

  return newState;
};

export const StoreContextProvider: FunctionalComponent<{ store: PageStore }> = ({
  store,
  children,
}) => {
  const [state, dispatch] = useReducer(StoreReducer, getInitialState(store));
  const isFirstRender = useIsFirstRender();

  useStoreTheme(state.theme, dispatch);
  useStoreLanguage(state.lang);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent): void => {
      dispatch({ type: "SET_ANIMATIONS", payload: { animationsEnabled: !e.matches } });
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [dispatch]);

  useEffect(() => {
    rawSetAnimations(state.animationsEnabled ?? true);
  }, [state.animationsEnabled]);

  useEffect(() => {
    rawSetFontSize(state.fontSize || FontSize.Normal);
  }, [state.fontSize]);

  const isFirstCookiesRender = useRef(true);

  useEffect(() => {
    const consent = state.cookiesEnabled ? "granted" : "denied";
    updateConsent(consent);

    if (isFirstCookiesRender.current) {
      isFirstCookiesRender.current = false;
      return;
    }

    setCookieConsent(consent);

    if (state.cookiesEnabled) {
      window.dispatchEvent(new CustomEvent("cookie-consent-granted"));
    }
  }, [state.cookiesEnabled]);

  useEffect(() => {
    const handleOnline = (): void => dispatch({ type: "UPDATE", payload: { isOffline: false } });
    const handleOffline = (): void => dispatch({ type: "UPDATE", payload: { isOffline: true } });

    addEventListener("online", handleOnline);
    addEventListener("offline", handleOffline);

    return () => {
      removeEventListener("online", handleOnline);
      removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);

  if (import.meta.env.DEV && isFirstRender) {
    debug("@@INIT", state);
  }

  const value = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
