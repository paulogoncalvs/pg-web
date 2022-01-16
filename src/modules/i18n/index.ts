import { VNode } from 'preact';
import { useContext } from 'preact/hooks';
import { StoreContext } from '@/modules/store';
import { Language, LANGUAGE_DEFAULT } from '@/modules/language';
import { translations } from '@/config/translations';

export interface TranslationParams {
    [key: string]: VNode | string;
}

const getTranslation = (lang: Language, key: string, params?: TranslationParams, convertToString?: boolean): VNode => {
    let translation =
        (translations[lang] && translations[lang][key]) ||
        (translations[LANGUAGE_DEFAULT] && translations[LANGUAGE_DEFAULT][key]) ||
        key;

    if (params) {
        Object.keys(params).forEach((key) => {
            translation = translation
                .split(/(%\w+?%)/g)
                .map((value: string) => {
                    return `%${key}%` === value ? params[key] : value;
                })
                .filter(Boolean);
        });
    }

    return params && convertToString ? translation.join('') : translation;
};

export const useTranslate = (): {
    t: (key: string, params?: TranslationParams, convertToString?: boolean) => VNode;
    lang: string;
} => {
    const { lang } = useContext(StoreContext);

    return {
        t: (key: string, params?: TranslationParams, convertToString = true): VNode =>
            getTranslation(lang, key, params, convertToString),
        lang,
    };
};

export { translations };
