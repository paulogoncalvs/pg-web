import { Language } from "../../modules/language/index.ts";
import { baseUrl } from "../global/constants.ts";

export interface RouteConfig {
  filename: string;
  templateParameters: {
    lang: string;
    url: string;
    View: string;
    head: {
      title: string;
      translatedTitleKey?: string;
      links: { path: string; attributes: Record<string, string> }[];
      metas: { attributes: Record<string, string> }[];
      translatedDescriptionKey?: string;
    };
    date?: string;
    readingTime?: number;
    tags?: string[];
  };
  menu?: {
    labelKey: string;
  };
  tests?: {
    name: string;
  };
}

type LangContent = {
  title: string;
  description: string;
};

type PageContent = Record<Language, LangContent>;

const LANG_CFG = {
  [Language.en]: { prefix: "", dir: "", base: baseUrl },
  [Language.pt]: {
    prefix: `/${Language.pt}`,
    dir: `${Language.pt}/`,
    base: `${baseUrl}${Language.pt}/`,
  },
} as const;

const createRoute = (
  path: string,
  lang: keyof typeof LANG_CFG,
  params: {
    View: string;
    content: LangContent;
    date?: string;
    readingTime?: number;
    tags?: string[];
    menu?: { labelKey: string };
    tests?: { name: string };
    og?: boolean;
  },
): RouteConfig => {
  const cfg = LANG_CFG[lang];
  const prefix = cfg.prefix.replace(/^\//, "");
  const cleanPath = path.replace(/^\/|\/$/g, "");
  const slashPath = cleanPath ? `${cleanPath}/` : cleanPath;
  const url = `${cfg.prefix}${path}`;

  const metas: { attributes: Record<string, string> }[] = [
    {
      attributes: {
        "data-route-meta": "true",
        name: "description",
        content: params.content.description,
      },
    },
    {
      attributes: {
        "data-route-meta": "true",
        property: "og:locale",
        content: lang === Language.pt ? `${Language.pt}_PT` : `${Language.en}_US`,
      },
    },
  ];

  if (params.og) {
    metas.push(
      {
        attributes: {
          "data-route-meta": "true",
          property: "og:title",
          content: params.content.title,
        },
      },
      {
        attributes: {
          "data-route-meta": "true",
          property: "og:description",
          content: params.content.description,
        },
      },
      {
        attributes: {
          "data-route-meta": "true",
          property: "og:url",
          content: `${cfg.base}${slashPath}`,
        },
      },
    );
  }

  const links: { path: string; attributes: Record<string, string> }[] = [
    { path: "", attributes: { href: `${cfg.base}${slashPath}`, rel: "canonical" } },
    {
      path: "",
      attributes: { rel: "alternate", hreflang: Language.en, href: `${baseUrl}${slashPath}` },
    },
    {
      path: "",
      attributes: {
        rel: "alternate",
        hreflang: Language.pt,
        href: `${baseUrl}${Language.pt}/${slashPath}`,
      },
    },
    {
      path: "",
      attributes: { rel: "alternate", hreflang: "x-default", href: `${baseUrl}${slashPath}` },
    },
  ];

  return {
    filename: `${prefix}${prefix ? "/" : ""}${cleanPath}/index.html`,
    templateParameters: {
      lang,
      url,
      View: params.View,
      head: {
        title: params.content.title,
        links,
        metas,
      },
      ...(params.date && { date: params.date }),
      ...(params.readingTime && { readingTime: params.readingTime }),
      ...(params.tags && { tags: params.tags }),
    },
    ...(params.menu && { menu: params.menu }),
    ...(params.tests && { tests: params.tests }),
  };
};

// ---- Menu ----

const menuItems: Record<string, { labelKey: string }> = {
  "/": { labelKey: "sidedrawer_menu_link_home" },
  "/blog/": { labelKey: "sidedrawer_menu_link_blog" },
  "/contact/": { labelKey: "sidedrawer_menu_link_contact" },
};

// ---- Static pages ----

interface PageDef {
  View: string;
  content: PageContent;
  menuKey?: string;
  tests?: string;
}

const pages: Record<string, PageDef> = {
  "/": {
    View: "Home",
    menuKey: "sidedrawer_menu_link_home",
    tests: "Home",
    content: {
      [Language.en]: {
        title: "Paulo Gonçalves - Front-End Engineer from Portugal",
        description: "Personal Website",
      },
      [Language.pt]: {
        title: "Paulo Gonçalves - Front-End Engineer de Portugal [PT]",
        description: "Website pessoal",
      },
    },
  },
  "/404/": {
    View: "NotFound",
    tests: "404",
    content: {
      [Language.en]: { title: "404", description: "Page not found" },
      [Language.pt]: { title: "404 [PT]", description: "Página não encontrada" },
    },
  },
  "/blog/": {
    View: "Blog",
    menuKey: "sidedrawer_menu_link_blog",
    tests: "Blog",
    content: {
      [Language.en]: { title: "Blog", description: "Guides and Insights" },
      [Language.pt]: { title: "Blog [PT]", description: "Guias e Perspectivas" },
    },
  },
  "/contact/": {
    View: "Contact",
    menuKey: "sidedrawer_menu_link_contact",
    tests: "Contact",
    content: {
      [Language.en]: { title: "Contact", description: "Send me a message" },
      [Language.pt]: { title: "Contactar [PT]", description: "Envie-me uma mensagem" },
    },
  },
  "/offline/": {
    View: "Offline",
    tests: "Offline",
    content: {
      [Language.en]: { title: "Offline", description: "Offline" },
      [Language.pt]: { title: "Offline", description: "Offline" },
    },
  },
};

// ---- Blog posts ----

interface BlogPostDef {
  slug: string;
  date: string;
  readingTime: number;
  tags: string[];
  content: PageContent;
}

const blogPosts: BlogPostDef[] = [
  {
    slug: "mdx-preact-blog",
    date: "2026-04-04",
    readingTime: 5,
    tags: ["frontend", "architecture"],
    content: {
      [Language.en]: {
        title: "Building My Blog with Preact and MDX",
        description: "Sharing my journey into the world of MDX",
      },
      [Language.pt]: {
        title: "A construir o meu blog com Preact e MDX",
        description: "A minha jornada no mundo do MDX",
      },
    },
  },
  {
    slug: "website-tech-stack",
    date: "2026-05-05",
    readingTime: 7,
    tags: ["frontend", "performance", "typescript"],
    content: {
      [Language.en]: {
        title: "My Website Tech Stack",
        description: "A deep dive into the technologies powering this website",
      },
      [Language.pt]: {
        title: "Stack de tecnologias do meu website",
        description: "Análise das tecnologias que constituem este website",
      },
    },
  },
  {
    slug: "code-splitting-journey",
    date: "2026-05-30",
    readingTime: 6,
    tags: ["performance", "architecture"],
    content: {
      [Language.en]: {
        title: "Static-First Code Splitting",
        description:
          "A static-first approach to code splitting that reduced the initial bundle from 109 kB to 19 kB without layout shifts or hydration issues",
      },
      [Language.pt]: {
        title: "Static-First Code Splitting",
        description:
          "Uma abordagem static-first ao code splitting que reduziu o bundle inicial de 109 kB para 19 kB sem layout shifts nem problemas de hidratação",
      },
    },
  },
  {
    slug: "migration-vite",
    date: "2026-05-18",
    readingTime: 7,
    tags: ["performance", "productivity", "frontend"],
    content: {
      [Language.en]: {
        title: "Migrating from Webpack to Vite",
        description:
          "How migrating from Webpack, Jest, ESLint and Prettier to Vite, Vitest, Oxlint, and Oxfmt improved performance by 10x",
      },
      [Language.pt]: {
        title: "Migração de Webpack para Vite",
        description:
          "Como a migração de Webpack, Jest, ESLint e Prettier para Vite, Vitest, Oxlint e Oxfmt melhorou o desempenho em 10x",
      },
    },
  },
  {
    slug: "building-with-a-free-ai-model",
    date: "2026-06-16",
    readingTime: 6,
    tags: ["ai", "productivity"],
    content: {
      [Language.en]: {
        title: "Building This Site with a Free AI Model",
        description:
          "Building a real website with a free AI model: what helped, what didn't, and why it matters",
      },
      [Language.pt]: {
        title: "Construir Este Site com um Modelo de IA Gratuito",
        description:
          "Construir um site real com um modelo de IA gratuito: o que ajudou, o que não resultou e porque é que isso é importante",
      },
    },
  },
];

// ---- Build routes ----

const routes: Record<string, RouteConfig> = {};

for (const [path, def] of Object.entries(pages)) {
  const tests = def.tests ? { name: def.tests } : undefined;
  const menu = def.menuKey ? { labelKey: def.menuKey } : undefined;

  for (const lang of [Language.en] as const) {
    routes[`${LANG_CFG[lang].prefix}${path}`] = createRoute(path, lang, {
      View: def.View,
      content: def.content[Language.en],
      menu,
      tests,
    });
  }

  routes[`/${Language.pt}${path}`] = createRoute(path, Language.pt, {
    View: def.View,
    content: def.content[Language.pt],
    tests,
  });
}

for (const post of blogPosts) {
  for (const lang of [Language.en, Language.pt] as const) {
    const blogPath = `/blog/${post.slug}/`;
    routes[`${LANG_CFG[lang].prefix}${blogPath}`] = createRoute(blogPath, lang, {
      View: "BlogPost",
      content: post.content[lang],
      date: post.date,
      readingTime: post.readingTime,
      tags: post.tags,
      og: true,
      tests: { name: `BlogPost-${post.slug}` },
    });
  }
}

// ---- Pagination pages ----

const POSTS_PER_PAGE = 4;
const blogPageDef = pages["/blog/"];

for (const lang of [Language.en, Language.pt] as const) {
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE));
  for (let page = 2; page <= totalPages; page++) {
    const pagePath = `/blog/page/${page}/`;
    routes[`${LANG_CFG[lang].prefix}${pagePath}`] = createRoute(pagePath, lang, {
      View: blogPageDef.View,
      content: blogPageDef.content[lang],
    });
  }
}

export { menuItems };
export default routes;
