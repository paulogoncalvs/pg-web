import type { FunctionalComponent, JSX } from "preact";

import { useContext, useEffect } from "preact/hooks";
import { useLocation, useRoute } from "wouter-preact";

import { LANGUAGE_DEFAULT, type Language, isValidLanguage } from "@/modules/language";
import { type StoreContextAction, type StorePayload, StoreContext } from "@/modules/store/context";
import { trackPageView } from "@/modules/tracking/ga4";
export const RouterOnChange: FunctionalComponent = (): JSX.Element | null => {
  const { url, dispatch } = useRouter();
  const { lang } = useContext(StoreContext);
  const [location] = useLocation();
  const [, params] = useRouterRoute(/^\/(?<lParam>[a-zA-Z]{2})(\/.*)?$/);

  const langParam = (
    isValidLanguage(params?.lParam as Language) ? params?.lParam : lang
  ) as Language;

  useEffect(() => {
    const payload: StorePayload = {};

    if (langParam !== lang) {
      payload.lang = langParam;
    } else if (!params?.lParam && lang !== LANGUAGE_DEFAULT) {
      payload.lang = LANGUAGE_DEFAULT;
    }

    if (location !== url) {
      payload.url = location;
      payload.isSideDrawerOpen = false;
      window.scrollTo({ behavior: "smooth", top: 0 });
      trackPageView();
    }

    if (Object.keys(payload).length > 0) {
      dispatch({ type: "UPDATE", payload });
    }
  }, [langParam, location, lang, url, params?.lParam, dispatch]);

  return null;
};

type RouteParams = Record<string, string | undefined>;

export const useRouterLocation = (): [string, (to: string) => void] => {
  const [location, setLocation] = useLocation();
  return [location, setLocation];
};

export const useRouterRoute = (route: string | RegExp): [boolean, RouteParams | null] => {
  const [match, params] = useRoute(route);
  return [match, params];
};

export const useRouter = (): {
  url: string;
  setRoute(url: string): void;
  dispatch: (action: StoreContextAction) => void;
} => {
  const { url, dispatch } = useContext(StoreContext);

  return {
    setRoute: (newUrl): void => {
      dispatch({
        payload: { url: newUrl },
        type: "SET_ROUTE",
      });
    },
    url: url || "",
    dispatch,
  };
};
