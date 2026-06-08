import type { ComponentType, JSX } from "preact";

import { useState, useEffect } from "preact/hooks";

import { Spinner } from "@/components/Spinner";
import routesConfig from "@/config/routes";

const loaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  Home: () => import("@/pages/Home"),
  Blog: () => import("@/pages/Blog"),
  BlogPost: () => import("@/pages/Blog"),
  Contact: () => import("@/pages/Contact"),
  NotFound: () => import("@/pages/NotFound"),
  Offline: () => import("@/pages/Offline"),
};

const cache: Record<string, ComponentType | undefined> = {};

export const preloadPage = async (view: string): Promise<void> => {
  const loader = loaders[view];
  if (loader) {
    const mod = await loader();
    cache[view] = mod.default;
  }
};

function usePageComponent(view: string): ComponentType | null {
  const [Page, setPage] = useState<ComponentType | null>(() => cache[view] ?? null);

  useEffect(() => {
    if (cache[view]) {
      setPage(() => cache[view]!);
      return;
    }

    let current = true;
    const loader = loaders[view] || loaders.NotFound;

    loader().then((mod) => {
      if (current) {
        setPage(() => mod.default);
      }
    });

    return () => {
      current = false;
    };
  }, [view]);

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
