module.exports = {
  moduleNameMapper: {
    '@zuze/schema': '<rootDir>/src',
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
};
