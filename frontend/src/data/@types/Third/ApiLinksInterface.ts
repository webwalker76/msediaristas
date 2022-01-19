//como estamos utilizando o hateoas o proprio backend irá indicar quais urls/serviços o frontend pode acessar
// esse retorno será  uma lista de objetos com o tipo da requisição(get, put, delete, patch, etc), vai ter uri
// que será utilizada, terá o rel que é o nome do endereço, ou seja não é necessário saber a url que precisa acessar
// para executar os serviços disponibilizados pelo backend
// abaixo a  interface os dados que o backend irá retornar
export interface ApiLinksInterface {
    type: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    rel: string; //nome do endereço definido no hateoas do backend
    uri: string;
}
