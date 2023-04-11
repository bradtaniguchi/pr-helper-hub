import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Repos } from './repos';

const Story: ComponentMeta<typeof Repos> = {
  component: Repos,
  title: 'components/Repos',
};
export default Story;

const Template: ComponentStory<typeof Repos> = (args) => <Repos {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  repos: [],
};

export const WithRepos = Template.bind({});
WithRepos.args = {
  repos: [
    'bradtaniguchi/bradtaniguchi.github.io',
    'bradtaniguchi/discord-bot-test',
  ],
};
