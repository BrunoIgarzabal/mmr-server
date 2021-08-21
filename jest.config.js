module.exports = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8'
}
