import { VNode } from 'preact';
import { useContext } from 'preact/hooks';
import { StoreContext } from '@/store';
import { Language, LANGUAGE_DEFAULT } from '@/modules/language';
import translations from '@/translations';

export interface TranslationParams {
    [key: string]: VNode | string;
}

const getTranslation = (lang: Language, key: string, params?: TranslationParams): VNode => {
    let translation =
        (translations[lang] && translations[lang][key]) ||
        (translations[LANGUAGE_DEFAULT] && translations[LANGUAGE_DEFAULT][key]) ||
        key;

    if (params) {
        Object.keys(params).forEach((key) => {
            translation = translation.split(/(%\w+?%)/g).map((value: string) => {
                return `%${key}%` === value ? params[key] : value;
            });
        });
    }

    return translation;
};

export const useTranslate = (): { t: (key: string, params?: TranslationParams) => VNode; lang: string } => {
    const { lang } = useContext(StoreContext);

    return {
        t: (key: string, params?: TranslationParams): VNode => getTranslation(lang, key, params),
        lang,
    };
};

export { translations };
