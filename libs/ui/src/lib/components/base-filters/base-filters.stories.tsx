import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { BaseFilters } from './base-filters';

const Story: ComponentMeta<typeof BaseFilters> = {
  component: BaseFilters,
  title: 'components/BaseFilters',
};
export default Story;

const Template: ComponentStory<typeof BaseFilters> = (args) => (
  <BaseFilters {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  selected: [],
};
