import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue'

export default [
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    meta: {
      title: '常用Table组件',
      icon: 'fluent:table-edit-24-regular'
    },
    children: [
      {
        path: '/table/index',
        name: 'table',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/common/table/index.vue'),
        meta: {
          title: 'Table',
          icon: 'codicon:table',
          noCache: false
        }
      },
      {
        path: '/treeTable/index',
        name: 'treeTable',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/common/treeTable/index.vue'),
        meta: {
          title: 'TreeTable',
          icon: 'vaadin:tree-table',
          noCache: false
        }
      }
    ]
  }
] as RouteConfig[];
