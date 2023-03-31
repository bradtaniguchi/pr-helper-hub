import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Url } from './url';

const Story: ComponentMeta<typeof Url> = {
  component: Url,
  title: 'Url',
};
export default Story;

const Template: ComponentStory<typeof Url> = (args) => <Url {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
