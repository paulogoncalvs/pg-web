import type { ComponentType } from "preact";

import routesConfig from "@/config/routes";

interface MDXModule {
  default: ComponentType;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
}

const blogPostModules = import.meta.glob<MDXModule>("./*/index.mdx");

export const blogPostLoaders: Record<string, () => Promise<MDXModule>> = {};
for (const [path, loader] of Object.entries(blogPostModules)) {
  const slug = path.split("/").slice(-2, -1)[0];
  blogPostLoaders[slug] = loader;
}

const mdxComponentCache = new Map<string, ComponentType>();

export async function preloadBlogPost(slug: string): Promise<void> {
  const loader = blogPostLoaders[slug];
  if (!loader) {
    return;
  }
  const mod = await loader();
  mdxComponentCache.set(slug, mod.default);
}

export function getCachedBlogPostComponent(slug: string): ComponentType | undefined {
  return mdxComponentCache.get(slug);
}

const getLanguagePrefix = (lang: string): string => {
  return lang === "pt" ? "/pt" : "";
};

export const getBlogPosts = (lang: string): BlogPost[] => {
  const prefix = getLanguagePrefix(lang);
  const posts: BlogPost[] = [];

  for (const [path] of Object.entries(blogPostModules)) {
    const slug = path.split("/").slice(-2, -1)[0];
    const routePath = `${prefix}/blog/${slug}/`;
    const routeConfig = routesConfig[routePath];

    if (routeConfig) {
      const head = routeConfig.templateParameters.head;
      const date = routeConfig.templateParameters.date;
      const readingTime = routeConfig.templateParameters.readingTime;

      const descriptionMeta = head.metas.find((m) => m.attributes?.name === "description");

      posts.push({
        slug,
        title: head.title,
        description: descriptionMeta?.attributes?.content ?? "",
        date: date ?? "",
        readingTime: readingTime ?? 0,
      });
    }
  }

  return posts.sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));
};

export const getBlogPost = (slug: string, lang: string) => {
  const prefix = getLanguagePrefix(lang);
  const routePath = `${prefix}/blog/${slug}/`;
  const routeConfig = routesConfig[routePath];

  if (!routeConfig) {
    return undefined;
  }

  const head = routeConfig.templateParameters.head;
  const date = routeConfig.templateParameters.date;
  const readingTime = routeConfig.templateParameters.readingTime;
  const descriptionMeta = head.metas.find((m) => m.attributes?.name === "description");

  return {
    slug,
    title: head.title,
    description: descriptionMeta?.attributes?.content ?? "",
    date: date ?? "",
    readingTime: readingTime ?? 0,
  };
};
