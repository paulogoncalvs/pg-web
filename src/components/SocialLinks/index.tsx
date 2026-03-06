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
            class="icon-link"
            href="https://www.twitter.com/paulogoncalvs"
            ariaLabel="Twitter"
            newWindow
            onClick={(): void =>
                trackEvent('link_click', {
                    link_name: 'Twitter',
                    link_location: 'Social',
                })
            }
        >
            <Icon src={twitterIcon} ariaHidden />
        </Link>
        <Link
            class="icon-link ml-4 mr-4"
            href="https://www.github.com/paulogoncalvs"
            ariaLabel="GitHub"
            newWindow
            onClick={(): void =>
                trackEvent('link_click', {
                    link_name: 'GitHub',
                    link_location: 'Social',
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
                trackEvent('link_click', {
                    link_name: 'LinkedIn',
                    link_location: 'Social',
                })
            }
        >
            <Icon src={linkedInIcon} ariaHidden />
        </Link>
    </Fragment>
);
