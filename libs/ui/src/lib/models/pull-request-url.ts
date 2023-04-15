import { BaseFilter } from '../constants/base-filters';

/**
 * Represents a pull-request url.
 *
 * This is what is saved/defined.
 */
export interface PullRequestUrl {
  baseUrl: string;
  baseFilters: BaseFilter[];
  repos: Array<string>;
  customFilter: string;
}
