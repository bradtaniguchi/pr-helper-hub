import { useCallback, useState } from 'react';
import { BaseFilter, CONVERSE_MAPPING } from '../constants';
import {
  getInvalidUrlError,
  isValidRepo,
  isValidUrl as isValidUrlFunc,
} from '../utils';

interface UsePullUrlState {
  baseUrl: string;
  baseFilters: BaseFilter[];
  repos: Array<string>;
  customFilter: string;
}
/**
 * Primary hook to manage the URL state for the pull request page.
 *
 * TODO: add custom filter
 *
 * @param params The initial state
 * @param params.baseUrl The initial baseUrl
 */
export function usePullUrlState(params: { baseUrl: string }) {
  const [{ baseUrl, baseFilters, repos, customFilter }, setState] =
    useState<UsePullUrlState>({
      baseUrl: params.baseUrl,
      baseFilters: [],
      repos: [],
      customFilter: '',
    });

  const reset = useCallback(
    ({ baseUrl, baseFilters, repos }: UsePullUrlState) =>
      setState({
        baseUrl: baseUrl ?? '',
        baseFilters: baseFilters ?? [],
        repos: repos ?? [],
        customFilter: '',
      }),
    []
  );

  const setBaseUrl = useCallback(
    (baseUrl: string) => setState((state) => ({ ...state, baseUrl })),
    []
  );

  const addBaseFilter = useCallback(
    (filter: BaseFilter) =>
      setState((state) => ({
        ...state,
        baseFilters: (() => {
          if (filter in CONVERSE_MAPPING) {
            return [
              // remove the converse
              ...state.baseFilters.filter(
                (el) => el !== (CONVERSE_MAPPING as never)[filter]
              ),
              // add the given filter
              filter,
            ];
          }
          return [...state.baseFilters, filter];
        })(),
      })),
    []
  );

  const removeBaseFilter = useCallback(
    (filter: string) =>
      setState((state) => ({
        ...state,
        baseFilters: state.baseFilters.filter((el) => el !== filter),
      })),
    []
  );

  const hasBaseFilter = useCallback(
    (filter: BaseFilter) => baseFilters.includes(filter),
    [baseFilters]
  );

  const toggleBaseFilter = useCallback(
    (filter: BaseFilter) => {
      if (hasBaseFilter(filter)) {
        removeBaseFilter(filter);
      } else {
        addBaseFilter(filter);
      }
    },
    [addBaseFilter, hasBaseFilter, removeBaseFilter]
  );

  const moveBaseFilter = useCallback(
    (filter: BaseFilter, newIndex: number) => {
      if (newIndex < 0 || newIndex > baseFilters.length)
        throw new Error(`Invalid index: ${newIndex}`);

      if (!baseFilters.includes(filter))
        throw new Error(`Filter not found: ${filter}`);

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

  const moveRepo = useCallback(
    (repo: string, newIndex: number) => {
      if (newIndex < 0 || newIndex > repos.length)
        throw new Error(`Invalid index: ${newIndex}`);

      if (!repos.includes(`repo:${repo}`))
        throw new Error(`Repo not found: ${repo}`);

      setState((state) => ({
        ...state,
        repos: [
          ...repos.slice(0, newIndex),
          `repo:${repo}`,
          ...repos.slice(newIndex),
        ],
      }));
    },
    [repos]
  );
  const setCustomFilter = useCallback((customFilter: string) => {
    setState((state) => ({
      ...state,
      customFilter,
    }));
  }, []);

  const resetCustomFilter = useCallback(() => {
    setState((state) => ({
      ...state,
      customFilter: '',
    }));
  }, []);

  const url = (() => {
    if (!isValidUrlFunc(baseUrl)) return '';
    const url = new URL(baseUrl);
    url.pathname += 'pulls';

    if (repos.length || baseFilters.length)
      url.searchParams.set('q', [...baseFilters, ...repos].join(' '));

    if (customFilter)
      url.searchParams.set(
        'q',
        [url.searchParams.get('q'), customFilter].filter(Boolean).join(' ')
      );

    return url.toString();
  })();

  const invalidError = (() => {
    return getInvalidUrlError(url);
  })();

  return {
    /**
     * The URL string for the pull request page
     */
    url,
    /**
     * Returns the relevant error, if there is one. Used to
     * display an error message to the user
     */
    invalidError,
    /**
     * The baseURL currently set
     */
    baseUrl,
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
     * The currently selected baseFilters.
     *
     * Frozen as to not manipulate elsewhere.
     */
    baseFilters,
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
     * Toggles the given base filter
     */
    toggleBaseFilter,
    /**
     * Moves the given base filter to the new index
     */
    moveBaseFilter,
    /**
     * Returns if the given base filter is in already in the query
     */
    hasBaseFilter,
    /**
     * The currently selected repos.
     *
     * Frozen as to not manipulate elsewhere.
     */
    repos,
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
    /**
     * Moves the given repo to the new index
     */
    moveRepo,
    /**
     * The custom filter string
     */
    customFilter,
    /**
     * Sets the custom filter string
     */
    setCustomFilter,
    /**
     * Resets the custom filter string back to an empty string
     */
    resetCustomFilter,
  };
}
