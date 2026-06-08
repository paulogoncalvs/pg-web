import type { ComponentType, JSX } from "preact";

import routesConfig from "@/config/routes";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/Blog/BlogPost";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Offline from "@/pages/Offline";

interface MDXModule {
  default: ComponentType;
}

const mdxModules = import.meta.glob<MDXModule>("../../pages/Blog/posts/*/index.mdx", {
  eager: true,
});
const mdxComponents: Record<string, ComponentType> = {};
for (const [path, mod] of Object.entries(mdxModules)) {
  const slug = path.split("/").slice(-2, -1)[0];
  mdxComponents[slug] = mod.default;
}

const pages = {
  Blog,
  BlogPost,
  Contact,
  Home,
  NotFound,
  Offline,
} as const;

const getSlug = (url: string): string => {
  return url.replace(/^\/?(?:pt\/)?blog\//, "").replace(/\/?$/, "");
};

export const RouterPage = (url: string): JSX.Element => {
  const route = routesConfig[url.replace("index.html", "")];
  const view = route?.templateParameters?.View as keyof typeof pages | undefined;

  if (!view || !pages[view]) {
    return <NotFound />;
  }

  if (view === "BlogPost") {
    const slug = getSlug(url);
    const MDXComponent = mdxComponents[slug];
    return <BlogPost MDXComponent={MDXComponent} />;
  }

  const Page = pages[view];
  return <Page />;
};
