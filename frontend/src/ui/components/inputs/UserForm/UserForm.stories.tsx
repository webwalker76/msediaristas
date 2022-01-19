//import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import UserForm from "./UserForm";

export default {
  title: "inputs/UserForm",
  component: UserForm,
  argTypes:{},
} as ComponentMeta<typeof UserForm>;

const Template: ComponentStory<typeof UserForm> = (args) => (
  <UserForm {...args} />
);

export const Default = Template.bind({});//o bind faz com que faça uma cópia da template.
Default.args = {};