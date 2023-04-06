import { useCallback, useState } from 'react';

/**
 * Primary hook to manage the URL state for the pull request page.
 *
 * @param params The initial state
 * @param params.baseUrl The initial baseUrl
 */
export function usePullUrlState(params: { baseUrl: string }) {
  const [{ baseUrl, query }, setState] = useState<{
    baseUrl: string;
    query: Array<string>;
  }>({
    baseUrl: params.baseUrl,
    query: [],
  });

  const reset = useCallback(
    () =>
      setState({
        baseUrl: '',
        query: [],
      }),
    []
  );

  const setBaseUrl = useCallback(
    (baseUrl: string) =>
      // TODO: validate
      setState((state) => ({ ...state, baseUrl })),
    []
  );

  const hasQueryParam = useCallback(
    (param: string) => query.includes(param),
    [query]
  );

  const addBaseFilter = useCallback(
    (query: string) =>
      // TODO: add validation
      setState((state) => ({ ...state, query: [...state.query, query] })),
    []
  );

  const removeBaseFilter = useCallback(
    (query: string) =>
      setState((state) => ({
        ...state,
        query: state.query.filter((el) => el !== query),
      })),
    []
  );

  const addRepo = useCallback((repo: string) => {
    // TODO: add validation
    setState((state) => ({
      ...state,
      query: [...state.query, `repo:${repo}`],
    }));
  }, []);

  const removeRepo = useCallback(
    (repo: string) =>
      setState((state) => ({
        ...state,
        query: state.query.filter((el) => el !== `repo:${repo}`),
      })),
    []
  );

  const url = (() => {
    const url = new URL(baseUrl);
    url.pathname += 'pulls';

    if (query.length) url.searchParams.set('q', query.join(' '));

    return url.toString();
  })();

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
     * Sets the base-url for the query
     */
    setBaseUrl,
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
