import { CidadeInterface } from 'data/@types/Third/EnderecoInterface';
import { LocationService } from 'data/services/LocationService';
import { useState, useEffect } from 'react';

export default function useCities(estado: string): CidadeInterface[] {
    const [listaCidades, setListaCidades] = useState<CidadeInterface[]>([]);
    useEffect(() => {
        if (estado) {
            setListaCidades([]); // se mudar o estado esvazia a lista de cidades
            LocationService.cidades(estado).then((listaCidades) => {
                //listacidades sao variaveis diferentes
                listaCidades && setListaCidades(listaCidades);
            });
        }
    }, [estado]);
    return listaCidades;
}
