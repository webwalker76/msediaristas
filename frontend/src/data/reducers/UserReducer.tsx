import { produce } from 'immer';
import { ApiLinksInterface } from '../@types/Third/ApiLinksInterface';
import React, { useReducer, useEffect } from 'react';
import { ApiService } from '../services/ApiService';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import {
    CidadeInterface,
    EnderecoInterface,
} from 'data/@types/Third/EnderecoInterface';
//reducers: valor supor que tenhamos uma função redutora que tem os dados preço e qtdq de um objeto produto
//para alterar por ex. a qtde, passamos para o reducer a instrução por ex. dec, a função redutora irá receber
//os valores para alteração e irá retornar um novo objeto com os valores alterados, não é possível alterar o
//valor das variáveis. Isso acontece porque o react é baseado em programação funcional(não se pode alterar)
//o valor das variáveis, caso apenas se altere o valor das variáveis o react não irá entender e a view nào
//será atualizada, pois ele entenderá que o objeto com os valores anteriores ainda existe. Por isso ao retornar
//um novo objeto o react já entende que houve um alteração e faz apenas um operação de comparação
// objetoanterior === objetoalterado, se não for o react entende que precisa atualizar a view.
// então temos que criar um "clone" do objeto a ser atualizado, para isso utilizamos o IMMER para facilitar
//o trabalho.

//ex: immer
/*
const Produto = {qnt:10,preco:2.50} -> objeto original
const Produto2 = {...Produto, qnt:9} -> objeto "clone" recebe todas as propriedade de produtos

o immer ajuda da seguinte forma:
criamos atraves a função produce criamos o novo objeto que receberá o estado atual do objeto passado e execeturá uma função
que já receberá um clone do objeto passado, que será o drafstate(estado rascunho) e retorna o draffState
const Produto2 = produce(Produto, (drafState) =>
    draftState.qnt = 9;
    return draftState;
) 

*/

export const initialState = {
    //isso tem que estar dentro de um estado para poder ser utilizado e precisam ter um valor inicial
    user: {
        nome_completo: '',
        nascimento: '',
        cpf: '',
        email: '',
        foto_usuario: '',
        telefone: '',
        tipo_usuario: UserType.Cliente,
        reputacao: 0,
        chave_pix: '',
    } as UserInterface,
    userAddress: {
        logradouro: '',
        bairro: '',
        complemento: '',
        cep: '',
        cidade: '',
        estado: '',
        numero: '',
    } as EnderecoInterface,
    addressList: [] as CidadeInterface[],
    isLogging: false,
};
//se houver necessidade de criar novos campos para não ser necessário alterar em dois lugares
// podemos usar a declaração de um tipo disponível no typescript
export type InitialStateType = typeof initialState; //assim ele será um tipo com os campos do initialState, dessa forma
// se criarmos um novo campo em initialState o initialStateType já
// terá acesso a ele também.

//como vão exisir diversas ações podemos definir um tipo com as ações possíveis:
type UserAction =
    | 'SET_USER'
    | 'SET_LOGGING'
    | 'SET_ADDRESS_LIST'
    | 'SET_USER_ADDRESS';

//a função receberá o estado atual, e a ação a ser executada
//que poderá ser por nome ou por valor, então pode ser que se queira
// enviar além do nome da ação um determinado valor
// assim cria-se o tipo da ação
export type UserActionType = {
    type: UserAction; //nome da ação a ser executada
    payload?: unknown; // opcional, além de ser um tipo desconhecido
};

export interface UserReducerInterface {
    userState: InitialStateType;
    userDispatch: React.Dispatch<UserActionType>; //utiilamos o dispatch do próprio react
    // e passamos o tipo do dispatch
}

const reducer = (
    state: InitialStateType,
    action: UserActionType
): InitialStateType => {
    const nextState = produce(state, (draftState) => {
        switch (action.type) {
            case 'SET_USER':
                draftState.user = action.payload as UserInterface;
                draftState.isLogging = false;
                break;
            case 'SET_ADDRESS_LIST':
                draftState.addressList = action.payload as CidadeInterface[];
                break;
            case 'SET_USER_ADDRESS':
                draftState.userAddress = action.payload as EnderecoInterface;
                break;
            case 'SET_LOGGING':
                draftState.isLogging = action.payload as boolean;
                break;
        }
    });
    return nextState;
};

//criação do hook para automatizar o processo
//por boa pratica os hooks sempre iniciam com a palavra use
export function useUserReducer(): UserReducerInterface {
    // o que é o useReducer: ele é muito parecido com o useState em que se tem o (value,setValue) = useState()
    // a diferença é que o useReducer permite que se possa ter vários valores e execute uma funçaão para tratar
    // a alterção dos valores enquanto o useState permite alteração de apenas um valor.

    const [state, dispatch] = useReducer(reducer, initialState);

    return {
        //para o react entender o que o hook está retornando precisamos criar uma interface
        //com a estrutura
        userState: state,
        userDispatch: dispatch,
    };
}
