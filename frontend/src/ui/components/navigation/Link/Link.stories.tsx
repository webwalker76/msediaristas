import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Link from "./Link";

export default {
  title: "navigation/link",
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Clique aqui",
  href: "#/",
};
