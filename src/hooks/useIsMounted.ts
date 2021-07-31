import { useEffect, useRef } from 'preact/hooks';

export const useIsMounted = (): (() => boolean) => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return (): void => {
            isMounted.current = false;
        };
    }, []);

    return (): boolean => isMounted.current;
};
