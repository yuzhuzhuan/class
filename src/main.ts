import Vue from 'vue';
import Component from 'vue-class-component';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './lang';
import './components';

// plugins
import '@/plugins/mixins';
import '@/plugins/element-ui';
import '@/plugins/message-box';

// 样式
import 'normalize.css';
import '@/assets/styles/index.scss';
import '@/assets/styles/tailwind.css';

// icon
import '@purge-icons/generated';

Vue.config.productionTip = false;
// 注册路由钩子函数
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
