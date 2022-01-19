//import React from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SideInformation from './SideInformation';

export default {
    title: 'data-display/SideInformation',
    component: SideInformation,
    argTypes: {},
} as ComponentMeta<typeof SideInformation>;

const Template: ComponentStory<typeof SideInformation> = (args) => (
    <SideInformation {...args} />
);

export const Default = Template.bind({}); //o bind faz com que faça uma cópia da template.
Default.args = {
    title: 'Detalhes',
    items: [
        {
            title: 'Tipo',
            description: ['Limpeza de Rotinha'],
            icon: 'twf-check-circle',
        },
        {
            title: 'Tamanho',
            description: ['3 cômodos', '2 banheiros'],
            icon: 'twf-check-circle',
        },
        {
            title: 'Data',
            description: ['14/12/2021'],
            icon: 'twf-check-circle',
        },
    ],
    footer: {
        text: 'R$ 185,00',
        icon: 'twf-credit-card',
    },
};

export const NoIconFooter = Template.bind({}); //o bind faz com que faça uma cópia da template.
NoIconFooter.args = {
    title: 'Como Funciona',
    items: [
        {
            title: '1 - Cadastro',
            description: ['Você faz o cadastro e escolhe as cidades atendidas'],
            //icon: 'twf-check-circle',
        },
        {
            title: '2 - Receba Propostas',
            description: [
                'Você receberá avisos por E-mail sobre novos serviços nas cidades atendidas',
            ],
            //icon: 'twf-check-circle',
        },
        {
            title: '3 - Diária Agendada',
            description: [
                'Se o seu perfil for escolhido pelo cliente, você receberá a confirmação do agendamento',
            ],
            // icon: 'twf-check-circle',
        },
    ],
};
