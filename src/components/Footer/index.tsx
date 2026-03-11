import { h, FunctionalComponent } from 'preact';
import { useTranslate } from '@/modules/i18n';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
import preactLogo from '@/assets/icons/logos/preact.svg';
import webpackLogo from '@/assets/icons/logos/webpack.svg';
import tailwindLogo from '@/assets/icons/logos/tailwind.svg';
import esbuildLogo from '@/assets/icons/logos/esbuild.svg';
import esLintLogo from '@/assets/icons/logos/eslint.svg';
import postCSSLogo from '@/assets/icons/logos/postcss.svg';
import prettierLogo from '@/assets/icons/logos/prettier.svg';
import styleLintLogo from '@/assets/icons/logos/stylelint.svg';
import typeScriptLogo from '@/assets/icons/logos/typescript.svg';
import pnpmLogo from '@/assets/icons/logos/pnpm.svg';
import workboxLogo from '@/assets/icons/logos/workbox.svg';
import jestLogo from '@/assets/icons/logos/jest.svg';
import axeLogo from '@/assets/icons/logos/axe.svg';
import gaLogo from '@/assets/icons/logos/ga.svg';
import playwrigthLogo from '@/assets/icons/logos/playwright.svg';
import { trackEvent } from '@/modules/tracking/ga4';

const initialYear = 2021;
const currentYear = new Date().getFullYear();

export const Footer: FunctionalComponent = () => {
    const { t } = useTranslate();

    return (
        <footer>
            <div class="text-center bg-white/20 dark:bg-zinc-900/35 shadow-xs shadow-black/5 border dark:border-white/15 border-white/80 border-l-0 border-r-0 p-6">
                <div class="container flex flex-col items-center px-6 pt-10 mx-auto pb-8">
                    <p class="text-sm font-bold pb-4">{t('footer_description_2')}</p>
                    <div class="flex flex-wrap justify-center align-middle">
                        <Link
                            href="https://www.typescriptlang.org/"
                            class="icon-link translate-up"
                            ariaLabel="TypeScript"
                            newWindow
                        >
                            <Icon src={typeScriptLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://preactjs.com/" class="icon-link translate-up" ariaLabel="Preact" newWindow>
                            <Icon src={preactLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link
                            href="https://webpack.js.org/"
                            class="icon-link translate-up"
                            ariaLabel="Webpack"
                            newWindow
                        >
                            <Icon src={webpackLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://pnpm.io/" class="icon-link translate-up" ariaLabel="pnpm" newWindow>
                            <Icon src={pnpmLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://eslint.org/" class="icon-link translate-up" ariaLabel="ESLint" newWindow>
                            <Icon src={esLintLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link
                            href="https://stylelint.io/"
                            class="icon-link translate-up"
                            ariaLabel="StyleLint"
                            newWindow
                        >
                            <Icon src={styleLintLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link
                            href="https://developers.google.com/web/tools/workbox"
                            class="icon-link translate-up"
                            ariaLabel="Workbox"
                            newWindow
                        >
                            <Icon src={workboxLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link
                            href="https://esbuild.github.io/"
                            class="icon-link translate-up"
                            ariaLabel="esbuilld"
                            newWindow
                        >
                            <Icon src={esbuildLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link
                            href="https://analytics.google.com/"
                            class="icon-link translate-up"
                            ariaLabel="Google Analytics"
                            newWindow
                        >
                            <Icon src={gaLogo} width="28" height="28" ariaHidden />
                        </Link>
                        <Link
                            href="https://tailwindcss.com/"
                            class="icon-link translate-up"
                            ariaLabel="Tailwind CSS"
                            newWindow
                        >
                            <Icon src={tailwindLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link
                            href="https://playwright.dev/"
                            class="icon-link translate-up"
                            ariaLabel="Playwright"
                            newWindow
                        >
                            <Icon src={playwrigthLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://jestjs.io/" class="icon-link translate-up" ariaLabel="Jest" newWindow>
                            <Icon src={jestLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://prettier.io/" class="icon-link translate-up" ariaLabel="Prettier" newWindow>
                            <Icon src={prettierLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link href="https://postcss.org/" class="icon-link translate-up" ariaLabel="PostCSS" newWindow>
                            <Icon src={postCSSLogo} width="32" height="32" ariaHidden />
                        </Link>
                        <Link
                            href="https://www.deque.com/axe/"
                            class="icon-link translate-up"
                            ariaLabel="Axe"
                            newWindow
                        >
                            <Icon src={axeLogo} width="32" height="32" ariaHidden />
                        </Link>
                    </div>
                    <p class="text-xs pt-4">
                        {t(
                            'footer_description_1',
                            {
                                link: (
                                    <Link
                                        href="https://github.com/paulogoncalvs/pg-web"
                                        class="underline"
                                        newWindow
                                        onClick={(): void =>
                                            trackEvent('link_click', {
                                                link_name: 'GitHub',
                                                link_location: 'Footer',
                                            })
                                        }
                                    >
                                        {t('footer_description_1_link_text')}
                                    </Link>
                                ),
                            },
                            false,
                        )}
                    </p>
                </div>
            </div>
            <div class="container flex flex-col items-center py-20 mx-auto text-xs text-center">
                <p>{t('footer_description_3')}</p>
                <p class="pt-2 font-bold">
                    paulogoncalves.dev &copy; {initialYear} {currentYear > initialYear ? `- ${currentYear}` : ''}
                </p>
            </div>
        </footer>
    );
};
