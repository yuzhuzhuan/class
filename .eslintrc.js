module.exports = {
  extends: [
    'eslint-config-ali/typescript/vue',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/method-signature-style': 'warn',
    // 可以使用嵌套的三元表达式
    'no-nested-ternary': 'off',
    'import/no-cycle': 'warn',
  },
  parserOptions: {
    // 提升解析速度
    parser: {
      js: '@typescript-eslint/parser',
      ts: '@typescript-eslint/parser',
      '<template>': 'espree',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        // 由 typescript 验证
        'no-undef': 'off',
      },
    },
    {
      files: ['*.vue'],
      rules: {
        // 业务相关的部分最好写在一起
        '@typescript-eslint/member-ordering': 'off',
      },
    },
  ],
};
