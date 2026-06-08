import routes from "@/config/routes";

import { baseUrl, globalTitle, globalDescription } from "./constants";
import { pwa, type Pwa } from "./pwa";
import { structuredData, type StructuredData } from "./schema";
import { configMetas, configLinks, type Meta, type Link } from "./seo";

type Routes = typeof routes;

export interface GlobalConfig {
  title: string;
  description: string;
  metas: Meta[];
  links: Link[];
  routes: Routes;
  baseUrl: string;
  scripts: unknown[];
  structuredData: StructuredData;
  pwa: Pwa;
}

const config: GlobalConfig = {
  title: globalTitle,
  description: globalDescription,
  metas: configMetas,
  links: configLinks,
  routes,
  baseUrl,
  scripts: [],
  structuredData,
  pwa,
};

export default config;
