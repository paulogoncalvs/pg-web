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
            <div class="flex flex-col items-center">
                <h1 class="text-3xl tracking-tight font-bold text-center opacity-1 sm:my-2 sm:text-5xl animate-fade-in-up-1">
                    {t('offline_page_title')}
                </h1>
                <h2 class="text-2xl tracking-tight text-center lowercase opacity-1 sm:text-3xl animate-fade-in-up-2 pb-8">
                    {t('offline_page_subtitle')}
                </h2>
                <Markup
                    data={t('offline_page_description')}
                    Element="p"
                    classes="text-l opacity-1 animate-fade-in-dw-4 pb-14 text-center"
                />
                <div class="opacity-1 animate-fade-in-dw-3">
                    <Link useRouter class="btn _prim" href={`/${lang}/`}>
                        <span>{t('offline_page_button_label')}</span>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

export default OfflinePage;
