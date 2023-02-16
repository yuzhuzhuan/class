import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import { matchRouteMenu } from './../../matchRouteMenu';
/* Layout */
import Layout from '@/layout/index.vue';
Vue.use(VueRouter);
export let serviceRoutes: RouteConfig[] = [];
// if (process.env.NODE_ENV === 'development') {
const routerContext = (require as any).context('@/router/modules', true, /[\\/][^_][^\\/]+\.ts$/);

routerContext.keys().forEach((route: any) => {
  const routerModule = routerContext(route);
  serviceRoutes = [...serviceRoutes, ...(routerModule.default || routerModule)];
});

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'Login' */ '@/pages/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/index',
    component: Layout,
    name: 'home',
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'home',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/pages/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'fluent:building-home-20-filled',
          noCache: false,
          id: '23'
        }
      }
    ]
  },
  ...serviceRoutes
];
const router = new VueRouter({
  mode: 'hash',
  routes
});
// 路由守卫
router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  matchRouteMenu(to, from, next);
});

export default router;
