import { h, FunctionalComponent } from 'preact';
import { useCallback } from 'preact/hooks';
import classNames from 'classnames';
import { Theme, useTheme } from '@/modules/theme';
import { useTranslate } from '@/modules/i18n';
import { Icon } from '@/components/Icon';
import { trackEvent } from '@/modules/tracking';
import { isBrowser } from '@/utils/browser';
import lightModeIcon from '@/assets/icons/light_mode.svg';
import darkModeIcon from '@/assets/icons/dark_mode.svg';

interface ToggleThemeComponentProps {
    classes?: string;
}

const getToggleIcon = (theme: Theme): IconSrc => (theme === Theme.Dark ? lightModeIcon : darkModeIcon);

const getToggleTheme = (theme: Theme): Theme => (theme === Theme.Dark ? Theme.Light : Theme.Dark);

export const ToggleTheme: FunctionalComponent<ToggleThemeComponentProps> = ({ classes }) => {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslate();

    const handleOnClick = useCallback((): void => {
        setTheme(getToggleTheme(theme));
        trackEvent({ eventCategory: 'Theme', eventAction: 'toggleTheme', eventLabel: getToggleTheme(theme) });
    }, [setTheme, theme]);

    return isBrowser() && window.CSS && CSS.supports('color', 'var(--primary)') ? (
        <button
            class={classNames('ic-link _hdr', classes)}
            onClick={handleOnClick}
            aria-label={t('theme_toggle', { theme: t(`theme_${getToggleTheme(theme)}`) })}
        >
            <Icon src={getToggleIcon(theme)} ariaHidden />
        </button>
    ) : null;
};
