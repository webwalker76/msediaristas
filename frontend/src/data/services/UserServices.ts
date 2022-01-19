import { ApiLinksInterface } from 'data/@types/Third/ApiLinksInterface';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { ApiService } from './ApiService';
import { ObjectService } from './ObjectService';
import { TextFormatService } from './TextFormatService';
import { FieldPath, UseFormReturn } from 'react-hook-form';

export const UserServices = {
    async cadastrar(
        user: UserInterface,
        userType: UserType,
        link: ApiLinksInterface
    ): Promise<UserInterface | undefined> {
        delete ApiService.defaults.headers.common['Authorization'];
        const nascimento = TextFormatService.dateToString(
                user.nascimento as Date
            ),
            cpf = TextFormatService.getNumbersFromText(user.cpf),
            telefone = TextFormatService.getNumbersFromText(user.telefone),
            userData = ObjectService.jsonToFormData({
                ...user,
                nascimento,
                telefone,
                cpf,
                tipo_usuario: UserType,
            });
        const response = await ApiService.request<UserInterface>({
            url: link.uri,
            method: link.type,
            data: userData,
            headers: { 'Content-Type': 'multi-part/form-data' },
        });
        return response.data;
    },
    handleNewUserError<T>(error: any, form: UseFormReturn<T>): void {
        const errorList = error?.response.data;
        if (errorList) {
            if (errorList.cpf) {
                form.setError('usuario.cpf' as FieldPath<T>, {
                    type: 'cadastrado',
                    message: 'CPF já cadastrado',
                });
            }
            if (errorList.email) {
                form.setError('usuario.email' as FieldPath<T>, {
                    type: 'cadastrado',
                    message: 'Email já cadastrado',
                });
            }
        }
    },
};
