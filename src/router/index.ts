import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import { matchRouteMenu } from './matchRouteMenu';
/* Layout */
import Layout from '@/layout/index.vue';
import LayoutBlank from '@/layout/blank.vue';
import { UserModule } from '@/store/modules/user';
import watermark from '@/plugins/watermark';
import { cookieUser } from '@/utils/cookies';

Vue.use(VueRouter);
export let serviceRoutes: RouteConfig[] = [];
// if (process.env.NODE_ENV === 'development') {
const routerContext = (require as any).context('@/router/modules', true, /[\\/][^_][^\\/]+\.ts$/);

routerContext.keys().forEach((route: any) => {
  const routerModule = routerContext(route);
  serviceRoutes = [...serviceRoutes, ...(routerModule.default || routerModule)];
});

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/index',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'Login' */ '@/pages/login/index.vue'),
    meta: {
      hidden: true,
    },
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
          title: 'dashboard',
          icon: 'fluent:building-home-20-filled',
          noCache: false,
          id: '23',
        },
      },
    ],
  },
  {
    path: '/blank',
    name: 'blank',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '',
        name: 'blank',
        meta: { title: 'blank' },
        component: () => import(/* webpackChunkName: 'Login' */ '@/pages/blank/index.vue'),
      },
    ],
  },
  {
    path: '/403',
    name: '403',
    component: LayoutBlank,
    meta: { hidden: true },
    children: [
      {
        path: '',
        name: '403-page',
        component: () => import(/* webpackChunkName: 'Login' */ '@/pages/error-page/403.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: LayoutBlank,
    meta: { hidden: true },
    children: [
      {
        path: '',
        name: '404-page',
        component: () => import(/* webpackChunkName: 'Login' */ '@/pages/error-page/404.vue'),
      },
    ],
  },
  ...serviceRoutes,
];
const router = new VueRouter({
  mode: 'hash',
  routes,
});
// 路由守卫
router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  matchRouteMenu(to, from, next);
});
router.afterEach((to: Route) => {
  if (UserModule.token) {
    const { watermark: mark } = cookieUser.value ?? {};
    mark && watermark.set(mark);
  } else {
    watermark.remove();
  }
});

export default router;
