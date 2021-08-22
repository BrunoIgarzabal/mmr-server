module.exports = {
  roots: ['<rootDir>/tests'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8'
}
