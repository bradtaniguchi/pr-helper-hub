import { BaseFilter } from '../constants/base-filters';
import { isValidUrl } from './is-valid-url';

/**
 * Utility function that returns the URL from the url state.
 *
 * @param params The state to get the URL from
 * @param params.baseUrl The base URL
 * @param params.baseFilters The base filters
 * @param params.repos The repos
 * @param params.customFilter The custom filter
 */
export function getUrlFromState(params: {
  baseUrl: string;
  baseFilters: BaseFilter[];
  repos: Array<string>;
  customFilter: string;
}): string {
  const { baseUrl, baseFilters, repos, customFilter } = params;
  if (!isValidUrl(baseUrl)) return '';
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
}
