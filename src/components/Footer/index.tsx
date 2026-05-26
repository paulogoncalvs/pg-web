import type { FunctionalComponent } from "preact";

import axeLogo from "@/assets/icons/logos/axe.svg";
import dockerLogo from "@/assets/icons/logos/docker.svg";
import expressLogo from "@/assets/icons/logos/express.svg";
import gaLogo from "@/assets/icons/logos/ga.svg";
import mdxLogo from "@/assets/icons/logos/mdx.svg";
import nodejsLogo from "@/assets/icons/logos/nodejs.svg";
import oxcLogo from "@/assets/icons/logos/oxc.svg";
import playwrigthLogo from "@/assets/icons/logos/playwright.svg";
import pnpmLogo from "@/assets/icons/logos/pnpm.svg";
import preactLogo from "@/assets/icons/logos/preact.svg";
import tailwindLogo from "@/assets/icons/logos/tailwind.svg";
import typeScriptLogo from "@/assets/icons/logos/typescript.svg";
import viteLogo from "@/assets/icons/logos/vite.svg";
import vitestLogo from "@/assets/icons/logos/vitest.svg";
import workboxLogo from "@/assets/icons/logos/workbox.svg";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { Tooltip } from "@/components/Tooltip";
import { githubRepoUrl } from "@/config/global/socialLinks";
import { useTranslate } from "@/modules/i18n";
import { trackEvent } from "@/modules/tracking/ga4";

const initialYear = 2021;
const currentYear = new Date().getFullYear();

const logos = [
  { href: "https://www.typescriptlang.org/", label: "TypeScript", src: typeScriptLogo },
  { href: "https://preactjs.com/", label: "Preact", src: preactLogo },
  { href: "https://vite.dev/", label: "Vite", src: viteLogo },
  { href: "https://pnpm.io/", label: "pnpm", src: pnpmLogo },
  { href: "https://www.docker.com", label: "Docker", src: dockerLogo },
  { href: "https://nodejs.org/", label: "Node.js", src: nodejsLogo },
  { href: "https://developers.google.com/web/tools/workbox", label: "Workbox", src: workboxLogo },
  { href: "https://oxc.rs/", label: "OXC", src: oxcLogo },
  { href: "https://analytics.google.com/", label: "Google Analytics", src: gaLogo },
  { href: "https://tailwindcss.com/", label: "Tailwind CSS", src: tailwindLogo },
  { href: "https://playwright.dev/", label: "Playwright", src: playwrigthLogo },
  { href: "https://vitest.dev/", label: "Vitest", src: vitestLogo },
  { href: "https://www.deque.com/axe/", label: "Axe", src: axeLogo },
  { href: "https://mdxjs.com/", label: "mdx", src: mdxLogo },
  { href: "https://expressjs.com/", label: "Express", src: expressLogo },
] as const;

export const Footer: FunctionalComponent = () => {
  const { t } = useTranslate();

  return (
    <footer>
      <div class="border border-r-0 border-l-0 border-white/90 bg-white/20 px-6 py-16 text-center shadow-xs shadow-black/7 dark:border-white/15 dark:bg-zinc-900/35 dark:shadow-black/20">
        <div class="flex flex-col items-center">
          <div class="flex flex-wrap justify-center align-middle">
            {logos.map((logo) => (
              <Tooltip key={logo.label} content={logo.label}>
                <Link
                  href={logo.href}
                  class="icon-link translate-up"
                  ariaLabel={logo.label}
                  newWindow
                >
                  <Icon src={logo.src} width="32" height="32" ariaHidden />
                </Link>
              </Tooltip>
            ))}
          </div>
          <p class="pt-8 text-xs">
            {t(
              "footer_description_1",
              {
                link: (
                  <Link
                    href={githubRepoUrl}
                    class="underline"
                    newWindow
                    onClick={(): void =>
                      trackEvent("link_click", {
                        link_location: "Footer",
                        link_name: "GitHub",
                      })
                    }
                  >
                    {t("footer_description_1_link_text")}
                  </Link>
                ),
              },
              false,
            )}
          </p>
        </div>
      </div>
      <div class="flex flex-col items-center px-6 py-16 text-center text-xs">
        <p class="mb-2">
          {t(
            "footer_description_2",
            {
              privacy: (
                <a
                  class="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://policies.google.com/privacy"
                >
                  {t("footer_recaptcha_privacy_link_text")}
                </a>
              ),
              terms: (
                <a
                  class="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://policies.google.com/terms"
                >
                  {t("footer_recaptcha_terms_link_text")}
                </a>
              ),
            },
            false,
          )}
        </p>
        <p class="pt-2 font-bold">
          paulogoncalves.dev ©️ {initialYear} {currentYear > initialYear ? `- ${currentYear}` : ""}{" "}
          🤘🏻
        </p>
      </div>
    </footer>
  );
};
