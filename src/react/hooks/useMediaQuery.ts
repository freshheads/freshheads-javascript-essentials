import { useEffect, useMemo, useState } from 'react';

export type MediaQueryType = 'only' | 'up' | 'down' | 'between';
export type MediaQueryBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const breakpoints: Record<string, number> = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
};

const useMediaQuery = (
    query: MediaQueryType,
    breakpoint: MediaQueryBreakpoint,
    additionalBreakpoint?: MediaQueryBreakpoint
): boolean => {
    function canMatchMedia(): boolean {
        if (typeof window !== 'object') return false;
        return !!window.matchMedia;
    }

    function getBreakpointValue(type: string, exclusive = false): number {
        const breakpoint: number = breakpoints[type];

        return exclusive ? breakpoint - 1 : breakpoint;
    }

    const getQuery = useMemo(() => {
        let previousBreakpoint = 0;

        switch (query) {
            case 'up':
                return `only screen and (min-width: ${getBreakpointValue(
                    breakpoint
                )}px)`;
            case 'down':
                return `only screen and (max-width: ${getBreakpointValue(
                    breakpoint,
                    true
                )}px)`;
            case 'only':
                Object.entries(breakpoints).forEach(([key, value]) => {
                    if (value === getBreakpointValue(breakpoint)) return;

                    if (key !== breakpoint) {
                        previousBreakpoint = value;
                    }
                });
                return `only screen and (min-width: ${previousBreakpoint}px) and (max-width: ${getBreakpointValue(
                    breakpoint,
                    true
                )}px)`;
            case 'between':
                if (!additionalBreakpoint)
                    throw new Error(
                        "MediaQueryType 'between' needs an additionalBreakpoint!"
                    );
                return `only screen and (min-width: ${getBreakpointValue(
                    breakpoint
                )}px) and (max-width: ${getBreakpointValue(
                    additionalBreakpoint,
                    true
                )}px)`;
        }

        return 'only screen';
    }, [additionalBreakpoint, breakpoint, query]);

    const [matches, setMatches] = useState<boolean>(
        canMatchMedia() ? window.matchMedia(getQuery).matches : false
    );

    useEffect(() => {
        if (!canMatchMedia()) return;

        const mediaQueryList = window.matchMedia(getQuery);

        if (mediaQueryList.matches !== matches)
            return setMatches(mediaQueryList.matches);

        const listener = () => setMatches(mediaQueryList.matches);

        mediaQueryList.addEventListener
            ? mediaQueryList.addEventListener('change', listener)
            : mediaQueryList.addListener(listener);

        return () => {
            mediaQueryList.removeEventListener
                ? mediaQueryList.removeEventListener('change', listener)
                : mediaQueryList.removeListener(listener);
        };
    }, [getQuery, matches]);

    return matches;
};

export default useMediaQuery;
