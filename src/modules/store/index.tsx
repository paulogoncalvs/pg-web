import { h, createContext, FunctionalComponent } from 'preact';
import { useContext, useReducer } from 'preact/hooks';
import { useIsFirstRender } from '@/hooks/useIsFirstRender';
import { Theme, getInitialTheme, THEME_DEFAULT } from '@/modules/theme';
import { Language, LANGUAGE_DEFAULT } from '@/modules/language';
import { useStoreLanguage } from './hooks/useStoreLanguage';
import { useStoreTheme } from './hooks/useStoreTheme';
import { debug } from './debug';
import { isBrowser } from '@/utils/browser';

export interface StorePayload {
    theme?: Theme;
    lang?: Language;
    url?: string;
    isOffline?: boolean;
}

export interface StoreContextAction {
    type: string;
    payload: StorePayload;
}

interface StoreContextState extends PageStore {
    dispatch(action: StoreContextAction): void;
}

const getInitialState = (store: PageStore): StoreContextState => ({
    dispatch: (action: StoreContextAction): void => console.warn('INVALID DISPATCH: ', action), // eslint-disable-line no-console
    theme: store.theme || getInitialTheme(),
    isOffline: isBrowser() && !navigator?.onLine,
    ...store,
});

export const useStoreDispatch = (): ((payload: StorePayload, type?: string) => void) => {
    const { dispatch } = useContext(StoreContext);

    return (payload: StorePayload, type = 'UPDATE') => dispatch({ payload, type });
};

export const StoreReducer = (
    StoreContextState: StoreContextState,
    { type, payload }: StoreContextAction,
): StoreContextState => {
    let newState;

    switch (type) {
        case 'SET_ROUTE':
            newState = { ...StoreContextState, url: payload.url || '/' };
            break;
        case 'SET_LANGUAGE':
            newState = { ...StoreContextState, lang: payload.lang || LANGUAGE_DEFAULT };
            break;
        case 'SET_THEME':
            newState = { ...StoreContextState, theme: payload.theme || THEME_DEFAULT };
            break;
        case 'UPDATE':
            newState = { ...StoreContextState, ...payload };
            break;
        default:
            newState = StoreContextState;
    }

    if (process.env.NODE_ENV === 'development') {
        debug(type, newState);
    }

    return newState;
};

export const StoreContext = createContext(getInitialState({}));

export const StoreContextProvider: FunctionalComponent<{ store: PageStore }> = ({ store, children }) => {
    const [state, dispatch] = useReducer(StoreReducer, getInitialState(store));
    const isFirstRender = useIsFirstRender();

    useStoreTheme(state.theme, dispatch);
    useStoreLanguage(state.lang);

    if (process.env.NODE_ENV === 'development' && isFirstRender) {
        debug('@@INIT', state);
    }

    return <StoreContext.Provider value={{ ...state, dispatch }}>{children}</StoreContext.Provider>;
};
