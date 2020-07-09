import { renderHook, act } from '@testing-library/react-hooks';
import useScrollToTopOnDependencyChange from '../useScrollToTopOnDependencyChange';

describe('useScrollToTopOnDependencyChange', () => {
    let oldWindowScrollTo: Function;

    beforeEach(() => {
        oldWindowScrollTo = window.scrollTo;
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        // @ts-ignore => cannot copy type of window.scroll somehow
        window.scrollTo = oldWindowScrollTo;
    });

    describe('on mount', () => {
        it('should execute window.scroll', () => {
            renderHook(() => useScrollToTopOnDependencyChange());

            expect(window.scrollTo).toBeCalledTimes(1);
        });
    });

    describe('when dependency changes', () => {
        it('should execute window.scroll', () => {
            let depedencies = ['first'];

            const { result, rerender } = renderHook(() =>
                useScrollToTopOnDependencyChange(...depedencies)
            );

            // change dependencies and re-render
            depedencies = ['second'];
            rerender();

            expect(window.scrollTo).toBeCalledTimes(2);
        });
    });
});
