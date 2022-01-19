import axios, {
    AxiosRequestConfig,
    AxiosRequestHeaders,
    AxiosResponse,
} from 'axios';
import { ApiLinksInterface } from 'data/@types/Third/ApiLinksInterface';
import { LocalStorage } from './StorageService';

const url = process.env.NEXT_PUBLIC_API;
export const ApiService = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

//interceptors:  quando executamos alguma função no axios podemos intercepta-la e
//executar uma função que criamos, que pode ocorrer em uma request ou response
//ex:
ApiService.interceptors.response.use(
    (reponse) => reponse,
    (error) => {
        if (
            error.response.status === 401 &&
            error.response.data.code === 'token_not_valid'
        ) {
            handleTokenRefresh(error);
        }
        return Promise.reject(error);
    }
);

async function handleTokenRefresh(error: { config: AxiosRequestConfig }) {
    const tokenRefresh = LocalStorage.get<string>('token_refresh', '');
    if (tokenRefresh) {
        LocalStorage.clear('token_refresh');
        LocalStorage.clear('token');
        try {
            const { data } = await ApiService.post('/auth/token/refresh/', {
                refresh: tokenRefresh,
            });
            LocalStorage.set('token', data.access);
            LocalStorage.set('token_refresh', data.refresh);
            ApiService.defaults.headers.common['Authorization'] =
                'Bearer ' + data.access;
            error.config.headers = {
                Authorization:
                    ApiService.defaults.headers.common['Authorization'],
            };
            return ApiService(error.config);
        } catch (err) {
            return error;
        }
    } else {
        return error;
    }
}

export function LinksResolver(
    links: ApiLinksInterface[] = [],
    name: string
): ApiLinksInterface | undefined {
    //console.log(links);
    return links.find((link) => link.rel === name);
}

export function ApiServiceHateoas(
    links: ApiLinksInterface[] = [],
    name: string,
    onCanRequest: (
        request: <T>(data?: AxiosRequestConfig) => Promise<AxiosResponse<T>>
    ) => void,
    onCantRequest?: () => Function
) {
    const requestLink = LinksResolver(links, name);
    if (requestLink) {
        onCanRequest(<T>(data?: AxiosRequestConfig) => {
            return ApiService.request<T>({
                method: requestLink.type,
                url: requestLink.uri,
                ...data,
            });
        });
    } else {
        onCantRequest?.();
    }
}
