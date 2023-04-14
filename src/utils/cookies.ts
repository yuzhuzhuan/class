import { IUserData, IPage } from '@/types/dataTypes';
import Cookies from 'js-cookie';

// App
const sidebarStatusKey = 'sidebar_status';
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus);

// Token
const tokenKey = 'Admin-Token';
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token: string) => Cookies.set(tokenKey, token);
export const removeToken = () => Cookies.remove(tokenKey);

// User
const UserKey = 'User-Data';
export const getUserData = () => Cookies.get(UserKey);
export const setUserData = (data: IUserData) => Cookies.set(UserKey, JSON.stringify(data));
export const removeUserData = () => Cookies.remove(UserKey);

// Tab
const tabKey = 'current-tab';
export const getCurrentTab = () => Cookies.get(tabKey);
export const setCurrentTab = (tab: object) => Cookies.set(tabKey, JSON.stringify(tab));

// Page
const PageKey = 'Page';
export const getPage = () => Cookies.get(PageKey);
export const setPage = (data: IPage) => Cookies.set(PageKey, JSON.stringify(data));
export const removePage = () => Cookies.remove(PageKey);
