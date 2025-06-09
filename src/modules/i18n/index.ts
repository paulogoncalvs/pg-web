import { VNode } from 'preact';
import { useContext } from 'preact/hooks';
import { StoreContext } from '@/modules/store';
import { Language, LANGUAGE_DEFAULT } from '@/modules/language';
import { translations } from '@/config/translations';

type TranslateParam = VNode | string;
interface TranslationParams {
    [key: string]: TranslateParam;
}

const getTranslation = (
    lang: Language,
    key: string,
    params?: TranslationParams,
    convertToString?: boolean,
): TranslateParam | TranslateParam[] => {
    const translation = translations[lang]?.[key] || translations[LANGUAGE_DEFAULT]?.[key] || key;

    if (params) {
        const transf = translation
            .split(/(%\w+?%)/g)
            .map((value) => params[value.slice(1, -1)] || value)
            .filter(Boolean);

        return convertToString ? transf.join('') : transf;
    }

    return translation;
};

export const useTranslate = () => {
    const { lang } = useContext(StoreContext);

    return {
        t: (key: string, params?: TranslationParams, convertToString = true) =>
            getTranslation(lang, key, params, convertToString) as string,
        lang,
    };
};

export { translations };
