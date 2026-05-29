import type { FunctionalComponent } from "preact";

import { useContext, useEffect } from "preact/hooks";

import routesConfig from "@/config/routes";
import { useRouterLocation } from "@/modules/router";
import { StoreContext } from "@/modules/store";

export const HeadUpdater: FunctionalComponent = (): null => {
  const [pathname] = useRouterLocation();
  const { lang } = useContext(StoreContext);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const normalizedPath = (pathname ?? window.location.pathname).replace(/\/+$/, "/");

    // Derive route key from current path and language:
    // strip any existing language prefix, then re-prefix with active lang
    const basePath = normalizedPath.replace(/^\/(?:en|pt)\//, "/");
    const routeKey = lang === "pt" ? `/pt${basePath}` : basePath;
    const routeConfig = routesConfig[routeKey];
    const templateParameters = routeConfig?.templateParameters;
    const head = templateParameters?.head;

    // If no page-specific metas/links, keep existing (global) tags
    if (!head?.metas?.length && !head?.links?.length) {
      // Still update title if available
      if (head?.title) {
        document.title = head.title;
      }
      return;
    }

    const { title, metas, links } = head;

    document.title = title ?? document.title ?? "";

    // Clear previous route meta/link tags only
    document
      .querySelectorAll("meta[data-route-meta], link[data-route-link]")
      .forEach((el) => el.remove());

    // Helper to create element
    const createElementWithAttributes = <T extends keyof HTMLElementTagNameMap>(
      tag: T,
      attributes: Record<string, string>,
      dataAttr: string,
    ) => {
      const el = document.createElement(tag);
      Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
      el.setAttribute(dataAttr, "true");
      return el;
    };

    // Add meta tags from current page
    metas?.forEach((m) => {
      if (!m.attributes) {
        return;
      }
      const nameOrProperty = m.attributes.name || m.attributes.property;
      if (!nameOrProperty) {
        return;
      }

      const meta = createElementWithAttributes("meta", m.attributes, "data-route-meta");
      document.head.appendChild(meta);
    });

    // Add link tags from current page
    links?.forEach((l) => {
      if (!l.attributes?.rel || !l.attributes?.href) {
        return;
      }

      const link = createElementWithAttributes("link", l.attributes, "data-route-link");
      document.head.appendChild(link);
    });
  }, [pathname, lang]);

  return null;
};
