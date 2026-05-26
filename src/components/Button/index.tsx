import type { ComponentChildren, FunctionalComponent } from "preact";

import { classNames } from "@/utils/classNames";

interface ButtonComponentProps {
  mainClasses?: string;
  class?: string;
  disabled?: boolean;
  otherProps?: unknown;
  onClick?: () => void;
  children?: ComponentChildren;
}

export const Button: FunctionalComponent<ButtonComponentProps> = ({
  mainClasses = "btn",
  class: classes = "",
  children,
  disabled,
  ...otherProps
}) => (
  <button disabled={disabled} class={classNames(mainClasses, classes)} {...otherProps}>
    {children}
  </button>
);
