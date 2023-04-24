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
      {
        name: 'create',
        path: 'create',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/role/detail.vue'),
        meta: {
          title: 'createRole',
          hidden: true,
          id: '51',
        },
      },

      {
        name: 'detail',
        path: '/role/detail/:roleId',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/role/detail.vue'),
        meta: {
          title: 'editRole',
          hidden: true,
          id: '52',
        },
      },
    ],
  },
] as RouteConfig[];
