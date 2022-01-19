import { AxiosRequestConfig } from 'axios';
import { ApiLinksInterface } from 'data/@types/Third/ApiLinksInterface';
import { ApiService, ApiServiceHateoas } from 'data/services/ApiService';
import { useCallback, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

/*
para as requisições a api no backend utilizaremos o SWR(swr.vercel.app), que ajuda a melhorar a
experiência do usuário e a performance da aplicação.
Ex:
 const {data,erro }= useSWR('minhabusca',() =>{return[1,2,3]})

 na primeira vez que ele for executado irá ter o valor undefined,
 depois ele retornará o array, se o usuário for para outra página e voltar para a página
 anterior ele não irá fazer uma nota busca, ele possui tratamento automático de cache.
 o que ele faz é uma verificação, caso tenha ocorrido alguma alteração, ele faz a atualização
 dos dados.

neste estaremos integrando o servico de api que criamos com o swr
 */

//o OutputType é um tipo genérico que esta sendo declarado, já que inicialmente ele não
//sabe qual o tipo de dado será retornado.
//isso dever ser passado para o hook
//pois quando for utilizaro poderemos passar o tipo na chamada do serviço API para
//por exemplo: UseApi<Usuario>  que será o tipo que o data irá retornar
// o useSWR necessita de um identificador unico para cada requisição, é atravé dele que
//o swr saberá se precisa revalidar o cache ou não
export default function useApi<OutputType>(
    endPoint: string | null,
    config?: AxiosRequestConfig
): { data: OutputType | undefined; error: Error } {
    //OutputType -> tipo genérico que definirá o retorno do backend
    const { data, error } = useSWR<OutputType>(endPoint, async (url) => {
        const response = await ApiService(url, config);
        console.log('url:' + url);
        //console.log(response.data);
        return response.data;
    });

    return { data, error };
}

export function useApiHateoas<OutputType>(
    links: ApiLinksInterface[] = [],
    name: string | null,
    config?: AxiosRequestConfig
): { data: OutputType | undefined; error: Error } {
    const makeRequest = useCallback(() => {
        return new Promise<OutputType>((resolve) => {
            //resolve -> funçao executada para retornar uma nova promise
            ApiServiceHateoas(links, name || '', async (request) => {
                const response = await request<OutputType>(config);
                resolve(response.data);
            });
        });
    }, [links, name, config]);

    const { data, error } = useSWR<OutputType>(name, makeRequest);

    useEffect(() => {
        mutate(name, makeRequest); //reexecuta a funçao se houver alteraçoes
    }, [links, name, makeRequest]);

    return { data, error };
}
