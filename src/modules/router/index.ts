import type { FunctionalComponent, JSX } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { useLocation, useRoute } from "wouter-preact";
import { toggleSideDrawer } from "@/components/SideDrawer";
import { type Language, isValidLanguage, useLanguage } from "@/modules/language";
import { StoreContext } from "@/modules/store";
import { trackPageView } from "@/modules/tracking/ga4";
import { isBrowser } from "@/utils/browser";

export const RouterOnChange: FunctionalComponent = (): JSX.Element | null => {
  const { url, setRoute } = useRouter();
  const { lang, setLanguage } = useLanguage();
  const [location] = useLocation();
  const [, params] = useRoute("/:lang/*");

  const langParam = (isValidLanguage(params?.lang as Language) ? params?.lang : lang) as Language;

  useEffect(() => {
    if (langParam !== lang) {
      setLanguage(langParam);
    }

    if (location !== url) {
      setRoute(location);
      window.scrollTo({ behavior: "smooth", top: 0 });
      toggleSideDrawer(false);
      trackPageView();
    }
  }, [langParam, location, lang, setLanguage, setRoute, url]);

  return null;
};

type RouteParams = Record<string, string | undefined>;
type RouteResult = [boolean, (to: string) => void, RouteParams | null];

export const useRouterLocation = (): [string, (to: string) => void] => {
  const [match, setLocation] = isBrowser() ? useLocation() : ["", () => {}];
  return [match as string, setLocation];
};

export const useRouterRoute = (route: string): RouteResult => {
  const [match, params] = isBrowser() ? useRoute(route) : [false, null];
  return [match, () => {}, params as RouteParams];
};

export const useRouter = (): {
  url: string;
  setRoute(url: string): void;
} => {
  const { url = "", dispatch } = useContext(StoreContext);

  return {
    setRoute: (url): void => {
      dispatch({
        payload: { url },
        type: "SET_ROUTE",
      });
    },
    url,
  };
};
