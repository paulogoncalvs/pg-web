import type { FunctionalComponent, JSX, RefObject } from "preact";
import { useRef } from "preact/hooks";

import { toggleSideDrawer } from "@/components/SideDrawer";

let overlayEl: RefObject<HTMLDivElement> | null;
let show = false;

export const toggleOverlay = (shouldShow?: boolean | undefined): void => {
  const node = overlayEl?.current; // DOM Ref

  if (!node) {
    return;
  }

  show = typeof shouldShow === "boolean" ? shouldShow : !show;

  if (!show) {
    setTimeout(() => {
      node.classList.add("hidden");
    }, 200);
  }
  node.classList.add(...(show ? ["animate-fade-in"] : ["animate-fade-out"]));
  node.classList.remove(...(show ? ["hidden", "animate-fade-out"] : ["animate-fade-in"]));
  node.setAttribute("aria-hidden", show.toString());
  document.body.classList.toggle("overflow-hidden", show);
};

const overlayOnClick = (): void => {
  toggleSideDrawer(false);
};

export const Overlay: FunctionalComponent = (): JSX.Element => {
  overlayEl = useRef(null);

  return (
    <div
      ref={overlayEl}
      class="fixed inset-0 z-10 hidden transform overflow-hidden bg-white/40 opacity-0 transition-transform duration-700 ease-in-out dark:bg-zinc-900/60"
      onClick={overlayOnClick}
      aria-hidden={Boolean(show)}
    />
  );
};
