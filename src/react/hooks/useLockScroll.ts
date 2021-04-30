import { useEffect } from 'react';

export enum LockType {
    Overflow = 'overflow',
    Fixed = 'fixed',
}

let counter = 0;
let originalOverflow: string | null = null;
let originalPosition: string | null = null;
let scrollOffsetY = 0;
let scrollOffsetX = 0;
let useBodyScroll = false;
let currentLockType: LockType | null = null;

// Supports two lock types eg. Overflow or Fixed
// Overflow is clean and has less impact on code but is not supported in IOS / Safari
// @see https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
// There are other solutions:
// 1. https://github.com/willmcpo/body-scroll-lock -> prevents touch events on iOS in combination with overflow
// 2. Use overscroll-behavior: contain; -> Css only but seems to have some drawbacks (good for research / first try)
const lock = () => {
    switch (currentLockType) {
        case LockType.Overflow:
            originalOverflow = window.getComputedStyle(document.documentElement)
                .overflow;
            document.documentElement.style.overflow = 'hidden';

            return;
        case LockType.Fixed:
            originalPosition = window.getComputedStyle(document.body).position;

            // @todo move calculate position logic to utility which can be used separately
            scrollOffsetY =
                window.scrollY ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            scrollOffsetX =
                window.scrollX ||
                document.documentElement.scrollLeft ||
                document.body.scrollLeft;
            useBodyScroll =
                document.body.scrollLeft > 0 &&
                document.documentElement.scrollLeft === 0;

            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollOffsetY}px`;
            document.body.style.left = `-${scrollOffsetX}px`;

            return;
        default:
            throw new Error('Lock type not supported');
    }
};

const unlock = () => {
    switch (currentLockType) {
        case LockType.Overflow:
            if (originalOverflow) {
                document.documentElement.style.overflow = originalOverflow;
            }

            originalOverflow = null;

            return;
        case LockType.Fixed:
            if (originalPosition) {
                document.body.style.position = originalPosition;
            }

            if (useBodyScroll) {
                window.scrollTo(0, scrollOffsetY);
                document.body.scrollTo(scrollOffsetX, 0);
            } else {
                window.scrollTo(scrollOffsetX, scrollOffsetY);
            }

            originalPosition = null;

            return;
        default:
            throw new Error('Lock type not supported');
    }
};

const increment = () => {
    counter++;
    if (counter === 1) {
        lock();
    }
};

const decrement = () => {
    counter--;
    if (counter === 0) {
        unlock();
    }
};

const useLockScroll = (lockType: LockType, enabled = true) => {
    useEffect(() => {
        if (enabled) {
            currentLockType = lockType;

            increment();

            return () => decrement();
        }

        return;
    }, [enabled, lockType]);
};

export default useLockScroll;
