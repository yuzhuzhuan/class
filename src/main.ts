import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './utils/mixins';
// 组件
import './components';
// 样式重置
// import 'normalize.css'
// 导入样式库
import ElementUI from 'element-ui';
// 重置element 样式
import '@/styles/element-variables.scss';
// 导入样式
import '@/styles/index.scss';
import 'windi.css';
import '@purge-icons/generated';

// import { mockXHR } from '../mock/index';

import Component from 'vue-class-component';

// mockXHR();

Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false;
// 重置表单，formRef为表单的ref值，excludeFields为要排除重新初始化值得属性
Vue.prototype.$reset = function(formRef: any, ...excludeFields: any) {
  this.$refs[formRef].resetFields();
  const obj1 = this.$data;
  const obj2 = this.$options.data.call(this);
  if (!excludeFields || excludeFields.length === 0) {
    excludeFields = ['ruleValidate'];
  }
  for (const attrName in obj1) {
    if (excludeFields && excludeFields.includes(attrName)) {
      continue;
    }
    obj1[attrName] = obj2[attrName];
  }
};
// 注册路由钩子函数
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
