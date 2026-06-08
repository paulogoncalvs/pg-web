import type { FunctionalComponent, JSX } from "preact";

import { useCallback, useContext, useMemo } from "preact/hooks";
import { useLocation } from "wouter-preact";

import closeIcon from "@/assets/icons/close.svg";
import { Collapsible } from "@/components/Collapsible";
import { Icon } from "@/components/Icon";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Link } from "@/components/Link";
import { SocialLinks } from "@/components/SocialLinks";
import { Switch } from "@/components/Switch";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Tooltip } from "@/components/Tooltip";
import { menuItems } from "@/config/routes";
import { setCookieConsent } from "@/modules/cookieConsent";
import { FontSize } from "@/modules/fontSize";
import { useTranslate } from "@/modules/i18n";
import { useLanguage } from "@/modules/language";
import { StoreContext } from "@/modules/store";
import { trackEvent } from "@/modules/tracking/ga4";

const handleMenuClick = (trackingData: { category: string; label: string }): void => {
  trackEvent("link_click", {
    link_location: trackingData.category,
    link_name: trackingData.label,
  });
};

export const SideDrawer: FunctionalComponent = (): JSX.Element => {
  const {
    isSideDrawerOpen,
    animationsEnabled = false,
    fontSize,
    cookiesEnabled = false,
    dispatch,
  } = useContext(StoreContext);
  const { t } = useTranslate();
  const { lang } = useLanguage();
  const [location] = useLocation();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch({ type: "SET_SIDE_DRAWER", payload: { isSideDrawerOpen: false } });
        return;
      }
      if (e.key !== "Tab" || !isSideDrawerOpen) {
        return;
      }

      const nav = document.querySelector<HTMLElement>("nav[aria-label]");
      if (!nav) {
        return;
      }
      const focusable = nav.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="checkbox"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [dispatch, isSideDrawerOpen],
  );

  const items = useMemo(() => {
    return Object.keys(menuItems).map((item) => {
      const href = item;

      const isActive = location.startsWith(`/${lang}`)
        ? location === `/${lang}${item}`
        : location === item;

      return {
        href,
        labelKey: menuItems[item].labelKey,
        isActive,
      };
    });
  }, [lang, location]);

  return (
    <nav aria-label={t("sidedrawer_toggle")}>
      <input
        id="sd-tog"
        type="checkbox"
        checked={Boolean(isSideDrawerOpen)}
        class="peer sr-only"
        onKeyDown={handleKeyDown}
        aria-label={t("sidedrawer_toggle")}
      />
      <div class="fixed top-0 right-0 z-40 flex h-full w-[65vw] translate-x-full flex-col overflow-y-auto rounded-tl-xl rounded-bl-xl border-b border-l border-white/50 bg-white/30 shadow-xl backdrop-blur-md transition-transform duration-300 ease-in-out will-change-transform peer-checked:translate-x-0 motion-reduce:transition-none sm:w-[55vw] md:w-[45vw] lg:w-[35vw] dark:border-white/10 dark:bg-zinc-900/30">
        <div class="flex items-center justify-between py-4 pr-4 pl-6">
          <div class="flex items-center gap-4">
            <LanguageSelector class="w-12.5 min-w-12.5" />
            <ToggleTheme class="p-2" />
          </div>
          <Tooltip content={t("sidedrawer_close")}>
            {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <label
              class="icon-link"
              htmlFor="sd-tog"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: "SET_SIDE_DRAWER", payload: { isSideDrawerOpen: false } });
              }}
              onKeyDown={(e) => {
                e.preventDefault();
                dispatch({ type: "SET_SIDE_DRAWER", payload: { isSideDrawerOpen: false } });
              }}
              aria-label={t("sidedrawer_close")}
            >
              <Icon src={closeIcon} ariaHidden />
            </label>
          </Tooltip>
        </div>
        <div class="flex flex-col border-t border-white/80 p-6 dark:border-white/10">
          {items.map((item) => (
            <Link
              key={item.href}
              useRouter
              aria-current={item.isActive ? "page" : undefined}
              class="interactive-solid mt-4 interactive-md first:mt-0"
              href={item.href}
              onClick={() =>
                handleMenuClick({
                  category: "SideDrawer Menu Link",
                  label: item.labelKey,
                })
              }
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>
        <div class="mx-auto mt-auto flex w-full flex-col">
          <div class="border-t border-b border-white/80 dark:border-white/10">
            <Collapsible
              title={t("sidedrawer_settings")}
              summaryClass="p-6"
              contentClass="px-6 pb-6"
            >
              <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between text-sm">
                  <span>{t("sidedrawer_font_size")}</span>
                  <div class="flex divide-x divide-zinc-300 overflow-hidden rounded-md border border-zinc-300 shadow-sm dark:divide-zinc-600 dark:border-zinc-600">
                    <label class="cursor-pointer">
                      <input
                        type="radio"
                        name="font-size"
                        class="peer sr-only"
                        checked={fontSize === FontSize.Normal}
                        aria-label={t("sidedrawer_font_size_normal")}
                        onChange={() =>
                          dispatch({
                            type: "SET_FONT_SIZE",
                            payload: { fontSize: FontSize.Normal },
                          })
                        }
                      />
                      <span class="block px-3 py-1 text-xs leading-none font-medium text-zinc-500 transition-colors peer-checked:bg-zinc-900 peer-checked:text-white peer-focus-visible:bg-zinc-900 peer-focus-visible:text-white peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-2 peer-focus-visible:outline-zinc-400 hover:bg-zinc-900 hover:text-white dark:text-zinc-400 dark:peer-checked:bg-white dark:peer-checked:text-zinc-900 dark:peer-focus-visible:bg-white dark:peer-focus-visible:text-zinc-900 dark:peer-focus-visible:outline-zinc-500 dark:hover:bg-white dark:hover:text-zinc-900">
                        A
                      </span>
                    </label>
                    <label class="cursor-pointer">
                      <input
                        type="radio"
                        name="font-size"
                        class="peer sr-only"
                        checked={fontSize === FontSize.Large}
                        aria-label={t("sidedrawer_font_size_large")}
                        onChange={() =>
                          dispatch({ type: "SET_FONT_SIZE", payload: { fontSize: FontSize.Large } })
                        }
                      />
                      <span class="block px-3 py-1 text-xs leading-none font-medium text-zinc-500 transition-colors peer-checked:bg-zinc-900 peer-checked:text-white peer-focus-visible:bg-zinc-900 peer-focus-visible:text-white peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-2 peer-focus-visible:outline-zinc-400 hover:bg-zinc-900 hover:text-white dark:text-zinc-400 dark:peer-checked:bg-white dark:peer-checked:text-zinc-900 dark:peer-focus-visible:bg-white dark:peer-focus-visible:text-zinc-900 dark:peer-focus-visible:outline-zinc-500 dark:hover:bg-white dark:hover:text-zinc-900">
                        A+
                      </span>
                    </label>
                  </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span>{t("sidedrawer_animations")}</span>
                  <Switch
                    checked={animationsEnabled}
                    onChange={(v) =>
                      dispatch({ type: "SET_ANIMATIONS", payload: { animationsEnabled: v } })
                    }
                    label={t("sidedrawer_animations")}
                  />
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span>{t("sidedrawer_cookies")}</span>
                  <Switch
                    checked={cookiesEnabled}
                    onChange={(v) => {
                      setCookieConsent(v ? "granted" : "denied");
                      dispatch({ type: "SET_COOKIES", payload: { cookiesEnabled: v } });
                    }}
                    label={t("sidedrawer_cookies")}
                  />
                </div>
              </div>
            </Collapsible>
          </div>
          <div class="flex justify-center gap-2 px-4 py-2 sm:gap-4">
            <SocialLinks />
          </div>
        </div>
      </div>
    </nav>
  );
};
