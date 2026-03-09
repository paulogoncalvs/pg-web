// Fixed ISO date string or timestamp
const FIXED_DATE = new Date('2026-01-01T00:00:00Z');

// Override Date constructor
const OriginalDate = Date;
global.Date = class extends Date {
    constructor(...args: unknown[]) {
        super();
        if (args.length === 0) {
            return new OriginalDate(FIXED_DATE);
        }
        return new OriginalDate(args[0] as string | number | Date);
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
