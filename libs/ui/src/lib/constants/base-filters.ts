/**
 * A hard-coded list of base-filters that are always provided as
 * part of possible filters to pick.
 *
 * The order is also the order they appear in the UI
 */
export const BASE_FILTERS = [
  'is:open',
  'is:closed',
  'is:merged',
  'is:unmerged',
  'is:pr',
  'is:issue',
  'is:draft',
  // TODO: not draft
] as const;

/**
 * Type representing the base-filters.
 */
export type BaseFilter = typeof BASE_FILTERS[number];

/**
 * The default base-filters that are automatically added to the query by default
 */
export const DEFAULT_BASE_FILTERS: BaseFilter[] = ['is:open', 'is:pr'];

/**
 * A mapping of base-filters to their converse counterparts.
 *
 * TODO: need to verify
 */
export const CONVERSE_MAPPING = {
  'is:open': 'is:closed',
  'is:closed': 'is:open',
  'is:merged': 'is:unmerged',
  'is:unmerged': 'is:merged',
};
