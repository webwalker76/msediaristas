import  { styled } from '@material-ui/core/styles';
 import { TextField, TextFieldProps} from '@material-ui/core';
// import { TextFieldProps } from './TextField'; 

export const TextFieldStyled = styled(TextField)<TextFieldProps>`
    .MuiInputBase-root{
        background-color: ${({theme}) => theme.palette.grey[50]};
    }
    .MuiOutlinedInput-notChedOutline{
        border-color:${({theme}) => theme.palette.grey[100]};
    } 
`;