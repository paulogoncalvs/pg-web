import type { FunctionalComponent, JSX } from "preact";

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
  const handleChange: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
    onChange((e.target as HTMLInputElement).checked);
  };

  return (
    <label
      aria-label={label || undefined}
      class={`inline-flex cursor-pointer items-center text-[0px] ${classes}`}
    >
      <input
        type="checkbox"
        aria-label={label || undefined}
        class="peer sr-only"
        checked={checked}
        onChange={handleChange}
      />
      <span class="relative flex h-5 w-9 shrink-0 items-center rounded-full bg-zinc-300 p-0.5 shadow-sm transition-colors peer-checked:justify-end peer-checked:bg-zinc-900 peer-hover:bg-zinc-400 peer-checked:peer-hover:bg-zinc-800 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-zinc-400 dark:bg-zinc-600 dark:peer-checked:bg-white dark:peer-hover:bg-zinc-500 dark:peer-checked:peer-hover:bg-zinc-200 dark:peer-focus-visible:outline-zinc-500">
        <span class="h-4 w-4 rounded-full bg-white shadow-sm transition-all dark:bg-zinc-900" />
      </span>
    </label>
  );
};
