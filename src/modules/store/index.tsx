import { type FunctionalComponent, createContext } from "preact";
import { useContext, useReducer } from "preact/hooks";

import { useIsFirstRender } from "@/hooks/useIsFirstRender";
import { LANGUAGE_DEFAULT, type Language } from "@/modules/language";
import { THEME_DEFAULT, type Theme, getInitialTheme } from "@/modules/theme";
import { isBrowser } from "@/utils/browser";
import debug from "./debug";
import { useStoreLanguage } from "./hooks/useStoreLanguage";
import { useStoreTheme } from "./hooks/useStoreTheme";

export interface StorePayload {
  theme?: Theme;
  lang?: Language;
  url?: string;
  isOffline?: boolean;
}

export interface StoreContextAction {
  type: string;
  payload: StorePayload;
}

interface StoreContextState extends PageStore {
  dispatch(action: StoreContextAction): void;
}

const getInitialState = (store: PageStore): StoreContextState => ({
  dispatch: (action: StoreContextAction): void => console.warn("INVALID DISPATCH:", action),
  isOffline: isBrowser() && !navigator?.onLine,
  theme: store.theme || getInitialTheme(),
  ...store,
});

export const useStoreDispatch = (): ((payload: StorePayload, type?: string) => void) => {
  const { dispatch } = useContext(StoreContext);

  return (payload: StorePayload, type = "UPDATE") => dispatch({ payload, type });
};

export const StoreReducer = (
  StoreContextState: StoreContextState,
  { type, payload }: StoreContextAction,
): StoreContextState => {
  let newState: StoreContextState;

  switch (type) {
    case "SET_ROUTE": {
      newState = { ...StoreContextState, url: payload.url || "/" };
      break;
    }
    case "SET_LANGUAGE": {
      newState = { ...StoreContextState, lang: payload.lang || LANGUAGE_DEFAULT };
      break;
    }
    case "SET_THEME": {
      newState = { ...StoreContextState, theme: payload.theme || THEME_DEFAULT };
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

export const StoreContext = createContext(getInitialState({}));

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

  return <StoreContext.Provider value={{ ...state, dispatch }}>{children}</StoreContext.Provider>;
};
