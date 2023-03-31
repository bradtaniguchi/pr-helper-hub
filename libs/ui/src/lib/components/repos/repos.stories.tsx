import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Repos } from './repos';

const Story: ComponentMeta<typeof Repos> = {
  component: Repos,
  title: 'Repos',
};
export default Story;

const Template: ComponentStory<typeof Repos> = (args) => <Repos {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
