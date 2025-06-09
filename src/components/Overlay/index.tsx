import { h, FunctionalComponent, RefObject, JSX } from 'preact';
import { useRef } from 'preact/hooks';
import { toggleSideDrawer } from '@/components/SideDrawer';

let overlayEl: RefObject<HTMLDivElement> | null;
let show = false;

const hideClasses = ['opacity-0', 'hidden'];
const showClasses = ['opacity-100'];

export const toggleOverlay = (shouldShow?: boolean | undefined): void => {
    const node = overlayEl?.current; // DOM Ref

    if (!node) {
        return;
    }

    show = typeof shouldShow === 'boolean' ? shouldShow : !show;
    node.classList.add(...(show ? showClasses : hideClasses));
    node.classList.remove(...(show ? hideClasses : showClasses));
    node.setAttribute('aria-hidden', show.toString());
    document.body.classList.toggle('overflow-hidden', show);
};

const overlayOnClick = (): void => {
    toggleSideDrawer(false);
};

export const Overlay: FunctionalComponent = (): JSX.Element => {
    overlayEl = useRef(null);

    return (
        <div
            ref={overlayEl}
            class="fixed overflow-hidden z-10 bg-zinc-900 bg-opacity-80 inset-0 transform ease-in-out duration-700 opacity-0 hidden transition-all"
            onClick={overlayOnClick}
            aria-hidden={!!show}
        />
    );
};
