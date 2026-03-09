import { resolve } from 'node:path';

const paths = {
    root: resolve('./'),
    src: resolve('./src'),
    build: resolve('./dist'),
    public: resolve('./public'),
};

export default paths;
