import type { FunctionalComponent, JSX } from "preact";
import { useCallback } from "preact/hooks";

import { translations, useTranslate } from "@/modules/i18n";
import type { Language } from "@/modules/language";
import { useRouterLocation, useRouterRoute } from "@/modules/router";

interface LanguageSelectorProps {
  classes?: string;
}

export const LanguageSelector: FunctionalComponent<LanguageSelectorProps> = ({ classes }) => {
  const [, setLocation] = useRouterLocation();
  const { t, lang } = useTranslate();
  const [, , params] = useRouterRoute("/:lang/*");

  const onLanguageSelect = useCallback(
    (event: Event): void => {
      const value = (event.target as HTMLInputElement).value as Language;

      setLocation(`/${value}/${params?.["*"] ? `${params["*"]}` : ""}`);
    },
    [setLocation, params],
  );

  const renderOption = useCallback(
    (code: Language): JSX.Element => (
      <option value={code} selected={code === lang}>
        {t(`language_${code}`)}
      </option>
    ),
    [lang, t],
  );

  return (
    <select
      key={`lang-${lang}`}
      class={classes}
      id="language-selector"
      onChange={onLanguageSelect}
      aria-label={t("language_selection")}
    >
      {(Object.keys(translations) as Language[]).map((lang: Language) => renderOption(lang))}
    </select>
  );
};

export default LanguageSelector;
