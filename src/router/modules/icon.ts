import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: '/icon',
        name: 'icon',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/icon/index.vue'),
        meta: {
          title: 'Icon组件',
          icon: 'dashicons:editor-kitchensink',
          noCache: false,
          id: '51',
        },
      },
    ],
  },
] as RouteConfig[];
