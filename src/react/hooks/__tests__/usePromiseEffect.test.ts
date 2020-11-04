import { EffectExecutor } from './../usePromiseEffect';
import { renderHook, act } from '@testing-library/react-hooks';
import usePromiseEffect, { Status, Response } from '../usePromiseEffect';

describe('usePromiseEffect', () => {
    describe('When pending', () => {
        it('should return the pending state', (done) => {
            const executeEffect: EffectExecutor<string> = async () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve('hallo');
                    }, 200);
                });
            };

            const { result } = renderHook<{}, Response<string>>(() =>
                usePromiseEffect<string>(executeEffect, [])
            );

            expect(result.current).toEqual({
                pending: true,
                error: null,
                value: null,
            });

            done();
        });
    });

    describe('When successful', () => {
        it('should return the fulffilled state', async (done) => {
            const executeEffect: EffectExecutor<string> = async () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve('hallo');
                    }, 200);
                });
            };

            const { result, waitForNextUpdate } = renderHook<
                {},
                Response<string>
            >(() => usePromiseEffect<string>(executeEffect, []));

            await waitForNextUpdate();

            expect(result.current).toEqual({
                pending: false,
                value: 'hallo',
                error: null,
            });

            done();
        });
    });

    describe('When an error occurs', () => {
        it('should return the error state', async (done) => {
            const error = new Error('Some test error');

            const executeEffect: EffectExecutor<string> = async () => {
                return new Promise((_resolve, reject) => {
                    setTimeout(() => {
                        reject(error);
                    }, 200);
                });
            };

            const { result, waitForNextUpdate } = renderHook<
                {},
                Response<string>
            >(() => usePromiseEffect<string>(executeEffect, []));

            await waitForNextUpdate();

            expect(result.current).toEqual({
                error,
                value: null,
                pending: false,
            });

            done();
        });
    });
});
