import type { ComponentChildren, FunctionalComponent, JSX } from "preact";

import { classNames } from "@/utils/classNames";

interface ButtonComponentProps {
  class?: string;
  disabled?: boolean;
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
  children?: ComponentChildren;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  ariaCurrent?: string;
  tabIndex?: number;
  style?: Record<string, string | number | undefined>;
  [key: string]: unknown;
}

export const Button: FunctionalComponent<ButtonComponentProps> = ({
  class: classes = "",
  children,
  disabled,
  type = "button",
  ariaLabel,
  ...otherProps
}) => (
  <button
    type={type}
    disabled={disabled}
    class={classNames(classes)}
    aria-label={ariaLabel}
    {...otherProps}
  >
    {children}
  </button>
);
