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
// 使用svg图标
// import SvgIcon from 'vue-svgicon'
// import '@babel/polyfill'
// import '@/icons/components/index'

import { mockXHR } from '../mock/index'
mockXHR()

if (process.env.NODE_ENV === 'development') {
  // mockXHR();
}

Vue.use(ElementUI)

// Vue.use(SvgIcon, {
//   tagName: 'svg-icon',
//   defaultWidth: '1em',
//   defaultHeight: '1em'
// })

// 引入阿里图标库里面的图标
// import '@/icons/iconfont/iconfont.css';
// 引入阿里图标库里面含有颜色的图标
// import '@/icons/iconfont/iconfont.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
