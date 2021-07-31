const { defaults } = require('jest-config');

module.exports = {
    verbose: true,
    rootDir: 'src',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/$1',
    },
    setupFiles: ['<rootDir>/__mocks__/matchMediaMock.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'jsdom',
};
