import { useCallback, useState } from 'react';

/**
 * Primary hook to manage the url-state.
 */
export function useUrlState() {
  const [url, setUrl] = useState(new URL(''));

  const reset = useCallback(() => setUrl(new URL('')), []);

  const setBaseUrl = useCallback(
    // TODO: modify
    (baseUrl: string) => setUrl(new URL(baseUrl)),
    []
  );

  const setQueryParam = useCallback((param: string, value: string) => {
    setUrl((url) => {
      url.searchParams.set(param, value);
      return url;
    });
  }, []);

  return {
    /**
     * The actual raw URL as a string
     */
    url: url.toString(),
    /**
     * Reset the state to its initial value.
     */
    reset,
    /**
     * Set the base URL, e.g. https://github.com
     */
    setBaseUrl,
    /**
     *
     */
    setQueryParam,
  };
}
