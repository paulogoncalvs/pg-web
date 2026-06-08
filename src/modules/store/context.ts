import { createContext } from "preact";

import type { FontSize } from "@/modules/fontSize";
import type { Language } from "@/modules/language";
import type { Theme } from "@/modules/theme";

export interface StorePayload {
  theme?: Theme;
  lang?: Language;
  url?: string;
  isOffline?: boolean;
  isSideDrawerOpen?: boolean;
  isNavigating?: boolean;
  animationsEnabled?: boolean;
  fontSize?: FontSize;
  cookiesEnabled?: boolean;
}

export interface StoreContextAction {
  type: string;
  payload: StorePayload;
}

export interface StoreContextState extends PageStore {
  dispatch(action: StoreContextAction): void;
}

export const StoreContext = createContext<StoreContextState>({} as StoreContextState);
