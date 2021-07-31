import { h, FunctionalComponent } from 'preact';
import { route } from 'preact-router';
import { useContext } from 'preact/hooks';
import { AppContext } from '@/app/AppContext';
import { Language } from '@/app/language';
import { t, translations } from '@/modules/i18n';

const LanguageSelector: FunctionalComponent<{ classes?: string }> = ({ classes }) => {
    const { lang } = useContext(AppContext);

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
            class={`lang-sel text-sm bg-white dark:bg-gray-800 border-gray-800 hover:bg-gray-300 dark:hover:bg-gray-400 dark:border-white border-2 outline-none ${classes}`}
            onChange={onLanguageSelect}
        >
            {(Object.keys(translations) as Array<Language>).map((lang: Language) => renderOption(lang))}
        </select>
    );
};

export default LanguageSelector;
