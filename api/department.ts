import request from './_request';

// 部门接口
export function getDepListApi() {
  return request({
    url: '/Api/department/list',
    method: 'get'
  });
}
// 新增部门接口
export function addDepartmentApi(data: any) {
  return request({
    url: '/Api/department/add',
    method: 'post',
    data
  });
}
// 更新部门接口
export function updateDepartmentApi(data: any) {
  return request({
    url: '/Api/department/update',
    method: 'put',
    data
  });
}
// 删除部门接口
export function deleteDepartmentApi(data: any) {
  return request({
    url: '/Api/department/delete',
    method: 'delete',
    data
  });
}
const service = {
  query(params: any) {
    return request.get('/api/department/list', { params });
  },
  remove(params: any) {
    return request.delete('/api/department/delete', { params });
  },
  detail(params: any) {
    return request.get('/api/department/detail', { params });
  },
  update(params: any) {
    return request.put('/api/department/update', { params });
  },
  create(params: any) {
    return request.post('/api/department/create', { params });
  }
};
export default service;
