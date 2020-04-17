import { useState, useCallback } from "react";

export const useLoadingCallback = <E>(fn: () => Promise<any>): [
  () => Promise<void>,
  boolean,
  E
] => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<E>();
  const runAsync = useCallback(
    async () => {
      try {
        setLoading(true);
        await fn();
        setError(undefined);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, fn]
  );
  return [runAsync, isLoading, error as E];
};
