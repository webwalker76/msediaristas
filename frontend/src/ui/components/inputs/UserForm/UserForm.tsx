import React from 'react';
import { FormContainerStyled } from './UserForm.style';
//import {} from '@material-ui/core';
//import { Component } from './UserForm.style';

export interface UserFormProps {}

export const UserFormContainer = FormContainerStyled;

const UserForm: React.FC<UserFormProps> = () => {
    return (
        <div>
            <div>UserForm</div>
        </div>
    );
};

export default UserForm;
// a parte de baixo define este arquivo como ponto central das importaçoes de todos os forms
// que estiverem nesta pasta
export * from './forms/AddressForm';
export * from './forms/NewContactForm';
export * from './forms/PaymentForm';
export * from './forms/PictureForm';
export * from './forms/UserDataForm';
export * from './forms/LoginForm';
