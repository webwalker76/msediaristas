import React from 'react';
import InputMask from 'react-input-mask';
import TextField  from '../TextField/TextField';
import { OutlinedTextFieldProps} from '@material-ui/core';
//import { Component } from './TextFieldMask.style';

export interface TextFieldMaskProps extends Omit<OutlinedTextFieldProps,'variant'>{ //omit extende todas as propriedades
    //exceto o variant, pois já foi declarada abaixo.
    mask:string; 
}

const TextFieldMask: React.FC<TextFieldMaskProps> = ({
    mask,
    value, 
    onChange,
    onBlur,
    ...props
}) => { //onBlur quando o elemento perde o
    return(
       <InputMask 
            mask={mask} 
            value = {value as string} 
            onChange={onChange} 
            onBlur={onBlur}
        >
          {
              () => {
                  return <TextField {...props} variant={'outlined'}/>;
              } 
          }
      </InputMask>
    )
}

export default TextFieldMask;