/*
 * @Author: yuzhuzhuan yuzhuzhuan@yekertech.com
 * @Date: 2022-10-21 09:38:35
 * @LastEditors: yuzhuzhuan yuzhuzhuan@yekertech.com
 * @LastEditTime: 2022-12-02 17:35:41
 * @FilePath: \vue2-ts-template\.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    '@typescript-eslint/no-var-requires': 0,
    // 'camelcase': ["error", {properties: 'never'}]
    // 'camelcase': [1, {"properties": 'never'}]
    camelcase: 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore', // 匿名函数
        named: 'ignore', // 针对命名的函数表达式忽略检查
        asyncArrow: 'always'
      }
    ]
    // "eslint space-before-function-paren": ["never", "never"]
  }
};
