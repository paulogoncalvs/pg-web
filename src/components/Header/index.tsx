import type { FunctionalComponent } from "preact";

import { useContext } from "preact/hooks";

import burgerIcon from "@/assets/icons/burger.svg";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { SocialLinks } from "@/components/SocialLinks";
import routesConfig from "@/config/routes";
import { useTranslate } from "@/modules/i18n";
import { StoreContext } from "@/modules/store";

export const Header: FunctionalComponent = () => {
  const { url, dispatch } = useContext(StoreContext);
  const { t } = useTranslate();
  const isHome = routesConfig[url || "/"]?.templateParameters?.View === "Home";

  const onBurgerClick = (event: Event): void => {
    event.preventDefault();
    dispatch({ type: "SET_SIDE_DRAWER", payload: { isSideDrawerOpen: true } });
  };

  return (
    <header class="sticky top-0 z-10 rounded-br-xl rounded-bl-xl border-t-0 border-b border-white/80 bg-white/10 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-zinc-900/15">
      <div class="flex items-center justify-between p-4">
        <div class="flex flex-wrap items-center gap-2 sm:gap-4">
          {!isHome && (
            <Link useRouter href="/" class="px-3 py-2 text-xl font-bold tracking-tight">
              {t("home_page_title")}
            </Link>
          )}
          {isHome && <SocialLinks />}
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
