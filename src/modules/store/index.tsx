import { h, createContext, FunctionalComponent } from 'preact';
import { useReducer } from 'preact/hooks';
import { Theme, getInitialTheme, THEME_DEFAULT } from '@/modules/theme';
import { Language, LANGUAGE_DEFAULT } from '@/modules/language';
import { useStoreLanguage } from './hooks/useStoreLanguage';
import { useStoreTheme } from './hooks/useStoreTheme';

export interface StoreContextAction {
    type: string;
    payload: {
        theme?: Theme;
        lang?: Language;
        url?: string;
    };
}

interface StoreContextState extends PageStore {
    dispatch(action: StoreContextAction): void;
}

const getInitialState = (store: PageStore): StoreContextState => ({
    dispatch: (action: StoreContextAction): void => console.warn('INVALID DISPATCH: ', action), // eslint-disable-line no-console
    theme: store.theme || getInitialTheme(),
    ...store,
});

export const StoreReducer = (
    StoreContextState: StoreContextState,
    { type, payload }: StoreContextAction,
): StoreContextState => {
    switch (type) {
        case 'SET_ROUTE':
            return {
                ...StoreContextState,
                url: payload.url || '/',
            };
        case 'SET_LANGUAGE':
            return {
                ...StoreContextState,
                lang: payload.lang || LANGUAGE_DEFAULT,
            };
        case 'SET_THEME':
            return {
                ...StoreContextState,
                theme: payload.theme || THEME_DEFAULT,
            };

        default:
            return StoreContextState;
    }
};

export const StoreContext = createContext(getInitialState({}));

export const Store: FunctionalComponent<{ store: PageStore }> = ({ store, children }) => {
    const [state, dispatch] = useReducer(StoreReducer, getInitialState(store));
    useStoreTheme(state.theme, dispatch);
    useStoreLanguage(state.lang);

    return <StoreContext.Provider value={{ ...state, dispatch }}>{children}</StoreContext.Provider>;
};
