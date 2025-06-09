import en from './en';
import pt from './pt';

export interface Translation {
    [key: string]: string;
}

export interface Translations {
    [key: string]: Translation;
}

export const translations: Translations = {
    en,
    pt,
};
