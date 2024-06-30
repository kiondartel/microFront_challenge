// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
