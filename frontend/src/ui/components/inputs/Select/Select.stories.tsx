//import React from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MenuItem } from '@material-ui/core';

import Select from './Select';
import React from 'react';

export default {
    title: 'inputs/Select',
    component: Select,
    argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
    <Select {...args}>
        <MenuItem value={''}> Selecione um item</MenuItem>
        <MenuItem value={10}> 10</MenuItem>
        <MenuItem value={20}> 20</MenuItem>
        <MenuItem value={30}> 30</MenuItem>
    </Select>
);

export const Default = Template.bind({}); //o bind faz com que faça uma cópia da template.
Default.args = {
    label: 'numeros',
    value: 10,
};
