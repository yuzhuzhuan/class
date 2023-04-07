import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { getUserData, getToken, setToken, removeToken, setUserData } from '@/utils/cookies';
import { IUserData } from '@/types/dataTypes';
import { RouteConfig } from 'vue-router';

export interface IUserState {
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
  routeList!: RouteConfig[];
  // 用户数据
  useData = null as null | IUserData;
  // token
  // public token = localStorage.getItem('token') || '';
  token = getToken() || '';

  // private permits = [] as { id: number }[]
  permits = [] as Array<{
    id: number;
    name: string;
    childList: Array<{ id: number; name: string }>;
  }>;

  /**
   * 存入用户数据
   * @param userData
   */
  @Mutation
  SET_USER_DATA(userData: any) {
    // 存入数据
    this.useData = userData;
    // 存入数据进入cookie
    setUserData(userData);
  }

  /**
   * 移除token
   */
  @Mutation
  DEL_TOKEN() {
    this.token = '';
    // localStorage.removeItem('token');
    removeToken();
  }

  /**
   * 存入token
   * @param token
   */
  @Mutation
  SET_TOKEN(token: string) {
    this.token = token;
    setToken(token);
  }

  @Mutation
  SET_MENU(routeList: RouteConfig[]) {
    this.routeList = routeList;
  }

  @Mutation
  SET_PERMITS(list: any[]) {
    this.permits = list;
  }

  /**
   * 对外暴露设置用户数据
   * @param userData
   */
  @Action
  setUserData(userData: IUserData) {
    this.SET_USER_DATA(userData);
    this.SET_PERMITS(userData.menus);
    // setMenus(userData.menus)
  }

  /**
   * 对外暴露存入token
   * @param token
   */
  @Action
  setToken(token: string) {
    // localStorage.setItem('token', token);
    setToken(token);
    this.SET_TOKEN(token);
  }

  /**
   * 获取用户的token
   * @returns
   */
  @Action
  getToken() {
    return this.token;
  }

  /**
   * 获取用户菜单
   * @returns
   */
  @Action
  async getMenu() {
    const userData: IUserData = JSON.parse(getUserData() as string);
    // return await APIGetMenu({
    //   phone: userData.phone,
    // });
  }

  /**
   * 存入路由数据
   * @param routeList
   */
  @Action setMenu(routeList: RouteConfig[]) {
    this.SET_MENU(routeList);
  }

  /**
   * 移除token
   */
  @Action
  deltoken() {
    this.DEL_TOKEN();
  }

  get hadPermit() {
    return (id?: number) => {
      if (id === undefined) return true;
      return this.permits.some((item) => item.id === id);
    };
  }

  get Menus() {
    return this.permits;
  }

  get permission() {
    return (code: any) => {
      return this.permits.some((item) => item.name === code);
    };
  }
}

export const UserModule = getModule(User);
