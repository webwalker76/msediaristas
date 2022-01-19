//import React from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PasswordStrength from './PasswordStrength';

export default {
    title: 'feedback/PasswordStrength',
    component: PasswordStrength,
    argTypes: {},
} as ComponentMeta<typeof PasswordStrength>;

const Template: ComponentStory<typeof PasswordStrength> = (args) => (
    <PasswordStrength {...args} />
);

export const Default = Template.bind({}); //o bind faz com que faça uma cópia da template.
Default.args = {
    password: '',
};
