import type { FunctionalComponent, JSX } from "preact";

import { useContext, useEffect } from "preact/hooks";
import { useLocation, useRoute } from "wouter-preact";

import { toggleSideDrawer } from "@/components/SideDrawer";
import { LANGUAGE_DEFAULT, type Language, isValidLanguage, useLanguage } from "@/modules/language";
import { StoreContext } from "@/modules/store";
import { trackPageView } from "@/modules/tracking/ga4";
import { isClient } from "@/utils/client";

export const RouterOnChange: FunctionalComponent = (): JSX.Element | null => {
  const { url, setRoute } = useRouter();
  const { lang, setLanguage } = useLanguage();
  const [location] = useLocation();
  const [, , params] = useRouterRoute(/^\/(?<lParam>[a-zA-Z]{2})(\/.*)?$/);

  const langParam = (
    isValidLanguage(params?.lParam as Language) ? params?.lParam : lang
  ) as Language;

  useEffect(() => {
    if (langParam !== lang) {
      setLanguage(langParam);
    } else if (!params?.lParam && lang !== LANGUAGE_DEFAULT) {
      setLanguage(LANGUAGE_DEFAULT);
    }

    if (location !== url) {
      setRoute(location);
      window.scrollTo({ behavior: "smooth", top: 0 });
      toggleSideDrawer(false);
      trackPageView();
    }
  }, [langParam, location, lang, setLanguage, setRoute, url, params?.lParam]);

  return null;
};

type RouteParams = Record<string, string | undefined>;
type RouteResult = [boolean, (to: string) => void, RouteParams | null];

export const useRouterLocation = (): [string, (to: string) => void] => {
  /* oxlint-disable-next-line react-hooks/rules-of-hooks because of ssg */
  const [match, setLocation] = isClient() ? useLocation() : ["", () => {}];
  return [match as string, setLocation];
};

export const useRouterRoute = (route: string | RegExp): RouteResult => {
  /* oxlint-disable-next-line react-hooks/rules-of-hooks because of ssg */
  const [match, params] = isClient() ? useRoute(route) : [false, null];
  return [match, () => {}, params as RouteParams];
};

export const useRouter = (): {
  url: string;
  setRoute(url: string): void;
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
  };
};
