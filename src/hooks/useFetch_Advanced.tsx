import { useCallback, useEffect, useRef, useState } from "react";

type CacheEntry<T> = {
  data?: T;
  error?: string;
  promise?: Promise<T>;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

type UseFetchOptions = {
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useFetch<T>(
  url: string,
  requestOptions?: RequestInit,
  config?: UseFetchOptions
) {
  const { staleTime = 0, refetchOnWindowFocus = true } = config || {};

  const [data, setData] = useState<T | null>(() => {
    const cached = cache.get(url);
    return cached?.data ?? null
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!cache.get(url)?.data);

  const controllerRef = useRef<AbortController | null>(null);

  const isStale = () => {
    const cached = cache.get(url);
    if (!cached) return true;
    return Date.now() - cached.timestamp > staleTime;
  }

  const fetchData = useCallback(async (background = false) => {
    const cached = cache.get(url);

    // Deduplicate: reuse in-flight request
    if (cached?.promise) {
      const result = await cached.promise;
      setData(result);
      return;
    }

    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    const fetchPromise = (async () => {
      const response = await fetch(url, {
        ...requestOptions,
        signal: controllerRef.current!.signal
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      return (await response.json()) as T;
    })();

    cache.set(url, {
      ...cached,
      promise: fetchPromise,
      timestamp: Date.now()
    });

    try {
      if (!background) setLoading(true);

      const result = await fetchPromise;

      cache.set(url, {
        data: result,
        timestamp: Date.now()
      });

      setData(result);
      setError(null);
    } catch (err) {
      if ((err as DOMException).name !== "AbortError") {
        setError((err as Error).message);
        cache.set(url, {
          error: (err as Error).message,
          timestamp: Date.now()
        });
      }
    } finally {
      if (!background) setLoading(false);
    }
  }, [url, requestOptions]);

  useEffect(() => {
    if (!cache.get(url) || isStale()) {
      fetchData();
    }
  }, [url, fetchData]);

  // Background refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const onFocus = () => {
      if (isStale()) fetchData(true);
    };

    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchData, refetchOnWindowFocus]);

  return {
    data,
    error,
    loading,
    refetch: () => fetchData(true)
  }
}