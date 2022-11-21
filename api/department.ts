import request from './_request';

// 部门接口
export function getDepListApi () {
  return request({
    url: '/Api/department/list',
    method: 'get'
  });
}
// 新增部门接口
export function addDepartmentApi (data: any) {
  return request({
    url: '/Api/department/add',
    method: 'post',
    data
  });
}
// 更新部门接口
export function updateDepartmentApi (data: any) {
  return request({
    url: '/Api/department/update',
    method: 'put',
    data
  });
}
// 删除部门接口
export function deleteDepartmentApi (data: any) {
  return request({
    url: '/Api/department/delete',
    method: 'delete',
    data
  });
}
