module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [0],
    "@typescript-eslint/no-var-requires": 0,
    // 'camelcase': ["error", {properties: 'never'}]
    // 'camelcase': [1, {"properties": 'never'}]
    'camelcase': "off",
    // "eslint space-before-function-paren": ["never", "never"]
  }
}
