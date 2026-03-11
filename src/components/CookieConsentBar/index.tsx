import { h, FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useTranslate } from '@/modules/i18n';
import { updateConsent } from '@/modules/tracking/ga4';
import { getCookieConsent, setCookieConsent, CookieConsent } from '@/modules/cookieConsent';

const GA_MEASUREMENT_ID = process.env.TRACK_GA_MEASUREMENT_ID;

export const CookieConsentBar: FunctionalComponent = () => {
    const { t } = useTranslate();
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return;
        setShowConsent(!getCookieConsent());
    }, []);

    if (!GA_MEASUREMENT_ID) return null;

    const handleAccept = () => {
        const consent: CookieConsent = 'granted';
        setCookieConsent(consent);
        updateConsent(consent);
        window.dispatchEvent(new CustomEvent('cookie-consent-granted'));
        setShowConsent(false);
    };

    const handleReject = () => {
        const consent: CookieConsent = 'denied';
        setCookieConsent(consent);
        updateConsent(consent);
        setShowConsent(false);
    };

    if (!showConsent) return null;

    return (
        <div class="fixed bottom-0 left-0 right-0 p-2 shadow-2xs z-50 dark:bg-zinc-900/60 border-t backdrop-blur-md bg-white/80 dark:border-white/15 border-white/80">
            <div class="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <p class="text-center sm:text-left">{t('footer_cookie_consent')}</p>
                <div class="flex gap-2">
                    <button
                        onClick={handleReject}
                        class="px-4 py-1 border border-zinc-300 dark:border-zinc-600 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                        {t('footer_cookie_reject')}
                    </button>
                    <button
                        onClick={handleAccept}
                        class="px-4 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded hover:opacity-80 transition-opacity cursor-pointer"
                    >
                        {t('footer_cookie_accept')}
                    </button>
                </div>
            </div>
        </div>
    );
};
