import type { FunctionalComponent } from "preact";
import { useContext } from "preact/hooks";

import { FormContext } from "./";

interface FormTextareaProps {
  label: string;
  name: string;
  disabled?: boolean;
  id: string;
  rows?: number;
  autoComplete?: string;
}

export const FormTextarea: FunctionalComponent<FormTextareaProps> = ({
  label,
  name,
  id,
  disabled,
  rows = 4,
  autoComplete,
}) => {
  const context = useContext(FormContext);
  if (!context) {
    return null;
  }

  const { formData, errors, errorMessages, handleFormChange } = context;

  return (
    <div class="form-field mt-3">
      <label class="form-label" for={id}>
        {label}
      </label>
      <textarea
        class={`form-input ${errors[name] ? "error" : ""}`}
        id={id}
        name={name}
        rows={rows}
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
