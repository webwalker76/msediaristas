import React from "react";
import RoundedButton from "./RoundedButton";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "inputs/RoundedButton",
  component: RoundedButton,
} as ComponentMeta<typeof RoundedButton>;

const Template: ComponentStory<typeof RoundedButton> = (args) => (
  <RoundedButton {...args}> Clique aqui </RoundedButton>
);

export const Default = Template.bind({});//o bind faz com que faça uma cópia da template.
Default.args = {
  variant: "contained",
};
//... operador de spread todos os parametros da função são passaodos para o componente
//

/*export const BtnRounded = Template.bind({});
BtnRounded.args = {
};*/

//export const BtnRounded = () => <RoundedButton> Clique Aqui</RoundedButton>;
