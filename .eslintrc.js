const prettierConfig = require('./prettier.config')

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      classes: true,
    },
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'prettier/prettier': ['error', prettierConfig],
  },
}
