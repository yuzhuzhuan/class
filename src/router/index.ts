import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router'
import { matchRouteMenu } from './../../matchRouteMenu'
/* Layout */
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)
export let serviceRoutes: RouteConfig[] = [];
// if (process.env.NODE_ENV === 'development') {
const routerContext = (require as any).context(
  '@/router/modules',
  true,
  /[\\/][^_][^\\/]+\.ts$/
);

routerContext.keys().forEach((route: any) => {
  const routerModule = routerContext(route);
  serviceRoutes = [...serviceRoutes, ...(routerModule.default || routerModule)];
});

export const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   name: 'Layout',
  //   redirect: '/home/index'
  // },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: 'Login' */ '@/pages/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    component: Layout,
    name: 'home',
    children: [
      {
        path: 'index',
        name: 'home',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'fluent:building-home-20-filled',
          noCache: false
        }
      }
    ]
  },
  ...serviceRoutes
  // {
  //   path: '/TaskList',
  //   component: Layout,
  //   redirect: '/WillDoTaskList',
  //   meta: {
  //     title: '列表页面',
  //     icon: 'list'
  //   },
  //   children: [
  //     {
  //       path: '/WillDoTaskList',
  //       name: 'WillDoTaskList',
  //       component: () => import(/* webpackChunkName: 'WillDoTaskList' */ '@/pages/taskList/willDoTaskList.vue'),
  //       meta: {
  //         title: '代办列表',
  //         icon: 'willDoTask',
  //         noCache: false
  //       }
  //     },
  //     {
  //       path: '/DidTaskList',
  //       name: 'DidTaskList',
  //       component: () => import(/* webpackChunkName: 'DidTaskList' */ '@/pages/taskList/didTaskList.vue'),
  //       meta: {
  //         title: '已办列表',
  //         icon: 'didTask',
  //         noCache: false
  //       }
  //     }
  //   ]
  // }
]
const router = new VueRouter({
  mode: 'hash',
  routes
})
// 路由守卫
router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  matchRouteMenu(to, from, next);
})

export default router
