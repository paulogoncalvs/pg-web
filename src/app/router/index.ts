import { useContext } from 'preact/hooks';
import { RouterOnChangeArgs } from 'preact-router';
import { createBrowserHistory, BrowserHistory } from 'history';
import { AppContext } from '@/app/AppContext';
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
        const { dispatch, store, ...otherContext } = useContext(AppContext);

        const {
            // @ts-ignore
            props: { locale, url },
        } = current;

        if (locale) {
            dispatch({
                type: 'SET_LANGUAGE',
                payload: { lang: locale },
            });

            window.document.documentElement.setAttribute('lang', locale);
        }

        history.replace(url, otherContext);
    };
}

export { history, HandleRouterOnChange };
