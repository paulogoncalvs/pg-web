import { h, FunctionalComponent } from 'preact';
import { Link as WLink } from 'wouter-preact';
import { useRef, useContext } from 'preact/hooks';
import routesConfig from '@/config/routes/index.js';
import { useTranslate } from '@/modules/i18n';
import { StoreContext } from '@/modules/store';
import { Icon } from '@/components/Icon';
import { SocialLinks } from '@/components/SocialLinks';
import burgerIcon from '@/assets/icons/burger.svg';

export const Header: FunctionalComponent = () => {
    const labelEl = useRef<HTMLLabelElement>(null);
    const { url } = useContext(StoreContext);
    const { t } = useTranslate();
    const isHome = routesConfig[url]?.templateParameters?.View === 'Home';

    return (
        <header class="sticky top-0 z-10 bg-white dark:bg-zinc-900 bg-opacity-95 dark:bg-opacity-95 dark:border-b dark:border-b-zinc-800 shadow-xl">
            <div class="container py-4 px-6 mx-auto flex items-center justify-between">
                <div class="flex items-center">
                    {!isHome && (
                        <WLink href="/" class="text-xl font-bold tracking-tight">
                            {t('home_page_title')}
                        </WLink>
                    )}
                    {isHome && <SocialLinks />}
                </div>
                <div class="flex justify-end">
                    {/* @ts-ignore-begin */}
                    <label
                        htmlFor="sd-tog"
                        class="ic-link cursor-pointer"
                        ref={labelEl}
                        aria-label={t('sidedrawer_toggle')}
                    >
                        <Icon src={burgerIcon} ariaHidden />
                    </label>
                    {/* @ts-ignore-end */}
                </div>
            </div>
        </header>
    );
};
