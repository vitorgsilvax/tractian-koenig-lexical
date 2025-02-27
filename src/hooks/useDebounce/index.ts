import {useEffect, useState} from 'react';

import {UseDebounceReturn} from './types';

function useDebounce<T>(value: T, delay: number): UseDebounceReturn<T> {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
