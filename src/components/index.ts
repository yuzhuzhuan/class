import Vue from 'vue';

// 自动加载 global 目录下的 .vue 结尾的文件
[require.context('./YkForm', true, /\.vue$/), require.context('./global', true, /\.vue$/)].forEach(
  (comCtx) => {
    comCtx.keys().forEach((component) => {
      const componentConfig = comCtx(component);
      /**
       * 兼容 import export 和 require module.export 两种规范
       */
      const ctrl = componentConfig.default || componentConfig;
      Vue.component(ctrl.name, ctrl);
    });
  },
);
