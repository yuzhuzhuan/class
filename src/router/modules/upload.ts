import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/upload',
    component: Layout,
    redirect: '/upload',
    children: [
      {
        path: '/upload',
        component: () => import(/* webpackChunkName: 'dashboard' */ '@/pages/upload/index.vue'),
        name: 'upload',
        meta: {
          title: 'Upload组件',
          icon: 'bxs:cloud-upload',
          id: '23',
        },
      },
    ],
  },
] as RouteConfig[];
