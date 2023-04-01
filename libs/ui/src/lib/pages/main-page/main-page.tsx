import BaseFilters from '../../components/base-filters/base-filters';
import Repos from '../../components/repos/repos';
import Url from '../../components/url/url';

/* eslint-disable-next-line */
export interface MainPageProps {}

/**
 * The main-page is the actual UI page routed and managed by nextjs.
 *
 * @param props the props of the component
 */
export function MainPage(props: MainPageProps) {
  // TODO add state logic
  return (
    <div className="grid-col-5 grid-row-5 grid gap-2">
      <div className="col-span-5 row-span-1">
        <Url />
      </div>
      <div className="col-span-1 row-span-4">
        <BaseFilters />
      </div>

      <div className="col-span-4 row-span-4">
        <Repos />
      </div>
    </div>
  );
}

export default MainPage;
