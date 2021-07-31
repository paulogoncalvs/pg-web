import { isBrowser } from '@/utils/browser';
import { useTheme } from '@/app/theme/useTheme';

export enum Theme {
    Dark = 'dark',
    Light = 'light',
}

export const THEME_DEFAULT = Theme.Dark;

export const COLOR_SCHEME_QUERY = `(prefers-color-scheme: ${THEME_DEFAULT})`;

export const getPrefersScheme = (defaultTheme: Theme = THEME_DEFAULT): Theme => {
    if (isBrowser()) {
        return window.matchMedia(COLOR_SCHEME_QUERY).matches ? Theme.Dark : Theme.Light;
    }

    return defaultTheme;
};

export const getInitialTheme = (defaultTheme: Theme = THEME_DEFAULT): Theme => {
    if (isBrowser() && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('color-theme') as Theme;
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        }

        getPrefersScheme(defaultTheme);
    }

    return defaultTheme;
};

export const rawSetTheme = (theme: Theme): void => {
    if (!isBrowser()) {
        return;
    }

    const root = window.document.documentElement;

    root.classList.remove(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    root.classList.add(theme);

    localStorage.setItem('color-theme', theme);
};

export { useTheme };
