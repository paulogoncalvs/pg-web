import { h, FunctionalComponent, RefObject } from 'preact';
import { useRef } from 'preact/hooks';
import { Link as WLink } from 'wouter-preact';
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
    trackEvent(trackingData, 'link_click');
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
    sideDrawerInputEl = useRef<HTMLInputElement>(null);

    return (
        <aside>
            <input
                class="sd-tog hidden"
                type="checkbox"
                id="sd-tog"
                onChange={sideDrawerOnChange}
                ref={sideDrawerInputEl}
            />
            <div class="sd shadow-sm top-0 right-0 w-[65vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw] bg-zinc-100 dark:bg-zinc-800 fixed h-full z-40 ease-in-out duration-300 flex flex-col overflow-y-auto translate-x-full">
                <div class="flex pt-4 pb-5 mb-5 pl-8 pr-8 sm:pl-10 sm:pr-10 items-center">
                    <div>
                        <LanguageSelector classes="ml-2 mr-6" />
                    </div>
                    <ToggleTheme classes="p-2" />
                    <label htmlFor="sd-tog" class="ic-link cursor-pointer ml-auto">
                        <Icon src={closeIcon} ariaHidden />
                    </label>
                </div>
                <div class="flex flex-col pl-10 pr-10">
                    <WLink
                        href={`/${lang}/`}
                        onClick={(): void =>
                            menuItemOnClick({
                                category: 'SideDrawer Menu Link',
                                label: 'Home',
                            })
                        }
                    >
                        <Link class="btn _prim">
                            <span>{t('sidedrawer_menu_link_home')}</span>
                        </Link>
                    </WLink>
                    <WLink
                        href={`/${lang}/contact/`}
                        onClick={(): void =>
                            menuItemOnClick({
                                category: 'SideDrawer Menu Link',
                                label: 'Contact',
                            })
                        }
                    >
                        <Link class="btn _prim mt-4">
                            <span>{t('sidedrawer_menu_link_contact')}</span>
                        </Link>
                    </WLink>
                </div>
                <div class="flex pt-10 pb-4 pl-8 pr-8 sm:pl-10 sm:pr-10 mx-auto mt-auto">
                    <SocialLinks />
                </div>
            </div>
        </aside>
    );
};
