import type { FunctionalComponent, JSX } from "preact";

import { useContext } from "preact/hooks";

import { useTranslate } from "@/modules/i18n";
import { StoreContext } from "@/modules/store";
import { classNames } from "@/utils/classNames";

export const Overlay: FunctionalComponent = (): JSX.Element => {
  const { isSideDrawerOpen, dispatch } = useContext(StoreContext);
  const { t } = useTranslate();

  const closeDrawer = (): void => {
    dispatch({ type: "SET_SIDE_DRAWER", payload: { isSideDrawerOpen: false } });
  };

  return (
    <button
      type="button"
      disabled={!isSideDrawerOpen}
      onClick={closeDrawer}
      aria-hidden={isSideDrawerOpen ? undefined : "true"}
      aria-label={isSideDrawerOpen ? t("sidedrawer_close") : undefined}
      class={classNames(
        "fixed inset-0 z-10",
        "bg-white/40 dark:bg-zinc-900/60",
        "backdrop-blur-xs supports-backdrop-filter:backdrop-blur-xs",
        "transition-opacity duration-300 ease-out",
        isSideDrawerOpen ? "opacity-100 will-change-[opacity]" : "pointer-events-none opacity-0",
      )}
    />
  );
};
