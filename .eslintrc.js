const config = {
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:prettier/recommended"],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      module: true,
    },
  },

  rules: {
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "import/prefer-default-export": 0,
    "import/no-default-export": "error",
    "import/exports-last": "error",
    "import/group-exports": "error",
  },

  plugins: ["react", "react-hooks", "prettier"],

  settings: {},
};

module.exports = config;
