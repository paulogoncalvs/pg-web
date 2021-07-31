import { useEffect } from 'preact/hooks';
import { AppContextAction } from '@/app/AppContext';
import { rawSetTheme, Theme, getPrefersScheme, COLOR_SCHEME_QUERY } from '@/app/theme';

export const useTheme = (theme: Theme, dispatch: (action: AppContextAction) => void): void => {
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
