const MOCKLOGIN = require('mockjs');
const { menuList: menus } = require('./role.ts');

const projectList = MOCKLOGIN.mock({
  'object|8': {
    nickName: 'admin',
    phone: 13834582211,
    id: 1,
    sysRoleId: 1,
    sysRoleName: 'admin',
    menus,
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
        msg: '登录成功',
        code: 200,
      };
    },
  },
];
