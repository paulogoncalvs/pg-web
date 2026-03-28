import { type FunctionalComponent } from "preact";

import githubIcon from "@/assets/icons/logos/github.svg";
import linkedInIcon from "@/assets/icons/logos/linkedin.svg";
import xIcon from "@/assets/icons/logos/x.svg";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { trackEvent } from "@/modules/tracking/ga4";

const socialLinks = [
  { href: "https://www.x.com/paulogoncalvs", icon: xIcon, label: "X" },
  { href: "https://www.github.com/paulogoncalvs", icon: githubIcon, label: "GitHub" },
  { href: "https://pt.linkedin.com/in/paulogoncalvs", icon: linkedInIcon, label: "LinkedIn" },
];

export const SocialLinks: FunctionalComponent = () => (
  <>
    {socialLinks.map((link) => (
      <Link
        key={link.label}
        href={link.href}
        ariaLabel={link.label}
        newWindow
        class="icon-link"
        onClick={(): void =>
          trackEvent("link_click", {
            link_location: "Social",
            link_name: link.label,
          })
        }
      >
        <Icon src={link.icon} ariaHidden />
      </Link>
    ))}
  </>
);
