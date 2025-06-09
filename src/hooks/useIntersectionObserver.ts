import { RefObject } from 'preact';
import { useEffect, useState } from 'preact/hooks';

interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
    elementRef: RefObject<HTMLElement>,
    { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }: Args,
): [IntersectionObserverEntry | undefined, IntersectionObserver | undefined] => {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();
    const [observer, setObserver] = useState<IntersectionObserver>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    useEffect(() => {
        const node = elementRef?.current; // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);
        setObserver(observer);

        return (): void => {
            observer.disconnect();
        };
    }, [elementRef, threshold, root, rootMargin, frozen]);

    return [entry, observer];
};
