import { h, FunctionalComponent } from 'preact';
import { useState, useRef } from 'preact/hooks';
import classNames from 'classnames';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export const Image: FunctionalComponent<{
    isLazy?: boolean;
    src: string;
    srcset?: string;
    fallbackSrc?: string;
    width?: string;
    height?: string;
    classes?: string;
    alt?: string;
    style?: string;
    otherProps?: unknown;
}> = ({
    isLazy,
    src,
    srcset,
    fallbackSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    classes,
    ...otherProps
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const imgRef = useRef<HTMLImageElement>(null);
    const [entry, observer] = useIntersectionObserver(imgRef, { threshold: 0.25, root: null });
    const isVisible = !!entry?.isIntersecting;

    if (!isLoaded && !isLoading && isVisible) {
        fetch(src)
            .then(() => {
                setIsLoading(false);
                setIsLoaded(true);
                entry && observer?.unobserve(entry.target);
            })
            .catch((err) => {
                setIsLoading(false);
                setIsLoaded(false);
                console.error(err); // eslint-disable-line no-console
            });
    }

    return (
        <img
            ref={imgRef}
            {...otherProps}
            class={classNames(
                {
                    lazy: isLazy,
                    '_loaded animate-fade-in opacity-0': isLoaded,
                    'animate-pulse bg-gray-200 dark:bg-gray-900': !isLoaded,
                },
                classes,
            )}
            src={isLazy ? (isLoaded ? src : fallbackSrc) : src}
            data-src={isLazy ? (isLoaded ? src : undefined) : undefined}
            srcset={!isLazy ? srcset : undefined}
        />
    );
};
