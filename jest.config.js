/* eslint-disable no-undef */
const { defaults } = require("jest-config");

module.exports = {
    verbose: false,
    moduleFileExtensions: [...defaults.moduleFileExtensions],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.js",
        "\\.(css|less|scss)$": "<rootDir>/mocks/fileMock.js",
    },
    setupFilesAfterEnv: ["<rootDir>src/setupTests.js"],
};
