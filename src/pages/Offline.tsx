import { h, Fragment, FunctionalComponent } from 'preact';
import { useTranslate } from '@/modules/i18n';
import { useLanguage } from '@/modules/language';
import { Link } from '@/components/Link';
import { Markup } from '@/components/Markup';

const OfflinePage: FunctionalComponent = () => {
    const { t } = useTranslate();
    const { lang } = useLanguage();

    return (
        <Fragment>
            <div class="p-6 pt-20 pb-20 flex flex-col items-center">
                <h1 class="text-3xl tracking-tight font-bold text-center op-1 sm:my-2 sm:text-5xl animate-fade-in-up animate-delay-1">
                    {t('offline_page_title')}
                </h1>
                <h2 class="text-2xl tracking-tight text-center lowercase op-1 sm:text-3xl animate-fade-in-up animate-delay-2 pb-8">
                    {t('offline_page_subtitle')}
                </h2>
                <Markup
                    data={t('offline_page_description')}
                    Element="p"
                    classes="text-l op-1 animate-fade-in-down animate-delay-4 pb-14 text-center"
                />
                <div class="op-1 animate-fade-in-down animate-delay-3">
                    <Link useRouter class="interactive interactive-lg" href={`/${lang}/`}>
                        <span>{t('offline_page_button_label')}</span>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

export default OfflinePage;
