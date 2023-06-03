import request from '@/plugins/axios';
import { IRUserData } from './types';

// 登录接口
export function LoginApi(data: IRUserData) {
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}

// 获取登录用户信息
export function GetUserApi() {
  return request({
    url: '/userinfo',
    method: 'get',
  });
}
// 更新登录用户信息
export function updateUser(data: any) {
  return request({
    url: '/user',
    method: 'put',
    data,
  });
}
