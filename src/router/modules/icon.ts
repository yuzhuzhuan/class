import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue'

export default [
  {
    path: '/icon',
    component: Layout,
    redirect: '/icon/index',
    children: [
      {
        path: '/icon/index',
        name: 'icon',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/icon/index.vue'),
        meta: {
          title: 'Icon组件',
          icon: 'dashicons:editor-kitchensink',
          noCache: false
        }
      }
    ]
  }
] as RouteConfig[];
