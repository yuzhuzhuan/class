import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue'

export default [
  {
    path: '/editor',
    component: Layout,
    redirect: '/editor/index',
    children: [
      {
        path: '/editor/index',
        name: 'editor',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/editor/index.vue'),
        meta: {
          title: 'Editor组件',
          icon: 'dashicons:editor-kitchensink',
          noCache: false
        }
      }
    ]
  }
] as RouteConfig[];
