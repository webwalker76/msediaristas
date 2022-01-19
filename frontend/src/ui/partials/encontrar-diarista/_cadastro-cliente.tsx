import { Button, Container, Divider, Typography } from '@material-ui/core';
import { textAlign } from '@material-ui/system';
import React from 'react';
import {
    NewContactForm,
    PictureForm,
    UserDataForm,
    LoginForm,
} from 'ui/components/inputs/UserForm/UserForm';
import { LoginButtonsContainer } from './_cadastro-cliente.styled';

// import { Component } from './_cadastro-cliente.styled';

const CadastroCliente: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <>
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Dados Pessoais
            </Typography>
            <UserDataForm cadastro={true} />
            <Divider sx={{ mb: 5 }} />
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Hora da self!Envie uma self segurando seu documento de
                identificação
            </Typography>
            <PictureForm />
            <Typography sx={{ pt: 1, pb: 2 }} variant={'body2'}>
                Esta foto não será vista por ninguém.
            </Typography>
            <Divider sx={{ mb: 5 }} />

            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Dados de acesso
            </Typography>
            <NewContactForm />

            <Container
                sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    type={'button'}
                    onClick={onBack}
                >
                    Voltar para detalhes da diária{' '}
                </Button>
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    type={'submit'}
                >
                    Ir para pagamento
                </Button>
            </Container>
        </>
    );
};

export const LoginCliente: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <>
            <LoginForm />
            <LoginButtonsContainer>
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    type={'button'}
                    onClick={onBack}
                >
                    Voltar para detalhes da diária{' '}
                </Button>
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    type={'submit'}
                >
                    Ir para pagamento
                </Button>
            </LoginButtonsContainer>
        </>
    );
};

export default CadastroCliente;
