import { h, FunctionalComponent } from 'preact';
import { Theme, useTheme } from '@/modules/theme';
import { useTranslate } from '@/modules/i18n';
import { Icon } from '@/components/Icon';
import { isBrowser } from '@/utils/browser';
import lightModeIcon from '@/assets/icons/light_mode.svg';
import darkModeIcon from '@/assets/icons/dark_mode.svg';

const getToggleIcon = (theme: Theme): IconSrc => (theme === Theme.Dark ? lightModeIcon : darkModeIcon);

const getToggleTheme = (theme: Theme): Theme => (theme === Theme.Dark ? Theme.Light : Theme.Dark);

export const ToggleTheme: FunctionalComponent<{ classes?: string }> = ({ classes }) => {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslate();

    const handleOnClick = (): void => {
        setTheme(getToggleTheme(theme));
    };

    return isBrowser() && window.CSS && CSS.supports('color', 'var(--primary)') ? (
        <div class={`ic-link cursor-pointer select-none ${classes}`} onClick={handleOnClick}>
            <Icon
                src={getToggleIcon(theme)}
                aria-label={t('theme_toggle', { theme: t(`theme_${getToggleTheme(theme)}`) })}
                classes="fill-current"
            />
        </div>
    ) : null;
};
