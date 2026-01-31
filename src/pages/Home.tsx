import { h, Fragment, FunctionalComponent } from 'preact';
import { useTranslate } from '@/modules/i18n';
import { useLanguage } from '@/modules/language';
import { trackEvent } from '@/modules/tracking/ga4';
import { Icon } from '@/components/Icon';
import { Image } from '@/components/Image';
import { Markup } from '@/components/Markup';
import { Link } from '@/components/Link';
import meImg from '@/assets/img/paulo-goncalves.webp';
import meSmImg from '@/assets/img/paulo-goncalves_sm.webp';
import mailIcon from '@/assets/icons/mail.svg';

const HomePage: FunctionalComponent = () => {
    const { t } = useTranslate();
    const { lang } = useLanguage();

    return (
        <Fragment>
            <div class="flex flex-col items-center">
                <h1 class="text-3xl tracking-tight font-bold text-center opacity-1 sm:my-2 sm:text-5xl animate-fade-in-up-1">
                    {t('home_page_title')}
                </h1>
                <h2 class="text-xl text-center lowercase opacity-1 sm:text-2xl animate-fade-in-up-2">
                    {t('home_page_subtitle')}
                </h2>
                <div class="flex flex-col items-center pt-14 pb-14 sm:flex-row">
                    <div class="shrink-0 opacity-1 animate-fade-in-dw-3">
                        <Image
                            classes="rounded-full shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] bg-white/30 border border-white/20"
                            src={meImg}
                            srcset={`${meSmImg}, ${meImg} 2x`}
                            width="200"
                            height="200"
                            alt=""
                            fetchpriority="high"
                        />
                    </div>
                    <div class="max-w-xs text-sm opacity-1 sm:pl-14 space-y-4 sm:max-w-md pt-14 sm:pt-0 animate-fade-in-dw-4 sm:text-base">
                        <p>{t('home_page_description_1')}</p>
                        <Markup data={t('home_page_description_2')} Element="p" />
                        <p>
                            {t(
                                'home_page_description_3',
                                {
                                    link: (
                                        <Link
                                            href="https://pt.linkedin.com/in/paulogoncalvs"
                                            class="underline"
                                            newWindow
                                            onClick={(): void =>
                                                trackEvent(
                                                    {
                                                        category: 'Home Link',
                                                        label: 'LinkedIn',
                                                    },
                                                    'link_click',
                                                )
                                            }
                                        >
                                            {t('home_page_description_3_link_text')}
                                        </Link>
                                    ),
                                },
                                false,
                            )}
                        </p>
                    </div>
                </div>
                <div class="opacity-1 animate-fade-in-dw-5 text-center">
                    <Link
                        useRouter
                        class="btn _i"
                        href={`/${lang}/contact/`}
                        onClick={(): void =>
                            trackEvent(
                                {
                                    category: 'Home Link',
                                    label: 'Contact Me',
                                },
                                'link_click',
                            )
                        }
                    >
                        <Icon src={mailIcon} ariaHidden />
                        <span>{t('home_page_contact_button_label')}</span>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

export default HomePage;
