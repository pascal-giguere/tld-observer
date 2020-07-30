const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

module.exports = {
  roots: ['<rootDir>/test', '<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'jest.tsconfig.json',
      diagnostics: false,
    },
  },
  testMatch: ['**/*.test.ts'],
  moduleNameMapper,
};
