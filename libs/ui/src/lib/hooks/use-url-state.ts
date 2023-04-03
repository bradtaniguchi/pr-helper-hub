import { useCallback, useMemo, useState } from 'react';

/**
 * Primary hook to manage the url-state.
 *
 * @param params The initial state
 * @param params.baseUrl The initial baseUrl
 */
export function useUrlState(params: { baseUrl: string }) {
  const [{ baseUrl, query }, setState] = useState<{
    baseUrl: string;
    query: string;
  }>({
    baseUrl: params.baseUrl,
    query: '',
  });

  const reset = useCallback(
    () =>
      setState({
        baseUrl: '',
        query: '',
      }),
    []
  );

  const hasQueryParam = useCallback(
    (param: string) => query.includes(param),
    [query]
  );

  const addBaseFilter = useCallback(
    (query: string) =>
      // TODO: add validation
      setState((state) => ({ ...state, query: state.query + '' + query })),
    []
  );

  const removeBaseFilter = useCallback(
    (query: string) =>
      setState((state) => ({
        ...state,
        query: state.query.replace(query, ''),
      })),
    []
  );

  const addRepo = useCallback((repo: string) => {
    // TODO: add validation
    setState((state) => ({ ...state, query: `${state.query} repo:${repo}` }));
  }, []);

  const removeRepo = useCallback(
    () =>
      setState((state) => ({
        ...state,
        query: state.query.replace(/repo:[^ ]+/, ''),
      })),
    []
  );

  const url = useMemo(() => {
    const url = new URL(baseUrl);
    url.searchParams.set('q', query);
    return url;
  }, [baseUrl, query]);

  return {
    /**
     * The URL object that can be shown to the user
     */
    url,
    /**
     * Reset the state to its initial value.
     */
    reset,
    /**
     * If the query-param is present in the URL
     */
    hasQueryParam,
    /**
     * Add a base filter to the query
     */
    addBaseFilter,
    /**
     * Add a repo to the query
     */
    addRepo,
    /**
     * Removes the given repo from the query
     */
    removeRepo,
    /**
     * Removes the base filter
     * **note** this will remove the given repo if it matches!
     */
    removeBaseFilter,
  };
}
