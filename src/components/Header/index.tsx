import { h, FunctionalComponent } from 'preact';
import { trackEvent } from '@/modules/tracking';
import { ToggleTheme } from '@/components/ToggleTheme';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
import LanguageSelector from '@/components/LanguageSelector';
import linkedInIcon from '@/assets/icons/logos/linkedin.svg';
import githubIcon from '@/assets/icons/logos/github.svg';
import twitterIcon from '@/assets/icons/logos/twitter.svg';

export const Header: FunctionalComponent = () => (
    <header class="container p-4 py-10 mx-auto">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <LanguageSelector classes="ml-2 mr-2" />
            </div>
            <div class="flex justify-end">
                <ToggleTheme classes="p-2" />
                <Link
                    href="https://www.twitter.com/paulogoncalvs"
                    class="ic-link _hdr"
                    ariaLabel="Twitter"
                    newWindow
                    onClick={(): void =>
                        trackEvent({
                            eventCategory: 'Header Link',
                            eventAction: 'clickLink',
                            eventLabel: 'Twitter',
                        })
                    }
                >
                    <Icon src={twitterIcon} ariaHidden />
                </Link>
                <Link
                    href="https://www.github.com/paulogoncalvs"
                    class="ic-link _hdr"
                    ariaLabel="GitHub"
                    newWindow
                    onClick={(): void =>
                        trackEvent({
                            eventCategory: 'Header Link',
                            eventAction: 'clickLink',
                            eventLabel: 'GitHub',
                        })
                    }
                >
                    <Icon src={githubIcon} ariaHidden />
                </Link>
                <Link
                    href="https://pt.linkedin.com/in/paulogoncalvs"
                    class="ic-link _hdr"
                    ariaLabel="LinkedIn"
                    newWindow
                    onClick={(): void =>
                        trackEvent({
                            eventCategory: 'Header Link',
                            eventAction: 'clickLink',
                            eventLabel: 'LinkedIn',
                        })
                    }
                >
                    <Icon src={linkedInIcon} ariaHidden />
                </Link>
            </div>
        </div>
    </header>
);
