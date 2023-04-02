// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  // **optional** default: `{}`
  // override vscode settings
  // Notice: It only affects the settings used by Vetur.
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': true,
    'vetur.completion.tagCasing': 'initial',
    'vetur.validation.templateProps': true,
    'vetur.validation.script': true,
    'vetur.validation.interpolation': true,
    'vetur.validation.style': false,
    'vetur.validation.template': true,
  },
  // **optional** default: `[{ root: './' }]`
  // support monorepos
  projects: ['./'],
  // exclude: ['src/pages/user/**'],
};
