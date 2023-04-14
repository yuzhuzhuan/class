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
          title: 'Role组件',
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
          title: '新建角色',
          hidden: true,
          id: '51',
        },
      },
      {
        name: 'edit',
        path: ':roleId',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/role/detail.vue'),
        meta: {
          title: '编辑角色',
          hidden: true,
          id: '52',
        },
      },
      {
        name: 'detail',
        path: '/role/detail/:roleId',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/role/detail.vue'),
        meta: {
          title: '编辑角色',
          hidden: true,
          id: '52',
        },
      },
    ],
  },
] as RouteConfig[];
