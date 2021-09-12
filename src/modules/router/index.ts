import { useContext } from 'preact/hooks';
import { RouterOnChangeArgs } from 'preact-router';
import { createBrowserHistory, BrowserHistory } from 'history';
import { StoreContext } from '@/store';
import { useLanguage } from '@/modules/language';
import { isBrowser } from '@/utils/browser';

let history: BrowserHistory;

let HandleRouterOnChange: (props: RouterOnChangeArgs) => void;

if (isBrowser()) {
    history = createBrowserHistory();

    /*
    history.listen((x) => {
        console.log('route changes', x);
        // x.action === 'POP' && route(x.location.pathname);
    });
    */

    // @todo language - history back
    HandleRouterOnChange = ({ current }: RouterOnChangeArgs): void => {
        const { dispatch, lang, ...otherContext } = useContext(StoreContext);
        const { setLanguage } = useLanguage();
        const { setRoute } = useRouter();
        const {
            // @ts-ignore
            props: { locale, url },
        } = current;

        locale && locale !== lang && setLanguage(locale);

        setRoute(url);

        history.replace(url, otherContext);
    };
}

export { history, HandleRouterOnChange };

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
