import React from "react";

type ApiCall = (...args: any[]) => Promise<any>;

interface UseApiThrottleProps<T extends ApiCall> {
  fn: T;
  callback?: (res: Awaited<ReturnType<T>>) => void;
}

/**
 * Prevent additional API call until the most recent one has completed.
 */
const useApiThrottle = <T extends ApiCall>(props: UseApiThrottleProps<T>) => {
  const [fetching, setFetching] = React.useState(false);

  const fn: (...args: Parameters<T>) => Promise<void> = React.useCallback(
    async (...args) => {
      if (fetching) {
        return;
      }
      setFetching(true);
      await props.fn(...args).then(props.callback);
      setFetching(false);
    },
    [props, fetching]
  );

  return { fetching, fn };
};

export default useApiThrottle;
