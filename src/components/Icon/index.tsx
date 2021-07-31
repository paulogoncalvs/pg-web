import { h, FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';
import { AppContext } from '@/app/AppContext';

interface IconComponentProps {
    src: IconSrc;
    width?: string;
    height?: string;
    classes?: string;
    viewBox?: string;
    otherProps?: unknown;
}

export const Icon: FunctionalComponent<IconComponentProps> = ({
    src: { viewBox, hash } = {},
    width = '24',
    height = '24',
    classes = 'fill-current',
    ...otherProps
}) => {
    const { store } = useContext(AppContext);

    return (
        <svg {...otherProps} class={classes} width={width} height={height} {...(viewBox ? { viewBox } : {})}>
            <use href={`${store.filenames?.sprite}${hash}`} />
        </svg>
    );
};
