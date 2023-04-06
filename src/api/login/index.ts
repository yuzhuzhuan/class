import request from '@/utils/request';
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
export function GetUserApi(data: IRUserData) {
  return request({
    url: '/userinfo',
    method: 'get',
    data,
  });
}
