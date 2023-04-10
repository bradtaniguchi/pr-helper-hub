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
  /**
   * The currently set customFilter, will be set as default
   * on load, once set this will only be updated onChange.
   */
  customFilter?: string;
  /**
   * Set the custom filter value. Should be called onChange, and
   * will update the customFilter passed.
   *
   * @param filter the value of the custom filter field
   */
  setCustomFilter?: (filter: string) => void;
  /**
   * Resets the custom filter value
   */
  resetCustomFilter?: () => void;
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
  const { selected, toggleBaseFilter, customFilter, setCustomFilter } = props;
  return (
    <Card className="text-white">
      <h1>Base Filters</h1>
      <p className="text-sm">
        This component is a list of base filters that can be toggled on/off.
        These are provided as-is, and are not editable.
      </p>
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
        <label htmlFor="custom-filter">Custom Filter</label>
        <TextInput
          type="text"
          className="w-full"
          id="custom-filter"
          value={customFilter}
          onChange={(e) =>
            typeof setCustomFilter === 'function' &&
            setCustomFilter(e.target.value)
          }
        />
      </div>
    </Card>
  );
}

export default BaseFilters;
