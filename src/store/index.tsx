import { h, createContext, FunctionalComponent } from 'preact';
import { useReducer } from 'preact/hooks';
import { Theme, getInitialTheme, THEME_DEFAULT } from '@/modules/theme';
import { Language, getInitialLanguage, LANGUAGE_DEFAULT } from '@/modules/language';
import { useStoreLanguage } from '@/store/hooks/useStoreLanguage';
import { useStoreTheme } from '@/store/hooks/useStoreTheme';

export interface StoreContextAction {
    type: string;
    payload: {
        theme?: Theme;
        lang?: Language;
    };
}

interface StoreContextState extends PageStore {
    dispatch(action: StoreContextAction): void;
}

const initialState: StoreContextState = {
    dispatch: (action: StoreContextAction) => console.warn('INVALID DISPATCH: ', action), // eslint-disable-line no-console
    theme: getInitialTheme(),
    lang: getInitialLanguage(),
};

export const StoreReducer = (
    StoreContextState: StoreContextState,
    { type, payload }: StoreContextAction,
): StoreContextState => {
    switch (type) {
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

export const StoreContext = createContext(initialState);

export const Store: FunctionalComponent<{ store: PageStore }> = ({ store, children }) => {
    const [state, dispatch] = useReducer(StoreReducer, { ...store, ...initialState });
    useStoreTheme(state.theme, dispatch);
    useStoreLanguage(state.lang);

    return <StoreContext.Provider value={{ ...state, dispatch }}>{children}</StoreContext.Provider>;
};
