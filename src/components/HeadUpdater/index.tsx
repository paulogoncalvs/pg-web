import { useEffect } from "preact/hooks";
import routesConfig from "@/config/routes";
import { useRouterLocation, useRouter } from "@/modules/router";
import { isBrowser } from "@/utils/browser";

export const HeadUpdater = (): null => {
  const [pathname] = useRouterLocation();
  useRouter();

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const normalizedPath = (pathname ?? window.location.pathname).replace(/\/+$/, "/");
    const routeConfig =
      routesConfig[normalizedPath] ?? routesConfig[normalizedPath.replace(/\/$/, "")];
    const templateParameters = routeConfig?.templateParameters;
    const head = templateParameters?.head;

    if (!head) {
      return;
    }

    const { title, metas, links } = head;

    // Update title
    document.title = title ?? document.title ?? "";

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

    // Remove old elements
    document
      .querySelectorAll("meta[data-route-meta], link[data-route-link]")
      .forEach((el) => el.remove());

    // Add new meta tags
    metas?.forEach((m) => {
      if (m.attributes) {
        document.head.appendChild(
          createElementWithAttributes("meta", m.attributes, "data-route-meta"),
        );
      }
    });

    // Add new link tags
    links?.forEach((l) => {
      if (l.attributes) {
        document.head.appendChild(
          createElementWithAttributes("link", l.attributes, "data-route-link"),
        );
      }
    });
  }, [pathname]);

  return null;
};
