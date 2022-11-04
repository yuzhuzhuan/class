import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue'

export default [
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    meta: {
      title: '常用组件',
      icon: 'codicon:table'
    },
    children: [
      {
        path: '/table/index',
        name: 'table',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/common/table/index.vue'),
        meta: {
          title: 'Table组件',
          icon: 'codicon:table',
          noCache: false
        }
      }
    ]
  }
] as RouteConfig[];
