module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/jest/**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["victory-native"],
  transform: {
    "^.+/test/.+\\.(js|jsx)$": ["babel-jest", { configFile: "./.babelrc.js" }]
  }
};
