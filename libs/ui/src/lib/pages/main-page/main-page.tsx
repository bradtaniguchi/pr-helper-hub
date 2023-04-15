import { Button } from 'flowbite-react';
import BaseFilters from '../../components/base-filters/base-filters';
import Repos from '../../components/repos/repos';
import Url from '../../components/url/url';
import { usePullUrlState, useSavedUrlState } from '../../hooks';
import React, { SyntheticEvent, useCallback } from 'react';

/* eslint-disable-next-line */
export interface MainPageProps {}

/**
 * The main-page is the actual UI page routed and managed by nextjs.
 *
 * @param props the props of the component
 */
export function MainPage(props: MainPageProps) {
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
  const { remove, upsert } = useSavedUrlState({ storageKey: 'PR_HELPER_URLS' });

  const handleSave = useCallback(() => {
    upsert({
      baseFilters,
      baseUrl,
      customFilter,
      repos,
    });
  }, [upsert, baseFilters, baseUrl, customFilter, repos]);

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
          actions={[
            // TODO: add display logic
            <Button key="delete" onClick={handleDelete}>
              Delete
            </Button>,
            <Button key="save" onClick={handleSave}>
              Save
            </Button>,
          ]}
        />
      </div>
      <div className="col-span-1 row-span-4">
        <BaseFilters selected={baseFilters} {...functions} />
      </div>

      <div className="col-span-4 row-span-4">
        <Repos repos={repos} {...functions} />
      </div>
    </div>
  );
}

export default MainPage;
