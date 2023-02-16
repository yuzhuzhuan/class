import request from './_request';
import { ParamsList, ParamsDel } from './type';

// 获取用户列表接口
function getRoleListApi(data: ParamsList) {
  return request({
    url: '/Api/role/list',
    method: 'get',
    data
  });
}

// 2添加数据接口
function addRoleApi(data: any) {
  return request({
    url: '/Api/role/add',
    method: 'post',
    data
  });
}
// 3更新数据接口
function updateRoleApi(data: any) {
  return request({
    url: '/Api/role/update',
    method: 'put',
    data
  });
}
// 4删除数据接口
function delRoleApi(data: ParamsDel) {
  return request({
    url: '/Api/role/delete',
    method: 'delete',
    data
  });
}
// 获取对应id 数据接口
function getRoleApi(data: string) {
  return request({
    url: '/Api/role/detail',
    method: 'get',
    data
  });
}

export {
  getRoleListApi, // 1获取列表接口
  addRoleApi, // 2添加数据接口
  updateRoleApi, // 3更新数据接口
  delRoleApi, // 4删除数据接口
  getRoleApi // 5删除数据接口
};

const service = {
  query(params: any) {
    return request.get('/Api/role/list', { params });
  },
  remove(params: any) {
    return request.delete('/api/role/delete', { params });
  },
  detail(params: any) {
    return request.get('/api/role/detail', { params });
  },
  update(params: any) {
    return request.put('/api/role/update', { params });
  },
  create(params: any) {
    return request.post('/api/role/create', { params });
  }
};
export default service;
