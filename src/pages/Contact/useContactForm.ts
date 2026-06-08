import { useMemo, useState } from "preact/hooks";

import type { FormComponentData } from "@/components/Form";

import { getRecaptchaToken } from "@/components/Form/recaptchaService";
import { useTranslate } from "@/modules/i18n";

const apiUrl = import.meta.env.VITE_API_URL || "/api/";
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

export const useContactForm = () => {
  const { t } = useTranslate();

  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const initialValues: FormComponentData = useMemo(
    () => ({
      company: "",
      email: "",
      firstName: "",
      lastName: "",
      message: "",
    }),
    [],
  );

  const validationRules = useMemo(
    () => ({
      company: { required: false },
      email: { email: true, required: true },
      firstName: { required: true },
      lastName: { required: true },
      message: { minLength: 10, required: true },
    }),
    [],
  );

  const errorMessages = useMemo(
    () => ({
      invalid_email: t("contact_page_form_error_invalid_email"),
      min_length: t("contact_page_form_error_min_length"),
      recaptcha_failed: t("contact_page_form_error_recaptcha"),
      required: t("contact_page_form_error_required"),
    }),
    [t],
  );

  const submit = async (formData: FormComponentData): Promise<void> => {
    setIsSubmitting(true);
    setSubmitError("");
    setRecaptchaError("");

    let payload = { ...formData };

    if (recaptchaSiteKey) {
      try {
        const token = await getRecaptchaToken(recaptchaSiteKey, "contact");

        payload = { ...payload, recaptchaToken: token };
      } catch {
        setRecaptchaError(t("contact_page_form_error_recaptcha"));
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const url = `${apiUrl.replace(/\/$/, "")}/send/`;

      const response = await fetch(url, {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      let data: Record<string, string> = {};

      try {
        data = await response.json();
      } catch {
        // Response body is not valid JSON (e.g. server error page, empty body)
      }

      if (!response.ok) {
        throw new Error(data.error || t("contact_page_contact_form_error"));
      }

      setSubmittedName(`${formData.firstName} ${formData.lastName}`);
      setResetTrigger((prev) => prev + 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : t("contact_page_contact_form_error");

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errorMessages,
    initialValues,
    isSubmitting,
    recaptchaError,
    resetTrigger,
    submit,
    submitError,
    submittedName,
    validationRules,
  };
};
