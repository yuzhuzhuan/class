// import { IRUserData } from '@/api/login/types';
// import { getUserData } from '@/utils/cookies';
import { UserModule } from '@/store/modules/user';
import { NavigationGuardNext, Route } from 'vue-router/types/router';
import { GetUserApi } from '@/api/login'; // 导入接口

const whiteList = ['/login', '/404'];
// 路由守卫
export async function matchRouteMenu(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  // 如果有toke
  // 判断是否要去登录页
  // console.log(UserModule.token);
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
        const { data } = await GetUserApi({ username: 'admin', password: '123456' });
        const id = data.menus.map((item: any) => item.id).map(String);
        if (to.meta?.id && id.includes(to.meta?.id.toString())) {
          next();
        } else {
          next('/index');
        }
      }
      next();
    }
  } else if (whiteList.includes(to.path.toLowerCase())) {
    next();
  } else {
    next(`/login?redirect=${to.fullPath}`);
  }
  next();
}
