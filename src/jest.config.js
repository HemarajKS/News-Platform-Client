module.exports = {
  // Specify the root directories for Jest to look for tests
  roots: ["<rootDir>/backend", "<rootDir>/client"],

  // Match test files with `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx` extensions
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],

  // Use ts-jest to transpile TypeScript files
  // transform: {
  //   "^.+\\.(ts|tsx)$": "ts-jest",
  // },
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios|other-esm-modules)", // Ensure axios is not ignored
  ],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Setup files to run before each test suite
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Mock static assets (e.g., images, CSS files) for frontend tests
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$":
      "<rootDir>/client/src/__mocks__/fileMock.js",
  },

  // Test environment for frontend and backend
  testEnvironment: "jsdom", // Use "node" for backend-only tests

  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    "backend/src/**/*.{ts,tsx}",
    "client/src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/dist/**",
  ],
  coverageDirectory: "coverage",

  // Ignore specific paths for testing
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
