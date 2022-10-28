import request from './_request';
import { ParamsList, ParamsAdd, ParamsDel } from './type'

// 获取列表接口
function getProjectListApi (data: ParamsList) {
  return request({
    url: '/Api/user/list',
    method: 'get',
    data
  });
}

// 2添加数据接口
function addProjectApi (data: ParamsAdd) {
  return request({
    url: '/Api/Project/Add',
    method: 'post',
    data
  });
}
// 3更新数据接口
function updateProjectApi (data: ParamsAdd) {
  return request({
    url: '/Api/user/update',
    method: 'put',
    data
  });
}
// 4删除数据接口
function delProjectApi (data: ParamsDel) {
  return request({
    url: '/Api/user/delete',
    method: 'delete',
    data
  });
}

export {
  getProjectListApi, // 1获取列表接口
  addProjectApi, // 2添加数据接口
  updateProjectApi, // 3更新数据接口
  delProjectApi // 4删除数据接口
}
