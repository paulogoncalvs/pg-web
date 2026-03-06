import { h, Fragment, FunctionalComponent } from 'preact';
import { useTranslate } from '@/modules/i18n';
import { useLanguage } from '@/modules/language';
import { Link } from '@/components/Link';

const NotFoundPage: FunctionalComponent = () => {
    const { t } = useTranslate();
    const { lang } = useLanguage();

    return (
        <Fragment>
            <div class="p-6 pt-20 pb-20 flex flex-col items-center">
                <h1 class="text-3xl tracking-tight font-bold text-center op-1 sm:my-2 sm:text-5xl animate-fade-in-up animate-delay-1">
                    {t('not_found_page_title')}
                </h1>
                <h2 class="text-xl tracking-tight text-center lowercase op-1 sm:text-2xl animate-fade-in-up animate-delay-2 pb-14">
                    {t('not_found_page_subtitle')}
                </h2>
                <div class="op-1 animate-fade-in-down animate-delay-3">
                    <Link useRouter class="interactive interactive-lg" href={`/${lang}/`}>
                        <span>{t('not_found_page_button_label')}</span>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

export default NotFoundPage;
