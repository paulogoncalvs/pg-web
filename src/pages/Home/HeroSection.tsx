import { h, FunctionalComponent } from 'preact';

import { useTranslate } from '@/modules/i18n';
import { useLanguage } from '@/modules/language';
import { trackEvent } from '@/modules/tracking/ga4';

import { Icon } from '@/components/Icon';
import { Image } from '@/components/Image';
import { Markup } from '@/components/Markup';
import { Link } from '@/components/Link';
import { Fade } from '@/components/Fade';

import meImg from '@/assets/img/paulo-goncalves.webp';
import mailIcon from '@/assets/icons/mail.svg';

export const HeroSection: FunctionalComponent = () => {
    const { t } = useTranslate();
    const { lang } = useLanguage();

    const handleContactClick = () =>
        trackEvent('link_click', {
            link_name: 'Contact Me',
            link_location: 'Home',
        });

    return (
        <section class="px-6 py-20 flex flex-col items-center">
            <Fade delay={1} Element="h1" classes="text-3xl sm:text-5xl font-bold tracking-tight text-center sm:my-2">
                {t('home_page_title')}
            </Fade>
            <Fade delay={2} Element="h1" classes="text-xl sm:text-2xl lowercase text-center">
                {t('home_page_subtitle')}
            </Fade>
            <div class="flex flex-col items-center sm:flex-row pt-14 space-y-8 sm:space-y-0">
                <Fade delay={3} direction="down" classes="shrink-0">
                    <Image
                        classes="rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] bg-white/30 border border-white/20"
                        src={meImg}
                        srcset={`${meImg} 2x`}
                        width="200"
                        height="200"
                        alt="portrait of Paulo Gonçalves"
                        fetchpriority="high"
                        lazy={false}
                    />
                </Fade>
                <Fade delay={4} direction="down" classes="max-w-xs sm:max-w-md sm:pl-14 text-sm sm:text-base">
                    <p>{t('home_page_description_1')}</p>
                    <Markup data={t('home_page_description_2')} Element="p" />
                </Fade>
            </div>
            <Fade delay={6} direction="up">
                <Link
                    useRouter
                    href={`/${lang}/contact/`}
                    class="interactive interactive-icon sm:interactive-lg interactive-md mt-14"
                    onClick={handleContactClick}
                >
                    <Icon src={mailIcon} ariaHidden />
                    <span>{t('home_page_contact_button_label')}</span>
                </Link>
            </Fade>
        </section>
    );
};
