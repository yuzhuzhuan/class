module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: [0],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/camelcase': [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true,
        genericType: 'never'
      }
    ],
    camelcase: 'off',
    // "eslint space-before-function-paren": ["never", "never"]
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore', // 匿名函数
        named: 'ignore', // 针对命名的函数表达式忽略检查
        asyncArrow: 'always'
      }
    ]
  }
};
