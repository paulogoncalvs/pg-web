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
        const { dispatch, ...otherContext } = useContext(StoreContext);
        const { setLanguage } = useLanguage();
        const {
            // @ts-ignore
            props: { locale, url },
        } = current;

        locale && setLanguage(locale);

        history.replace(url, otherContext);
    };
}

export { history, HandleRouterOnChange };
