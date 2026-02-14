import { FunctionalComponent, JSX } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { useRoute, useLocation } from 'wouter-preact';
import { StoreContext } from '@/modules/store';
import { Language, useLanguage, isValidLanguage } from '@/modules/language';
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
        }
    }, [langParam, location]);

    return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRouterLocation = (): any[] => (isBrowser() ? useLocation() : ['', (): null => null]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRouterRoute = (route: string): any[] => (isBrowser() ? useRoute(route) : ['', (): null => null]);

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
