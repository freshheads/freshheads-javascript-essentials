import { useEffect } from 'react';

export default function useScrollToTopOnDependencyChange(
    ...dependencies: any[]
): void {
    useEffect(() => window.scrollTo(0, 0), dependencies);
}
