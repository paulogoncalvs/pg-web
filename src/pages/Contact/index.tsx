import { Fragment, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import { useTranslate } from '@/modules/i18n';
import { trackEvent } from '@/modules/tracking/ga4';

import { Button } from '@/components/Button';
import { Fade } from '@/components/Fade';
import { Form } from '@/components/Form';
import { FormInput } from '@/components/Form/Input';
import { FormTextarea } from '@/components/Form/Textarea';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
import { Spinner } from '@/components/Spinner';

import mailIcon from '@/assets/icons/mail.svg';

import { useContactForm } from './useContactForm';

const baseDelay = 3;
const delayStep = 0.2;

const ContactPage: FunctionalComponent = () => {
    const { t } = useTranslate();

    const {
        submit,
        initialValues,
        validationRules,
        errorMessages,
        submittedName,
        recaptchaError,
        submitError,
        isSubmitting,
        resetTrigger,
    } = useContactForm();

    useEffect(() => {
        document.body.classList.add('show-recaptcha');
        return () => document.body.classList.remove('show-recaptcha');
    }, []);

    return (
        <Fragment>
            <div class="p-6 pt-20 flex flex-col items-center text-center">
                <Fade delay={1} Element="h1" classes="text-3xl tracking-tight font-bold sm:my-2 sm:text-5xl">
                    {t('contact_page_title')}
                </Fade>

                <Fade delay={2} Element="h1" classes="text-xl lowercase op-1 sm:text-2xl pb-8">
                    {t('contact_page_subtitle')}
                </Fade>
            </div>

            <div class="p-6 flex flex-col items-center pb-20">
                <Form
                    classes="w-full max-w-[400px]"
                    onSubmit={submit}
                    initialValues={initialValues}
                    validationRules={validationRules}
                    errorMessages={errorMessages}
                    resetTrigger={resetTrigger}
                >
                    <Fade delay={baseDelay} Element="h2" classes="font-bold text-xl sm:text-2xl pb-8">
                        {t('contact_page_contact_form_title')}
                    </Fade>

                    <Fade delay={baseDelay + delayStep * 1}>
                        <FormInput
                            label={t('contact_page_contact_form_first_name_label')}
                            type="text"
                            name="firstName"
                            id="firstName"
                            autoComplete="given-name"
                        />
                    </Fade>

                    <Fade delay={baseDelay + delayStep * 2}>
                        <FormInput
                            label={t('contact_page_contact_form_last_name_label')}
                            type="text"
                            name="lastName"
                            id="lastName"
                            autoComplete="family-name"
                        />
                    </Fade>

                    <Fade delay={baseDelay + delayStep * 3}>
                        <FormInput
                            label={t('contact_page_contact_form_email_label')}
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                        />
                    </Fade>

                    <Fade delay={baseDelay + delayStep * 4}>
                        <FormTextarea
                            label={t('contact_page_contact_form_message_label')}
                            name="message"
                            id="message"
                            autoComplete="off"
                        />
                    </Fade>

                    <FormInput
                        label={t('contact_page_contact_form_message_label')}
                        type="text"
                        name="company"
                        id="company"
                        autoComplete="off"
                        classes="hidden"
                    />

                    {recaptchaError && (
                        <p class="form-error-message mt-2" role="alert">
                            {recaptchaError}
                        </p>
                    )}

                    {submitError && (
                        <p class="form-error-message mt-2" role="alert">
                            {submitError}
                        </p>
                    )}

                    <Fade delay={baseDelay + delayStep * 5}>
                        <Button classes="interactive interactive-icon interactive-md mt-4" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner /> : <Icon src={mailIcon} ariaHidden />}

                            {isSubmitting
                                ? t('contact_page_contact_form_submitting')
                                : t('contact_page_contact_form_submit_CTA')}
                        </Button>
                    </Fade>
                </Form>

                {submittedName && (
                    <p class="mt-12">
                        {t('contact_page_contact_form_success_msg', {
                            name: submittedName,
                        })}
                    </p>
                )}
            </div>

            <div class="p-6 flex flex-col items-center pb-20">
                <Fade delay={6} direction="up" classes="w-full max-w-[400px]">
                    <Fade delay={5} Element="h2" classes="font-bold text-xl op-1 sm:text-2xl pb-8">
                        {t('contact_page_contact_email_title')}
                    </Fade>

                    <Link
                        href="mailto:contact@paulogoncalves.dev"
                        class="interactive interactive-icon interactive-md"
                        onClick={() =>
                            trackEvent('link_click', {
                                link_name: 'E-mail Me',
                                link_location: 'Contact',
                            })
                        }
                    >
                        <Icon src={mailIcon} ariaHidden />
                        <span>{t('contact_page_email_button_label')}</span>
                    </Link>
                </Fade>
            </div>
        </Fragment>
    );
};

export default ContactPage;
