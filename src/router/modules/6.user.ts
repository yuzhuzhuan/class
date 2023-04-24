import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/user/index.vue'),
        meta: {
          title: 'user',
          icon: 'ph:user-list',
          noCache: false,
          id: '61',
        },
      },
      {
        path: '/personal',
        name: 'personal',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/personal/index.vue'),
        meta: {
          title: 'personal',
          hidden: true,
          noCache: false,
        },
      },
    ],
  },
] as RouteConfig[];
