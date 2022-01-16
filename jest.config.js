const { defaults } = require('jest-config');

module.exports = {
    verbose: true,
    rootDir: 'src',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/tests/__mocks__/fileMock.ts',
        '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.ts',
        '@/(.*)': '<rootDir>/$1',
    },
    setupFiles: ['<rootDir>/tests/__mocks__/matchMediaMock.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer', 'jest-serializer-html'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['node_modules/(?!(wouter-preact)/)'],
};
