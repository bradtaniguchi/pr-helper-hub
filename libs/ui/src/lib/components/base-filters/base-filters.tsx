/* eslint-disable-next-line */
export interface BaseFiltersProps {}

/**
 * The base filters are searchable+togglable filters that can be applied.
 * Should support basics like:
 *   - is:draft
 *   - is:opened
 *   - is:closed
 * etc...
 *
 * The bottom of this component should also show a custom input box to add onto
 * the search field with custom data.
 *
 * @param props the component props
 */
export function BaseFilters(props: BaseFiltersProps) {
  return (
    <div>
      <h1>Welcome to BaseFilters!</h1>
    </div>
  );
}

export default BaseFilters;
