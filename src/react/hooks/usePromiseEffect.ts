import { DependencyList, useEffect, useState } from 'react';

export enum Status {
    Pending = 'pending',
    Fulfilled = 'fullfiled',
    Rejected = 'rejected',
}

export type PendingState = { status: Status.Pending; value: null; error: null };

export type RejectedState = {
    status: Status.Rejected;
    value: null;
    error: Error;
};

export type FulfilledState<T> = {
    status: Status.Fulfilled;
    value: T;
    error: null;
};

export type PromiseState<T> = PendingState | FulfilledState<T> | RejectedState;

export type EffectExecutor<T> = () => Promise<T>;

export type Response<T> = {
    value: T | null;
    pending: boolean;
    error: Error | null;
};

export default function usePromiseEffect<T>(
    executeEffect: EffectExecutor<T>,
    deps: DependencyList,
    cleanup?: () => void
): Response<T> {
    const [state, setState] = useState<PromiseState<T>>({
        status: Status.Pending,
        value: null,
        error: null,
    });

    useEffect(() => {
        executeEffect()
            .then((value) => {
                setState({
                    status: Status.Fulfilled,
                    value,
                    error: null,
                });
            })
            .catch((error) =>
                setState({ status: Status.Rejected, value: null, error })
            );

        return cleanup;
    }, deps);

    return {
        value: state.value,
        pending: state.status === Status.Pending,
        error: state.error,
    };
}
