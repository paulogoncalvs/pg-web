import { FunctionalComponent } from 'preact';

import { useTranslate } from '@/modules/i18n';
import { LANGUAGE_DEFAULT, useLanguage } from '@/modules/language';
import { trackEvent } from '@/modules/tracking/ga4';

import { Fade } from '@/components/Fade';
import { Link } from '@/components/Link';

interface Experience {
    titleKey: string;
    company: string;
    start: string;
    end?: string;
}

const calculateDuration = (startDate: string, endDate: string | undefined, t: (key: string) => string): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) {
        return `${months} ${months === 1 ? t('home_page_duration_month') : t('home_page_duration_months')}`;
    }

    if (months === 0) {
        return `${years} ${years === 1 ? t('home_page_duration_year') : t('home_page_duration_years')}`;
    }

    return `${years} ${years === 1 ? t('home_page_duration_year') : t('home_page_duration_years')} ${months} ${
        months === 1 ? t('home_page_duration_month') : t('home_page_duration_months')
    }`;
};

const formatDateRange = (
    start: string,
    end: string | undefined,
    duration: string,
    language: string = LANGUAGE_DEFAULT,
    t: (key: string) => string,
) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;

    const format = (date: Date) => date.toLocaleDateString(language, { month: 'short', year: 'numeric' });

    const startLabel = format(startDate);
    const endLabel = endDate ? format(endDate) : t('home_page_experience_present');

    return `${startLabel} – ${endLabel} · ${duration}`;
};

const experiences: Experience[] = [
    {
        titleKey: 'home_page_experience_jumia_title',
        company: 'Jumia Porto Tech Center',
        start: '2022-10-01',
    },
    {
        titleKey: 'home_page_experience_jumia_manager_title',
        company: 'Jumia Porto Tech Center',
        start: '2021-04-01',
        end: '2022-09-30',
    },
    {
        titleKey: 'home_page_experience_jumia_lead_title',
        company: 'Jumia Porto Tech Center',
        start: '2019-10-01',
        end: '2021-03-31',
    },
    {
        titleKey: 'home_page_experience_jumia_senior_title',
        company: 'Jumia Porto Tech Center',
        start: '2018-04-01',
        end: '2019-09-30',
    },
    {
        titleKey: 'home_page_experience_jumia_rocket_title',
        company: 'Rocket Internet GmbH',
        start: '2017-01-01',
        end: '2018-03-31',
    },
    {
        titleKey: 'home_page_experience_rocket_title',
        company: 'Rocket Internet GmbH',
        start: '2016-03-01',
        end: '2016-12-31',
    },
    {
        titleKey: 'home_page_experience_myone_title',
        company: 'Myone - Comunicação Multimédia',
        start: '2015-01-01',
        end: '2016-02-28',
    },
    {
        titleKey: 'home_page_experience_medula_title',
        company: 'Medula - Design de Comunicação',
        start: '2014-03-01',
        end: '2014-12-31',
    },
];

const ExperienceItem: FunctionalComponent<Experience> = ({ titleKey, company, start, end }) => {
    const { t } = useTranslate();
    const { lang } = useLanguage();

    const duration = calculateDuration(start, end, t);
    const dateRange = formatDateRange(start, end, duration, lang, t);

    const isCurrent = !end;

    return (
        <div class="relative pl-8">
            <span
                class={`absolute -left-2.25 top-1 w-4 h-4 rounded-full border-2 ${
                    isCurrent
                        ? 'bg-black dark:bg-white border-black/20 dark:border-white/20'
                        : 'bg-stone-100 dark:bg-zinc-700 border-stone-300 dark:border-white/10'
                }`}
            />

            <h3 class="font-semibold text-zinc-900 dark:text-white">{t(titleKey)}</h3>

            <p class="text-stone-700 dark:text-zinc-300 text-sm">{company}</p>

            <p class="text-stone-500 dark:text-zinc-400 text-xs mt-1">{dateRange}</p>
        </div>
    );
};

export const ExperienceTimeline: FunctionalComponent = () => {
    const { t } = useTranslate();

    return (
        <section class="px-6 py-14 pb-20 flex flex-col items-center text-center bg-white/20 dark:bg-zinc-900/15 shadow-xs shadow-black/5 border-t dark:border-white/15 border-white/80">
            <div class="text-left max-w-xs sm:max-w-xl w-full">
                <Fade delay={9} Element="h2" classes="text-xl sm:text-2xl mb-12 font-bold">
                    {t('home_page_professional_experience')}
                </Fade>

                <Fade
                    delay={9}
                    Element="div"
                    classes="relative border-l-2 border-stone-300 dark:border-white/10 ml-3 space-y-8"
                >
                    {experiences.map((exp, index) => (
                        <Fade key={exp.titleKey} delay={10 + 0.7 * index} direction="up">
                            <ExperienceItem key={exp.titleKey} {...exp} />
                        </Fade>
                    ))}
                </Fade>

                <Fade delay={11} Element="p" classes="pt-12 text-sm">
                    {t(
                        'home_page_description_3',
                        {
                            link: (
                                <Link
                                    href="https://pt.linkedin.com/in/paulogoncalvs"
                                    class="underline"
                                    newWindow
                                    onClick={() =>
                                        trackEvent('link_click', {
                                            link_name: 'LinkedIn',
                                            link_location: 'Home',
                                        })
                                    }
                                >
                                    {t('home_page_description_3_link_text')}
                                </Link>
                            ),
                        },
                        false,
                    )}
                </Fade>
            </div>
        </section>
    );
};
