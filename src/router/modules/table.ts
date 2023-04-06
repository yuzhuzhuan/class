import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    meta: {
      title: 'Table组件',
      icon: 'fluent:table-edit-24-regular',
    },
    children: [
      {
        path: '/table/index',
        name: 'table',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/table/index.vue'),
        meta: {
          title: 'table',
          icon: 'vaadin:tree-table',
          noCache: false,
          id: '33',
        },
      },
      {
        path: '/treeTable/index',
        name: 'treeTable',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/treeTable/index.vue'),
        meta: {
          title: 'TreeTable',
          icon: 'vaadin:tree-table',
          noCache: false,
          id: '33',
        },
      },
    ],
  },
] as RouteConfig[];
