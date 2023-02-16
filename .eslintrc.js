module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  /* 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /* 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript/recommended', 'prettier'],
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
