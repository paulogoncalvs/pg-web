import { h, FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';
import { AppContext } from '@/app/AppContext';
import { Theme } from '@/app/theme';
import { Icon } from '@/components/Icon';
import { t } from '@/modules/i18n';
import { isBrowser } from '@/utils/browser';
import lightModeIcon from '@/assets/icons/light_mode.svg';
import darkModeIcon from '@/assets/icons/dark_mode.svg';

const getToggleIcon = (theme: Theme): IconSrc => (theme === Theme.Dark ? lightModeIcon : darkModeIcon);

const getToggleTheme = (theme: Theme): Theme => (theme === Theme.Dark ? Theme.Light : Theme.Dark);

export const ToggleTheme: FunctionalComponent<{ classes?: string }> = ({ classes }) => {
    const { theme, dispatch } = useContext(AppContext);

    const handleOnClick = (): void => {
        dispatch({
            type: 'SET_THEME',
            payload: { theme: getToggleTheme(theme) },
        });
    };

    return isBrowser() && window.CSS && CSS.supports('color', 'var(--primary)') ? (
        <div class={`cursor-pointer select-none ${classes}`} onClick={handleOnClick}>
            <Icon
                src={getToggleIcon(theme)}
                aria-label={t('theme_toggle', { theme: t(`theme_${getToggleTheme(theme)}`) })}
                classes="ic-link fill-current"
            />
        </div>
    ) : null;
};
