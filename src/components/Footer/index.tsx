import { h, FunctionalComponent } from 'preact';
import { useTranslate } from '@/modules/i18n';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
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
import axeLogo from '@/assets/icons/logos/axe.svg';
import gaLogo from '@/assets/icons/logos/ga.svg';
import playwrigthLogo from '@/assets/icons/logos/playwright.svg';

const initialYear = 2021;
const currentYear = new Date().getFullYear();

export const Footer: FunctionalComponent = () => {
    const { t } = useTranslate();

    return (
        <footer>
            <div class="text-center bg-zinc-100 dark:bg-zinc-800">
                <div class="container flex flex-col items-center px-6 pt-16 mx-auto pb-14">
                    <div class="pb-6 text-sm sm:text-base">{t('footer_description_1')}</div>
                    <div class="flex flex-wrap justify-center align-middle">
                        <Link
                            href="https://www.typescriptlang.org/"
                            class="ic-link _ftr"
                            ariaLabel="TypeScript"
                            newWindow
                        >
                            <Icon src={typeScriptLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://preactjs.com/" class="ic-link _ftr" ariaLabel="Preact" newWindow>
                            <Icon src={preactLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://webpack.js.org/" class="ic-link _ftr" ariaLabel="Webpack" newWindow>
                            <Icon src={webpackLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://yarnpkg.com/" class="ic-link _ftr" ariaLabel="Yarn" newWindow>
                            <Icon src={yarnLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://eslint.org/" class="ic-link _ftr" ariaLabel="ESLint" newWindow>
                            <Icon src={esLintLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://stylelint.io/" class="ic-link _ftr" ariaLabel="StyleLint" newWindow>
                            <Icon src={styleLintLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link
                            href="https://developers.google.com/web/tools/workbox"
                            class="ic-link _ftr"
                            ariaLabel="Workbox"
                            newWindow
                        >
                            <Icon src={workboxLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link
                            href="https://analytics.google.com/"
                            class="ic-link _ftr"
                            ariaLabel="Google Analytics"
                            newWindow
                        >
                            <Icon src={gaLogo} width="28" height="28" ariaHidden />
                        </Link>
                        <Link href="https://tailwindcss.com/" class="ic-link _ftr" ariaLabel="Tailwind CSS" newWindow>
                            <Icon src={tailwindLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://playwright.dev/" class="ic-link _ftr" ariaLabel="Playwright" newWindow>
                            <Icon src={playwrigthLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://jestjs.io/" class="ic-link _ftr" ariaLabel="Jest" newWindow>
                            <Icon src={jestLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://prettier.io/" class="ic-link _ftr" ariaLabel="Prettier" newWindow>
                            <Icon src={prettierLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://postcss.org/" class="ic-link _ftr" ariaLabel="PostCSS" newWindow>
                            <Icon src={postCSSLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://www.deque.com/axe/" class="ic-link _ftr" ariaLabel="Axe" newWindow>
                            <Icon src={axeLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://sass-lang.com/" class="ic-link _ftr" ariaLabel="Sass" newWindow>
                            <Icon src={sassLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://babeljs.io/" class="ic-link _ftr" ariaLabel="Babel" newWindow>
                            <Icon src={babelLogo} width="60" height="32" ariaHidden />
                        </Link>
                    </div>
                </div>
            </div>
            <div class="container flex flex-col items-center py-8 mx-auto text-xs text-center sm:py-16 text-zinc-500">
                <p>{t('footer_description_2')}</p>
                <p class="pt-2">
                    paulogoncalves.dev &copy; {initialYear} {currentYear > initialYear ? ` - ${currentYear}` : ''} 🙂
                </p>
            </div>
        </footer>
    );
};
