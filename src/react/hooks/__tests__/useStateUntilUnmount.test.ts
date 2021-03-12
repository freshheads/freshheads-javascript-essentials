import { act, renderHook } from '@testing-library/react-hooks';
import useStateUntilUnmount from '../useStateUntilUnmount';

describe('useStateUntilUnmount', () => {
    it('should be usable as a regular `useState()` hook', () => {
        const initialValue = 'some value';

        const { result } = renderHook(() =>
            useStateUntilUnmount<string>('some value')
        );

        const [initialState] = result.current;

        expect(initialState).toBe(initialValue);

        const updatedValue = 'other value';

        act(() => {
            const [, setState] = result.current;

            setState(updatedValue);
        });

        const [updatedState] = result.current;

        expect(updatedState).toBe(updatedValue);
    });
});
