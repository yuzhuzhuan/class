import request from './_request';
import { LoginData } from './type'

// 登录接口
export function LoginApi (data: LoginData) {
  return request({
    url: '/Api/Project/login',
    method: 'post',
    data
  });
}

// 获取登录用户信息
export function GetUserApi (data: LoginData) {
  return request({
    url: '/Api/Project/user',
    method: 'get',
    data
  });
}
