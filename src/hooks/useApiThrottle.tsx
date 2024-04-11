import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiCall = (...args: any[]) => Promise<any>;

interface UseApiThrottleProps<T extends ApiCall> {
  fn: T;
  callback?: (res: Awaited<ReturnType<T>>) => void;
}

/**
 * Prevent additional API call until the most recent one has completed.
 */
const useApiThrottle = <T extends ApiCall>(props: UseApiThrottleProps<T>) => {
  const { fn, callback } = props;
  const fetchingRef = React.useRef(false);

  const wrapperFn: (...args: Parameters<T>) => Promise<void> =
    React.useCallback(
      async (...args) => {
        if (fetchingRef.current) {
          return;
        }
        console.log("Executing");
        fetchingRef.current = true;
        await fn(...args).then(callback);
        fetchingRef.current = false;
      },
      [fn, callback]
    );

  return { fetching: fetchingRef.current, fn: wrapperFn };
};

export default useApiThrottle;
