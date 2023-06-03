import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/role/index.vue'),
        meta: {
          title: 'role',
          icon: 'icon-park-outline:permissions',
          noCache: false,
          id: '53',
        },
      },
    ],
  },
] as RouteConfig[];
