import type { Config } from 'jest';

const config: Config = {
    testTimeout: 10000,
    verbose: true,
    rootDir: 'src/tests/jest/',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '@/assets/icons/.*\\.svg$': '<rootDir>__mocks__/iconSrcMock.ts',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>__mocks__/fileMock.ts',
        '\\.(css|less)$': '<rootDir>__mocks__/styleMock.ts',
        '@/(.*)': '<rootDir>../../$1',
    },
    setupFiles: ['<rootDir>/setupTests.ts', '<rootDir>/__mocks__/matchMediaMock.ts'],
    snapshotSerializers: ['jest-serializer-html'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['node_modules/(?!(wouter-preact|preact))/'],
    transform: {
        '\\.[jt]sx?$': ['babel-jest', { rootMode: 'upward' }],
    },
};

export default config;
