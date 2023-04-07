import { useCallback, useState } from 'react';
import { BaseFilter } from '../constants';
import { isValidRepo, isValidUrl as isValidUrlFunc } from '../utils';

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
    (baseUrl: string) => setState((state) => ({ ...state, baseUrl })),
    []
  );

  const addBaseFilter = useCallback(
    (query: BaseFilter) =>
      setState((state) => ({
        ...state,
        baseFilters: [...state.baseFilters, query],
      })),
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

  const moveBaseFilter = useCallback(
    (filter: BaseFilter, newIndex: number) => {
      if (newIndex < 0 || newIndex > baseFilters.length)
        throw new Error(`Invalid index: ${newIndex}`);

      setState((state) => ({
        ...state,
        baseFilters: [
          ...baseFilters.slice(0, newIndex),
          filter,
          ...baseFilters.slice(newIndex),
        ],
      }));
    },
    [baseFilters]
  );

  const addRepo = useCallback((repo: string) => {
    if (!isValidRepo(repo)) {
      throw new Error(`Invalid repo: ${repo}`);
    }
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
    if (!isValidUrlFunc(baseUrl)) return '';
    const url = new URL(baseUrl);
    url.pathname += 'pulls';

    if (repos.length || baseFilters.length)
      url.searchParams.set('q', [...baseFilters, ...repos].join(' '));

    return url.toString();
  })();

  const isValidUrl = (() => {
    return isValidUrlFunc(url);
  })();

  return {
    /**
     * The URL string for the pull request page
     */
    url,
    /**
     * Returns if the url is valid. When a URL is invalid, then
     * `url` will return an empty string.
     */
    isValidUrl,
    /**
     * Reset the state to its initial value.
     */
    reset,
    /**
     * Sets the base-url for the query.
     *
     * @returns if the url was valid
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
     * Moves the given base filter to the new index
     */
    moveBaseFilter,
    /**
     * Returns if the given base filter is in already in the query
     */
    hasBaseFilter,
    /**
     * Add a repo to the query. Will throw an error if the repo name format is invalid.
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
