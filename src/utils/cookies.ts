import { IUserData, IPage } from '@/types/dataTypes';
import { IRouteObj } from '@/types/routeTypes';
import Cookies from 'js-cookie';

class YkCookies<T = string> {
  constructor(private key: string, private isJson = false, private defaultValue?: T) {}
  get value(): T | undefined {
    const value = Cookies.get(this.key);
    if (value && this.isJson) {
      try {
        return JSON.parse(value);
      } catch (error) {
        const err = new Error(`Cookies [${this.key}] JSON 解析错误`);
        console.error(err.message, value);
        throw err;
      }
    }
    return (value as T) ?? this.defaultValue;
  }
  set(value: T) {
    const sValue = this.isJson ? JSON.stringify(value) : value;
    Cookies.set(this.key, sValue as string);
  }
  remove() {
    Cookies.remove(this.key);
  }
}

// App
export const cookieSidebarStatus = new YkCookies('sidebar_status');
// Token
export const cookieToken = new YkCookies('Admin-Token');
// User
export const cookieUser = new YkCookies<IUserData>('User-Data', true);
// Tab
export const cookieTab = new YkCookies<IRouteObj>('current-tab', true);
// Page
export const cookiePage = new YkCookies<IPage>('Page', true);
// Language
export const cookieLang = new YkCookies('language');
