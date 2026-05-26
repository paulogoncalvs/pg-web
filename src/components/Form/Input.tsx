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
    <div class={classNames("form-field mt-3", classes)}>
      <label class="form-label" for={id}>
        {label}
      </label>
      {/* oxlint-disable-next-line jsx-a11y/control-has-associated-label */}
      <input
        class={`form-input ${errors[name] ? "error" : ""}`}
        id={id}
        type={type}
        name={name}
        value={formData[name]}
        onInput={handleFormChange}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {errors[name] && (
        <p class="form-error-message">{errorMessages[errors[name]] || errors[name]}</p>
      )}
    </div>
  );
};
