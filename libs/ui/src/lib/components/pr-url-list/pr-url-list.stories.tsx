import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { PrUrlList } from './pr-url-list';

const Story: ComponentMeta<typeof PrUrlList> = {
  component: PrUrlList,
  title: 'components/PrUrlList',
  argTypes: {
    onSelect: { action: 'onSelect executed!' },
    onDelete: { action: 'onDelete executed!' },
  },
};
export default Story;

const Template: ComponentStory<typeof PrUrlList> = (args) => (
  <PrUrlList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  urls: [
    {
      id: 'test1',
      name: 'test',
      baseUrl: 'https://github.com',
      baseFilters: [],
      customFilter: '',
      repos: [],
    },
    {
      id: 'test2',
      name: 'test2',
      baseUrl: 'https://github.com',
      baseFilters: [],
      customFilter: '',
      repos: [],
    },
  ],
};
