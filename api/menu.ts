import request from './_request';

// 获取menus列表接口
function getMenuListApi() {
  return request({
    url: '/Api/menu/list',
    method: 'get'
  });
}

export {
  getMenuListApi // 1获取列表接口
};
