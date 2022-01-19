import { Button, Container, Typography } from '@material-ui/core';
import { fontWeight, textAlign } from '@material-ui/system';
import React from 'react';
import { PaymentForm } from 'ui/components/inputs/UserForm/forms/PaymentForm';

// import { Component } from './_informacoes-pagamento.styled';

const InformacoesPagamento: React.FC = () => {
    return (
        <>
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}></Typography>
            <PaymentForm />
            <Container sx={{ textAlign: 'center' }}>
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    type={'submit'}
                >
                    Efetuar Pagamento{' '}
                </Button>
            </Container>
        </>
    );
};

export default InformacoesPagamento;
