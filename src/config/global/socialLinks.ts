export interface SocialLink {
  platform: string;
  url: string;
  sameAs?: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "x",
    url: "https://x.com/paulogoncalvs",
    label: "X",
  },
  {
    platform: "github",
    url: "https://github.com/paulogoncalvs",
    label: "GitHub",
  },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/paulogoncalvs",
    label: "LinkedIn",
  },
];

export const githubRepoUrl = "https://github.com/paulogoncalvs/pg-web";
