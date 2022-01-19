import React from 'react';
import { SystemProps } from '@material-ui/system';
import { UserDescription, UserName, UserInformationContainer, AvatarStyled, RatingStyled } from './UserInformation.style';

export interface UserInformationProps{
    name:string;
    picture: string;
    rating: number; 
    description?: string; 
    isRating?:boolean;
    sx?: SystemProps;
}

const UserInformation: React.FC<UserInformationProps> = (props) => {
    return(
        <UserInformationContainer sx={props.sx} isRating={props.isRating}>
            <AvatarStyled src={props.picture}>{props.name}</AvatarStyled>
            <RatingStyled value={props.rating} readOnly/>
            <UserName>{props.name}</UserName>
            <UserDescription>{props.description}</UserDescription>
        </UserInformationContainer>
    )
}

export default UserInformation;