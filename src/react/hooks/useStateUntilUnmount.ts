import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export default function useStateUntilUnmount<T>(
    initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
    // useRef to memorize if the component is mounted between renders
    const isMounted = useRef<boolean>(false);

    const [value, setValueState] = useState<T>(initialValue);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    });

    const setValue = useRef<Dispatch<SetStateAction<T>>>((...args) => {
        if (!isMounted.current) {
            return;
        }

        setValueState(...args);
    });

    return [value, setValue.current];
}
