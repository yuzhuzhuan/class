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
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/method-signature-style': 'warn',
    // 可以使用嵌套的三元表达式
    'no-nested-ternary': 'off',
    'import/no-cycle': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        // 由 typescript 验证
        'no-undef': 'off',
      },
    },
  ],
};
