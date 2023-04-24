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
          title: 'icons',
          icon: 'mdi:alpha-i-box-outline',
          noCache: false,
          id: '51',
        },
      },
    ],
  },
] as RouteConfig[];
