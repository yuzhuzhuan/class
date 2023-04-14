const MOCKLOGIN = require('mockjs');
const { menuList: menus } = require('./role.ts');

const projectList = MOCKLOGIN.mock({
  'object|8': {
    name: 'admin',
    phone: 13834582211,
    id: 1,
    sysRoleId: 1,
    sysRoleName: 'admin',
    menus,
    sysRoleHidden: 1,
    watermark: 'admin 2211',
  },
  token: '@word(30)', // token
});

const token = {
  accessToken: projectList.token,
};

module.exports = [
  {
    url: '/url/login',
    type: 'post',
    response: (res) => {
      return {
        data: token,
        msg: '登录成功',
        code: 200,
      };
    },
  },
  {
    url: '/url/userinfo',
    type: 'get',
    response: () => {
      return {
        data: projectList.object,
        msg: '操作成功',
        code: 200,
      };
    },
  },
  {
    url: '/url/user',
    type: 'put',
    response: (res) => {
      Object.keys(res.body).forEach((key) => {
        projectList.object[key] = res.body[key] || projectList.object[key];
      });

      return {
        data: 200,
        msg: '更新成功',
        code: 200,
      };
    },
  },
];
