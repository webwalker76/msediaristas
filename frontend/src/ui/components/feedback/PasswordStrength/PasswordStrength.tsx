import React from 'react';
import { Typography } from '@material-ui/core';
import { passwordStrength } from 'check-password-strength';
import {
    PasswordStrengthLabel,
    PasswordStrengthBar,
} from './PasswordStrength.style';

export interface PasswordStrengthProps {
    password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
    const strength = password ? passwordStrength(password).id : 0, //a função passwordStrength retorna um valor entre 0 e 3
        strengthValue = ((strength + 1) / 4) * 100; //dependendo da força da senha

    return (
        <div style={{ gridArea: 'password-strength' }}>
            <Typography
                variant={'body2'}
                component={'span'}
                color={'textSecondary'}
            >
                Nível da senha:&nbsp;
                <PasswordStrengthLabel value={strengthValue}>
                    {strength === 0 && 'FRACA'}
                    {strength === 1 && 'MÉDIA'}
                    {strength === 2 && 'FORTE'}
                    {strength === 3 && 'FORTE'}
                </PasswordStrengthLabel>
                <PasswordStrengthBar
                    value={strengthValue}
                    variant={'determinate'}
                ></PasswordStrengthBar>
            </Typography>
        </div>
    );
};

export default PasswordStrength;
