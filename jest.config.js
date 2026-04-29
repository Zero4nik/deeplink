module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/tests/setup.ts'],
  testMatch: ['**/src/tests/**/*.test.ts'],
  testTimeout: 30000,
  maxConcurrency: 1,  
  maxWorkers: 1,
};