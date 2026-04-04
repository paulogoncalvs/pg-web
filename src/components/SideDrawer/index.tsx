import type { FunctionalComponent, RefObject } from "preact";
import { useRef } from "preact/hooks";
import { useLocation } from "wouter-preact";

import closeIcon from "@/assets/icons/close.svg";
import { Icon } from "@/components/Icon";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Link } from "@/components/Link";
import { toggleOverlay } from "@/components/Overlay";
import { SocialLinks } from "@/components/SocialLinks";
import { ToggleTheme } from "@/components/ToggleTheme";
import { useTranslate } from "@/modules/i18n";
import { useLanguage } from "@/modules/language";
import { trackEvent } from "@/modules/tracking/ga4";

let sideDrawerInputEl: RefObject<HTMLInputElement> | null;

const sideDrawerOnChange = (): void => {
  toggleOverlay();
};

const menuItemOnClick = (trackingData: { category: string; label: string }): void => {
  trackEvent("link_click", {
    link_location: trackingData.category,
    link_name: trackingData.label,
  });
};

export const toggleSideDrawer = (shouldShow?: boolean | undefined): void => {
  const node = sideDrawerInputEl?.current; // DOM Ref

  if (
    node &&
    (typeof shouldShow === "undefined" ||
      (typeof shouldShow === "boolean" &&
        ((shouldShow === false && node.checked) || (shouldShow === true && !node.checked))))
  ) {
    node.click();
  }
};

export const SideDrawer: FunctionalComponent = () => {
  const { t } = useTranslate();
  const { lang } = useLanguage();
  const [location] = useLocation();
  sideDrawerInputEl = useRef<HTMLInputElement>(null);

  return (
    <aside>
      <input
        class="peer sr-only"
        type="checkbox"
        id="sd-tog"
        onChange={sideDrawerOnChange}
        ref={sideDrawerInputEl}
        aria-label={t("sidedrawer_toggle")}
      />
      <div class="fixed top-0 right-0 z-40 flex h-full w-[65vw] translate-x-full flex-col overflow-y-auto rounded-tl-xl rounded-bl-xl border-white/50 border-b border-l bg-white/30 shadow-xl backdrop-blur-md transition-transform duration-300 ease-in-out peer-checked:translate-x-0 sm:w-[55vw] md:w-[45vw] lg:w-[35vw] dark:border-white/10 dark:bg-zinc-900/30">
        <div class="flex items-center justify-between py-4 pl-4 pr-2 sm:pl-8 sm:pr-6">
          <div class="flex items-center gap-4">
            <LanguageSelector classes="w-[50px] min-w-[50px]" />
            <ToggleTheme classes="p-2" />
          </div>
          <label class="icon-link ml-auto" onClick={() => sideDrawerInputEl?.current?.click()}>
            <Icon src={closeIcon} ariaHidden />
          </label>
        </div>
        <div class="flex flex-col p-4 sm:p-8">
          <Link
            useRouter
            aria-current={location === `/${lang}/` || location === `/` ? "page" : undefined}
            class="interactive interactive-md"
            href={`/${lang}/`}
            onClick={(): void =>
              menuItemOnClick({
                category: "SideDrawer Menu Link",
                label: "Home",
              })
            }
          >
            {t("sidedrawer_menu_link_home")}
          </Link>
          <Link
            useRouter
            aria-current={location === `/${lang}/contact/` ? "page" : undefined}
            class="interactive interactive-md mt-4"
            href={`/${lang}/contact/`}
            onClick={(): void =>
              menuItemOnClick({
                category: "SideDrawer Menu Link",
                label: "Contact",
              })
            }
          >
            {t("sidedrawer_menu_link_contact")}
          </Link>
        </div>
        <div class="mx-auto mt-auto flex px-4 pb-4 gap-2 sm:gap-4">
          <SocialLinks />
        </div>
      </div>
    </aside>
  );
};
