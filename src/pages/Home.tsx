import { h, FunctionalComponent } from 'preact';
import { Icon } from '@/components/Icon';
import { Image } from '@/components/Image';
import { t } from '@/modules/i18n';
import /* webpackPrefetch: true */ meImg from '@/assets/img/me.jpeg';
import /* webpackPrefetch: true */ meSmImg from '@/assets/img/me_sm.jpeg';
import mailIcon from '@/assets/icons/mail.svg';

export const Home: FunctionalComponent = () => (
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
                    {t('home_page_description_3_part_1')}
                    <a
                        href="https://pt.linkedin.com/in/paulogoncalvs"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline"
                    >
                        {t('home_page_description_3_part_2')}
                    </a>
                    {t('home_page_description_3_part_3')}
                </p>
            </div>
            <div class="pb-14">
                <h2 class="text-base sm:text-xl font-bold pb-4">{t('home_page_email_button_title')}</h2>
                <a
                    href="mailto:contact@paulogoncalves.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="transition transform duration-100 hover:translate-x-1 inline-flex px-4  text-gray-900 py-2 sm:py-3 items-center justify-center rounded-full shadow-md bg-gradient-to-r from-green-300 via-green-100 to-green-100 hover:from-green-300 hover:via-green-050 hover:to-green-050"
                >
                    <Icon src={mailIcon} />
                    <span class="pl-2 sm:text-xl">{t('home_page_email_button_label')}</span>
                </a>
            </div>
        </div>
    </div>
);
