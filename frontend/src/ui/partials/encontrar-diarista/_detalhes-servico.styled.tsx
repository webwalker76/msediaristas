import { styled } from '@material-ui/core/styles';
// import { } from '@mui/material';

export const ItemsContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: ${({ theme }) => theme.spacing(3)};
`;
