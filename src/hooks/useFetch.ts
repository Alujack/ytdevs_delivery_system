import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseFetchDataOptions<T> {
  url: string;
  config?: AxiosRequestConfig;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

interface UseFetchDataState<T> {
  data: T | null;
  loading: boolean;
  error: unknown;
}

export function useFetchData<T>(options: UseFetchDataOptions<T>): UseFetchDataState<T> {
  const { url, config, onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if the component is unmounted

    const fetchData = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<T> = await axios.get(url, config);
        if (isMounted) {
          setData(response.data);
          onSuccess?.(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          onError?.(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, [url, config, onSuccess, onError]);

  return { data, loading, error };
}
