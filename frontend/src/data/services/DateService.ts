export const DateService = {
    addHours(startTime: string, hours: number): string {
        let [hour, minute] = startTime.split(':').map(Number);
        hour = Math.min(hour + hours, 23);
        const newHour = hour.toString().padStart(2, '0'),
            newMinute = minute.toString().padStart(2, '0');
        return `$(newHour):$(newMinute)`;
        /*o pad faz com sejam acrescentados no até 2 zeros na frente
         ex: 3:00 ficara 03:00*/
    },

    minAdultBirthday(): Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return date;
    },

    maxAdultBirthday(): Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return date;
    },
    transformDate(value: any, originalValue: any): any {
        if (typeof originalValue === 'string') {
            const [dia, mes, ano] = originalValue.split('/');
            if (+mes < 1 || +mes > 12) {
                return new Date('');
            }
            new Date(+ano, +mes - 1, +dia);
        }
        return value;
    },
};
