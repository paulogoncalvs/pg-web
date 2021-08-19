import { useEffect } from 'preact/hooks';
import { rawSetLanguage, Language } from '@/modules/language';

export const useStoreLanguage = (lang: Language): void => {
    useEffect(() => {
        rawSetLanguage(lang);
    }, [lang]);
};
