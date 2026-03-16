import { FunctionalComponent, JSX, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { classNames } from '@/utils/classNames';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ImageProps extends JSX.HTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;

    srcset?: string;
    sizes?: string;

    width?: number | string;
    height?: number | string;

    lazy?: boolean;

    placeholder?: string;
    blur?: boolean;
    classes?: string;

    fetchpriority?: 'high' | 'low' | 'auto';
}

const DEFAULT_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

export const Image: FunctionalComponent<ImageProps> = ({
    src,
    alt = '',

    srcset,
    sizes,

    width,
    height,

    lazy = true,

    placeholder = DEFAULT_PLACEHOLDER,
    blur = false,

    classes,
    fetchpriority = 'auto',

    ...props
}) => {
    const imgRef = useRef<HTMLImageElement>(null);

    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(!lazy);

    const [entry, observer] = useIntersectionObserver(imgRef, {
        threshold: 0.25,
    });

    const isVisible = !!entry?.isIntersecting;

    /**
     * Trigger loading when visible
     */
    useEffect(() => {
        if (!lazy) return;
        if (!isVisible) return;

        setShouldLoad(true);

        if (entry?.target) {
            observer?.unobserve(entry.target);
        }
    }, [isVisible]);

    /**
     * Preload image
     */
    useEffect(() => {
        if (!shouldLoad) return;

        const img = new window.Image();

        if (srcset) img.srcset = srcset;
        img.src = src;

        img.onload = () => {
            setIsLoaded(true);
        };
    }, [shouldLoad, src, srcset]);

    const displaySrc = shouldLoad ? src : placeholder;

    return (
        <img
            ref={imgRef}
            {...props}
            alt={alt}
            width={width}
            height={height}
            src={displaySrc}
            srcset={shouldLoad ? srcset : undefined}
            sizes={shouldLoad ? sizes : undefined}
            loading={lazy ? 'lazy' : 'eager'}
            decoding="async"
            fetchpriority={fetchpriority}
            onLoad={() => setIsLoaded(true)}
            class={classNames(
                'transition-all duration-500 ease-out',
                {
                    'opacity-60': !isLoaded,
                    'opacity-100': isLoaded,
                    'blur-xs scale-105': blur && !isLoaded,
                    'blur-0 scale-100': blur && isLoaded,
                },
                classes,
            )}
        />
    );
};
