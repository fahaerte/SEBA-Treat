const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

export const reviver = (key: string, value: string) => {
    if (dateFormat.test(value)) {
        return new Date(value);
    }
    return value;
}