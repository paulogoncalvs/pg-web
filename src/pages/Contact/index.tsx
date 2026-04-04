import { type FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";

import mailIcon from "@/assets/icons/mail.svg";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { FormInput } from "@/components/Form/Input";
import { FormTextarea } from "@/components/Form/Textarea";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Spinner } from "@/components/Spinner";
import { useTranslate } from "@/modules/i18n";
import { trackEvent } from "@/modules/tracking/ga4";

import { useContactForm } from "./useContactForm";

const baseDelay = 2;
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
    document.body.classList.add("show-recaptcha");
    return () => document.body.classList.remove("show-recaptcha");
  }, []);

  return (
    <>
      <div class="flex flex-col items-center p-6 pt-20 text-center">
        <ScrollReveal
          delay={1}
          Element="h1"
          classes="text-3xl tracking-tight font-bold sm:my-2 sm:text-5xl"
        >
          {t("contact_page_title")}
        </ScrollReveal>

        <ScrollReveal delay={2} Element="h1" classes="text-xl lowercase op-1 sm:text-2xl pb-8">
          {t("contact_page_subtitle")}
        </ScrollReveal>
      </div>

      <div class="flex flex-col items-center p-6 pb-20">
        <Form
          classes="w-full max-w-[400px]"
          onSubmit={submit}
          initialValues={initialValues}
          validationRules={validationRules}
          errorMessages={errorMessages}
          resetTrigger={resetTrigger}
        >
          <ScrollReveal
            delay={baseDelay}
            Element="h2"
            classes="font-bold text-xl sm:text-2xl pb-8"
            direction="up"
          >
            {t("contact_page_contact_form_title")}
          </ScrollReveal>

          <ScrollReveal delay={baseDelay + Number(delayStep)}>
            <FormInput
              label={t("contact_page_contact_form_first_name_label")}
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="given-name"
            />
          </ScrollReveal>

          <ScrollReveal delay={baseDelay + delayStep * 2}>
            <FormInput
              label={t("contact_page_contact_form_last_name_label")}
              type="text"
              name="lastName"
              id="lastName"
              autoComplete="family-name"
            />
          </ScrollReveal>

          <ScrollReveal delay={baseDelay + delayStep * 3}>
            <FormInput
              label={t("contact_page_contact_form_email_label")}
              type="email"
              name="email"
              id="email"
              autoComplete="email"
            />
          </ScrollReveal>

          <ScrollReveal delay={baseDelay + delayStep * 4}>
            <FormTextarea
              label={t("contact_page_contact_form_message_label")}
              name="message"
              id="message"
              autoComplete="off"
            />
          </ScrollReveal>

          <FormInput
            label={t("contact_page_contact_form_message_label")}
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

          <ScrollReveal delay={baseDelay + delayStep * 5}>
            <Button
              classes="interactive interactive-icon interactive-md mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : <Icon src={mailIcon} ariaHidden />}

              {isSubmitting
                ? t("contact_page_contact_form_submitting")
                : t("contact_page_contact_form_submit_CTA")}
            </Button>
          </ScrollReveal>
        </Form>

        {submittedName && (
          <p class="mt-12">
            {t("contact_page_contact_form_success_msg", {
              name: submittedName,
            })}
          </p>
        )}
      </div>

      <div class="flex flex-col items-center p-6 pb-20">
        <div class="w-full max-w-100">
          <ScrollReveal
            delay={1}
            Element="h2"
            classes="font-bold text-xl sm:text-2xl pb-8"
            direction="up"
          >
            {t("contact_page_contact_email_title")}
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <Link
              href="mailto:contact@paulogoncalves.dev"
              class="interactive interactive-icon interactive-md"
              onClick={() =>
                trackEvent("link_click", {
                  link_location: "Contact",
                  link_name: "E-mail Me",
                })
              }
            >
              <Icon src={mailIcon} ariaHidden />
              {t("contact_page_email_button_label")}
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
