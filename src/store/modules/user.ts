import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';
import { getUserData, getToken, setToken, removeToken, setUserData } from '@/utils/cookies';
import { IUserData } from '@/types/dataTypes';
import { RouteConfig } from 'vue-router';

export type IUserState = {
  // 用户数据
  useData: IUserData | null;
  // 令牌
  token: string;
  /**
   * 路由列表
   */
  routeList: RouteConfig[];
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  // 路由列表
  public routeList!: RouteConfig[];
  // 用户数据
  public useData = null as null | IUserData;
  // token
  // public token = localStorage.getItem('token') || '';
  public token = getToken() || '';

  // private permits = [] as { id: number }[]
  public permits = [] as { id: number; name: string }[]

  /**
   * 存入用户数据
   * @param userData
   */
  @Mutation
  public SET_USER_DATA (userData: any) {
    // 存入数据
    this.useData = userData;
    // 存入数据进入cookie
    setUserData(userData);
  }

  /**
   * 移除token
   */
  @Mutation
  DEL_TOKEN () {
    this.token = '';
    // localStorage.removeItem('token');
    removeToken();
  }

  /**
   * 存入token
   * @param token
   */
  @Mutation
  public SET_TOKEN (token: string) {
    this.token = token;
    setToken(token);
  }

  @Mutation
  public SET_MENU (routeList: RouteConfig[]) {
    this.routeList = routeList;
  }

  @Mutation
  public SET_PERMITS (list: any[]) {
    this.permits = list;
  }

  /**
   * 对外暴露设置用户数据
   * @param userData
   */
  @Action
  public setUserData (userData: IUserData) {
    this.SET_USER_DATA(userData);
    this.SET_PERMITS(userData.menus)
    // setMenus(userData.menus)
  }

  /**
   * 对外暴露存入token
   * @param token
   */
  @Action
  public setToken (token: string) {
    // localStorage.setItem('token', token);
    setToken(token);
    this.SET_TOKEN(token);
  }

  /**
   * 获取用户的token
   * @returns
   */
  @Action
  public getToken () {
    return this.token;
  }

  /**
   * 获取用户菜单
   * @returns
   */
  @Action
  public async getMenu () {
    const userData: IUserData = JSON.parse(getUserData() as string);
    // return await APIGetMenu({
    //   phone: userData.phone,
    // });
  }

  /**
   * 存入路由数据
   * @param routeList
   */
  @Action setMenu (routeList: RouteConfig[]) {
    this.SET_MENU(routeList);
  }

  /**
   * 移除token
   */
  @Action
  deltoken () {
    this.DEL_TOKEN();
  }

  // get hadPermit () {
  //   return (id?: number) => {
  //     if (id === undefined) return true
  //     return this.permits.some(item => item.id === id)
  //   }
  // }
  // get Menus () {
  //   return this.permits
  // }
}

export const UserModule = getModule(User);
