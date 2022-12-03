import request from './_request';
import { UserList, UserAdd, ParamsDel } from './type';

// 获取用户列表接口
function getUserListApi(data: UserList) {
  return request({
    url: '/Api/user/list',
    method: 'get',
    data
  });
}

// 2添加数据接口
function addUserApi(data: UserAdd) {
  return request({
    url: '/Api/user/Add',
    method: 'post',
    data
  });
}
// 3更新数据接口
function updateUserApi(data: UserAdd) {
  return request({
    url: '/Api/user/update',
    method: 'put',
    data
  });
}
// 4删除数据接口
function delUserApi(data: ParamsDel) {
  return request({
    url: '/Api/user/delete',
    method: 'delete',
    data
  });
}
// 获取对应id 数据接口
function getUserApi(data: UserList) {
  return request({
    url: '/Api/user/detail',
    method: 'get',
    data
  });
}

export {
  getUserListApi, // 1获取列表接口
  addUserApi, // 2添加数据接口
  updateUserApi, // 3更新数据接口
  delUserApi, // 4删除数据接口
  getUserApi // 4删除数据接口
};

const service = {
  query(params: any) {
    return request.get('/api/user/list', { params });
  },
  remove(params: any) {
    return request.delete('/api/user/delete', { params });
  },
  detail(params: any) {
    return request.get('/api/user/detail', { params });
  },
  update(params: any) {
    return request.put('/api/user/update', { params });
  },
  create(params: any) {
    return request.post('/api/user/create', { params });
  }
};
export default service;
