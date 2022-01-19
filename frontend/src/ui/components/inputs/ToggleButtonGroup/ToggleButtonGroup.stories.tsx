//import React from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ToggleButtonGroup, { ToggleButton } from './ToggleButtonGroup';

export default {
    title: 'inputs/ToggleButtonGroup',
    component: ToggleButtonGroup,
    argTypes: {},
} as ComponentMeta<typeof ToggleButtonGroup>;

const Template: ComponentStory<typeof ToggleButtonGroup> = (args) => (
    <ToggleButtonGroup {...args}>
        <ToggleButton value="1">
            <i className="twf-cleaning-1" /> Limpeza de Rotina
        </ToggleButton>

        <ToggleButton value="2">
            <i className="twf-cleaning-2" /> Limpeza Pesada
        </ToggleButton>

        <ToggleButton value="3">
            <i className="twf-cleaning-3" /> Limpeza Pós-obra
        </ToggleButton>
    </ToggleButtonGroup>
);

export const Default = Template.bind({}); //o bind faz com que faça uma cópia da template.
Default.args = {
    value: '1',
};
