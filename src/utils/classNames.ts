type ClassValue =
    | string
    | number
    | boolean
    | undefined
    | null
    | ClassValue[]
    | { [key: string]: boolean | undefined | null };

export const classNames = (...args: ClassValue[]): string => {
    const classes: string[] = [];

    for (const arg of args) {
        if (!arg) continue;

        if (typeof arg === 'string' || typeof arg === 'number') {
            classes.push(String(arg));
        } else if (Array.isArray(arg)) {
            const result = classNames(...arg);
            if (result) classes.push(result);
        } else if (typeof arg === 'object') {
            for (const key in arg) {
                if (arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
};
