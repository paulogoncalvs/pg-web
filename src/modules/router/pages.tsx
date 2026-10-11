import type { ComponentType, JSX } from "preact";

import { useContext, useState, useEffect } from "preact/hooks";

import { Spinner } from "@/components/Spinner";
import routesConfig from "@/config/routes";
import { useTranslate } from "@/modules/i18n";
import { StoreContext } from "@/modules/store/context";

const loaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  Home: () => import("@/pages/Home"),
  Blog: () => import("@/pages/Blog"),
  BlogPost: () => import("@/pages/Blog"),
  Contact: () => import("@/pages/Contact"),
  NotFound: () => import("@/pages/NotFound"),
  Offline: () => import("@/pages/Offline"),
};

export const pageCache: Record<string, ComponentType | undefined> = {};

export const preloadPage = async (view: string): Promise<void> => {
  const loader = loaders[view];
  if (loader) {
    const mod = await loader();
    pageCache[view] = mod.default;
  }
};

function usePageComponent(view: string): ComponentType | null {
  const [, setTick] = useState(0);
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    let current = true;
    const loader = loaders[view] || loaders.NotFound;

    if (pageCache[view]) {
      return;
    }

    loader().then((mod) => {
      if (!current) {
        return;
      }

      pageCache[view] = mod.default;
      setTick((tick) => tick + 1);

      dispatch({
        type: "UPDATE",
        payload: { isNavigating: false },
      });
    });

    return () => {
      current = false;
    };
  }, [view, dispatch]);

  return pageCache[view] ?? null;
}

export const RouterPage = (url: string): JSX.Element => {
  const route = routesConfig[url.replace("index.html", "")];
  const view = route?.templateParameters?.View as string | undefined;
  const Page = usePageComponent(view || "NotFound");
  const { t } = useTranslate();

  if (!Page) {
    return (
      <div class="flex flex-1 flex-col items-center justify-center gap-3">
        <Spinner />
        <p role="status" class="text-sm text-stone-600 dark:text-zinc-400">
          {t("loading_content")}
        </p>
      </div>
    );
  }

  return <Page />;
};
