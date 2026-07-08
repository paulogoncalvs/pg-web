import type { ComponentType, JSX } from "preact";

import { useContext, useState, useEffect } from "preact/hooks";

import { Spinner } from "@/components/Spinner";
import routesConfig from "@/config/routes";
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
  const [Page, setPage] = useState<ComponentType | null>(() => pageCache[view] ?? null);
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    let current = true;
    const loader = loaders[view] || loaders.NotFound;
    const startTime = Date.now();

    if (pageCache[view]) {
      setPage(() => pageCache[view]!);
      return;
    }

    loader().then((mod) => {
      if (current) {
        pageCache[view] = mod.default;
        setPage(() => mod.default);
      }

      const elapsed = Date.now() - startTime;
      setTimeout(
        () => {
          dispatch({
            type: "UPDATE",
            payload: { isNavigating: false },
          });
        },
        Math.max(0, 100 - elapsed),
      );
    });

    return () => {
      current = false;
      dispatch({
        type: "UPDATE",
        payload: { isNavigating: false },
      });
    };
  }, [view, dispatch]);

  return Page;
}

export const RouterPage = (url: string): JSX.Element => {
  const route = routesConfig[url.replace("index.html", "")];
  const view = route?.templateParameters?.View as string | undefined;
  const Page = usePageComponent(view || "NotFound");

  if (!Page) {
    return (
      <div class="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <Page />;
};
