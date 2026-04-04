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
  const { url, lang } = useContext(StoreContext);
  const { t } = useTranslate();
  const isHome = routesConfig[url || "/"]?.templateParameters?.View === "Home";

  return (
    <header class="sticky top-0 z-10 rounded-br-xl rounded-bl-xl border-white/80 border-t-0 border-b bg-white/10 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-zinc-900/15">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-2 sm:gap-4 flex-wrap">
          {!isHome && (
            <Link useRouter href={`/${lang}/`} class="font-bold text-xl tracking-tight py-2 px-4">
              {t("home_page_title")}
            </Link>
          )}
          {isHome && <SocialLinks />}
        </div>
        <div class="flex justify-end">
          <label htmlFor="sd-tog" class="icon-link">
            <Icon src={burgerIcon} ariaHidden />
          </label>
        </div>
      </div>
    </header>
  );
};
