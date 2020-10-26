/** https://jestjs.io/docs/en/configuration */
const collectCoverageFrom = ['**/*.ts'];
const coveragePathIgnorePatterns = [
  '/node_modules/',
  '<rootDir>/*/test/',
  '<rootDir>/data-modules/*/test/',
  '<rootDir>/layer-modules/*/test/',
];
const coverageThreshold = {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
};
const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
const rootDir = 'src';
const testEnvironment = 'node';

const testMatchGenerator = (dirName) =>  [
  `<rootDir>/*/test/${dirName}/**/*.spec.ts`,
  `<rootDir>/data-modules/*/test/${dirName}/**/*.spec.ts`,
  `<rootDir>/layer-modules/*/test/${dirName}/**/*.spec.ts`,
];

const testPathIgnorePatterns = ['/node_modules'];

const transform = {
  '^.+\\.ts?$': 'ts-jest',
};

const jestProjectConfigGenerator = (displayName, testDirName) => {
  return {
    displayName: displayName,
    collectCoverageFrom: collectCoverageFrom,
    coveragePathIgnorePatterns: coveragePathIgnorePatterns,
    coverageThreshold: coverageThreshold,
    moduleFileExtensions: moduleFileExtensions,
    rootDir: rootDir,
    testEnvironment: testEnvironment,
    testMatch: testMatchGenerator(testDirName),
    testPathIgnorePatterns: testPathIgnorePatterns,
    transform: transform,
  };
};

module.exports = {
  projects: [
    jestProjectConfigGenerator('Unit', 'unit'),
    jestProjectConfigGenerator('Integration', 'integration'),
    jestProjectConfigGenerator('End2End', 'end-to-end'),
  ],
};
