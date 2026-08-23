import type { FunctionalComponent } from "preact";

import { useContext } from "preact/hooks";

import burgerIcon from "@/assets/icons/burger.svg";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { SocialLinks } from "@/components/SocialLinks";
import routesConfig from "@/config/routes";
import { useTranslate } from "@/modules/i18n";
import { StoreContext } from "@/modules/store";

interface LogoProps {
  class?: string;
}

const Logo: FunctionalComponent<LogoProps> = ({ class: cls }) => (
  <svg viewBox="0 0 512 512" class={cls} aria-hidden="true" focusable="false">
    <rect width="512" height="512" fill="#ccc" rx="100" ry="100" />
    <path
      fill="#111"
      d="M153 449h36v-40h12c49 0 78-25 78-67s-29-68-78-68h-48zm36-72v-71h11c29 0 42 12 42 36s-13 35-42 35zm191 74c31 0 57-12 67-20v-76h-75v32h42v26c-9 4-23 6-34 6-37 0-58-25-58-57 0-33 20-58 52-58 20 0 30 7 39 16l24-24q-21-24-63-24c-53 0-89 38-89 90 0 51 37 89 95 89"
    />
  </svg>
);

export const Header: FunctionalComponent = () => {
  const { url, dispatch } = useContext(StoreContext);
  const { t } = useTranslate();
  const isHome = routesConfig[url || "/"]?.templateParameters?.View === "Home";

  const onBurgerClick = (event: Event): void => {
    event.preventDefault();
    dispatch({ type: "SET_SIDE_DRAWER", payload: { isSideDrawerOpen: true } });
  };

  return (
    <header class="sticky top-0 z-10 rounded-b-xl border-t-0 border-b border-white/80 bg-white/35 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-zinc-900/35">
      <div class="flex items-center justify-between p-4">
        <div class="flex flex-wrap items-center gap-2">
          {!isHome && (
            <Link useRouter href="/" class="group flex items-center gap-4">
              <Logo class="size-9 logo-image" />
              <div class="text-lg leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] dark:drop-shadow-[0_1px_0_rgba(0,0,0,0.7)]">
                <div class="font-bold">{t("home_page_title")}</div>
                <span class="text-sm text-stone-800 lowercase dark:text-zinc-400">
                  {t("home_page_subtitle")}
                </span>
              </div>
            </Link>
          )}
          {isHome && (
            <>
              <Logo class="mr-4 size-9 logo-image-static" />
              <SocialLinks />
            </>
          )}
        </div>
        <div class="flex justify-end">
          {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <label
            htmlFor="sd-tog"
            class="icon-link"
            onKeyDown={onBurgerClick}
            onClick={onBurgerClick}
            aria-label={t("sidedrawer_toggle")}
          >
            <Icon src={burgerIcon} ariaHidden />
          </label>
        </div>
      </div>
    </header>
  );
};
