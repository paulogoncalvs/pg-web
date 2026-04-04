const baseUrl = "https://www.paulogoncalves.dev/";

export interface RouteConfig {
  filename: string;
  templateParameters: {
    lang: string;
    url: string;
    View: string;
    head: {
      title: string;
      links: { path: string; attributes: Record<string, string> }[];
      metas: { attributes: Record<string, string> }[];
    };
  };
  tests?: {
    name: string;
  };
}

const routes: Record<string, RouteConfig> = {
  "/": {
    filename: "index.html",
    templateParameters: {
      View: "Home",
      head: {
        title: "Paulo Gonçalves - Front-End Engineer from Portugal",
        links: [{ path: "", attributes: { href: baseUrl, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Personal Website" } }],
      },
      lang: "en",
      url: "/",
    },
    tests: {
      name: "Home",
    },
  },
  "/404/": {
    filename: "404/index.html",
    templateParameters: {
      View: "NotFound",
      head: {
        title: "404",
        links: [{ path: "", attributes: { href: `${baseUrl}404/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Page not found" } }],
      },
      lang: "en",
      url: "/404/",
    },
    tests: {
      name: "404",
    },
  },
  "/contact/": {
    filename: "contact/index.html",
    templateParameters: {
      View: "Contact",
      head: {
        title: "Contacts",
        links: [{ path: "", attributes: { href: `${baseUrl}contact/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Send me a message" } }],
      },
      lang: "en",
      url: "/contact/",
    },
    tests: {
      name: "Contact",
    },
  },
  "/en/": {
    filename: "en/index.html",
    templateParameters: {
      View: "Home",
      head: {
        title: "Paulo Gonçalves - Front-End Engineer from Portugal",
        links: [{ path: "", attributes: { href: `${baseUrl}en/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Personal Website" } }],
      },
      lang: "en",
      url: "/en/",
    },
  },
  "/en/404/": {
    filename: "en/404/index.html",
    templateParameters: {
      View: "NotFound",
      head: {
        title: "404",
        links: [{ path: "", attributes: { href: `${baseUrl}en/404/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Page not found" } }],
      },
      lang: "en",
      url: "/en/404/",
    },
  },
  "/en/contact/": {
    filename: "en/contact/index.html",
    templateParameters: {
      View: "Contact",
      head: {
        title: "Contact",
        links: [{ path: "", attributes: { href: `${baseUrl}en/contact/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Send me a message" } }],
      },
      lang: "en",
      url: "/en/contact/",
    },
  },
  "/en/offline/": {
    filename: "en/offline/index.html",
    templateParameters: {
      View: "Offline",
      head: {
        title: "Offline",
        links: [{ path: "", attributes: { href: `${baseUrl}en/offline/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Offline" } }],
      },
      lang: "en",
      url: "/en/offline/",
    },
  },
  "/offline/": {
    filename: "offline/index.html",
    templateParameters: {
      View: "Offline",
      head: {
        title: "Offline",
        links: [{ path: "", attributes: { href: `${baseUrl}offline/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Offline" } }],
      },
      lang: "en",
      url: "/offline/",
    },
    tests: {
      name: "Offline",
    },
  },
  "/pt/": {
    filename: "pt/index.html",
    templateParameters: {
      View: "Home",
      head: {
        title: "Paulo Gonçalves - Front-End Engineer de Portugal [PT]",
        links: [{ path: "", attributes: { href: `${baseUrl}pt/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Website pessoal" } }],
      },
      lang: "pt",
      url: "/pt/",
    },
  },
  "/pt/404/": {
    filename: "pt/404/index.html",
    templateParameters: {
      View: "NotFound",
      head: {
        title: "404 [PT]",
        links: [{ path: "", attributes: { href: `${baseUrl}pt/404/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Página não encontrada" } }],
      },
      lang: "pt",
      url: "/pt/404/",
    },
  },
  "/pt/contact/": {
    filename: "pt/contact/index.html",
    templateParameters: {
      View: "Contact",
      head: {
        title: "Contactar [PT]",
        links: [{ path: "", attributes: { href: `${baseUrl}pt/contact/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Contactar Paulo Gonçalves" } }],
      },
      lang: "pt",
      url: "/pt/contact/",
    },
  },
  "/pt/offline/": {
    filename: "pt/offline/index.html",
    templateParameters: {
      View: "Offline",
      head: {
        title: "Offline [PT]",
        links: [{ path: "", attributes: { href: `${baseUrl}pt/offline/`, rel: "canonical" } }],
        metas: [{ attributes: { name: "description", content: "Offline" } }],
      },
      lang: "pt",
      url: "/pt/offline/",
    },
  },
};

export default routes;
