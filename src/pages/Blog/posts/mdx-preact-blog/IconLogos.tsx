import mdxLogo from "@/assets/icons/logos/mdx.svg";
import preactLogo from "@/assets/icons/logos/preact.svg";
import { Icon } from "@/components/Icon";

export const IconLogos = () => (
  <div class="flex flex-row flex-nowrap gap-8 py-8">
    <Icon src={preactLogo} width="150" height="150" />
    <Icon src={mdxLogo} width="150" height="150" />
  </div>
);
