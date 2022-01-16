import { useContext } from 'preact/hooks';
import { StoreContext } from '@/modules/store';
import { isBrowser } from '@/utils/browser';

export enum Language {
    pt = 'pt',
    en = 'en',
}

export const isValidLanguage = (lang: string): boolean => lang in Language;

export const LANGUAGE_DEFAULT = Language.en;

export const rawSetLanguage = (language: Language): void => {
    if (!isBrowser()) {
        return;
    }

    window.document.documentElement.setAttribute('lang', language);
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

            rawSetLanguage(lang);
        },
    };
};
