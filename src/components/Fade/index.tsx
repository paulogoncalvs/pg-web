import { h, FunctionalComponent, ComponentChildren, JSX } from 'preact';

type Direction = 'up' | 'down';

interface FadeProps {
    delay?: number;
    direction?: Direction;
    classes?: string;
    Element?: JSX.ElementType;
    children: ComponentChildren;
}

export const Fade: FunctionalComponent<FadeProps> = ({
    delay = 0,
    direction = 'down',
    classes = '',
    Element = 'div',
    children,
}) => {
    const animation = direction === 'up' ? 'animate-fade-in-up' : 'animate-fade-in-down';

    return (
        <Element class={`op-low ${animation} ${classes}`} style={{ '--delay': `${delay * 0.1}s` }}>
            {children}
        </Element>
    );
};
