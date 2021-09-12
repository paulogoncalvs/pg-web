import { h, FunctionalComponent } from 'preact';
import { ToggleTheme } from '@/components/ToggleTheme';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
import LanguageSelector from '@/components/LanguageSelector';
import linkedInIcon from '@/assets/icons/logos/linkedin.svg';
import githubIcon from '@/assets/icons/logos/github.svg';
import twitterIcon from '@/assets/icons/logos/twitter.svg';

export const Header: FunctionalComponent = () => (
    <header class="container mx-auto p-4 py-10">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <LanguageSelector classes="ml-2 mr-2" />
                <ToggleTheme classes="p-2" />
            </div>
            <div class="flex justify-end">
                <Link href="https://www.twitter.com/paulogoncalvs" classes="ic-link _hdr" ariaLabel="Twitter" newWindow>
                    <Icon src={twitterIcon} ariaHidden />
                </Link>
                <Link href="https://www.github.com/paulogoncalvs" classes="ic-link _hdr" ariaLabel="GitHub" newWindow>
                    <Icon src={githubIcon} ariaHidden />
                </Link>
                <Link
                    href="https://pt.linkedin.com/in/paulogoncalvs"
                    classes="ic-link _hdr"
                    ariaLabel="LinkedIn"
                    newWindow
                >
                    <Icon src={linkedInIcon} ariaHidden />
                </Link>
            </div>
        </div>
    </header>
);
