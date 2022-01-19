//import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import UserInformation from "./UserInformation";

export default {
  title: "data-display/UserInformation",
  component: UserInformation,
  argTypes:{},
} as ComponentMeta<typeof UserInformation>;

const Template: ComponentStory<typeof UserInformation> = (args) => (
  <UserInformation {...args} />
);

export const Default = Template.bind({});//o bind faz com que faça uma cópia da template.
Default.args = {
  name:'teste',
  picture:'https://github.com/hanashiro.png',
  rating:3,
  description: 'teste',
};