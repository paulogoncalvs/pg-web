import { h, FunctionalComponent } from 'preact';
import { useTranslate } from '@/modules/i18n';

interface LinkComponentProps {
    href?: string;
    classes?: string;
    newWindow?: boolean;
    ariaLabel?: string;
    otherProps?: unknown;
}

export const Link: FunctionalComponent<LinkComponentProps> = ({ href, classes, newWindow, ariaLabel, children }) => {
    const { t } = useTranslate();

    return (
        <a
            href={href}
            class={classes}
            aria-label={
                ariaLabel ? (newWindow ? t('accessibility_new_window', { text: ariaLabel }) : ariaLabel) : undefined
            }
            {...(newWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            {children}
        </a>
    );
};
