import { useContext } from 'preact/hooks';
import { getCurrentUrl } from 'preact-router';
import { StoreContext } from '@/store';
import { isBrowser } from '@/utils/browser';

export enum Language {
    pt = 'pt',
    en = 'en',
}

export const LANGUAGE_DEFAULT = Language.en;

export const rawSetLanguage = (language: Language): void => {
    if (!isBrowser()) {
        return;
    }

    window.document.documentElement.setAttribute('lang', language);
};

export const getInitialLanguage = (): Language => {
    if (isBrowser()) {
        const lang = getCurrentUrl().match(/^\/([\w]{2})\/?/);

        if (lang) {
            return lang[1] as Language;
        }
    }

    return LANGUAGE_DEFAULT;
};

export const useLanguage = (): {
    lang: Language;
    setLanguage(lang: Language): void;
} => {
    const { lang, dispatch } = useContext(StoreContext);

    return {
        lang,
        setLanguage: (lang): void => {
            dispatch({
                type: 'SET_LANGUAGE',
                payload: { lang },
            });

            window.document.documentElement.setAttribute('lang', lang);
        },
    };
};
