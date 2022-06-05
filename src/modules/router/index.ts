import { FunctionalComponent } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { useRoute, useLocation } from 'wouter-preact';
import { StoreContext } from '@/modules/store';
import { Language, useLanguage, isValidLanguage } from '@/modules/language';
import { isBrowser } from '@/utils/browser';

export const RouterOnChange: FunctionalComponent = (): JSX.Element | null => {
    const { url, setRoute } = useRouter();
    const { lang, setLanguage } = useLanguage();
    const [location] = useLocation();
    const [, params] = useRoute('/:lang/:path*');

    const langParam = (isValidLanguage(params?.lang as Language) ? params?.lang : lang) as Language;

    useEffect(() => {
        langParam !== lang && setLanguage(langParam);
        location !== url && setRoute(location);
    }, [langParam, location]); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRouterLocation = (): any[] => (isBrowser() ? useLocation() : ['', (): null => null]); // eslint-disable-line react-hooks/rules-of-hooks

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRouterRoute = (route: string): any[] => (isBrowser() ? useRoute(route) : ['', (): null => null]); // eslint-disable-line react-hooks/rules-of-hooks

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
