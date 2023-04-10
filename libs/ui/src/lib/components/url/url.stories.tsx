import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Url } from './url';
import { Button } from 'flowbite-react';

const Story: ComponentMeta<typeof Url> = {
  component: Url,
  title: 'components/Url',
};
export default Story;

const Template: ComponentStory<typeof Url> = (args) => <Url {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  url: 'https://github.com',
  isValidUrl: true,
};

export const WithActions = Template.bind({});
WithActions.args = {
  url: 'https://github.com',
  isValidUrl: true,
  actions: [
    <Button key="1">Action 1</Button>,
    <Button key="2">Action 2</Button>,
  ],
};

export const InvalidUrl = Template.bind({});
InvalidUrl.args = {
  url: 'https://github.com',
  isValidUrl: false,
};
