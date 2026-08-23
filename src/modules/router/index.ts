import type { FunctionalComponent, JSX } from "preact";

import { useContext, useEffect, useCallback } from "preact/hooks";
import { useLocation, useRoute } from "wouter-preact";

import { LANGUAGE_DEFAULT, type Language, isValidLanguage } from "@/modules/language";
import { type StoreContextAction, StoreContext } from "@/modules/store/context";
import { trackPageView } from "@/modules/tracking/ga4";

export const RouterOnChange: FunctionalComponent = (): JSX.Element | null => {
  const { url, dispatch } = useRouter();
  const { lang } = useContext(StoreContext);

  const [location] = useLocation();
  const [, params] = useRoute(/^\/(?<lParam>[a-zA-Z]{2})(\/.*)?$/);

  const langParam: Language = isValidLanguage(params?.lParam ?? "")
    ? (params?.lParam ?? lang)
    : lang;

  // Sync language from route
  useEffect(() => {
    if (langParam !== lang) {
      dispatch({
        type: "UPDATE",
        payload: { lang: langParam },
      });
      return;
    }

    if (!params?.lParam && lang !== LANGUAGE_DEFAULT) {
      dispatch({
        type: "UPDATE",
        payload: { lang: LANGUAGE_DEFAULT },
      });
    }
  }, [langParam, lang, params?.lParam, dispatch]);

  // Sync URL and track navigation
  useEffect(() => {
    if (location === url) {
      return;
    }

    dispatch({
      type: "UPDATE",
      payload: {
        url: location,
        isSideDrawerOpen: false,
      },
    });

    trackPageView();
  }, [location, url, dispatch]);

  return null;
};

type RouteParams<T extends string = string> = Partial<Record<T, string>>;

export const useRouterLocation = (): [string, (to: string) => void] => {
  return useLocation();
};

export const useRouterRoute = <T extends string = string>(
  route: string | RegExp,
): [boolean, RouteParams<T> | null] => {
  const [match, params] = useRoute(route);

  return [match, params as RouteParams<T> | null];
};

export const useRouter = (): {
  url: string;
  setRoute(url: string): void;
  dispatch: (action: StoreContextAction) => void;
} => {
  const { url, dispatch } = useContext(StoreContext);

  const setRoute = useCallback(
    (newUrl: string): void => {
      dispatch({
        type: "SET_ROUTE",
        payload: { url: newUrl },
      });
    },
    [dispatch],
  );

  return {
    url: url ?? "",
    setRoute,
    dispatch,
  };
};
