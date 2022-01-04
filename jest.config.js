module.exports = {
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/__test-transforms__/cssTransform.js',
    '\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^@/components(.*)$': ['<rootDir>/components$1'],
    '^@/lib(.*)$': ['<rootDir>/lib$1'],
    '^@/const(.*)$': ['<rootDir>/const$1'],
    '^@/paths(.*)$': ['<rootDir>/paths$1'],
    '^@/context(.*)$': ['<rootDir>/context$1'],
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  moduleDirectories: ['node_modules', '<rootDir>/__test-utils__'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/.storybook/**',
    '!**/__*__/**',
    '!**/*.config.*',
  ],
  collectCoverage: true,
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        pageTitle: 'jest tests',
        publicPath: './test-results',
        filename: 'report.html',
        openReport: true,
      },
    ],
  ],
  //set up load .env.test environment file
  globalSetup: '<rootDir>/__test-utils__/setupEnv.js',
}
