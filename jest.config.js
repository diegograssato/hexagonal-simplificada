/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
  testResultsProcessor: 'jest-sonar-reporter',

 roots: [
    "test"
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
    coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/infra/swagger/',
    '<rootDir>/src/app.ts',
    '<rootDir>/src/index.ts',
    '<rootDir>/src/env.ts'
  ],

  reporters: ['default', 'jest-junit'],
}; 