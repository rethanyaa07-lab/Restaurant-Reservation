module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/testing/setupTests.js"],
  testMatch: ["**/*.test.jsx"],
  clearMocks: true
};