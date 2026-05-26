import type { JSX } from "preact";

import routesConfig from "@/config/routes";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Offline from "@/pages/Offline";

const pages = {
  Blog,
  BlogPost: Blog,
  Contact,
  Home,
  NotFound,
  Offline,
} as const;

export const RouterPage = (url: string): JSX.Element => {
  const route = routesConfig[url.replace("index.html", "")];
  const view = route?.templateParameters?.View as keyof typeof pages | undefined;

  if (!view || !pages[view]) {
    return <NotFound />;
  }

  const Page = pages[view];
  return <Page />;
};
