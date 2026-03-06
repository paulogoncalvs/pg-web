import { h, FunctionalComponent, RefObject } from 'preact';
import { useRef } from 'preact/hooks';
import { useLocation } from 'wouter-preact';
import { useTranslate } from '@/modules/i18n';
import { useLanguage } from '@/modules/language';
import { trackEvent } from '@/modules/tracking/ga4';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
import { toggleOverlay } from '@/components/Overlay';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ToggleTheme } from '@/components/ToggleTheme';
import { SocialLinks } from '@/components/SocialLinks/index';
import closeIcon from '@/assets/icons/close.svg';

let sideDrawerInputEl: RefObject<HTMLInputElement> | null;

const sideDrawerOnChange = (): void => {
    toggleOverlay();
};

const menuItemOnClick = (trackingData: { category: string; label: string }): void => {
    trackEvent('link_click', {
        link_location: trackingData.category,
        link_name: trackingData.label,
    });
};

export const toggleSideDrawer = (shouldShow?: boolean | undefined): void => {
    const node = sideDrawerInputEl?.current; // DOM Ref

    if (
        node &&
        (typeof shouldShow === 'undefined' ||
            (typeof shouldShow === 'boolean' &&
                ((shouldShow === false && node.checked) || (shouldShow === true && !node.checked))))
    ) {
        node.click();
    }
};

export const SideDrawer: FunctionalComponent = () => {
    const { t } = useTranslate();
    const { lang } = useLanguage();
    const [location] = useLocation();
    sideDrawerInputEl = useRef<HTMLInputElement>(null);

    return (
        <aside>
            <input
                class="peer hidden"
                type="checkbox"
                id="sd-tog"
                onChange={sideDrawerOnChange}
                ref={sideDrawerInputEl}
            />
            <div class="sd dark:bg-zinc-900/30 border-b rounded-tl-xl rounded-bl-xl shadow-xl backdrop-blur-md bg-white/30 border-l dark:border-white/10 border-white/50 top-0 right-0 w-[65vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw] fixed h-full z-40 ease-in-out duration-300 flex flex-col overflow-y-auto translate-x-full peer-checked:translate-x-0 transition-transform">
                <div class="flex pt-4 pb-5 mb-5 pl-8 pr-8 sm:pl-10 sm:pr-10 items-center">
                    <div>
                        <LanguageSelector classes="ml-2 mr-6" />
                    </div>
                    <ToggleTheme classes="p-2" />
                    {}
                    <label htmlFor="sd-tog" class="icon-link ml-auto">
                        <Icon src={closeIcon} ariaHidden />
                    </label>
                </div>
                <div class="flex flex-col pl-10 pr-10">
                    <Link
                        useRouter
                        aria-current={location === `/${lang}/` || location === `/` ? 'page' : undefined}
                        class="interactive interactive-md"
                        href={`/${lang}/`}
                        onClick={(): void =>
                            menuItemOnClick({
                                category: 'SideDrawer Menu Link',
                                label: 'Home',
                            })
                        }
                    >
                        <span>{t('sidedrawer_menu_link_home')}</span>
                    </Link>
                    <Link
                        useRouter
                        aria-current={location === `/${lang}/contact/` ? 'page' : undefined}
                        class="interactive interactive-md mt-4"
                        href={`/${lang}/contact/`}
                        onClick={(): void =>
                            menuItemOnClick({
                                category: 'SideDrawer Menu Link',
                                label: 'Contact',
                            })
                        }
                    >
                        <span>{t('sidedrawer_menu_link_contact')}</span>
                    </Link>
                </div>
                <div class="flex pt-10 pb-4 pl-8 pr-8 sm:pl-10 sm:pr-10 mx-auto mt-auto">
                    <SocialLinks />
                </div>
            </div>
        </aside>
    );
};
