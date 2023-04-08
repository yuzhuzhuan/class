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
          title: 'User组件',
          icon: 'ph:user-list',
          noCache: false,
          id: '61',
        },
      },
      {
        path: '/profile',
        name: 'profile',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/personal/index.vue'),
        meta: {
          title: '个人中心',
          hidden: true,
          noCache: false,
        },
      },
    ],
  },
] as RouteConfig[];
