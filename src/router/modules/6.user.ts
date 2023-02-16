import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: '/user/index',
        name: 'user',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/user/index.vue'),
        meta: {
          title: 'User组件',
          icon: 'ph:user-list',
          noCache: false,
          id: '61'
        }
      }
    ]
  }
] as RouteConfig[];
