import classNames from 'classnames';
import { h, FunctionalComponent, ComponentChildren } from 'preact';

interface ButtonComponentProps {
    mainClasses?: string;
    classes?: string;
    otherProps?: unknown;
    children?: ComponentChildren;
}

export const Button: FunctionalComponent<ButtonComponentProps> = ({
    mainClasses = 'btn',
    classes,
    children,
    ...otherProps
}) => (
    <button class={classNames(mainClasses, classes)} {...otherProps}>
        {children}
    </button>
);
