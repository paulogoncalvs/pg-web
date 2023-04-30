import { h, Fragment, FunctionalComponent } from 'preact';
import { trackEvent } from '@/modules/tracking/ga4';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
import linkedInIcon from '@/assets/icons/logos/linkedin.svg';
import githubIcon from '@/assets/icons/logos/github.svg';
import twitterIcon from '@/assets/icons/logos/twitter.svg';

export const SocialLinks: FunctionalComponent = () => (
    <Fragment>
        <Link
            class="ic-link"
            href="https://www.twitter.com/paulogoncalvs"
            ariaLabel="Twitter"
            newWindow
            onClick={(): void =>
                trackEvent(
                    {
                        category: 'Social Link',
                        label: 'Twitter',
                    },
                    'link_click',
                )
            }
        >
            <Icon src={twitterIcon} ariaHidden />
        </Link>
        <Link
            class="ic-link ml-4 mr-4"
            href="https://www.github.com/paulogoncalvs"
            ariaLabel="GitHub"
            newWindow
            onClick={(): void =>
                trackEvent(
                    {
                        category: 'Social Link',
                        label: 'GitHub',
                    },
                    'link_click',
                )
            }
        >
            <Icon src={githubIcon} ariaHidden />
        </Link>
        <Link
            class="ic-link"
            href="https://pt.linkedin.com/in/paulogoncalvs"
            ariaLabel="LinkedIn"
            newWindow
            onClick={(): void =>
                trackEvent(
                    {
                        category: 'Social Link',
                        label: 'LinkedIn',
                    },
                    'link_click',
                )
            }
        >
            <Icon src={linkedInIcon} ariaHidden />
        </Link>
    </Fragment>
);
