/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'preact/hooks';
import { AppContext } from '@/app/AppContext';
import { Language } from '@/app/language';
import translations from './translations';

interface TranslationParams {
    [key: string]: string;
}

const getTranslation = (lang: Language, key: string, params?: TranslationParams): string => {
    let translation = (translations[lang] && translations[lang][key]) || key;

    if (params) {
        Object.keys(params).forEach((key) => {
            translation = translation.replace(`%${key}%`, params[key]);
        });
    }

    return translation;
};

export const getTranslate =
    (lang = Language.en) =>
    (key: string, params?: TranslationParams): string =>
        getTranslation(lang, key, params);

export const t = (key: string, params?: TranslationParams): string => {
    const { lang } = useContext(AppContext);

    return getTranslation(lang, key, params);
};

export { translations };
