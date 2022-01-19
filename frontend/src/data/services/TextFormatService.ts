const CurrencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const TextFormatService = {
    /*
        a data que virá do back end estará no formato datetime 2020-01-01T01:01:01.01
        por isso será necessário transformá-la para o formato que utilizamos dd/mm/aaaa
    */
    reverseDate(date: string): string {
        if (date.includes('/')) {
            date.split('/').reverse().join('-'); //isto irá retirar as barras e quebrar a string onde houver barras
        }
        if (date.includes('T')) {
            [date] = date.split('T'); // a variável date passa a ter o formato de um array [data,hora];
        }
        return date.split('-').reverse().join('/'); // a variável date
    },
    getNumbersFromText(text = ''): string {
        return text.replace(/\D/g, '');
    },
    dateToString(date: Date, withTime = false): string {
        const time = date.toISOString();
        if (withTime) {
            return time.substring(0, 19);
        }
        return time.substring(0, 10);
    },
    currency(price = 0): string {
        if (isNaN(price)) {
            price = 0;
        }
        return CurrencyFormatter.format(price);
    },
};
