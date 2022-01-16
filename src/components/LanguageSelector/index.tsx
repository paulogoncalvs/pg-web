import { h, FunctionalComponent } from 'preact';
import { useCallback } from 'preact/hooks';
import classNames from 'classnames';
import { Language } from '@/modules/language';
import { useTranslate, translations } from '@/modules/i18n';
import { useRouterLocation, useRouterRoute } from '@/modules/router';

interface LanguageSelectorProps {
    classes?: string;
}

const LanguageSelector: FunctionalComponent<LanguageSelectorProps> = ({ classes }) => {
    const [, setLocation] = useRouterLocation();
    const { t, lang } = useTranslate();
    const [, params] = useRouterRoute('/:lang/:path*');

    const onLanguageSelect = useCallback(
        (event: Event): void => {
            const value = (event.target as HTMLInputElement).value as Language;

            setLocation(`/${value}/${params?.path ? `${params.path}` : ''}`);
        },
        [setLocation, params],
    );

    const renderOption = useCallback(
        (code: Language): JSX.Element => (
            <option value={code} selected={code === lang}>
                {t(`language_${code}`)}
            </option>
        ),
        [lang, t],
    );

    return (
        <select
            key={`lang-${lang}`}
            class={classNames(
                'py-1 text-sm text-zinc-900 dark:text-zinc-200 bg-white dark:bg-zinc-900 border-zinc-800 dark:border-zinc-200 border-2 font-sans',
                classes,
            )}
            onChange={onLanguageSelect}
            aria-label={t('language_selection')}
        >
            {(Object.keys(translations) as Array<Language>).map((lang: Language) => renderOption(lang))}
        </select>
    );
};

export default LanguageSelector;
