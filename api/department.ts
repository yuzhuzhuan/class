import request from './_request';
import { LoginData } from './type'

// 登录接口
export function getDepApi (data: any) {
  return request({
    url: '/Api/department/list',
    method: 'get',
    data
  });
}
