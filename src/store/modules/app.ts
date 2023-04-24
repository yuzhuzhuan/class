import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import {
  getCurrentTab,
  getSidebarStatus,
  setCurrentTab,
  setSidebarStatus,
  setLanguage,
} from '@/utils/cookies';
import { GetLanguage } from '@/lang/index';
import store from '@/store';
import { IRouteObj } from '@/types/routeTypes';

export interface IAppState {
  // 侧边栏的状态
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  // 当前选中的tab
  currentTab: string;
  /**
   * 路由列表
   */
  TabList: IRouteObj[];
  /**
   * 语言
   */
  language: string;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  // 左边侧边栏的状态
  sidebar = {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false,
  };

  // 当前选中的tab
  currentTab = '/';
  // tab列表
  TabList: IRouteObj[] = [
    {
      name: 'Index',
      path: '/index',
      title: 'dashboard',
    },
  ];
  // language
  language = GetLanguage();

  @Mutation
  TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
    if (this.sidebar.opened) {
      setSidebarStatus('opened');
    } else {
      setSidebarStatus('closed');
    }
  }

  @Mutation
  CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
    setSidebarStatus('closed');
  }

  /**
   * 点击菜单，存入tab的数据
   * @param obj
   */
  @Mutation
  SET_TAB(obj: IRouteObj) {
    const { path } = obj;
    // store 和 cookie 都需要存入数据
    this.currentTab = path;
    setCurrentTab(obj);
    // 路由列表中不存在，加入tab列表
    if (
      !this.TabList.some(
        (it) => it.name === obj.name || it.path === obj.path || it.title === obj.title,
      )
    ) {
      this.TabList.push(obj);
    }
  }

  /**
   * 关闭指定的路由
   * @param path 1
   */
  @Mutation
  CLOSE_TAB(path: string) {
    // 路由列表筛选不匹配的
    this.TabList = this.TabList.filter((it: IRouteObj) => it.path !== path);
  }

  /**
   * 关闭其他
   */
  @Mutation
  CLOSE_OTHER() {
    const currentObj: IRouteObj = JSON.parse(getCurrentTab() as string);
    this.TabList = [
      {
        name: 'Index',
        path: '/index',
        title: 'dashboard',
      },
      currentObj,
    ];
  }

  /**
   * 关闭全部
   */
  @Mutation
  CLOSE_ALL() {
    const obj = {
      name: 'Index',
      path: '/index',
      title: 'dashboard',
    };
    this.TabList = [obj];
    this.currentTab = '/index';
    setCurrentTab(obj);
  }
  /**
   * 修改语言
   */
  @Mutation
  SET_LANGUAGE(lang: string) {
    // 存入数据
    this.language = lang;
    // 存入数据进入cookie
    setLanguage(lang);
  }
  /**
   * 对外暴露设置用户数据
   * @param userData
   */
  @Action
  setLANGUAGE(lang: string) {
    this.SET_LANGUAGE(lang);
  }
  @Action
  ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation);
  }

  @Action
  CloseSideBar(withoutAnimation: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation);
  }

  /**
   * 对外暴露的action, 存入tab
   * @param obj
   */
  @Action
  SaveTab(obj: IRouteObj) {
    this.SET_TAB(obj);
  }

  /**
   * 关闭指定的tab
   * @param path
   */
  @Action
  closeTab(path: string) {
    this.CLOSE_TAB(path);
  }

  /**
   * 关闭其他
   */
  @Action
  closeOther() {
    this.CLOSE_OTHER();
  }

  /**
   * 关闭全部
   */
  @Action
  closeAll() {
    this.CLOSE_ALL();
  }
  get Language() {
    return this.language;
  }
}

export const AppModule = getModule(App);
