import { FunctionalComponent, JSX } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { useRoute, useLocation } from 'wouter-preact';
import { StoreContext } from '@/modules/store';
import { Language, useLanguage, isValidLanguage } from '@/modules/language';
import { trackPageView } from '@/modules/tracking/ga4';
import { isBrowser } from '@/utils/browser';
import { toggleSideDrawer } from '@/components/SideDrawer';

export const RouterOnChange: FunctionalComponent = (): JSX.Element | null => {
    const { url, setRoute } = useRouter();
    const { lang, setLanguage } = useLanguage();
    const [location] = useLocation();
    const [, params] = useRoute('/:lang/*');

    const langParam = (isValidLanguage(params?.lang as Language) ? params?.lang : lang) as Language;

    useEffect(() => {
        if (langParam !== lang) {
            setLanguage(langParam);
        }

        if (location !== url) {
            setRoute(location);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toggleSideDrawer(false);
            trackPageView();
        }
    }, [langParam, location]);

    return null;
};

type RouteParams = { [key: string]: string | undefined };
type RouteResult = [boolean, (to: string) => void, RouteParams | null];

export const useRouterLocation = (): [string, (to: string) => void] => {
    const [match, setLocation] = isBrowser() ? useLocation() : ['', () => {}];
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
    const { url = '', dispatch } = useContext(StoreContext);

    return {
        url,
        setRoute: (url): void => {
            dispatch({
                type: 'SET_ROUTE',
                payload: { url },
            });
        },
    };
};
