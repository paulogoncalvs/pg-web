let scriptLoadingPromise: Promise<void> | null = null;

export const loadRecaptcha = (siteKey: string): Promise<void> => {
    if (!scriptLoadingPromise) {
        scriptLoadingPromise = new Promise((resolve) => {
            if (window.grecaptcha) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            script.async = true;
            script.defer = true;

            script.onload = () => resolve();

            document.head.appendChild(script);
        });
    }

    return scriptLoadingPromise;
};

export const getRecaptchaToken = async (siteKey: string, action = 'submit'): Promise<string> => {
    await loadRecaptcha(siteKey);

    return new Promise((resolve, reject) => {
        if (!window.grecaptcha) {
            reject('reCAPTCHA not available');
            return;
        }

        window.grecaptcha.ready(() => {
            window.grecaptcha?.execute(siteKey, { action }).then(resolve).catch(reject);
        });
    });
};
