import { h, FunctionalComponent, ComponentChildren } from 'preact';
import { useTranslate } from '@/modules/i18n';
import { Link as WLink } from 'wouter-preact';

interface LinkComponentProps {
    href?: string;
    class?: string;
    newWindow?: boolean;
    ariaLabel?: string;
    onClick?(): void;
    useRouter?: boolean;
    children?: ComponentChildren;
}

export const Link: FunctionalComponent<LinkComponentProps> = ({
    href,
    newWindow,
    ariaLabel,
    children,
    useRouter,
    ...otherProps
}) => {
    const { t } = useTranslate();
    const Comp = useRouter ? WLink : 'a';

    return (
        // @ts-ignore
        <Comp
            href={href}
            aria-label={
                ariaLabel ? (newWindow ? t('accessibility_new_window', { text: ariaLabel }) : ariaLabel) : undefined
            }
            {...(newWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...otherProps}
        >
            {children}
        </Comp>
    );
};
