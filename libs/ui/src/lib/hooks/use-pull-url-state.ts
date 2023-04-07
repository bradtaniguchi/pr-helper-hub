import { useCallback, useState } from 'react';
import { BaseFilter } from '../constants';

/**
 * Primary hook to manage the URL state for the pull request page.
 *
 * @param params The initial state
 * @param params.baseUrl The initial baseUrl
 */
export function usePullUrlState(params: { baseUrl: string }) {
  const [{ baseUrl, baseFilters, repos }, setState] = useState<{
    baseUrl: string;
    baseFilters: BaseFilter[];
    repos: Array<string>;
  }>({
    baseUrl: params.baseUrl,
    baseFilters: [],
    repos: [],
  });

  const reset = useCallback(
    () =>
      setState({
        baseUrl: '',
        baseFilters: [],
        repos: [],
      }),
    []
  );

  const setBaseUrl = useCallback(
    (baseUrl: string) =>
      // TODO: validate
      setState((state) => ({ ...state, baseUrl })),
    []
  );

  const addBaseFilter = useCallback(
    (query: BaseFilter) =>
      // TODO: add validation
      setState((state) => ({ ...state, repos: [...state.repos, query] })),
    []
  );

  const removeBaseFilter = useCallback(
    (query: string) =>
      setState((state) => ({
        ...state,
        repos: state.repos.filter((el) => el !== query),
      })),
    []
  );

  const hasBaseFilter = useCallback(
    (filter: BaseFilter) => baseFilters.includes(filter),
    [baseFilters]
  );

  const addRepo = useCallback((repo: string) => {
    // TODO: add validation
    setState((state) => ({
      ...state,
      repos: [...state.repos, `repo:${repo}`],
    }));
  }, []);

  const removeRepo = useCallback(
    (repo: string) =>
      setState((state) => ({
        ...state,
        repos: state.repos.filter((el) => el !== `repo:${repo}`),
      })),
    []
  );

  const hasRepo = useCallback(
    (repo: string) => repos.includes(`repo:${repo}`),
    [repos]
  );

  const url = (() => {
    const url = new URL(baseUrl);
    url.pathname += 'pulls';

    if (repos.length || baseFilters.length)
      url.searchParams.set('q', [...baseFilters, ...repos].join(' '));

    return url.toString();
  })();

  return {
    /**
     * The URL string for the pull request page
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
     * Add a base filter to the query
     */
    addBaseFilter,
    /**
     * Removes the base filter
     * **note** this will remove the given repo if it matches!
     */
    removeBaseFilter,
    /**
     * Returns if the given base filter is in already in the query
     */
    hasBaseFilter,
    /**
     * Add a repo to the query
     */
    addRepo,
    /**
     * Removes the given repo from the query
     */
    removeRepo,
    /**
     * Returns if the given repo is in already in the query
     */
    hasRepo,
  };
}
