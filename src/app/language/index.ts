import { getCurrentUrl } from 'preact-router';
import { useLanguage } from '@/app/language/useLanguage';
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

export { useLanguage };
