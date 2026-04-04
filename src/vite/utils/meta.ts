interface MetaConfig {
  attributes?: Record<string, string>;
  property?: string;
  path?: string;
  content?: string;
  name?: string;
}

interface LinkConfig {
  path?: string;
  attributes?: Record<string, string>;
}

export function renderMetas(metas: MetaConfig[] | undefined): string {
  if (!metas) {
    return "";
  }

  return metas
    .map((m) => {
      const attrs = m.attributes
        ? Object.fromEntries(Object.entries(m.attributes).map(([k, v]) => [k, v]))
        : {};

      if (m.path && !attrs.content) {
        attrs.content = m.path;
      }

      if (Object.keys(attrs).length === 0) {
        return "";
      }

      return `<meta ${Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ")}>`;
    })
    .filter(Boolean)
    .join("");
}

export function renderLinks(links: LinkConfig[] | undefined): string {
  const result: string[] = [];

  if (links) {
    const otherLinks = links
      .map((l) => {
        const href = l.attributes?.href || l.path;

        if (!href) {
          return "";
        }

        const resolvedHref = href.startsWith("/assets")
          ? href
          : href.startsWith("/")
            ? `/assets${href}`
            : href;
        const attrs = { ...l.attributes, href: resolvedHref };

        return `<link ${Object.entries(attrs)
          .map(([k, v]) => `${k}="${v}"`)
          .join(" ")}>`;
      })
      .filter(Boolean);

    result.push(...otherLinks);
  }

  return result.join("");
}
