import { h, Fragment, FunctionalComponent } from 'preact';
import { useTranslate } from '@/modules/i18n';
import { useLanguage } from '@/modules/language';
import { trackEvent } from '@/modules/tracking/ga4';
import { Icon } from '@/components/Icon';
import { Image } from '@/components/Image';
import { Markup } from '@/components/Markup';
import { Link } from '@/components/Link';
import meImg from '@/assets/img/paulo-goncalves.webp';
import meSmImg from '@/assets/img/paulo-goncalves_sm.webp';
import mailIcon from '@/assets/icons/mail.svg';

const calculateDuration = (startDate: string, t: (key: string) => string): string => {
    const start = new Date(startDate);
    const now = new Date();

    // Total months difference (LinkedIn-style inclusive month)
    const totalMonthsDiff = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1; // +1 month (inclusive)

    const totalYears = Math.floor(totalMonthsDiff / 12);
    const remainingMonths = totalMonthsDiff % 12;

    if (totalYears === 0) {
        return `${remainingMonths} ${
            remainingMonths === 1 ? t('home_page_duration_month') : t('home_page_duration_months')
        }`;
    }

    if (remainingMonths === 0) {
        return `${totalYears} ${totalYears === 1 ? t('home_page_duration_year') : t('home_page_duration_years')}`;
    }

    return `${totalYears} ${
        totalYears === 1 ? t('home_page_duration_year') : t('home_page_duration_years')
    } ${remainingMonths} ${remainingMonths === 1 ? t('home_page_duration_month') : t('home_page_duration_months')}`;
};

interface Experience {
    titleKey: string;
    datesKey: string;
    company: string;
    isCurrent?: boolean;
}

const experiences: Experience[] = [
    {
        titleKey: 'home_page_experience_jumia_title',
        datesKey: 'home_page_experience_jumia_dates',
        company: 'Jumia Porto Tech Center',
        isCurrent: true,
    },
    {
        titleKey: 'home_page_experience_jumia_manager_title',
        datesKey: 'home_page_experience_jumia_manager_dates',
        company: 'Jumia Porto Tech Center',
    },
    {
        titleKey: 'home_page_experience_jumia_lead_title',
        datesKey: 'home_page_experience_jumia_lead_dates',
        company: 'Jumia Porto Tech Center',
    },
    {
        titleKey: 'home_page_experience_jumia_senior_title',
        datesKey: 'home_page_experience_jumia_senior_dates',
        company: 'Jumia Porto Tech Center',
    },
    {
        titleKey: 'home_page_experience_jumia_rocket_title',
        datesKey: 'home_page_experience_jumia_rocket_dates',
        company: 'Rocket Internet GmbH',
    },
    {
        titleKey: 'home_page_experience_rocket_title',
        datesKey: 'home_page_experience_rocket_dates',
        company: 'Rocket Internet GmbH',
    },
    {
        titleKey: 'home_page_experience_myone_title',
        datesKey: 'home_page_experience_myone_dates',
        company: 'Myone - Comunicação Multimédia',
    },
    {
        titleKey: 'home_page_experience_medula_title',
        datesKey: 'home_page_experience_medula_dates',
        company: 'Medula - Design de Comunicação',
    },
];

const ExperienceItem = ({
    titleKey,
    datesKey,
    company,
    isCurrent,
}: Experience & { titleKey: string; datesKey: string; company: string; isCurrent?: boolean }) => {
    const { t } = useTranslate();
    const duration = isCurrent ? calculateDuration('2022-10-01', t) : null;

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
            <p class="text-stone-500 dark:text-zinc-400 text-xs mt-1">
                {duration ? t(datesKey, { duration }) : t(datesKey)}
            </p>
        </div>
    );
};

const HomePage: FunctionalComponent = () => {
    const { t } = useTranslate();
    const { lang } = useLanguage();

    return (
        <Fragment>
            <div class="px-6 py-20 flex flex-col items-center">
                <h1 class="text-3xl tracking-tight font-bold text-center op-1 sm:my-2 sm:text-5xl animate-fade-in-up animate-delay-1">
                    {t('home_page_title')}
                </h1>
                <h2 class="text-xl text-center lowercase op-1 sm:text-2xl animate-fade-in-up animate-delay-2">
                    {t('home_page_subtitle')}
                </h2>
                <div class="flex flex-col items-center sm:flex-row pt-14 space-y-8 sm:space-y-0">
                    <div class="shrink-0 op-1 animate-fade-in-down animate-delay-3">
                        <Image
                            classes="rounded-full shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] bg-white/30 border border-white/20"
                            src={meImg}
                            srcset={`${meSmImg}, ${meImg} 2x`}
                            width="200"
                            height="200"
                            alt=""
                            fetchpriority="high"
                        />
                    </div>
                    <div class="max-w-xs text-sm op-1 sm:pl-14 sm:max-w-md sm:pt-0 sm:text-base animate-fade-in-down animate-delay-4">
                        <p>{t('home_page_description_1')}</p>
                        <Markup data={t('home_page_description_2')} Element="p" />
                    </div>
                </div>
                <Link
                    useRouter
                    class="interactive interactive-icon sm:interactive-lg interactive-md mt-14 op-1 animate-fade-in-down animate-delay-5"
                    href={`/${lang}/contact/`}
                    onClick={(): void =>
                        trackEvent('link_click', {
                            link_name: 'Contact Me',
                            link_location: 'Home',
                        })
                    }
                >
                    <Icon src={mailIcon} ariaHidden />
                    <span>{t('home_page_contact_button_label')}</span>
                </Link>
            </div>
            <div class="px-6 py-14 pb-20 flex flex-col items-center text-center bg-white/20 dark:bg-zinc-900/15 shadow-xs shadow-black/5 border-t dark:border-white/15 border-white/80 ">
                <div class="op-1 animate-fade-in-down animate-delay-7 text-left max-w-xs sm:max-w-xl w-full">
                    <h2 class="text-xl sm:text-2xl mb-12 font-bold">{t('home_page_professional_experience')}</h2>
                    <div class="relative border-l-2 border-stone-300 dark:border-white/10 ml-3 space-y-8">
                        {experiences.map((exp) => (
                            <ExperienceItem key={exp.titleKey} {...exp} />
                        ))}
                    </div>
                    <p class="pt-12 text-sm">
                        {t(
                            'home_page_description_3',
                            {
                                link: (
                                    <Link
                                        href="https://pt.linkedin.com/in/paulogoncalvs"
                                        class="underline"
                                        newWindow
                                        onClick={(): void =>
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
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default HomePage;
