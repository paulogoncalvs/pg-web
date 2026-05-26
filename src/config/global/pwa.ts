export interface Pwa {
  name: string;
  shortName: string;
  description: string;
  backgroundColor: string;
  themeColor: string;
  lang: string;
  icons: Array<{ src: string; sizes: string; type: string; purpose?: string }>;
}

export const pwa: Pwa = {
  name: "Paulo Gonçalves - Front-End Engineer",
  shortName: "PauloGoncalves",
  description: "Personal Website",
  backgroundColor: "#ffffff",
  themeColor: "#42b883",
  lang: "en",
  icons: [
    { src: "/assets/manifest/pwa-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/assets/manifest/pwa-512x512.png", sizes: "512x512", type: "image/png" },
    {
      src: "/assets/manifest/pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
  ],
};
