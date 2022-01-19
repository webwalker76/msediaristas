import { produce } from 'immer';
import { ApiLinksInterface } from '../@types/Third/ApiLinksInterface';
import React, { useReducer, useEffect } from 'react';
import { ApiService } from 'data/services/ApiService';

//reducers: vamos supor que tenhamos uma função redutora que tem os dados preço e qtdq de um objeto produto
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
criamos atraves a função produce o novo objeto que receberá o estado atual do objeto passado e execeturá uma função
que já receberá um clone do objeto passado, que será o drafstate(estado rascunho) e retorna o draffState
const Produto2 = produce(Produto, (drafState) =>
    draftState.qnt = 9;
    return draftState;
) 

*/

export const initialState = {
    //isso tem que estar dentro de um estado para poder ser utilizado
    externalServices: [] as ApiLinksInterface[],
};
//se houver necessidade de criar novos campos para não ser necessário alterar em dois lugares
// podemos usar a declaração de um tipo disponível no typescript
export type InitialStateType = typeof initialState; //assim ele será um tipo com os campos do initialState, dessa forma
// se criarmos um novo campo em initialState o initialStateType já
// terá acesso a ele também.

//a função receberá o estado atual, e a ação a ser executada
//que poderá ser por nome ou por valor, então pode ser que se queira
// enviar além do nome da ação um determinado valor
// assim cria-se o tipo da ação
export type ExternalServicesActionType = {
    type: string; //nome da ação a ser executada
    payload?: unknown; // opcional, além de ser um tipo desconhecido - objeto que posso ou não passar
    // e pode ser qualquer objeto
};

export interface ExternalServiceReducerInterface {
    externalServicesState: InitialStateType;
    externalServicesDispatch: React.Dispatch<ExternalServicesActionType>; //utilizamos o dispatch do próprio react
    // e passamos o tipo do dispatch
}
//action: determina qual o tipo da ação a ser executada
const reducer = (
    state: InitialStateType,
    action: ExternalServicesActionType
): InitialStateType => {
    const nextState = produce(state, (draftState) => {
        switch (action.type) {
            case 'UPDATE':
                draftState.externalServices =
                    action.payload as ApiLinksInterface[];
                break;
        }
    });
    return nextState;
};

//criação do hook para automatizar o processo
//por boa pratica os hooks sempre iniciam com a palavra use
export function useExternalServicesReducer(): ExternalServiceReducerInterface {
    // o que é o useReducer: ele é muito parecido com o useState em que se tem o (value,setValue) = useState()
    // a diferença é que o useReducer permite que se possa ter vários valores e execute uma funçaão para tratar
    // a alterção dos valores enquanto o useState permite alteração de apenas um valor.

    const [state, dispatch] = useReducer(reducer, initialState); //dispatch é a funçao de atualizacao do state

    useEffect(() => {
        ApiService.get<{ links: ApiLinksInterface[] }>('/api', {
            headers: { Authorization: '' },
        }).then(({ data }) => {
            // console.log(data.links);
            dispatch({
                type: 'UPDATE',
                payload: data.links, //irá chamar o reducer e atualizar
                // o array de servicos com os links que o backend enviará
            });
        });
    }, []); //quando o aray de depend esta vazio, ele executa apenas um avez
    return {
        //para o react entender o que o hook está retornando precisamos criar uma interface
        //com a estrutura
        externalServicesState: state,
        externalServicesDispatch: dispatch,
    };
}
