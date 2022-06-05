import { h, FunctionalComponent } from 'preact';
import { useTranslate } from '@/modules/i18n';
import { trackEvent } from '@/modules/tracking/ga4';
import { Icon } from '@/components/Icon';
import { Image } from '@/components/Image';
import { Markup } from '@/components/Markup';
import { Link } from '@/components/Link';
import meImg from '@/assets/img/paulo-goncalves.jpeg';
import meSmImg from '@/assets/img/paulo-goncalves_sm.jpeg';
import mailIcon from '@/assets/icons/mail.svg';

const HomePage: FunctionalComponent = () => {
    const { t } = useTranslate();

    return (
        <div class="container px-6 pt-8 pb-8 mx-auto sm:pb-16">
            <div class="flex flex-col items-center">
                <h1 class="text-3xl font-black text-center opacity-0 sm:my-2 sm:text-5xl animate-fade-in-up-1">
                    {t('home_page_title')}
                </h1>
                <h2 class="text-2xl text-center lowercase opacity-0 sm:text-4xl animate-fade-in-up-2 pb-14">
                    {t('home_page_subtitle')}
                </h2>
                <div class="flex flex-col items-center sm:pt-14 pb-14 sm:flex-row">
                    <div class="flex-shrink-0 opacity-0 animate-fade-in-dw-3">
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
                    <div class="max-w-xs text-sm opacity-0 sm:pl-14 space-y-4 sm:text-base sm:max-w-md pt-14 sm:pt-0 animate-fade-in-dw-4">
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
                <div class="pb-8 opacity-0 sm:pt-8 animate-fade-in-dw-5">
                    <h2 class="pb-4 text-base font-bold sm:text-xl">{t('home_page_email_button_title')}</h2>
                    <Link
                        href="mailto:contact@paulogoncalves.dev"
                        class="btn _i _prim"
                        onClick={(): void =>
                            trackEvent(
                                {
                                    category: 'Home Link',
                                    label: 'E-mail Me',
                                },
                                'link_click',
                            )
                        }
                    >
                        <Icon src={mailIcon} classes="" ariaHidden />
                        <span>{t('home_page_email_button_label')}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
