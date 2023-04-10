import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainPage } from './main-page';

const Story: ComponentMeta<typeof MainPage> = {
  component: MainPage,
  title: 'pages/MainPage',
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
};
export default Story;

const Template: ComponentStory<typeof MainPage> = (args) => (
  <MainPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
