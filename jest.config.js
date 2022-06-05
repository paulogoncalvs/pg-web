const { defaults } = require('jest-config');

module.exports = {
    verbose: true,
    rootDir: 'src/tests/jest/',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'json'],
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
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
    },
};
