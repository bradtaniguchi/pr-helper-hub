import { Card, TextInput } from 'flowbite-react';
import { BASE_FILTERS, BaseFilter } from '../../constants';

/* eslint-disable-next-line */
export interface BaseFiltersProps {
  /**
   * Array of currently selected baseFilters
   */
  selected: Array<BaseFilter>;
  /**
   * Adds a filter to the base filters
   * TODO: maybe remove?
   *
   * @param filter the filter to add
   */
  addBaseFilter?: (filter: BaseFilter) => void;
  /**
   * Removes a filter from the base filters
   * TODO: maybe remove?
   *
   * @param filter the filter to remove
   */
  removeBaseFilter?: (filter: BaseFilter) => void;
  /**
   * Moves a filter to a new index in the base filters.
   *
   * @param filter the filter to move
   * @param index the index to move the base filter to
   */
  moveBaseFilter?: (filter: BaseFilter, index: number) => void;
  /**
   * Toggles a filter on/off in the base filters
   *
   * @param filter the filter to toggle
   */
  toggleBaseFilter?: (filter: BaseFilter) => void;
}

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
  const { selected, toggleBaseFilter } = props;
  return (
    <Card className="text-white">
      <h1>Base Filters</h1>
      <ul className="list-inside list-disc">
        {[...BASE_FILTERS]
          .sort((filterA, filterB) => {
            if (selected.includes(filterA) && !selected.includes(filterB))
              return -1;

            if (!selected.includes(filterA) && selected.includes(filterB))
              return 1;

            return 0;
          })
          .map((filter) => (
            // TODO: design chip component
            <li
              key={filter}
              onClick={() =>
                typeof toggleBaseFilter === 'function' &&
                toggleBaseFilter(filter)
              }
              className="cursor-pointer"
            >
              {filter} ({selected.includes(filter) ? 'yes' : 'no'})
            </li>
          ))}
      </ul>
      <div>
        {/* TODO: rig up */}
        <label htmlFor="custom-filter">Custom Filter</label>
        <TextInput type="text" className="w-full" id="custom-filter" />
      </div>
    </Card>
  );
}

export default BaseFilters;
