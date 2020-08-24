/** https://jestjs.io/docs/en/configuration */
module.exports = {
  projects: [
    {
      displayName: 'Unit',
      collectCoverageFrom: ['**/*.ts'],
      coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/test/'],
      coverageThreshold: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      rootDir: 'src',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
      testPathIgnorePatterns: ['/node_modules'],
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
    },
    {
      displayName: 'End to End',
      collectCoverageFrom: ['**/*.ts'],
      coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/test/'],
      coverageThreshold: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      rootDir: 'src',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/test/end-to-end/**/*.spec.ts'],
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
    },
  ],
};
