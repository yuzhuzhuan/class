import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/upload',
    component: Layout,
    redirect: '/upload/index',
    meta: {
      title: '常用组件',
      icon: 'bxs:cloud-upload'
    },
    children: [
      {
        path: '/upload/index',
        component: () =>
          import(
            /* webpackChunkName: 'dashboard' */ '@/pages/common/upload/index.vue'
          ),
        name: 'upload',
        meta: {
          title: 'Upload组件',
          icon: 'bxs:cloud-upload'
        }
      }

    ]
  }
] as RouteConfig[];
