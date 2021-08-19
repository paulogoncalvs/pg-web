import { useEffect } from 'preact/hooks';
import { StoreContextAction } from '@/store';
import { rawSetTheme, Theme, getPrefersScheme, COLOR_SCHEME_QUERY } from '@/modules/theme';

export const useStoreTheme = (theme: Theme, dispatch: (action: StoreContextAction) => void): void => {
    useEffect(() => {
        const handler = (): void => {
            dispatch({
                type: 'SET_THEME',
                payload: { theme: getPrefersScheme() },
            });
        };
        const matchMedia = window.matchMedia(COLOR_SCHEME_QUERY);

        matchMedia.addEventListener('change', handler);

        return (): void => {
            matchMedia.removeEventListener('change', handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        rawSetTheme(theme);
    }, [theme]);
};
