import type { FunctionalComponent } from "preact";

import { useCallback, useEffect, useId, useRef, useState } from "preact/hooks";

import enIcon from "@/assets/icons/lang_en.svg";
import ptIcon from "@/assets/icons/lang_pt.svg";
import { Icon } from "@/components/Icon";
import { Tooltip } from "@/components/Tooltip";
import { getAvailableLanguages, useTranslate } from "@/modules/i18n";
import { LANGUAGE_DEFAULT, type Language } from "@/modules/language";
import { useRouterLocation, useRouterRoute } from "@/modules/router";
import { classNames } from "@/utils/classNames";

interface LanguageSelectorProps {
  class?: string;
}

const langIcons: Record<string, IconSrc> = {
  en: enIcon,
  pt: ptIcon,
};

export const LanguageSelector: FunctionalComponent<LanguageSelectorProps> = ({
  class: classes,
}) => {
  const [, setLocation] = useRouterLocation();
  const { t, l } = useTranslate();
  const [, params] = useRouterRoute(/^\/(?<langParam>[a-zA-Z]{2})(\/.*)?$/);
  const checkboxId = useId();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const switchLanguage = useCallback(
    (code: Language): void => {
      const base = code === LANGUAGE_DEFAULT ? "" : `/${code}`;

      if (!params) {
        setLocation(`${base}${window.location.pathname}`);
        return;
      }
      setLocation(`${base}${params?.["1"] ? `${params["1"]}` : ""}`);
      setOpen(false);
    },
    [setLocation, params],
  );

  return (
    <div ref={containerRef} class={classNames("relative inline-block text-[0px]", classes)}>
      <input
        type="checkbox"
        id={checkboxId}
        class="peer hidden"
        checked={open}
        onChange={() => setOpen(!open)}
        aria-label={t("language_selection")}
      />
      <Tooltip
        content={t("language_selection")}
        hideOnOutsideClick
        forcedHide={open}
        class="left-full"
      >
        <label
          htmlFor={checkboxId}
          class="cursor-pointer p-2.5"
          aria-label={t("language_selection")}
        >
          <span class="block overflow-hidden rounded-full">
            <Icon src={langIcons[l]} width="20" height="20" />
          </span>
        </label>
      </Tooltip>
      <div
        class={classNames(
          "absolute top-full left-0 z-50 mt-1 min-w-full overflow-hidden rounded-md border border-white/50 bg-white/80 shadow-lg backdrop-blur-md transition-opacity duration-150 dark:border-white/15 dark:bg-zinc-800/80",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-label={t("language_selection")}
      >
        {getAvailableLanguages().map((code: Language) => (
          <button
            key={code}
            type="button"
            role="option"
            aria-selected={code === l}
            onClick={() => switchLanguage(code)}
            class={classNames(
              "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-xs font-medium",
              code === l
                ? "bg-zinc-200 dark:bg-zinc-700"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-700",
            )}
          >
            <span class="overflow-hidden rounded-full">
              <Icon src={langIcons[code]} width="18" height="18" />
            </span>
            <span>{t(`language_${code}`)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
