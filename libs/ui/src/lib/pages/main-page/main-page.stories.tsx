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

export const WithLoadLogic = Template.bind({});
WithLoadLogic.args = {
  showLoadLogic: true,
};

export const WithoutLoadLogic = Template.bind({});
WithoutLoadLogic.args = {
  showLoadLogic: false,
};
