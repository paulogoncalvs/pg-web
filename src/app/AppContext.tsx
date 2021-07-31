import { h, createContext, FunctionalComponent } from 'preact';
import { useReducer } from 'preact/hooks';
import { Theme, getInitialTheme, useTheme, THEME_DEFAULT } from '@/app/theme';
import { Language, getInitialLanguage, useLanguage, LANGUAGE_DEFAULT } from '@/app/language';

export interface AppContextAction {
    type: string;
    payload: {
        theme?: Theme;
        lang?: Language;
    };
}

interface AppContextState {
    dispatch(action: AppContextAction): void;
    theme: Theme;
    lang: Language;
    store: PageStore;
}

const initialAppContextState: AppContextState = {
    dispatch: (action: AppContextAction) => console.warn('INVALID DISPATCH: ', action), // eslint-disable-line no-console
    theme: getInitialTheme(),
    lang: getInitialLanguage(),
    store: {},
};

export const AppReducer = (AppContextState: AppContextState, { type, payload }: AppContextAction): AppContextState => {
    switch (type) {
        case 'SET_LANGUAGE':
            return {
                ...AppContextState,
                lang: payload.lang || LANGUAGE_DEFAULT,
            };
        case 'SET_THEME':
            return {
                ...AppContextState,
                theme: payload.theme || THEME_DEFAULT,
            };

        default:
            return AppContextState;
    }
};

export const AppContext = createContext(initialAppContextState);

export const AppProvider: FunctionalComponent<{ store: PageStore }> = ({ store, children }) => {
    const [AppContextState, dispatch] = useReducer(AppReducer, { ...initialAppContextState, store: store });
    useTheme(AppContextState.theme, dispatch);
    useLanguage(AppContextState.lang);

    return <AppContext.Provider value={{ ...AppContextState, dispatch }}>{children}</AppContext.Provider>;
};
