import { resolve } from 'path';

export default {
    // Root files
    root: resolve('./'),

    // Source files
    src: resolve('./src'),

    // Production build files
    build: resolve('./dist'),

    // Static files that get copied to build folder
    public: resolve('./public'),
};
