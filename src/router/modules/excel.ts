import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/excel',
    component: Layout,
    meta: {
      title: 'excel',
      icon: 'fluent:table-edit-24-regular',
      id: '11',
    },
    children: [
      {
        path: 'upload-excel',
        name: 'upload',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/excel/uploadExcel.vue'),
        meta: {
          title: 'uploadExcel',
          icon: 'ic:baseline-drive-folder-upload',
          noCache: false,
          id: '11',
        },
      },
      {
        path: 'export-excel',
        name: 'export',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/excel/exportExcel.vue'),
        meta: {
          title: 'exportExcel',
          icon: 'mi:folder-download',
          noCache: false,
          id: '11',
        },
      },
    ],
  },
] as RouteConfig[];
