import pagarme, { CardInterface, CardValidateInterface } from 'pagarme';

const encription_key = process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY;

export const PaymentService = {
    validate(card: CardInterface): CardValidateInterface {
        return pagarme.validate({ card }).card;
    },

    getHash(card: CardInterface): Promise<string> {
        return pagarme.client
            .connect({ encription_key })
            .then((client) => client.security.encrypt(card));
        //como a variavel e o parametro encription_key tem o mesmo nome podemos simplificar, passando
        //somente deste jeito
    },
};
