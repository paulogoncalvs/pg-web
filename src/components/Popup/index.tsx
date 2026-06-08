import type { FunctionalComponent, JSX } from "preact";

import { useCallback, useEffect, useRef, useState } from "preact/hooks";

import closeIcon from "@/assets/icons/close.svg";
import { Icon } from "@/components/Icon";
import { Overlay } from "@/components/Overlay";
import { useTranslate } from "@/modules/i18n";

interface PopupProps {
  title?: string;
  id: string;
  closeOnOverlayClick?: boolean;
  children: JSX.Element | string;
}

export const Popup: FunctionalComponent<PopupProps> = ({
  title,
  id,
  closeOnOverlayClick = true,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslate();

  const close = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.checked = false;
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) {
      return;
    }
    const onChange = () => setIsOpen(el.checked);
    setIsOpen(el.checked);
    el.addEventListener("change", onChange);
    return () => el.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  return (
    <div>
      <input
        ref={inputRef}
        id={`popup-tog-${id}`}
        type="checkbox"
        class="peer sr-only"
        tabIndex={-1}
        aria-label={t("popup_toggle")}
      />
      <Overlay isOpen={isOpen} onClose={closeOnOverlayClick ? close : undefined} />
      {/* oxlint-disable jsx-a11y/prefer-tag-over-role */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `dialog-title-${id}` : undefined}
        class="pointer-events-none invisible fixed right-0 bottom-0 left-0 z-50 w-full rounded-t-xl border border-white bg-white/30 px-6 pt-4 pb-8 shadow-xl backdrop-blur-md transition-all duration-300 ease-out peer-checked:pointer-events-auto peer-checked:visible motion-reduce:transition-none max-sm:translate-y-full max-sm:peer-checked:translate-y-0 sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:pt-6 sm:pb-6 sm:opacity-0 sm:peer-checked:opacity-100 dark:border-white/10 dark:bg-zinc-900/30 dark:text-white"
      >
        <div class="mb-2 flex justify-center sm:hidden">
          <div class="h-1.5 w-10 rounded-full bg-black/20 dark:bg-white/20" />
        </div>
        <div class="flex items-center justify-between">
          {title ? (
            <h2 id={`dialog-title-${id}`} class="text-lg font-bold">
              {title}
            </h2>
          ) : (
            <div />
          )}
          <label
            htmlFor={`popup-tog-${id}`}
            class="icon-link -mt-2 -mr-2 cursor-pointer p-2"
            aria-label={t("popup_close")}
          >
            <span class="pointer-events-none flex">
              <Icon src={closeIcon} ariaHidden />
            </span>
          </label>
        </div>
        <div class="mt-4">{children}</div>
      </div>
      {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
    </div>
  );
};
