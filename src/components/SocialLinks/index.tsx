import { type FunctionalComponent } from "preact";
import githubIcon from "@/assets/icons/logos/github.svg";
import linkedInIcon from "@/assets/icons/logos/linkedin.svg";
import xIcon from "@/assets/icons/logos/x.svg";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { trackEvent } from "@/modules/tracking/ga4";

export const SocialLinks: FunctionalComponent = () => (
  <>
    <Link
      class="icon-link"
      href="https://www.x.com/paulogoncalvs"
      ariaLabel="X"
      newWindow
      onClick={(): void =>
        trackEvent("link_click", {
          link_location: "Social",
          link_name: "X",
        })
      }
    >
      <Icon src={xIcon} ariaHidden />
    </Link>
    <Link
      class="icon-link mx-2 sm:mx-4"
      href="https://www.github.com/paulogoncalvs"
      ariaLabel="GitHub"
      newWindow
      onClick={(): void =>
        trackEvent("link_click", {
          link_location: "Social",
          link_name: "GitHub",
        })
      }
    >
      <Icon src={githubIcon} ariaHidden />
    </Link>
    <Link
      class="icon-link"
      href="https://pt.linkedin.com/in/paulogoncalvs"
      ariaLabel="LinkedIn"
      newWindow
      onClick={(): void =>
        trackEvent("link_click", {
          link_location: "Social",
          link_name: "LinkedIn",
        })
      }
    >
      <Icon src={linkedInIcon} ariaHidden />
    </Link>
  </>
);
