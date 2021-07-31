import { h, FunctionalComponent } from 'preact';

interface LinkComponentProps {
    href?: string;
    classes?: string;
    newWindow?: boolean;
    otherProps?: unknown;
}

export const Link: FunctionalComponent<LinkComponentProps> = ({ href, classes, newWindow, children }) => (
    <a href={href} class={classes} {...(newWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
    </a>
);
