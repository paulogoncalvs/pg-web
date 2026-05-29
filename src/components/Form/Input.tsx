import type { FunctionalComponent } from "preact";

import { useContext } from "preact/hooks";

import { classNames } from "@/utils/classNames";

import { FormContext } from "./";

interface FormInputComponentProps {
  label: string;
  type?: string;
  name: string;
  disabled?: boolean;
  id: string;
  autoComplete?: string;
  class?: string;
}

export const FormInput: FunctionalComponent<FormInputComponentProps> = ({
  label,
  type = "text",
  name,
  id,
  disabled,
  autoComplete,
  class: classes = "",
}) => {
  const context = useContext(FormContext);
  if (!context) {
    return null;
  }

  const { formData, errors, errorMessages, handleFormChange } = context;

  return (
    <div class={classNames("mt-3", classes)}>
      <label htmlFor={id}>{label}</label>
      <input
        class={`form-input ${errors[name] ? "error" : ""}`}
        id={id}
        type={type}
        name={name}
        value={formData[name]}
        onInput={handleFormChange}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-label={label}
        aria-invalid={errors[name] ? "true" : undefined}
        aria-describedby={errors[name] ? `${id}-error` : undefined}
      />
      {errors[name] && (
        <p class="form-error-message" role="alert" id={`${id}-error`}>
          {errorMessages[errors[name]] || errors[name]}
        </p>
      )}
    </div>
  );
};
