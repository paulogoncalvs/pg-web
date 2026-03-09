interface StylelintConfig {
    extends?: string | string[];
    plugins?: string[];
    rules?: Record<string, unknown>;
    [key: string]: unknown;
}

const config: StylelintConfig = {
    extends: ['stylelint-config-tailwindcss'],
};

export default config;
