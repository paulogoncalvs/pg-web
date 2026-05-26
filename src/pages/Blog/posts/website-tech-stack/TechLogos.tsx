import type { FunctionalComponent } from "preact";

import dockerLogo from "@/assets/icons/logos/docker.svg";
import expressLogo from "@/assets/icons/logos/express.svg";
import gaLogo from "@/assets/icons/logos/ga.svg";
import mdxLogo from "@/assets/icons/logos/mdx.svg";
import nodejsLogo from "@/assets/icons/logos/nodejs.svg";
import oxcLogo from "@/assets/icons/logos/oxc.svg";
import playwrightLogo from "@/assets/icons/logos/playwright.svg";
import pnpmLogo from "@/assets/icons/logos/pnpm.svg";
import preactLogo from "@/assets/icons/logos/preact.svg";
import tailwindLogo from "@/assets/icons/logos/tailwind.svg";
import tsLogo from "@/assets/icons/logos/typescript.svg";
import viteLogo from "@/assets/icons/logos/vite.svg";
import vitestLogo from "@/assets/icons/logos/vitest.svg";
import workboxLogo from "@/assets/icons/logos/workbox.svg";
import { Icon } from "@/components/Icon";
import { Tooltip } from "@/components/Tooltip";

const techLogos = [
  { src: preactLogo, name: "Preact" },
  { src: tsLogo, name: "TypeScript" },
  { src: viteLogo, name: "Vite" },
  { src: tailwindLogo, name: "Tailwind CSS" },
  { src: mdxLogo, name: "MDX" },
  { src: pnpmLogo, name: "pnpm" },
  { src: dockerLogo, name: "Docker" },
  { src: nodejsLogo, name: "Node.js" },
  { src: expressLogo, name: "Express" },
  { src: vitestLogo, name: "Vitest" },
  { src: playwrightLogo, name: "Playwright" },
  { src: gaLogo, name: "Google Analytics" },
  { src: oxcLogo, name: "OXC" },
  { src: workboxLogo, name: "Workbox" },
];

export const TechLogos: FunctionalComponent = () => (
  <div class="flex flex-row flex-wrap justify-center gap-6 py-8">
    {techLogos.map((tech) => (
      <Tooltip key={tech.name} content={tech.name} position="top">
        <Icon src={tech.src} width="48" height="48" />
      </Tooltip>
    ))}
  </div>
);
