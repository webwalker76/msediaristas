//import React from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '@material-ui/core';
import DataList from './DataList';

export default {
    title: 'data-display/DataList',
    component: DataList,
    argTypes: {},
} as ComponentMeta<typeof DataList>;

const Template: ComponentStory<typeof DataList> = () => (
    <DataList
        header={
            <div>
                Data:05/05/2020
                <br />
            </div>
        }
        body={
            <div>
                Cidade: São Paulo University
                <br />
            </div>
        }
        actions={
            <Button variant="contained" color="secondary">
                Candidatar-me
            </Button>
        }
    />
);

export const Default = Template.bind({}); //o bind faz com que faça uma cópia da template.
Default.args = {};
