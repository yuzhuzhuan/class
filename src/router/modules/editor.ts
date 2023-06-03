import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/editor',
    component: Layout,
    children: [
      {
        path: '/editor',
        name: 'editor',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/editor/index.vue'),
        meta: {
          title: 'tinymce',
          icon: 'file-icons:tinymce',
          noCache: false,
          id: '22',
        },
      },
    ],
  },
] as RouteConfig[];
