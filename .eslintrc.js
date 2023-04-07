module.exports = {
  extends: [
    'eslint-config-ali/typescript/vue',
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/method-signature-style': 'warn',
    // 可以使用嵌套的三元表达式
    'no-nested-ternary': 'off',
    'import/no-cycle': 'warn',
  },
  parserOptions: {
    parser: {
      js: '@typescript-eslint/parser',
      ts: '@typescript-eslint/parser',
      '<template>': 'espree',
    },
    ecmaVersion: 2022,
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
