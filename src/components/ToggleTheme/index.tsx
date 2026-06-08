import type { FunctionalComponent } from "preact";

import { useCallback, useState } from "preact/hooks";

import darkModeIcon from "@/assets/icons/dark_mode.svg";
import lightModeIcon from "@/assets/icons/light_mode.svg";
import { Icon } from "@/components/Icon";
import { Tooltip } from "@/components/Tooltip";
import { useTranslate } from "@/modules/i18n";
import { Theme, useTheme } from "@/modules/theme";
import { trackEvent } from "@/modules/tracking/ga4";
import { classNames } from "@/utils/classNames";

interface ToggleThemeComponentProps {
  class?: string;
}

const getToggleIcon = (theme: Theme): IconSrc =>
  theme === Theme.Dark ? lightModeIcon : darkModeIcon;

const getToggleTheme = (theme: Theme): Theme => (theme === Theme.Dark ? Theme.Light : Theme.Dark);

export const ToggleTheme: FunctionalComponent<ToggleThemeComponentProps> = ({
  class: classes = "",
}) => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslate();
  const [animating, setAnimating] = useState(false);

  const handleOnClick = useCallback((): void => {
    setAnimating(true);
    setTheme(getToggleTheme(theme));
    trackEvent("theme_toggle", {
      theme_name: getToggleTheme(theme),
    });
  }, [setTheme, theme]);

  const handleAnimationEnd = useCallback((): void => {
    setAnimating(false);
  }, []);

  const themeLabel = t(`theme_${getToggleTheme(theme)}`);

  return (
    <Tooltip content={t("theme_toggle", { theme: themeLabel })} class="capitalize" position="top">
      <button
        type="button"
        onClick={handleOnClick}
        class={classNames("icon-link sup-novar", classes)}
        aria-label={t("theme_toggle", { theme: themeLabel })}
      >
        <Icon
          src={getToggleIcon(theme)}
          ariaHidden
          class={animating ? "animate-theme-toggle fill-current" : undefined}
          onAnimationEnd={handleAnimationEnd}
        />
      </button>
    </Tooltip>
  );
};
