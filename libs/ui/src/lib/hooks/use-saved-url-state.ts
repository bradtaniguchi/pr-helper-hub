import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useEffectOnce, useLocalStorage } from 'react-use';
import { PullRequestUrl } from '../models/pull-request-url';

export interface UseSavedUrlState {
  /**
   * The URL by its unique identifier.
   */
  selectedUrlId?: string;
  /**
   * The list of saved URLs.
   */
  savedUrls?: Array<
    PullRequestUrl & {
      id: string;
    }
  >;
}

/**
 * Primary hook to manage URL states for pull-request-urls.
 *
 * @param params The initial state
 * @param params.storageKey The key to use for local-storage
 */
export function useSavedUrlState(params: { storageKey: string }) {
  const { storageKey } = params;
  const [state, setState] = useState<UseSavedUrlState>();
  const [storageValue, setStorageValue, removeStorageValue] =
    useLocalStorage<UseSavedUrlState>(storageKey, {});

  useEffectOnce(() => {
    if (storageValue) {
      // if there is a storage value, then save to the
      setState(storageValue);
    }
  });

  useEffect(() => {
    console.log('test update');
    if (state) {
      // if there is a state, then save to the local-storage
      setStorageValue(state);
    }
  }, [setStorageValue, state]);

  const upsert = useCallback(
    (pullRequestUrlState: PullRequestUrl & { id?: string }) => {
      const { id } = pullRequestUrlState;
      setState((state) => ({
        ...state,
        savedUrls: [
          ...(state?.savedUrls ?? []).filter((savedUrl) => savedUrl.id !== id),
          id
            ? // if there is an id, then update the existing saved-url
              { id, ...pullRequestUrlState }
            : // otherwise, create a new saved-url
              {
                ...pullRequestUrlState,
                id: nanoid(),
              },
        ],
      }));
    },
    []
  );

  const remove = useCallback((id: string) => {
    if (!id) return;
    setState((state) => ({
      ...state,
      savedUrls: (state?.savedUrls ?? []).filter(
        (savedUrl) => savedUrl.id !== id
      ),
    }));
  }, []);

  const reset = useCallback(() => {
    setState({});
    removeStorageValue();
  }, [removeStorageValue]);

  const { savedUrls, selectedUrlId } = state ?? {};

  const savedUrlsMap = useMemo(() => {
    return savedUrls?.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as Record<string, PullRequestUrl>);
  }, [savedUrls]);

  const selectedUrl = useMemo(() => {
    return savedUrlsMap?.[selectedUrlId ?? ''];
  }, [savedUrlsMap, selectedUrlId]);

  const hasSaveUrl = useCallback(
    (id: string) => !!savedUrlsMap?.[id],
    [savedUrlsMap]
  );

  return {
    /**
     * The currently selected url id
     */
    selectedUrlId,
    /**
     * The currently selected url, based on selectedUrlId
     */
    selectedUrl,
    /**
     * The list of saved URLs.
     */
    savedUrls,
    /**
     * Map of saved-urls by their unique identifier.
     */
    savedUrlsMap,
    /**
     * Saves or updates the given pull-request-url.
     */
    upsert,
    /**
     * Remove the given pull-request-url by its ID.
     */
    remove,
    /**
     * Resets all state, and deletes all saved URLs.
     */
    reset,
    /**
     * Returns if the given url has already been saved. This is denoted by the
     * URL already having an `id` attribute.
     */
    hasSaveUrl,
  };
}
