import { baseUrl } from "./constants";
import { socialLinks } from "./socialLinks";

export type StructuredData = {
  "@context": string;
  "@graph": Array<Record<string, unknown>>;
};

export const structuredData: StructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      jobTitle: "Front-End Engineer",
      name: "Paulo Gonçalves",
      nationality: {
        "@type": "Country",
        name: "Portugal",
      },
      sameAs: socialLinks.map((link) => link.url),
      url: baseUrl,
    },
    {
      "@type": "WebSite",
      name: "Paulo Gonçalves - Front-End Engineer",
      url: baseUrl,
    },
  ],
};
