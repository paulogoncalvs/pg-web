import { h, FunctionalComponent } from 'preact';
import { Link as WLink } from 'wouter-preact';
import { useTranslate } from '@/modules/i18n';
import { useLanguage } from '@/modules/language';
import { Link } from '@/components/Link';

const NotFoundPage: FunctionalComponent = () => {
    const { t } = useTranslate();
    const { lang } = useLanguage();

    return (
        <div class="container px-6 pt-8 pb-8 mx-auto sm:pb-16">
            <div class="flex flex-col items-center">
                <h1 class="text-3xl font-black text-center opacity-0 sm:my-2 sm:text-5xl animate-fade-in-up-1">
                    {t('not_found_page_title')}
                </h1>
                <h2 class="text-2xl text-center lowercase opacity-0 sm:text-4xl animate-fade-in-up-2 pb-14">
                    {t('not_found_page_subtitle')}
                </h2>
                <WLink href={`/${lang}/`}>
                    <Link href={`/${lang}/`} class="opacity-0 btn _prim animate-fade-in-dw-3">
                        <span>{t('not_found_page_button_label')}</span>
                    </Link>
                </WLink>
            </div>
        </div>
    );
};

export default NotFoundPage;
