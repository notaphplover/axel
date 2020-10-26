/** https://jestjs.io/docs/en/configuration */
const collectCoverageFrom = ['<rootDir>/**/*.js'];
const coveragePathIgnorePatterns = [
  '/node_modules/',
  '/test/',
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
const rootDir = 'dist';
const testEnvironment = 'node';

const testMatchGenerator = (dirName) =>  [
  `<rootDir>/*/test/${dirName}/**/*.spec.js`,
  `<rootDir>/data-modules/*/test/${dirName}/**/*.spec.js`,
  `<rootDir>/layer-modules/*/test/${dirName}/**/*.spec.js`,
];

const testPathIgnorePatterns = ['/node_modules'];

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
  };
};

module.exports = {
  projects: [
    jestProjectConfigGenerator('Unit', 'unit'),
    jestProjectConfigGenerator('Integration', 'integration'),
    jestProjectConfigGenerator('End2End', 'end-to-end'),
  ],
};
