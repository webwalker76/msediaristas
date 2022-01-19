import {styled} from "@material-ui/core/styles";


export const SafeEnvironmentContainer = styled('div')`
 color:${({theme}) => theme.palette.text.secondary};
 background-color: ${({theme}) => theme.palette.background.default};
 font-size: 14px;
 padding: ${({theme}) => theme.spacing(2)} 0;
 text-align: right;
`;