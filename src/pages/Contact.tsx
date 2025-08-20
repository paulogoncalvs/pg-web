import { h, Fragment, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { useTranslate } from '@/modules/i18n';
import { Form, FormComponentData } from '@/components/Form';
import { FormInput } from '@/components/Form/Input';
import { Button } from '@/components/Button';
import { trackEvent } from '@/modules/tracking/ga4';
import { Link } from '@/components/Link';
import { Icon } from '@/components/Icon';
import mailIcon from '@/assets/icons/mail.svg';

const Contact: FunctionalComponent = () => {
    const [messageKey, setMessageKey] = useState('');
    const { t } = useTranslate();
    const initialValues: FormComponentData = {
        firstName: '',
        lastName: '',
        email: '',
    };

    const submit = (): void => {
        setMessageKey('contact_page_contact_form_success_msg');
    };

    return (
        <Fragment>
            <div class="flex flex-col items-center">
                <h1 class="text-3xl tracking-tight font-bold text-center opacity-1 sm:my-2 sm:text-5xl animate-fade-in-up-1">
                    {t('contact_page_title')}
                </h1>
                <h2 class="text-2xl tracking-tight text-center lowercase opacity-1 sm:text-3xl animate-fade-in-up-2 pb-14">
                    {t('contact_page_subtitle')}
                </h2>
            </div>
            <div class="flex flex-col items-center pb-16 opacity-1 animate-fade-in-dw-3">
                <Link
                    href="mailto:contact@paulogoncalves.dev"
                    class="btn _i _prim text-xl sm:text-2xl"
                    onClick={(): void =>
                        trackEvent(
                            {
                                category: 'Contact Link',
                                label: 'E-mail Me',
                            },
                            'link_click',
                        )
                    }
                >
                    <Icon src={mailIcon} classes="" ariaHidden />
                    <span>{t('contact_page_email_button_label')}</span>
                </Link>
            </div>
            <div class="flex flex-col items-center pb-12 opacity-1 animate-fade-in-dw-4 relative select-none pointer-events-none">
                <Form
                    classes="mt-16 opacity-20"
                    action={`${process.env.SERVER_URL}contact/`}
                    onSubmit={submit}
                    initialValues={initialValues}
                >
                    <h2 class="text-xl sm:text-3xl mb-4">{t('contact_page_contact_form_title')}</h2>
                    <FormInput
                        disabled
                        label={t('contact_page_contact_form_first_name_label').toString()}
                        type="text"
                        name="firstName"
                        id="firstName"
                    />
                    <FormInput
                        disabled
                        label={t('contact_page_contact_form_last_name_label').toString()}
                        type="text"
                        name="lastName"
                        id="lastName"
                    />
                    <FormInput
                        disabled
                        label={t('contact_page_contact_form_email_label').toString()}
                        type="email"
                        name="email"
                        id="email"
                    />
                    <Button disabled classes="_prim mt-4">
                        {t('contact_page_contact_form_submit_CTA')}
                    </Button>
                </Form>
                {messageKey && (
                    <p class="mt-12">
                        {t(messageKey, {
                            name: `${initialValues.firstName} ${initialValues.lastName}`,
                        }).toString()}
                    </p>
                )}
                <p class="text-xl tracking-tight font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {t('contact_page_contact_form_disabled_text')}
                </p>
            </div>
        </Fragment>
    );
};

export default Contact;
