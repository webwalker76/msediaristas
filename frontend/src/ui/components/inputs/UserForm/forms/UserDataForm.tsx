import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '../../TextField/TextField';
import { UserData } from '../UserForm.style';
import React, { useContext } from 'react';
import { UserContext } from 'data/contexts/UserContext';
import { TextFormatService } from 'data/services/TextFormatService';

export interface UserDataFormProps {
    cadastro?: boolean;
}

//para integrar os formularios com os dados do BD do usuário para já preencher os dados do usuário para
// já cadastrado utiliza-se o context criado para o objeto no caso UserContext, assim teremos acesso
// aos dados do usuário e se ele já estiver logado os campos serão preenchidos com o dados do usuário

export const UserDataForm: React.FC<UserDataFormProps> = ({
    cadastro = false,
}) => {
    const {
            register,
            formState: { errors },
            control,
        } = useFormContext(),
        { user } = useContext(UserContext).userState; //aqui estamos integrando com o context
    return (
        <UserData>
            <TextField
                label={'Nome Completo:'}
                defaultValue={user.nome_completo}
                style={{ gridArea: 'nome' }}
                {...register('usuario.nome_completo')}
                error={errors?.usuario?.nome_completo !== undefined}
                helperText={errors?.usuario?.nome_completo.message}
            />
            <Controller
                name={'usuario.nascimento'}
                defaultValue={TextFormatService.reverseDate(
                    user.nascimento as string
                )}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'99/99/9999'}
                        label={'Data de Nacimento'}
                        style={{ gridArea: 'data-nascimento' }}
                        error={errors?.usuario?.cpf !== undefined}
                        helperText={errors?.usuario?.nacimento?.message}
                        InputProps={{ readOnly: !cadastro }}
                    />
                )}
            />

            <Controller
                name={'usuario.cpf'}
                defaultValue={user.cpf}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'999.999.999-99'}
                        label={'CPF'}
                        style={{ gridArea: 'cpf' }}
                        error={errors?.usuario?.cpf !== undefined}
                        helperText={errors?.usuario?.cpf?.message}
                        InputProps={{ readOnly: !cadastro }}
                    />
                )}
            />

            <Controller
                name={'usuario.telefone'}
                defaultValue={user.telefone}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'(99)99999-9999'}
                        label={'Telefone'}
                        style={{ gridArea: 'telefone' }}
                        error={errors?.usuario?.telefone !== undefined}
                        helperText={errors?.usuario?.telefone?.message}
                    />
                )}
            />
        </UserData>
    );
};
