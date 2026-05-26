import type { FunctionalComponent, JSX, RefObject } from "preact";

import { useEffect, useMemo, useRef } from "preact/hooks";
import { useLocation } from "wouter-preact";

import closeIcon from "@/assets/icons/close.svg";
import { Icon } from "@/components/Icon";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Link } from "@/components/Link";
import { toggleOverlay } from "@/components/Overlay";
import { SocialLinks } from "@/components/SocialLinks";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Tooltip } from "@/components/Tooltip";
import { menuItems } from "@/config/routes";
import { useTranslate } from "@/modules/i18n";
import { useLanguage } from "@/modules/language";
import { trackEvent } from "@/modules/tracking/ga4";

let sideDrawerInputEl: RefObject<HTMLInputElement> | null = null;

export const toggleSideDrawer = (shouldShow?: boolean): void => {
  const node = sideDrawerInputEl?.current;
  if (!node) {
    return;
  }

  if (shouldShow === undefined || node.checked !== shouldShow) {
    node.click();
  }
};

const sideDrawerOnChange = (): void => {
  toggleOverlay();
  const isOpen = sideDrawerInputEl?.current?.checked;
  document.body.classList.toggle("side-drawer-open", isOpen);
};

const handleMenuClick = (trackingData: { category: string; label: string }): void => {
  trackEvent("link_click", {
    link_location: trackingData.category,
    link_name: trackingData.label,
  });
};

export const SideDrawer: FunctionalComponent = (): JSX.Element => {
  const { t } = useTranslate();
  const { lang } = useLanguage();
  const [location] = useLocation();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sideDrawerInputEl = inputRef;
    return () => {
      sideDrawerInputEl = null;
    };
  }, []);

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

  const onCloseClick = (e: Event) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return (
    <aside>
      <input
        ref={inputRef}
        id="sd-tog"
        type="checkbox"
        class="peer sr-only"
        onChange={sideDrawerOnChange}
        aria-label={t("sidedrawer_toggle")}
      />
      <div class="fixed top-0 right-0 z-40 flex h-full w-[65vw] translate-x-full flex-col overflow-y-auto rounded-tl-xl rounded-bl-xl border-b border-l border-white/50 bg-white/30 shadow-xl backdrop-blur-md transition-transform duration-300 ease-in-out peer-checked:translate-x-0 motion-reduce:transition-none sm:w-[55vw] md:w-[45vw] lg:w-[35vw] dark:border-white/10 dark:bg-zinc-900/30">
        <div class="flex items-center justify-between py-4 pr-2 pl-4 sm:pr-6 sm:pl-8">
          <div class="flex items-center gap-4">
            <LanguageSelector class="w-12.5 min-w-12.5" />
            <ToggleTheme class="p-2" />
          </div>
          <Tooltip content={t("sidedrawer_close")}>
            {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <label
              class="icon-link ml-auto"
              htmlFor="sd-tog"
              onClick={onCloseClick}
              onKeyDown={onCloseClick}
              aria-label={t("sidedrawer_close")}
            >
              <Icon src={closeIcon} ariaHidden />
            </label>
          </Tooltip>
        </div>
        <div class="flex flex-col p-4 sm:p-8">
          {items.map((item) => (
            <Link
              key={item.href}
              useRouter
              aria-current={item.isActive ? "page" : undefined}
              class="interactive mt-4 interactive-md first:mt-0"
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
        <div class="mx-auto mt-auto flex gap-2 px-4 pb-4 sm:gap-4">
          <SocialLinks />
        </div>
      </div>
    </aside>
  );
};
