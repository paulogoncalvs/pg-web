import { h, FunctionalComponent } from 'preact';
import { route } from 'preact-router';
import { Language } from '@/modules/language';
import { useTranslate, translations } from '@/modules/i18n';
import classNames from 'classnames';

const LanguageSelector: FunctionalComponent<{ classes?: string }> = ({ classes }) => {
    const { t, lang } = useTranslate();

    // @todo language
    const onLanguageSelect = (event: Event): void => {
        const value = (event.target as HTMLInputElement).value as Language;

        // @todo remove replace
        route(`/${value}/`, true);
    };

    const renderOption = (code: Language): JSX.Element => (
        <option value={code} selected={code === lang}>
            {t(`language_${code}`)}
        </option>
    );

    return (
        <select
            key={`lang-${lang}`}
            class={classNames(
                'lang-sel text-sm bg-white border-gray-800 hover:bg-gray-300 hover:text-black focus:bg-gray-300 border-2 focus:text-black',
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
