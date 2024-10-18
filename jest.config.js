const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  clearMocks: true,
  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^@/app/(.*)$": "<rootDir>/src/_app/$1",
    "@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(config);
