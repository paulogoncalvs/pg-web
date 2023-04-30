import { h, FunctionalComponent, ComponentChildren } from 'preact';
import { useTranslate } from '@/modules/i18n';

interface LinkComponentProps {
    href?: string;
    class?: string;
    newWindow?: boolean;
    ariaLabel?: string;
    onClick?(): void;
    children?: ComponentChildren;
}

export const Link: FunctionalComponent<LinkComponentProps> = ({
    href,
    newWindow,
    ariaLabel,
    children,
    ...otherProps
}) => {
    const { t } = useTranslate();

    return (
        // @ts-ignore-begin
        <a
            href={href}
            aria-label={
                ariaLabel ? (newWindow ? t('accessibility_new_window', { text: ariaLabel }) : ariaLabel) : undefined
            }
            {...(newWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...otherProps}
        >
            {children}
        </a>
        // @ts-ignore-end
    );
};
