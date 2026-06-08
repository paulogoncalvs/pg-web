import type { FunctionalComponent, JSX } from "preact";

import { useCallback } from "preact/hooks";

import { getAvailableLanguages, useTranslate } from "@/modules/i18n";
import { LANGUAGE_DEFAULT, type Language } from "@/modules/language";
import { useRouterLocation, useRouterRoute } from "@/modules/router";
import { classNames } from "@/utils/classNames";

interface LanguageSelectorProps {
  class?: string;
}

export const LanguageSelector: FunctionalComponent<LanguageSelectorProps> = ({
  class: classes,
}) => {
  const [, setLocation] = useRouterLocation();
  const { t, l } = useTranslate();
  const [, params] = useRouterRoute(/^\/(?<langParam>[a-zA-Z]{2})(\/.*)?$/);

  const onLanguageSelect = useCallback(
    (event: Event): void => {
      const value = (event.target as HTMLSelectElement).value as Language | "";
      const base = value === LANGUAGE_DEFAULT ? "" : `/${value}`;

      if (!params) {
        setLocation(`${base}${window.location.pathname}`);
        return;
      }
      setLocation(`${base}${params?.["1"] ? `${params["1"]}` : ""}`);
    },
    [setLocation, params],
  );

  const renderOption = useCallback(
    (code: Language): JSX.Element => (
      <option value={code} selected={code === l}>
        {t(`language_${code}`)}
      </option>
    ),
    [l, t],
  );

  return (
    <select
      key={`lang-${l}`}
      class={classNames(classes, "overflow-hidden text-ellipsis")}
      id="language-selector"
      onChange={onLanguageSelect}
      aria-label={t("language_selection")}
    >
      {getAvailableLanguages().map((lang: Language) => renderOption(lang))}
    </select>
  );
};
