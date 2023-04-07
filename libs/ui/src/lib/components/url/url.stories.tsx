import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Url } from './url';
import { Button } from 'flowbite-react';

const Story: ComponentMeta<typeof Url> = {
  component: Url,
  title: 'Url',
};
export default Story;

const Template: ComponentStory<typeof Url> = (args) => <Url {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  url: 'https://github.com',
};

export const WithActions = Template.bind({});
WithActions.args = {
  url: 'https://github.com',
  actions: [
    <Button key="1">Action 1</Button>,
    <Button key="2">Action 2</Button>,
  ],
};
