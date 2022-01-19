import React, { useState, useEffect } from 'react';
import {
    FormControl,
    InputLabel,
    SelectProps as MuiSelectProps,
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import { SelectedStyled } from './Select.style';

export interface SelectProps extends MuiSelectProps {
    label?: string;
}

const Select: React.FC<SelectProps> = ({
    label,
    children, //recebe os elementos dentro das tags
    style,
    ...props
}) => {
    const [elementId, setElementId] = useState('');
    useEffect(() => {
        if (window !== undefined) {
            setElementId(uuid());
        }
    }, []);
    return (
        <FormControl variant={'outlined'} style={style}>
            <InputLabel id={elementId}>{label}</InputLabel>
            <SelectedStyled labelId={elementId} label={label} {...props}>
                {children}
            </SelectedStyled>
        </FormControl>
    );
};

export default Select;
