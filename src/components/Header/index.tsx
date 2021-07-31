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
                <Link href="https://www.twitter.com/paulogoncalvs" classes="ic-link _hdr" newWindow>
                    <Icon src={twitterIcon} aria-label="Twitter" />
                </Link>
                <Link href="https://www.github.com/paulogoncalvs" classes="ic-link _hdr" newWindow>
                    <Icon src={githubIcon} aria-label="GitHub" />
                </Link>
                <Link href="https://pt.linkedin.com/in/paulogoncalvs" classes="ic-link _hdr" newWindow>
                    <Icon src={linkedInIcon} aria-label="LinkedIn" />
                </Link>
            </div>
        </div>
    </header>
);
