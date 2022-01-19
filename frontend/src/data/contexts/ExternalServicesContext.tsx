import React, { createContext } from 'react';

import {
    ExternalServiceReducerInterface,
    initialState,
    useExternalServicesReducer,
} from 'data/reducers/ExternalServicesReducer';

const initialValue: ExternalServiceReducerInterface = {
    externalServicesState: initialState,
    externalServicesDispatch: () => {},
};

// por boa prática criar o nome com o mesmo nome do arquivo
//cria o context, bastante executar a função: aqui deve conter o valor inicial das variáveis ou o objeto
//dentro de um mesmo contexto pode haver diversas variá veis agrupadas, então é necessário criar
//uma função especial para atualizar os valores destas variáveis, para isso utilizamos os reducers
export const ExternalServicesContext = createContext(initialValue);

//createcontext permite que as variáveis fiquem armazenados em um contexto permitindo que as páginas
//filhas tenham acesso as variáveis centralizadas no context sem necessidade de novas consultas ao
// backend, se houver necessidade de atualizar as variáveis fazemos apenas em um lugar.

//cria o componente provider que nos dá acesso ao context criado.
// precisa passar o objeto ou valores que o provider ira disponibilizar aos componentes filhos
// para que os componentes filhos possam alterar os valores dessas variáveis é necessário que
// que haver uma função que precisa ser passada na propriedade value do provider
export const ExternalServicesProvider: React.FC = ({ children }) => {
    const reducer = useExternalServicesReducer();
    //console.log(reducer);
    return (
        <ExternalServicesContext.Provider value={reducer}>
            {children}
        </ExternalServicesContext.Provider>
    );
};
