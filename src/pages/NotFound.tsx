import { h, Fragment, FunctionalComponent } from 'preact';
import { Link as WLink } from 'wouter-preact';
import { useTranslate } from '@/modules/i18n';
import { useLanguage } from '@/modules/language';
import { Link } from '@/components/Link';

const NotFoundPage: FunctionalComponent = () => {
    const { t } = useTranslate();
    const { lang } = useLanguage();

    return (
        <Fragment>
            <div class="flex flex-col items-center">
                <h1 class="text-3xl tracking-tight font-bold text-center opacity-0 sm:my-2 sm:text-5xl animate-fade-in-up-1">
                    {t('not_found_page_title')}
                </h1>
                <h2 class="text-2xl tracking-tight text-center lowercase opacity-0 sm:text-3xl animate-fade-in-up-2 pb-14">
                    {t('not_found_page_subtitle')}
                </h2>
                <div class="opacity-0 animate-fade-in-dw-3">
                    <WLink href={`/${lang}/`}>
                        <Link class="btn _prim">
                            <span>{t('not_found_page_button_label')}</span>
                        </Link>
                    </WLink>
                </div>
            </div>
        </Fragment>
    );
};

export default NotFoundPage;
