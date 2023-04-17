import { BaseFilter } from '../constants/base-filters';

/**
 * Represents a pull-request url.
 *
 * This is what is saved/defined.
 */
export interface PullRequestUrl {
  /**
   * The base-url of the request
   */
  baseUrl: string;
  /**
   * The base filters to apply
   */
  baseFilters: BaseFilter[];
  /**
   * Repositories to filter by.
   */
  repos: Array<string>;
  /**
   * Custom filter text that can be added to the url.
   */
  customFilter: string;
}

/**
 * Saved variant of a saved pull-request url.
 */
export interface SavedPullRequestUrl extends PullRequestUrl {
  /**
   * Nano-id generated id of a saved pull request.
   */
  id: string;
  /**
   * Identifier of the saved pull request.
   */
  name: string;
}
