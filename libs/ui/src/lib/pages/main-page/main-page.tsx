import { Button } from 'flowbite-react';
import BaseFilters from '../../components/base-filters/base-filters';
import Repos from '../../components/repos/repos';
import Url from '../../components/url/url';
import { usePullUrlState, useSavedUrlState } from '../../hooks';
import React, { SyntheticEvent, useCallback } from 'react';

/* eslint-disable-next-line */
export interface MainPageProps {
  /**
   * Feature flag level to show the load logic. If true we will show the
   * save/load/delete buttons.
   */
  showLoadLogic?: boolean;
}

/**
 * The main-page is the actual UI page routed and managed by nextjs.
 *
 * @param props the props of the component
 * @param props.showLoadLogic feature flag level to show the load logic.
 * If true we will show the save/load/delete buttons.
 */
export function MainPage(props: MainPageProps) {
  const { showLoadLogic } = props;
  const {
    url,
    invalidError,
    baseFilters,
    repos,
    baseUrl,
    customFilter,
    ...functions
  } = usePullUrlState({
    baseUrl: 'https://github.com/',
  });
  const { selectedUrlId, remove, upsert, hasSaveUrl } = useSavedUrlState({
    storageKey: 'PR_HELPER_URLS',
  });

  const handleSave = useCallback(() => {
    upsert({
      id: selectedUrlId,
      baseFilters,
      baseUrl,
      customFilter,
      repos,
    });
  }, [upsert, selectedUrlId, baseFilters, baseUrl, customFilter, repos]);

  const handleDelete = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      remove(url);
    },
    [remove, url]
  );

  return (
    <div className="grid-col-5 grid-row-5 grid gap-2">
      <div className="col-span-5 row-span-1">
        <Url
          url={url}
          invalidError={invalidError}
          actions={
            showLoadLogic
              ? [
                  selectedUrlId && hasSaveUrl(selectedUrlId) && (
                    <Button key="delete" onClick={handleDelete}>
                      Delete
                    </Button>
                  ),
                  <Button key="upsert" onClick={handleSave}>
                    {selectedUrlId && hasSaveUrl(selectedUrlId)
                      ? 'Update'
                      : 'Save'}
                  </Button>,
                ].filter(Boolean)
              : []
          }
        />
      </div>
      <div className="col-span-5 row-span-4 sm:col-span-1 md:col-span-1 lg:col-span-1">
        <BaseFilters selected={baseFilters} {...functions} />
      </div>

      <div className="col-span-5 row-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4">
        <Repos repos={repos} {...functions} />
      </div>
    </div>
  );
}

export default MainPage;
