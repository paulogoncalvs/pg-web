import type { ComponentChildren, FunctionalComponent } from "preact";

import { classNames } from "@/utils/classNames";

interface ButtonComponentProps {
  mainClasses?: string;
  classes?: string;
  disabled?: boolean;
  otherProps?: unknown;
  children?: ComponentChildren;
}

export const Button: FunctionalComponent<ButtonComponentProps> = ({
  mainClasses = "btn",
  classes,
  children,
  disabled,
  ...otherProps
}) => (
  <button disabled={disabled} class={classNames(mainClasses, classes)} {...otherProps}>
    {children}
  </button>
);
