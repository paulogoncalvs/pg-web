import { type FunctionalComponent } from "preact";

import githubIcon from "@/assets/icons/logos/github.svg";
import linkedInIcon from "@/assets/icons/logos/linkedin.svg";
import xIcon from "@/assets/icons/logos/x.svg";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { Tooltip } from "@/components/Tooltip";
import { socialLinks } from "@/config/global/socialLinks";
import { trackEvent } from "@/modules/tracking/ga4";

const iconMap: Record<string, typeof xIcon> = {
  x: xIcon,
  github: githubIcon,
  linkedin: linkedInIcon,
};

export const SocialLinks: FunctionalComponent = () => (
  <>
    {socialLinks.map((link) => (
      <Tooltip key={link.platform} content={link.label} position="top">
        <Link
          href={link.url}
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
          <Icon src={iconMap[link.platform]} ariaHidden />
        </Link>
      </Tooltip>
    ))}
  </>
);
