import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { useTranslate } from '@/modules/i18n';
import { Form } from '@/components/Form';
import { FormInput } from '@/components/Form/Input';
import { Button } from '@/components/Button';

interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
}

const Contact: FunctionalComponent = () => {
    const [message, setMessage] = useState('');
    const { t } = useTranslate();
    const initialValues: ContactForm = {
        firstName: '',
        lastName: '',
        email: '',
    };

    const submit = ({ firstName, lastName }: ContactForm): void => {
        setMessage(`Hi ${firstName} ${lastName}! This form is still in development. Please come back soon. :)`);
    };

    return (
        <div class="container px-6 pt-8 pb-8 mx-auto sm:pb-16">
            <div class="flex flex-col items-center">
                <h1 class="text-3xl font-black text-center opacity-0 sm:my-2 sm:text-5xl animate-fade-in-up-1">
                    {t('contact_page_title')}
                </h1>
                <h2 class="text-2xl text-center lowercase opacity-0 sm:text-4xl animate-fade-in-up-2 pb-14">
                    {t('contact_page_subtitle')}
                </h2>
            </div>
            <div class="flex flex-col items-center sm:pt-14 pb-14">
                <Form action={`${process.env.SERVER_URL}contact/`} onSubmit={submit} initialValues={initialValues}>
                    <FormInput label="First Name" type="text" name="firstName" id="firstName" />
                    <FormInput label="Last Name" type="text" name="lastName" id="lastName" />
                    <FormInput label="Email Address" type="email" name="email" id="email" />
                    <Button classes="_prim mt-4">{t('contact_page_submit_CTA')}</Button>
                </Form>
                {message && <p class="mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default Contact;
