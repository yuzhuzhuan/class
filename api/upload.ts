import request from './_request';
// import { UploadData } from './type'

// 登录接口
export function UploadApi (data: FormData) {
  return request({
    url: '/Api/Project/upload',
    method: 'post',
    data
  });
}
