import { h, FunctionalComponent } from 'preact';
import { useState, useRef } from 'preact/hooks';
import classNames from 'classnames';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
interface ImageComponentProps {
    isLazy?: boolean;
    src: string;
    srcset?: string;
    fallbackSrc?: string;
    width?: string;
    height?: string;
    classes?: string;
    alt?: string;
    style?: string;
    fetchpriority?: 'high' | 'low' | 'auto';
    otherProps?: unknown;
}

export const Image: FunctionalComponent<ImageComponentProps> = ({
    isLazy,
    src,
    srcset,
    fallbackSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    classes,
    alt = '',
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
                if (entry) {
                    observer?.unobserve(entry.target);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setIsLoaded(false);
                console.error(err);
            });
    }

    return (
        <img
            ref={imgRef}
            {...otherProps}
            class={classNames(
                {
                    lazy: isLazy,
                    '_loaded transform opacity-1 animate-fade-in': isLoaded,
                    'animate-pulse': !isLoaded,
                },
                classes,
            )}
            alt={alt}
            src={isLazy ? (isLoaded ? src : fallbackSrc) : src}
            data-src={isLazy ? (isLoaded ? src : undefined) : undefined}
            srcset={!isLazy ? srcset : undefined}
        />
    );
};
