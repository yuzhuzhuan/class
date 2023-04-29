import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './lang';
// 样式重置
import 'normalize.css';
// 导入样式库
import ElementUI from 'element-ui';
import '@/assets/styles/element-variables.scss';
import '@/assets/styles/index.scss';
import '@/assets/styles/tailwind.css';
import '@purge-icons/generated';
import './utils/mixins';
import './components';
import Component from 'vue-class-component';

import '@/plugins/message-box';

Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false;
// 重置表单，formRef为表单的ref值，excludeFields为要排除重新初始化值得属性
Vue.prototype.$reset = function (formRef: any, ...excludeFields: any) {
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
  i18n,
  render: (h) => h(App),
}).$mount('#app');
