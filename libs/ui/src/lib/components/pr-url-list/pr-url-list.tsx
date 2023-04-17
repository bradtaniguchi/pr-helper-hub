import Link from 'next/link';
import { SavedPullRequestUrl } from '../../models/pull-request-url';
import { getUrlFromState } from '../../utils';

/* eslint-disable-next-line */
export interface PrUrlListProps {
  /**
   * Callback that is called when the user clicks on the load button.
   */
  onSelect: (prUrlId: string) => void;
  /**
   * The array of selectable PR urls.
   */
  urls?: Array<SavedPullRequestUrl>;
}

/**
 * The PR url list is the component shown in the modal when the user hits "load"
 * from the main URL component. It only represents the individual list items.
 *
 * This component is a "dumb" display component and is managed via hooks.
 *
 * @see PRUrlListModal
 * @param props The props of the component
 */
export function PrUrlList(props: PrUrlListProps) {
  const { urls } = props;
  if (!urls || urls.length === 0) {
    return (
      <div>
        <h1>No saved URLs</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>List of previously saved PRs</h1>
      <ul>
        {(urls ?? [])
          .map(({ name, baseFilters, baseUrl, customFilter, repos }) => ({
            name,
            url: getUrlFromState({
              baseFilters,
              baseUrl,
              customFilter,
              repos,
            }),
          }))
          .map(({ name, url }) => (
            <li key={url}>
              <div>
                <div>{name}</div>
                <div className="underline">
                  <Link href={url}>{url}</Link>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PrUrlList;
