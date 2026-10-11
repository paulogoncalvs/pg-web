import type { FunctionalComponent, GenericEventHandler } from "preact";

import { classNames } from "@/utils/classNames";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  class?: string;
  label?: string;
}

export const Switch: FunctionalComponent<SwitchProps> = ({
  checked,
  onChange,
  class: classes = "",
  label = "",
}) => {
  const handleChange: GenericEventHandler<HTMLInputElement> = (e) => {
    onChange((e.target as HTMLInputElement).checked);
  };

  return (
    <label
      aria-label={label || undefined}
      class={classNames("inline-flex cursor-pointer items-center", classes)}
    >
      <input
        type="checkbox"
        aria-label={label || undefined}
        class="peer sr-only"
        checked={checked}
        onChange={handleChange}
      />

      <span class="interactive-switch">
        <span class="interactive-switch-thumb" />
      </span>

      {label && <span class="sr-only">{label}</span>}
    </label>
  );
};
