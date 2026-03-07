import { h, FunctionalComponent, JSX } from 'preact';
import { useCallback } from 'preact/hooks';
import { classNames } from '@/utils/classNames';
import { Language } from '@/modules/language';
import { useTranslate, translations } from '@/modules/i18n';
import { useRouterLocation, useRouterRoute } from '@/modules/router';

interface LanguageSelectorProps {
    classes?: string;
}

export const LanguageSelector: FunctionalComponent<LanguageSelectorProps> = ({ classes }) => {
    const [, setLocation] = useRouterLocation();
    const { t, lang } = useTranslate();
    const [, params] = useRouterRoute('/:lang/*');

    const onLanguageSelect = useCallback(
        (event: Event): void => {
            const value = (event.target as HTMLInputElement).value as Language;

            setLocation(`/${value}/${params && params['*'] ? `${params['*']}` : ''}`);
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
            class={classNames('text-zinc-900 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800', classes)}
            id="language-selector"
            onChange={onLanguageSelect}
            aria-label={t('language_selection')}
        >
            {(Object.keys(translations) as Array<Language>).map((lang: Language) => renderOption(lang))}
        </select>
    );
};

export default LanguageSelector;
