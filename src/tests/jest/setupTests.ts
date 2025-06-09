// Fixed ISO date string or timestamp
const FIXED_DATE = new Date('2022-01-01T00:00:00Z');

// Override Date constructor
const OriginalDate = Date;
global.Date = class extends Date {
    constructor(...args: unknown[]) {
        super();
        if (args.length === 0) {
            return new OriginalDate(FIXED_DATE);
        }
        // @ts-ignore
        return new OriginalDate(...args);
    }

    static now() {
        return FIXED_DATE.getTime();
    }

    static parse = OriginalDate.parse;
    static UTC = OriginalDate.UTC;
    static get [Symbol.species]() {
        return OriginalDate;
    }
} as unknown as DateConstructor;
