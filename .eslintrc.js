module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["react-app"],
  parserOptions: {
    ecmaFeatures: {
      jsx: false
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
};
