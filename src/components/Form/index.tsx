import { type ComponentChildren, type FunctionalComponent, type JSX, createContext } from "preact";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "preact/hooks";

import { StoreContext } from "@/modules/store";

export type FormComponentData = Record<string, string>;

export type FormErrors = Record<string, ValidationError>;

export type ValidationError = "required" | "invalid_email" | "min_length";

export type ValidationRules = Record<
  string,
  {
    required?: boolean;
    email?: boolean;
    minLength?: number;
  }
>;

interface FormContextValue {
  formData: FormComponentData;
  errors: FormErrors;
  handleFormChange: (event: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  validateField: (name: string, value: string) => ValidationError | "";
  errorMessages: Record<string, string>;
  resetForm: () => void;
  registerField: (name: string, element: HTMLElement | null) => void;
}

export const FormContext = createContext<FormContextValue | null>(null);

const DEFAULT_VALIDATION_RULES: ValidationRules = {};
const DEFAULT_ERROR_MESSAGES: Record<string, string> = {};
const initialErrorState: FormErrors = {};

interface FormComponentProps {
  action?: string;
  initialValues: FormComponentData;
  validationRules?: ValidationRules;
  errorMessages?: Record<string, string>;
  onSubmit(formData: FormComponentData): void;
  class?: string;
  children: ComponentChildren;
  resetTrigger?: number;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const Form: FunctionalComponent<FormComponentProps> = ({
  action,
  initialValues,
  validationRules = DEFAULT_VALIDATION_RULES,
  errorMessages = DEFAULT_ERROR_MESSAGES,
  onSubmit,
  class: classes = "",
  children,
  resetTrigger,
}) => {
  const { animationsEnabled = false } = useContext(StoreContext);
  const [formData, setFormData] = useState<FormComponentData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const initialRef = useRef(initialValues);
  const fields = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    initialRef.current = initialValues;
  }, [initialValues]);

  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      setFormData(initialRef.current);
      setErrors({});
    }
  }, [resetTrigger]);

  const validateField = (name: string, value: string): ValidationError | "" => {
    const rules = validationRules[name];
    if (!rules) {
      return "";
    }

    if (rules.required && !value.trim()) {
      return "required";
    }

    if (rules.email && value && !validateEmail(value)) {
      return "invalid_email";
    }

    if (rules.minLength && value.length < rules.minLength) {
      return "min_length";
    }

    return "";
  };

  const getValidationErrors = (): FormErrors => {
    const newErrors: FormErrors = {};

    for (const name of Object.keys(validationRules)) {
      const error = validateField(name, formData[name] || "");

      if (error) {
        newErrors[name] = error;
      }
    }

    return newErrors;
  };

  /* Brings the first invalid field into view and focuses it, so users see why
     the submission failed instead of hunting for the error. Fields are looked
     up by registration order, which matches their order in the form */
  const scrollToFirstError = (newErrors: FormErrors): void => {
    const firstName = Object.keys(fields.current).find((name) => newErrors[name]);
    const field = firstName ? fields.current[firstName] : undefined;
    if (!field) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* "instant" (not "auto") bypasses the global CSS scroll-behavior:smooth */
    const behavior = animationsEnabled && !reduceMotion ? "smooth" : "instant";
    field.scrollIntoView({ behavior, block: "center" });
    field.focus({ preventScroll: true });
  };

  const registerField = useCallback((name: string, element: HTMLElement | null): void => {
    if (element) {
      fields.current[name] = element;
    } else {
      delete fields.current[name];
    }
  }, []);

  const handleFormChange = (
    event: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.currentTarget;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const error = validateField(name, value);
      const next = { ...prev };

      if (error) {
        next[name] = error;
      } else {
        delete next[name];
      }

      return next;
    });
  };

  const triggerSubmit = (event: JSX.TargetedEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const newErrors = getValidationErrors();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const resetForm = (): void => {
    setFormData(initialValues);
    setErrors(initialErrorState);
  };

  const contextValue = useMemo(
    () => ({
      errorMessages,
      errors,
      formData,
      handleFormChange,
      registerField,
      resetForm,
      validateField,
    }),
    // oxlint-disable-next-line eslint-plugin-react-hooks/exhaustive-deps
    [formData, errors, errorMessages, handleFormChange, registerField, resetForm, validateField],
  );

  return (
    <form action={action} onSubmit={triggerSubmit} class={classes} noValidate>
      <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
    </form>
  );
};
