import classNames from 'classnames';
import { h, FunctionalComponent, ComponentChildren } from 'preact';

interface ButtonComponentProps {
    mainClasses?: string;
    classes?: string;
    disabled?: boolean;
    otherProps?: unknown;
    children?: ComponentChildren;
}

export const Button: FunctionalComponent<ButtonComponentProps> = ({
    mainClasses = 'btn',
    classes,
    children,
    disabled,
    ...otherProps
}) => (
    <button disabled={disabled} class={classNames(mainClasses, classes)} {...otherProps}>
        {children}
    </button>
);
