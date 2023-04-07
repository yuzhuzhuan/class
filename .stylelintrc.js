module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-html/html',
    'stylelint-config-html/vue',
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-less',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-rational-order-fix',
    'stylelint-config-ali',
  ],
  plugins: [
    'stylelint-csstree-validator',
    // 'stylelint-high-performance-animation',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  rules: {
    'csstree/validator': {
      syntaxExtensions: ['sass', 'less'],
      ignoreAtrules: ['apply'],
    },
    // NOTE: 高性能动画设计 https://web.dev/animations-guide/
    // 'plugin/no-low-performance-animation-properties': true,
    // NOTE: 无效的属性 https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties
    'plugin/declaration-block-no-ignored-properties': true,
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep'],
          },
        ],
        'declaration-block-trailing-semicolon': null,
      },
    },
  ],
};
