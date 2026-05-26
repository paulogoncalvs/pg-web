import type { ComponentType } from "preact";

import { useContext } from "preact/hooks";

import { StoreContext } from "@/modules/store";

export const usePreloadedMDX = (): { slug: string; Component: ComponentType } | undefined => {
  const store = useContext(StoreContext);
  return store.preloadedMDX as { slug: string; Component: ComponentType } | undefined;
};
