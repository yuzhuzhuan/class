import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/echarts',
    component: Layout,
    redirect: '/echarts/column-chart',
    meta: {
      title: 'Echarts',
      icon: 'fluent:table-edit-24-regular',
    },
    children: [
      {
        path: 'column-chart',
        name: 'columnChart',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/echarts/columnChart/index.vue'),
        meta: {
          title: '柱状图',
          icon: 'fluent-mdl2:bar-chart-4',
          noCache: false,
          id: '11',
        },
      },
      {
        path: 'line-chart',
        name: 'lineChart',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/echarts/lineChart/index.vue'),
        meta: {
          title: '折线图',
          icon: 'raphael:linechart',
          noCache: false,
          id: '12',
        },
      },
      {
        path: 'pie-chart',
        name: 'pieChart',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/echarts/pieChart/index.vue'),
        meta: {
          title: '饼图',
          icon: 'raphael:piechart',
          noCache: false,
          id: '13',
        },
      },
      {
        path: 'radar-chart',
        name: 'radarChart',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/echarts/radarChart/index.vue'),
        meta: {
          title: '雷达图',
          icon: 'icon-park-twotone:radar-chart',
          noCache: false,
          id: '14',
        },
      },
      {
        path: 'nested-chart',
        name: 'nestedChart',
        component: () =>
          import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/echarts/nestedChart/index.vue'),
        meta: {
          title: '嵌套环形图',
          icon: 'mdi:chart-donut-variant',
          noCache: false,
          id: '15',
        },
      },
    ],
  },
] as RouteConfig[];
