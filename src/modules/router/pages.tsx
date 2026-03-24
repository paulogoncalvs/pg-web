import type { FunctionalComponent, JSX } from "preact";
import routesConfig from "@/config/routes";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Offline from "@/pages/Offline";

type Pages = Record<string, FunctionalComponent>;

const pages: Pages = {
  Contact,
  Home,
  NotFound,
  Offline,
};

export const RouterPage = (url: string): JSX.Element => {
  const route = routesConfig[url.replace("index.html", "")];
  const view = route?.templateParameters?.View;
  const Page = pages[view] || NotFound;

  return <Page />;
};
