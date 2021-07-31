import { useEffect } from 'preact/hooks';
import { rawSetLanguage, Language } from '@/app/language';

export const useLanguage = (lang: Language): void => {
    useEffect(() => {
        rawSetLanguage(lang);
    }, [lang]);
};
