import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 组件
import './components';
// 样式重置
// import 'normalize.css'
// 导入样式库
import ElementUI from 'element-ui'
// 重置element 样式
import '@/styles/element-variables.scss'
// 导入样式
import '@/styles/index.scss'
import 'windi.css';
import '@purge-icons/generated';

import { mockXHR } from '../mock/index'
mockXHR()

Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
