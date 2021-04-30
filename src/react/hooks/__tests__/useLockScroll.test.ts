import { renderHook } from '@testing-library/react-hooks';
import useLockScroll, { LockType } from '../useLockScroll';

describe('useLockScroll', () => {
    it('should add overflow to html element', () => {
        renderHook(() => useLockScroll(LockType.Overflow, true));

        expect(document.documentElement.style.overflow).toBe('hidden');
    });

    it('should add position fixed to body element', () => {
        renderHook(() => useLockScroll(LockType.Fixed, true));

        expect(document.body.style.position).toBe('fixed');
    });
});
