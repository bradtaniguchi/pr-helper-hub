import { Button } from 'flowbite-react';
import BaseFilters from '../../components/base-filters/base-filters';
import Repos from '../../components/repos/repos';
import Url from '../../components/url/url';
import { usePullUrlState } from '../../hooks';

/* eslint-disable-next-line */
export interface MainPageProps {}

/**
 * The main-page is the actual UI page routed and managed by nextjs.
 *
 * @param props the props of the component
 */
export function MainPage(props: MainPageProps) {
  const { url, baseFilters, ...functions } = usePullUrlState({
    baseUrl: 'https://github.com/',
  });
  return (
    <div className="grid-col-5 grid-row-5 grid gap-2">
      <div className="col-span-5 row-span-1">
        <Url
          url={url}
          actions={[
            // TODO: add display logic
            <Button key="1">Delete</Button>,
            <Button key="2">Save</Button>,
          ]}
        />
      </div>
      <div className="col-span-1 row-span-4">
        <BaseFilters selected={baseFilters} {...functions} />
      </div>

      <div className="col-span-4 row-span-4">
        <Repos />
      </div>
    </div>
  );
}

export default MainPage;
