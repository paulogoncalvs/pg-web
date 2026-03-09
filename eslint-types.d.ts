declare module 'eslint-plugin-jsx-a11y' {
    const plugin: {
        rules: Record<string, unknown>;
        configs: { recommended: unknown };
    };
    export default plugin;
}

declare module 'eslint-plugin-tailwindcss' {
    const plugin: {
        rules: Record<string, unknown>;
        configs: Record<string, unknown>;
    };
    export default plugin;
}

declare module '@typescript-eslint/parser' {
    const parser: {
        parse: unknown;
        parseForESLint: unknown;
    };
    export default parser;
}
