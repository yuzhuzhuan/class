import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/table',
    component: Layout,
    meta: {
      title: 'Table组件',
      icon: 'fluent:table-edit-24-regular',
    },
    children: [
      {
        path: '/sort',
        name: 'sort',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/sort/index.vue'),
        meta: {
          title: 'sort',
          icon: 'fa-solid:sort',
          noCache: false,
          id: '33',
        },
      },
      {
        path: '/tree-table',
        name: 'treeTable',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/treeTable/index.vue'),
        meta: {
          title: 'TreeTable',
          icon: 'clarity:tree-view-solid',
          noCache: false,
          id: '33',
        },
      },
    ],
  },
] as RouteConfig[];
