/* oxlint-disable jsx-a11y/prefer-tag-over-role */
import type { FunctionalComponent, JSX } from "preact";

import { useContext, useEffect } from "preact/hooks";

import { Spinner } from "@/components/Spinner";
import { useTranslate } from "@/modules/i18n";
import { StoreContext } from "@/modules/store";
import { classNames } from "@/utils/classNames";

interface OverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: JSX.Element;
  className?: string;
}

export const Overlay: FunctionalComponent<OverlayProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  useEffect(() => {
    document.body.classList.toggle("show-overlay", isOpen);
  }, [isOpen]);

  return (
    <div
      role="presentation"
      tabIndex={-1}
      class={classNames(
        "fixed inset-0 z-30 flex items-center justify-center",
        "bg-white/60 dark:bg-zinc-900/70",
        "transition-opacity duration-300 will-change-[opacity] motion-reduce:transition-none",
        "backdrop-blur-sm",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
      onClick={onClose}
    >
      {children}
    </div>
  );
};

export const OverlayWithStore: FunctionalComponent = () => {
  const { isSideDrawerOpen, isNavigating, dispatch } = useContext(StoreContext);
  const { t } = useTranslate();

  const closeDrawer = () => {
    if (isNavigating) {
      return;
    }
    dispatch({ type: "SET_SIDE_DRAWER", payload: { isSideDrawerOpen: false } });
  };

  return (
    <Overlay isOpen={Boolean(isSideDrawerOpen || isNavigating)} onClose={closeDrawer}>
      {isNavigating ? (
        <div class="flex flex-col items-center gap-3">
          <Spinner class="size-8" />
          <p role="status" class="text-sm text-zinc-700 dark:text-zinc-200">
            {t("loading_content")}
          </p>
        </div>
      ) : undefined}
    </Overlay>
  );
};
