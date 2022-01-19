//import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import TextFieldMask from "./TextFieldMask";

export default {
  title: "inputs/TextFieldMask",
  component: TextFieldMask,
  argTypes:{},
} as ComponentMeta<typeof TextFieldMask>;

const Template: ComponentStory<typeof TextFieldMask> = (args) => (
  <TextFieldMask {...args} />
);

export const Default = Template.bind({});//o bind faz com que faça uma cópia da template.
Default.args = {};