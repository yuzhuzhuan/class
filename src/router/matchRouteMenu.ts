import { UserModule } from '@/store/modules/user';
import { NavigationGuardNext, Route } from 'vue-router/types/router';
import { GetUserApi } from '@/services/login';
import { WHITE_ROUTES } from '@/constants/config';

// 路由守卫
export async function matchRouteMenu(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  // 如果有toke
  // 判断是否要去登录页
  if (UserModule.token) {
    if (to.path === '/login') {
      next('/');
    } else {
      // 如果去的页面非登陆页
      //     如果有用户信息,不调用接口正常通过
      //     如果没有用户信息,调用接口获取用户信息，且在对比权限后执行正常通过
      if (!UserModule.useData?.id) {
        next();
      } else {
        const { data } = await GetUserApi();
        const id = data.menus.map((item: any) => item.id).map(String);
        if ((to.meta?.id && id.includes(to.meta?.id.toString())) || to.name === 'personal') {
          next();
        } else if (
          (to.meta?.id && !id.length) ||
          (to.meta?.id && !id.every((item: any) => item.id))
        ) {
          // 去的页面需要id匹配 但是没有权限 进入空白无权限页
          next('/blank');
        } else if (to.meta?.id && !id.includes(to.meta?.id.toString())) {
          next('/403');
        } else if (to.name === null) {
          next('/404');
        }
      }
      next();
    }
  } else if (WHITE_ROUTES.includes(to.path.toLowerCase())) {
    next();
  } else {
    next(`/login?redirect=${to.fullPath}`);
  }
  next();
}
