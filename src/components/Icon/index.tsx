import { h, FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';
import { StoreContext } from '@/modules/store';

interface IconComponentProps {
    src: IconSrc;
    width?: string;
    height?: string;
    classes?: string;
    viewBox?: string;
    ariaHidden?: boolean;
    otherProps?: unknown;
}

export const Icon: FunctionalComponent<IconComponentProps> = ({
    src: [hash = '#', viewBox] = [],
    width = '24',
    height = '24',
    classes = 'fill-current',
    ariaHidden,
    ...otherProps
}) => {
    const { filenames } = useContext(StoreContext);

    return (
        <svg
            {...otherProps}
            aria-hidden={ariaHidden}
            class={classes}
            width={width}
            height={height}
            {...(viewBox ? { viewBox } : {})}
        >
            <use href={`${filenames ? filenames.sprite : ''}${hash}`} />
        </svg>
    );
};
