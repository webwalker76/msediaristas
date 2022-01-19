import { styled } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';
// import { SelectProps } from './Select';

export const SelectedStyled = styled(Select)`
    &.MuiInputBase-root {
        background-color: ${({ theme }) => theme.palette.grey[50]};
    }
    .MuiOutlinedInput-notChedOutline {
        border-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;
