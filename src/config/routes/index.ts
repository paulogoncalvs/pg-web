import { baseUrl } from "../global/constants";

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

type PageContent = {
  en: LangContent;
  pt: LangContent;
};

const LANG_CFG = {
  en: { prefix: "", dir: "", base: baseUrl },
  pt: { prefix: "/pt", dir: "pt/", base: `${baseUrl}pt/` },
} as const;

const createRoute = (
  path: string,
  lang: keyof typeof LANG_CFG,
  params: {
    View: string;
    content: LangContent;
    date?: string;
    readingTime?: number;
    menu?: { labelKey: string };
    tests?: { name: string };
    og?: boolean;
  },
): RouteConfig => {
  const cfg = LANG_CFG[lang];
  const prefix = cfg.prefix.replace(/^\//, "");
  const cleanPath = path.replace(/^\/|\/$/g, "");
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
        content: lang === "pt" ? "pt_PT" : "en_US",
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
          content: `${cfg.base}${cleanPath}`,
        },
      },
    );
  }

  const links: { path: string; attributes: Record<string, string> }[] = [
    { path: "", attributes: { href: `${cfg.base}${cleanPath}`, rel: "canonical" } },
    { path: "", attributes: { rel: "alternate", hreflang: "en", href: `${baseUrl}${cleanPath}` } },
    {
      path: "",
      attributes: { rel: "alternate", hreflang: "pt", href: `${baseUrl}pt/${cleanPath}` },
    },
    {
      path: "",
      attributes: { rel: "alternate", hreflang: "x-default", href: `${baseUrl}${cleanPath}` },
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
      en: {
        title: "Paulo Gonçalves - Front-End Engineer from Portugal",
        description: "Personal Website",
      },
      pt: {
        title: "Paulo Gonçalves - Front-End Engineer de Portugal [PT]",
        description: "Website pessoal",
      },
    },
  },
  "/404/": {
    View: "NotFound",
    tests: "404",
    content: {
      en: { title: "404", description: "Page not found" },
      pt: { title: "404 [PT]", description: "Página não encontrada" },
    },
  },
  "/blog/": {
    View: "Blog",
    menuKey: "sidedrawer_menu_link_blog",
    tests: "Blog",
    content: {
      en: { title: "Blog", description: "Guides and Insights" },
      pt: { title: "Blog [PT]", description: "Guias e Perspectivas" },
    },
  },
  "/contact/": {
    View: "Contact",
    menuKey: "sidedrawer_menu_link_contact",
    tests: "Contact",
    content: {
      en: { title: "Contact", description: "Send me a message" },
      pt: { title: "Contactar [PT]", description: "Envie-me uma mensagem" },
    },
  },
  "/offline/": {
    View: "Offline",
    tests: "Offline",
    content: {
      en: { title: "Offline", description: "Offline" },
      pt: { title: "Offline", description: "Offline" },
    },
  },
};

// ---- Blog posts ----

interface BlogPostDef {
  slug: string;
  date: string;
  readingTime: number;
  content: PageContent;
}

const blogPosts: BlogPostDef[] = [
  {
    slug: "mdx-preact-blog",
    date: "2026-04-04",
    readingTime: 5,
    content: {
      en: {
        title: "Building My Blog with Preact and MDX",
        description: "Sharing my journey into the world of MDX",
      },
      pt: {
        title: "A construir o meu blog com Preact e MDX",
        description: "A minha jornada no mundo do MDX",
      },
    },
  },
  {
    slug: "website-tech-stack",
    date: "2026-05-05",
    readingTime: 7,
    content: {
      en: {
        title: "My Website Tech Stack",
        description: "A deep dive into the technologies powering this website",
      },
      pt: {
        title: "Stack de tecnologias do meu website",
        description: "Análise das tecnologias que constituem este website",
      },
    },
  },
  {
    slug: "code-splitting-journey",
    date: "2026-05-30",
    readingTime: 6,
    content: {
      en: {
        title: "Static-First Code Splitting",
        description:
          "A static-first approach to code splitting that reduced the initial bundle from 109 kB to 19 kB without layout shifts or hydration issues.",
      },
      pt: {
        title: "Static-First Code Splitting",
        description:
          "Uma abordagem static-first ao code splitting que reduziu o bundle inicial de 109 kB para 19 kB sem layout shifts nem problemas de hidratação.",
      },
    },
  },
  {
    slug: "migration-vite",
    date: "2026-05-18",
    readingTime: 7,
    content: {
      en: {
        title: "Migrating from Webpack to Vite",
        description:
          "How migrating from Webpack, Jest, ESLint and Prettier to Vite, Vitest, Oxlint, and Oxfmt improved performance by 10x",
      },
      pt: {
        title: "Migração de Webpack para Vite",
        description:
          "Como a migração de Webpack, Jest, ESLint e Prettier para Vite, Vitest, Oxlint e Oxfmt melhorou o desempenho em 10x",
      },
    },
  },
];

// ---- Build routes ----

const routes: Record<string, RouteConfig> = {};

for (const [path, def] of Object.entries(pages)) {
  const tests = def.tests ? { name: def.tests } : undefined;
  const menu = def.menuKey ? { labelKey: def.menuKey } : undefined;

  for (const lang of ["en"] as const) {
    routes[`${LANG_CFG[lang].prefix}${path}`] = createRoute(path, lang, {
      View: def.View,
      content: def.content.en,
      menu,
      tests,
    });
  }

  routes[`/pt${path}`] = createRoute(path, "pt", {
    View: def.View,
    content: def.content.pt,
    tests,
  });
}

for (const post of blogPosts) {
  for (const lang of ["en", "pt"] as const) {
    const blogPath = `/blog/${post.slug}/`;
    routes[`${LANG_CFG[lang].prefix}${blogPath}`] = createRoute(blogPath, lang, {
      View: "BlogPost",
      content: post.content[lang],
      date: post.date,
      readingTime: post.readingTime,
      og: true,
      tests: { name: `BlogPost-${post.slug}` },
    });
  }
}

export { menuItems };
export default routes;
