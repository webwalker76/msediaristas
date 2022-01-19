import { useState, useMemo, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/formSchemaService';
import {
    NovaDiariaFormDataInterface,
    CadastroClienteFormDataInterface,
    LoginFormDataInterface,
    PagamentoFormDataInterface,
} from 'data/@types/Third/FormInterface';
import { ServicoInterface } from 'data/@types/Third/ServicoInterface';
import { DiariaInterface } from 'data/@types/Third/DiariaInterface';
import { ValidationService } from 'data/services/ValidationService';
import { DateService } from 'data/services/DateService';
import { houseParts } from '@partials/encontrar-diarista/_detalhes-servico';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import {
    ApiService,
    ApiServiceHateoas,
    LinksResolver,
} from 'data/services/ApiService';
import { useApiHateoas } from '../useApi.hook';
import { UserContext } from 'data/contexts/UserContext';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { TextFormatService } from 'data/services/TextFormatService';
import { LoginService } from 'data/services/LoginService';
import { ApiLinksInterface } from 'data/@types/Third/ApiLinksInterface';
import { UserServices } from 'data/services/UserServices';
import { PaymentService } from 'data/services/PaymentService';

export default function useContratacao() {
    const [step, setStep] = useState(1),
        [hasLogin, setHasLogin] = useState(false),
        [loginError, setLoginError] = useState(''),
        breadCrumbItems = ['Detalhes da diária', 'Identificação', 'Pagamento'],
        serviceForm = useForm<NovaDiariaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.address().concat(
                    FormSchemaService.detalhesServico()
                )
            ),
        }),
        clientForm = useForm<CadastroClienteFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.userData().concat(
                    FormSchemaService.newContact()
                )
            ),
        }),
        paymentForm = useForm<PagamentoFormDataInterface>({
            resolver: yupResolver(FormSchemaService.payment()),
        }),
        loginForm = useForm<LoginFormDataInterface>({
            resolver: yupResolver(FormSchemaService.login()),
        }),
        { userState, userDispatch } = useContext(UserContext),
        { externalServicesState } = useContext(ExternalServicesContext),
        servicos = useApiHateoas<ServicoInterface[]>(
            externalServicesState.externalServices,
            'listar_servicos'
        ).data,
        dadosFaxina = serviceForm.watch('faxina'),
        cepFaxina = serviceForm.watch('endereco.cep'),
        [podemosAtender, setPodemosAtender] = useState(true),
        [novaDiaria, setNovaDiaria] = useState({} as DiariaInterface),
        tipoLimpeza = useMemo<ServicoInterface>(() => {
            if (servicos && dadosFaxina?.servico) {
                const selectedService = servicos.find(
                    (servico) => servico.id === dadosFaxina?.servico
                );
                if (selectedService) {
                    return selectedService;
                }
            }
            return {} as ServicoInterface;
        }, [servicos, dadosFaxina?.servico]), //ok esta funcionando
        { tamanhoCasa, totalPrice, totalTime } = useMemo<{
            tamanhoCasa: string[];
            totalPrice: number;
            totalTime: number;
        }>(
            () => {
                return {
                    tamanhoCasa: listarComodos(dadosFaxina),
                    totalPrice: calcularPreco(dadosFaxina, tipoLimpeza),
                    totalTime: calcularTempoServico(dadosFaxina, tipoLimpeza),
                };
            },
            /* eslint-disable react-hooks/exhaustive-deps */
            [
                dadosFaxina,
                tipoLimpeza,
                dadosFaxina?.quantidade_banheiros,
                dadosFaxina?.quantidade_cozinhas,
                dadosFaxina?.quantidade_outros,
                dadosFaxina?.quantidade_quartos,
                dadosFaxina?.quantidade_quintais,
                dadosFaxina?.quantidade_salas,
            ]
        );

    useEffect(() => {
        if (
            dadosFaxina &&
            ValidationService.hora(dadosFaxina.hora_inicio) &&
            +totalTime >= 0
        ) {
            serviceForm.setValue(
                'faxina.hora_termino',
                DateService.addHours(
                    dadosFaxina?.hora_inicio as string,
                    totalTime
                ),
                { shouldValidate: true }
            );
        } else {
            //console.log(ValidationService.hora(dadosFaxina.hora_inicio));
            serviceForm.setValue('faxina.hora_termino', '');
        }
    }, [dadosFaxina?.hora_inicio, totalTime]);

    useEffect(() => {
        const cep = ((cepFaxina as string) || '').replace(/\D/g, '');
        if (ValidationService.cep(cep)) {
            ///
            ApiServiceHateoas(
                externalServicesState.externalServices,
                'verificar_disponibilidade_atendimento',
                (request) =>
                    request<{ disponibilidade: boolean }>({
                        params: { cep }, //ou params:{ nomeparamentro: parametro}
                    })
                        .then((response) => {
                            setPodemosAtender(response.data.disponibilidade);
                        })
                        .catch((_error) => {
                            setPodemosAtender(false);
                        })
            );
            ///
        } else {
            setPodemosAtender(true);
        }
    }, [cepFaxina]);

    function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {
        if (userState.user.nome_completo) {
            criarDiaria(userState.user);
        } else {
            setStep(2);
        }
        //console.log(data);
    }

    async function onClientFormSubmit(data: CadastroClienteFormDataInterface) {
        const newUserLinks = LinksResolver(
            externalServicesState.externalServices,
            'cadastrar_usuario'
        );

        if (newUserLinks) {
            try {
                await cadastrarUsuario(data, newUserLinks);
            } catch (error) {
                UserServices.handleNewUserError(error, clientForm);
            }
        }
    }

    async function cadastrarUsuario(
        data: CadastroClienteFormDataInterface,
        link: ApiLinksInterface
    ) {
        const newUser = await UserServices.cadastrar(
            data.usuario,
            UserType.Cliente,
            link
        );
        if (newUser) {
            const loginSuccess = await login(
                {
                    email: data.usuario.email,
                    password: data.usuario.password || '',
                },
                newUser
            );
            if (loginSuccess) {
                criarDiaria(newUser);
            }
        }
    }

    async function onLoginFormSubmit(data: { login: LoginFormDataInterface }) {
        const loginSuccess = await login(data.login);
        if (loginSuccess) {
            const user = await LoginService.getUser();
            if (user) {
                criarDiaria(user);
                setStep(3);
            }
        }
    }

    async function login(
        credentials: LoginFormDataInterface,
        user?: UserInterface
    ): Promise<boolean> {
        const loginSuccess = await LoginService.login(credentials);
        if (loginSuccess) {
            if (!user) {
                user = await LoginService.getUser();
            }

            userDispatch({ type: 'SET_USER', payload: user });
        } else {
            setLoginError('Email e/ou senha inválidos');
        }
        return loginSuccess;
    }

    async function onPaymentFormSubmit(data: {
        pagamento: PagamentoFormDataInterface;
    }) {
        const cartao = {
            card_number: data.pagamento.numero_cartao.replaceAll(' ', ''),
            card_holder_name: data.pagamento.nome_cartao,
            card_cvv: data.pagamento.codigo,
            card_expiration_date: data.pagamento.validade,
        };
        const hash = await PaymentService.getHash(cartao);

        ApiServiceHateoas(novaDiaria.links, 'pagar_diaria', async (request) => {
            {
                try {
                    await request({ data: { card_hash: hash } });
                    setStep(4);
                } catch (error) {
                    paymentForm.setError('pagamento_recusado', {
                        type: 'manual',
                        message: 'pagamento recusado',
                    });
                }
            }
        });
    }

    function listarComodos(dadosFaxina: DiariaInterface): string[] {
        const comodos: string[] = [];
        if (dadosFaxina) {
            houseParts.forEach((houseParts) => {
                const total = dadosFaxina[
                    houseParts.name as keyof DiariaInterface
                ] as number;
                if (total > 0) {
                    const nome =
                        total > 1 ? houseParts.plural : houseParts.singular;
                    comodos.push(`${total} ${nome}`);
                }
            });
        }
        return comodos;
    }

    function calcularTempoServico(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;

        if (dadosFaxina && tipoLimpeza) {
            total +=
                +tipoLimpeza.horas_banheiro * +dadosFaxina.quantidade_banheiros;
            total +=
                +tipoLimpeza.horas_cozinha * +dadosFaxina.quantidade_cozinhas;
            total += +tipoLimpeza.horas_outros * +dadosFaxina.quantidade_outros;
            total +=
                +tipoLimpeza.horas_quarto * +dadosFaxina.quantidade_quartos;
            total +=
                +tipoLimpeza.horas_quintal * +dadosFaxina.quantidade_quintais;
            total += +tipoLimpeza.horas_sala * +dadosFaxina.quantidade_salas;
        }
        return total;
    }

    function calcularPreco(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                +tipoLimpeza.valor_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                +tipoLimpeza.valor_cozinha * dadosFaxina.quantidade_cozinhas;
            total += +tipoLimpeza.valor_outros * dadosFaxina.quantidade_outros;
            total += +tipoLimpeza.valor_quarto * dadosFaxina.quantidade_quartos;
            total +=
                +tipoLimpeza.valor_quintal * dadosFaxina.quantidade_quintais;
            //total = +tipoLimpeza.valor_quintal * 3.587654;
        }
        // console.log('banheiros===>' + dadosFaxina.quantidade_banheiros!);
        return Math.max(+total, +tipoLimpeza.valor_minimo);
    }

    async function criarDiaria(user: UserInterface) {
        if (user.nome_completo) {
            const serviceData = serviceForm.getValues();
            ApiServiceHateoas(
                user.links,
                'cadastrar_diaria',
                async (request) => {
                    try {
                        const novaDiaria = (
                            await request<DiariaInterface>({
                                data: {
                                    ...serviceData.endereco,
                                    ...serviceData.faxina,
                                    cep: TextFormatService.getNumbersFromText(
                                        serviceData.endereco.cep
                                    ),
                                    preco: totalPrice,
                                    tempo_atendimento: totalTime,
                                    data_atendimento:
                                        TextFormatService.reverseDate(
                                            serviceData.faxina
                                                .data_atendimento as string
                                        ) +
                                        'T' +
                                        serviceData.faxina.hora_inicio,
                                },
                            })
                        ).data;
                        if (novaDiaria) {
                            setNovaDiaria(novaDiaria);
                            setStep(3);
                        }
                    } catch (error) {}
                }
            );
        }
    }

    return {
        step,
        breadCrumbItems,
        serviceForm,
        onServiceFormSubmit,
        onClientFormSubmit,
        onLoginFormSubmit,
        onPaymentFormSubmit,
        tamanhoCasa,
        dadosFaxina,
        tipoLimpeza,
        servicos,
        setStep,
        loginForm,
        paymentForm,
        loginError,
        hasLogin,
        setHasLogin,
        clientForm,
        podemosAtender,
        totalPrice,
    };
}
