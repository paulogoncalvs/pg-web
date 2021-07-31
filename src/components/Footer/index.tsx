import { h, FunctionalComponent } from 'preact';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
import { t } from '@/modules/i18n';
import preactLogo from '@/assets/icons/logos/preact.svg';
import webpackLogo from '@/assets/icons/logos/webpack.svg';
import tailwindLogo from '@/assets/icons/logos/tailwind.svg';
import babelLogo from '@/assets/icons/logos/babel.svg';
import esLintLogo from '@/assets/icons/logos/eslint.svg';
import postCSSLogo from '@/assets/icons/logos/postcss.svg';
import prettierLogo from '@/assets/icons/logos/prettier.svg';
import sassLogo from '@/assets/icons/logos/sass.svg';
import styleLintLogo from '@/assets/icons/logos/stylelint.svg';
import typeScriptLogo from '@/assets/icons/logos/typescript.svg';
import yarnLogo from '@/assets/icons/logos/yarn.svg';
import workboxLogo from '@/assets/icons/logos/workbox.svg';
import jestLogo from '@/assets/icons/logos/jest.svg';

const initialYear = 2021;
const currentYear = new Date().getFullYear();

export const Footer: FunctionalComponent = () => (
    <footer>
        <div class="bg-gray-100 dark:bg-gray-900 text-center">
            <div class="container mx-auto px-6 pt-14 pb-12 flex flex-col items-center">
                <div class="pb-6 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    {t('footer_description_1')}
                </div>
                <div class="flex flex-wrap justify-center align-middle">
                    <Link href="https://www.typescriptlang.org/" classes="ic-link _ftr" newWindow>
                        <Icon src={typeScriptLogo} aria-label="TypeScript" width="32" height="32" />
                    </Link>
                    <Link href="https://preactjs.com/" classes="ic-link _ftr" newWindow>
                        <Icon src={preactLogo} aria-label="Preact" width="32" height="32" />
                    </Link>
                    <Link href="https://webpack.js.org/" classes="ic-link _ftr" newWindow>
                        <Icon src={webpackLogo} aria-label="Webpack" width="32" height="32" />
                    </Link>
                    <Link href="https://yarnpkg.com/" classes="ic-link _ftr" newWindow>
                        <Icon src={yarnLogo} aria-label="Yarn" width="32" height="32" />
                    </Link>
                    <Link href="https://eslint.org/" classes="ic-link _ftr" newWindow>
                        <Icon src={esLintLogo} aria-label="ESLint" width="32" height="32" />
                    </Link>
                    <Link href="https://stylelint.io/" classes="ic-link _ftr" newWindow>
                        <Icon src={styleLintLogo} aria-label="StyleLint" width="32" height="32" />
                    </Link>
                    <Link href="https://developers.google.com/web/tools/workbox" classes="ic-link _ftr" newWindow>
                        <Icon src={workboxLogo} aria-label="Workbox" width="32" height="32" />
                    </Link>
                    <Link href="https://tailwindcss.com/" classes="ic-link _ftr" newWindow>
                        <Icon src={tailwindLogo} aria-label="Tailwind CSS" width="32" height="32" />
                    </Link>
                    <Link href="https://prettier.io/" classes="ic-link _ftr" newWindow>
                        <Icon src={prettierLogo} aria-label="Prettier" width="32" height="32" />
                    </Link>
                    <Link href="https://jestjs.io/" classes="ic-link _ftr" newWindow>
                        <Icon src={jestLogo} aria-label="Jest" width="32" height="32" />
                    </Link>
                    <Link href="https://postcss.org/" classes="ic-link _ftr" newWindow>
                        <Icon src={postCSSLogo} aria-label="PostCSS" width="32" height="32" />
                    </Link>
                    <Link href="https://sass-lang.com/" classes="ic-link _ftr" newWindow>
                        <Icon src={sassLogo} aria-label="Sass" width="32" height="32" />
                    </Link>
                    <Link href="https://babeljs.io/" classes="ic-link _ftr" newWindow>
                        <Icon src={babelLogo} aria-label="Babel" width="60" height="32" />
                    </Link>
                </div>
            </div>
        </div>
        <div class="container mx-auto py-8 flex flex-col items-center text-center text-gray-500 dark:text-gray-400 text-xs">
            <p>{t('footer_description_2')}</p>
            <p class="pt-2">
                paulogoncalves.dev &copy; {initialYear} {currentYear > initialYear ? ` - ${currentYear}` : ''} 🙂
            </p>
        </div>
    </footer>
);
