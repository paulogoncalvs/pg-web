import { h, FunctionalComponent } from 'preact';
import { Icon } from '@/components/Icon';
import { Image } from '@/components/Image';
import { useTranslate } from '@/modules/i18n';
import meImg from '@/assets/img/me.jpeg';
import meSmImg from '@/assets/img/me_sm.jpeg';
import mailIcon from '@/assets/icons/mail.svg';

export const Home: FunctionalComponent = () => {
    const { t } = useTranslate();

    return (
        <div class="container mx-auto px-6 py-4 sm:py-8">
            <div class="flex flex-col items-center text-center">
                <h1 class="sm:my-2 text-2xl sm:text-5xl font-black animate-fade-in-up-1 opacity-0">PAULO GONÇALVES</h1>
                <h2 class="text-xl sm:text-4xl animate-fade-in-up-2 opacity-0 pb-14 lowercase">Front-End Engineer</h2>
                <Image
                    classes="rounded-full"
                    src={meImg}
                    srcset={`${meSmImg}, ${meImg} 2x`}
                    width="230"
                    height="230"
                    alt=""
                    isLazy
                />
                <div class="py-14 text-center space-y-2 text-sm sm:text-base">
                    <p>{t('home_page_description_1')}</p>
                    <p>{t('home_page_description_2')}</p>
                    <p>
                        {t(
                            'home_page_description_3',
                            {
                                link: (
                                    <a
                                        href="https://pt.linkedin.com/in/paulogoncalvs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="underline"
                                    >
                                        {t('home_page_description_3_link_text')}
                                    </a>
                                ),
                            },
                            false,
                        )}
                    </p>
                </div>
                <div class="pb-14">
                    <h2 class="text-base sm:text-xl font-bold pb-4">{t('home_page_email_button_title')}</h2>
                    <a
                        href="mailto:contact@paulogoncalves.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="transition transform duration-100 hover:translate-x-1 inline-flex px-4 py-2 sm:py-3 items-center justify-center rounded-full shadow-md bg-gradient-to-r from-green-300 via-green-100 to-green-100 hover:from-green-300 hover:via-green-050 hover:to-green-050"
                    >
                        <Icon src={mailIcon} classes="" ariaHidden />
                        <span class="pl-2 sm:text-xl text-gray-900 dark:text-gray-900">
                            {t('home_page_email_button_label')}
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};
