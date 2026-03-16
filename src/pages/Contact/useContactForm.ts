import { useState, useMemo } from 'preact/hooks';

import { useTranslate } from '@/modules/i18n';

import { FormComponentData } from '@/components/Form';
import { getRecaptchaToken } from '@/components/Form/recaptchaService';

const SERVER_URL = process.env.SERVER_URL || '';
const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY || '';

export const useContactForm = () => {
    const { t } = useTranslate();

    const [submittedName, setSubmittedName] = useState<string | null>(null);
    const [recaptchaError, setRecaptchaError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(0);

    const initialValues: FormComponentData = useMemo(
        () => ({
            firstName: '',
            lastName: '',
            email: '',
            message: '',
            company: '',
        }),
        [],
    );

    const validationRules = useMemo(
        () => ({
            firstName: { required: true },
            lastName: { required: true },
            email: { required: true, email: true },
            message: { required: true, minLength: 10 },
            company: { required: false },
        }),
        [],
    );

    const errorMessages = useMemo(
        () => ({
            required: t('contact_page_form_error_required'),
            invalid_email: t('contact_page_form_error_invalid_email'),
            min_length: t('contact_page_form_error_min_length'),
            recaptcha_failed: t('contact_page_form_error_recaptcha'),
        }),
        [t],
    );

    const submit = async (formData: FormComponentData): Promise<void> => {
        setIsSubmitting(true);
        setSubmitError('');
        setRecaptchaError('');

        let payload = { ...formData };

        if (recaptchaSiteKey) {
            try {
                const token = await getRecaptchaToken(recaptchaSiteKey, 'contact');

                payload = { ...payload, recaptchaToken: token };
            } catch {
                setRecaptchaError(t('contact_page_form_error_recaptcha'));
                setIsSubmitting(false);
                return;
            }
        }

        try {
            const url = `${SERVER_URL.replace(/\/$/, '')}/send/`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || t('contact_page_contact_form_error'));
            }

            setSubmittedName(`${formData.firstName} ${formData.lastName}`);
            setResetTrigger((prev) => prev + 1);
        } catch (err) {
            const message = err instanceof Error ? err.message : t('contact_page_contact_form_error');

            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        submit,
        initialValues,
        validationRules,
        errorMessages,
        submittedName,
        recaptchaError,
        submitError,
        isSubmitting,
        resetTrigger,
    };
};
