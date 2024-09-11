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
                <h2 class="text-2xl tracking-tight text-center lowercase opacity-1 sm:text-3xl animate-fade-in-up-2 pb-14">
                    {t('home_page_subtitle')}
                </h2>
                <div class="flex flex-col items-center sm:pt-14 pb-14 sm:flex-row">
                    <div class="flex-shrink-0 opacity-1 animate-fade-in-dw-3">
                        <Image
                            classes="rounded-full"
                            src={meImg}
                            srcset={`${meSmImg}, ${meImg} 2x`}
                            width="180"
                            height="180"
                            alt=""
                            isLazy
                        />
                    </div>
                    <div class="max-w-xs text-sm opacity-1 sm:pl-14 space-y-4 sm:text-base sm:max-w-md pt-14 sm:pt-0 animate-fade-in-dw-4">
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
                <div class="pb-8 opacity-1 sm:pt-8 animate-fade-in-dw-5 text-center">
                    <h2 class="pb-4 text-base font-bold sm:text-xl">{t('home_page_contact_button_title')}</h2>
                    <Link
                        useRouter
                        class="btn _i _prim"
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
                        <Icon src={mailIcon} classes="" ariaHidden />
                        <span>{t('home_page_contact_button_label')}</span>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

export default HomePage;
