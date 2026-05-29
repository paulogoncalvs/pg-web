import { type FunctionalComponent } from "preact";
import { useReducer, useMemo } from "preact/hooks";

import { useIsFirstRender } from "@/hooks/useIsFirstRender";
import { LANGUAGE_DEFAULT } from "@/modules/language";
import { THEME_DEFAULT, getInitialTheme } from "@/modules/theme";

import { StoreContext, type StoreContextAction, type StoreContextState } from "./context";
import debug from "./debug";
import { useStoreLanguage } from "./hooks/useStoreLanguage";
import { useStoreTheme } from "./hooks/useStoreTheme";

export { StoreContext, type StoreContextAction, type StorePayload } from "./context";

const getInitialState = (store: PageStore): StoreContextState => ({
  dispatch: (action: StoreContextAction): void => console.warn("INVALID DISPATCH:", action),
  isOffline: typeof window !== "undefined" && !navigator?.onLine,
  theme: store.theme || getInitialTheme(),
  ...store,
});

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

  if (import.meta.env.DEV && isFirstRender) {
    debug("@@INIT", state);
  }

  const value = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
