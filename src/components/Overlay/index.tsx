import type { FunctionalComponent, JSX } from "preact";

import { useEffect, useRef, useState } from "preact/hooks";

import { toggleSideDrawer } from "@/components/SideDrawer";

let setVisible: ((v: boolean | ((prev: boolean) => boolean)) => void) | null = null;

export const toggleOverlay = (shouldShow?: boolean): void => {
  if (!setVisible) {
    return;
  }

  setVisible((prev) => (typeof shouldShow === "boolean" ? shouldShow : !prev));
};

const overlayOnClick = (): void => {
  toggleSideDrawer(false);
};

export const Overlay: FunctionalComponent = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, _setVisible] = useState(false);

  useEffect(() => {
    setVisible = _setVisible;

    return () => {
      setVisible = null;
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", visible);
  }, [visible]);

  return (
    <div
      ref={ref}
      onClick={overlayOnClick}
      aria-hidden="true"
      class={[
        "fixed inset-0 z-10",
        "bg-white/40 dark:bg-zinc-900/60",

        // blur (modern browsers)
        "backdrop-blur-xs supports-backdrop-filter:backdrop-blur-xs",

        // animation
        "transition-opacity duration-300 ease-out",

        // performance hints
        "will-change-[opacity]",

        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    />
  );
};
