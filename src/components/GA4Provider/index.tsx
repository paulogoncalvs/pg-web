import { h, FunctionalComponent, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getCookieConsent } from '@/modules/cookieConsent';

const GA_MEASUREMENT_ID = process.env.TRACK_GA_MEASUREMENT_ID;

export const GA4Provider: FunctionalComponent = () => {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return;

        const loadGA = (): void => {
            if (!GA_MEASUREMENT_ID || shouldLoad) return;
            setShouldLoad(true);
        };

        const onConsentGranted = (): void => loadGA();

        // Load immediately if consent already granted
        if (getCookieConsent() === 'granted') loadGA();

        window.addEventListener('cookie-consent-granted', onConsentGranted);

        let fired = false;

        const cleanup = (): void => {
            window.removeEventListener('scroll', fire);
            window.removeEventListener('pointerdown', fire);
            window.removeEventListener('keydown', fire);
            window.removeEventListener('cookie-consent-granted', onConsentGranted);
            clearTimeout(timer);
        };

        const fire = (): void => {
            if (!fired) {
                fired = true;
                cleanup();
                loadGA();
            }
        };

        const timer = setTimeout(fire, 5000);

        window.addEventListener('scroll', fire, { once: true, passive: true });
        window.addEventListener('pointerdown', fire, { once: true });
        window.addEventListener('keydown', fire, { once: true });

        return cleanup;
    }, [shouldLoad]);

    if (!shouldLoad || !GA_MEASUREMENT_ID) return null;

    return (
        <Fragment>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
                    `,
                }}
            />
        </Fragment>
    );
};
