// import { IRUserData } from '@/api/login/types';
// import { getUserData } from '@/utils/cookies';
import { UserModule } from '@/store/modules/user';
import { NavigationGuardNext, Route } from 'vue-router/types/router';

// const whiteList = ['/Login'];
// 路由守卫
export function matchRouteMenu (to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  //
  // console.log(to, from, next);
  // const userData:IRUserData = JSON.parse(getUserData() as string);
  // if()

  // 如果有toke
  // 判断是否要去登录页
  // console.log(UserModule.token);
  if (UserModule.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果去的页面非登陆页
      //     如果有用户信息,不调用接口正常通过
      //     如果没有用户信息,调用接口获取用户信息，且在对比权限后执行正常通过
      // if (!UserModule.useData?.id) {
      //   next()
      // } else {
      //   const {
      //     data: { data },
      //   } = await ApiGetUserinfo();
      //   let id = data.menus.map((item: any) => item.id).map(String);
      //   if (id.includes(to.meta?.id.toLowerCase())) {
      //     next()
      //   } else {
      //     next('/')
      //   }
      // }
      next()
    }
  }
  next()
}
